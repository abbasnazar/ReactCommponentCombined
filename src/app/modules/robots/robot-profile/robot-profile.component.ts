import { Component, OnInit, Sanitizer, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from 'app/app.service';
import { ChatBotService } from 'app/modules/chatbot/chatbot.service';
import { RobotDialogComponent } from '../robot-dialog/robot-dialog.component';

@Component({
  selector: 'app-robot-profile',
  templateUrl: './robot-profile.component.html',
  styleUrls: ['./robot-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RobotProfileComponent implements OnInit {
  profileData: any = {
  }
  emailchatHistory: any[] = [];
  linkedinChatHistory: any[] = [];
  chatHistory: any[] = [];
  callHistory: any[] = [];
  callrecordingdomain: any = "https://client.easygoivr.com/monitor/";
  chatType: any;
  constructor(
    private _chatbot: ChatBotService,
    private dialog: MatDialog,
    private router: Router,
    private _app: AppService

  ) {
    let temp = sessionStorage.getItem('profile')
    if (temp)
      this.profileData = JSON.parse(temp)
  }

  ngOnInit(): void {
    console.log('profile', this.profileData);

    this.getChatHistory('all')
    this.getemailChatHistory('all')
    this.showAllFormatDoc()
    this.getCallHistory()


  }

  persentageCalculation(value) {
    if (!value)
      return '0%'
    else {
      return (Number(value) * 100)
    }
  }

  profile(row) {
    sessionStorage.setItem('profile', JSON.stringify(row))
    this.router.navigateByUrl('/robots/robot_profile')
  }

  getVideoPath() {
    return this._chatbot.getVideos(this.profileData.video)

  }

  chatSelection(selection) {
    console.log(selection);

  }

  getChatHistory(type) {
    this.chatHistory = []
    this._chatbot.getChat(this.profileData.id, this.profileData.jobid, 'whatsapp').subscribe(
      (resp: Response) => {
        let respData: any = resp
        console.log('wp hi', resp)
        if (respData.length > 0 && respData[0].talentidwtm) {
          this.chatType = resp[0].type
          this.chatHistory = [{
            type: 'sys',
            msg: respData[0].templateMessage
          }]
          respData.forEach(element => {
            if (element.talentid) {
              this.chatHistory.push({
                type: (element.statusString == 'SENT') ? 'client' : 'sys',
                msg: (element.statusString == 'SENT') ? (element.text ? element.text : 'video uploaded by candidate') : element.text
              })
              // this.chatHistory.push({
              //   type: 'sys',
              //   msg: element.reqtext
              // })
            }
          });
        }
      }, (err: Response) => {
        console.log(err);
      }
    )
  }

  getemailChatHistory(type) {
    this.emailchatHistory = []
    this._chatbot.getemailChat(this.profileData.id, this.profileData.jobid, 'email').subscribe(
      (resp: Response) => {
        console.log('email', resp);

        let respData: any = resp
        if (respData.length > 0 && respData[0].talentid) {
          this.chatType = resp[0].type
          this.emailchatHistory = [{
            type: 'sys',
            subject: 'Hi, ' + respData[0].name
          }]
          respData.forEach(element => {
            if (element.talentid && element.requesttext) {
              let obj = JSON.parse(element.requesttext)
              obj.type = 'client',
                this.emailchatHistory.push(obj)
            }
            if (element.talentid && element.responcetext) {
              let obj = JSON.parse(element.responcetext)
              obj.type = 'sys',
                this.emailchatHistory.push(obj)
            }
          });
          // this.emailchatHistory.push({
          //   type: 'client',
          //   msg: obj.subject
          // })
        }
      }, (err: Response) => {
        console.log(err);
      }
    )
  }

  viewAppliedJob() {
    const dialogRef = this.dialog.open(RobotDialogComponent, {
      width: '700px',
      data: { ...this.profileData, title: 'Applied Jobs', }
    });
  }

  showMail(type, obj) {
    if (type == 'Reply') {
      obj.jobid = this.profileData.jobid
      obj.talentid = this.profileData.id
      obj.subject = this.emailchatHistory[1].subject
      obj.email = this.profileData.email
    }
    // console.log(obj.html);
    const dialogRef = this.dialog.open(RobotDialogComponent, {
      width: '700px',
      data: { ...obj, title: type, }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "email")
        this.getemailChatHistory('email')

    });


  }

  getCallHistory() {
    console.log(this.profileData);

    this._chatbot.getCallHistory(this.profileData.id, this.profileData.jobid).subscribe(
      (resp: any) => {
        this.callHistory = resp

      }, (err: Response) => {
        console.log(err);

      }
    )
  }

  download() {
    let a = document.createElement('a')
    a.href = `${this.profileData.resumeurl}`
    a.target = '_blank'
    a.click()
  }

  showAllFormatDoc() {
    let pathList = this.profileData.uri.replace('gs://', '').split('/')
    if (pathList.length > 1) {
      this._app.getSignUrl(pathList[0], pathList[1]).subscribe(
        (resp: any) => {
          this.profileData.resumeurl = resp[0]
          console.log(' this.profileData.resumeurl', this.profileData.resumeurl);

          // document.getElementsByTagName("iframe")[0].src = `https://docs.google.com/gview?url=${this.profileData.resumeurl}&embedded=false`
          if (this.profileData.uri.includes('.pdf'))
            document.getElementsByTagName("iframe")[0].src = `${this.profileData.resumeurl}`
        }
      )
    }

    // document.getElementsByTagName("iframe")[0].src = ''

  }

}
