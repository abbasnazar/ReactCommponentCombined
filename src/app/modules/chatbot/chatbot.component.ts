import { Component, OnInit, HostListener } from '@angular/core';
import { ChatBotService } from './chatbot.service';
import { ActivatedRoute } from '@angular/router';
import { TalentService } from '../talents/talent.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  chatHistory: any = []
  msg: string = ''
  isloader:boolean
  userDetails: any = {}
  videoInfoObj:any={}
  token:string
  // private userid: number
  // private jobid: number
  // private type: string
  constructor(
    private _chatbot: ChatBotService,
    private route: ActivatedRoute,
    private _talent :TalentService
  ) {
    route.queryParams.subscribe(
      item => {
        this.token = item.token
      }
    )
  }

  ngOnInit() {
    this.isloader=true
    this._talent.gettalentjobmapping(this.token).subscribe(
      (resp: Response) => {
        this.videoInfoObj = resp
        if(this.videoInfoObj.length>0 && !this.videoInfoObj.video)
           this.load()
           this.isloader=false
      }, (err: Response) => {
        this.isloader=false
        console.log(err);
      }
    )

  }

  load() {
    this.isloader=true
    this._chatbot.getChatByToken(this.token).subscribe(
      (resp: Response) => {
        let respData: any = resp
        if (respData.length > 0) {
          this.chatHistory = [{
            type: 'sys',
            msg: 'Hi, ' + respData[0].name
          }]
          this.userDetails = respData[0]
          respData.forEach(element => {
            if (element.talentid) {
              if (element.requesttext) {
                this.chatHistory.push({
                  type: 'client',
                  msg: element.requesttext,
                  link: String(element.requesttext).indexOf('http://') == 0 ? true : false
                })
              }
              if (element.responcetext) {
                this.chatHistory.push({
                  type: 'sys',
                  msg: element.responcetext,
                  link: String(element.responcetext).indexOf('http://') == 0 ? true : false
                })
              }
            }
          });
          this.scroll()
          this.isloader=false
        }
      }, (err: Response) => {
        console.log(err);
        this.isloader = false
      }
    )


  }

  send(e) {
    let msg = this.msg
    if (e.key == 'Enter' && msg) {
      this.chatHistory.push({
        type: 'client',
        msg,
        link: String(msg).indexOf('http://') == 0 ? true : false
      })
      this.scroll()
      this.msg = ''
      this._chatbot.startChat(msg, this.token).subscribe(
        (resp: Response) => {
          this.chatHistory.push({
            type: 'sys',
            msg: resp[0].speech,
            link: String(msg).indexOf('http://') == 0 ? true : false
          })
          if (resp[0].speech == 'Great, Please upload your small introduction video on below link.') {
            this.getLink()
          }

          this.scroll()

        }, (err: Response) => {
          console.log(err);

        }
      )
    }

  }

  getLink() {
    let msg = `${window.origin}/#/video_uploader?token=${this.token}`
    this._chatbot.insertChat({
      // talentid: this.userid,
      // jobid: this.jobid,
      // type:this.type,
      token:this.token,
      responcetext: msg
    }).subscribe((resp: Response) => {
      this.chatHistory.push({
        type: 'sys',
        msg,
        link: String(msg).indexOf('http://') == 0 ? true : false
      })
      this.scroll()
    }), (err: Response) => {
      console.log(err);
    }

  }





  scroll() {
    setTimeout(() => {
      let sc = document.getElementById('auto-scroll')
      // console.log(sc.offsetHeight, sc.scroll, scrollBy);
      let i = 0
      while (i <= 2) {
        sc.scrollTo(0, 1000000)
        i++
      }

    }, 500);
  }

}
