import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'app/app.service';
import { ChatBotService } from 'app/modules/chatbot/chatbot.service';
import { RobotDialogComponent } from 'app/modules/robots/robot-dialog/robot-dialog.component';

@Component({
  selector: 'app-talent-profile',
  templateUrl: './talent-profile.component.html',
  styleUrls: ['./talent-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TalentProfileComponent implements OnInit {
  profileData: any = {}
  constructor(
    private _chatbot: ChatBotService,
    private dialog: MatDialog,
    private _app: AppService

  ) {
    let temp = sessionStorage.getItem('talentprofile')
    if (temp)
      this.profileData = JSON.parse(temp)
  }

  ngOnInit(): void {
    // console.log('profile', this.profileData);

    this.showAllFormatDoc()


  }

  getVideoPath() {
    return this._chatbot.getVideos(this.profileData.video)

  }


  viewAppliedJob() {
    const dialogRef = this.dialog.open(RobotDialogComponent, {
      width: '700px',
      data: { ...this.profileData, title: 'Applied Jobs', }
    });
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

          // document.getElementsByTagName("iframe")[0].src = `https://docs.google.com/gview?url=${this.profileData.resumeurl}&embedded=false`
          if (this.profileData.uri.includes('.pdf'))
            document.getElementsByTagName("iframe")[0].src = `${this.profileData.resumeurl}`
        }
      )
    }
  }

}
