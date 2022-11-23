import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ChatBotService } from '../chatbot/chatbot.service';
import { TalentService } from '../talents/talent.service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {
  token: String;
  randertype: string = "unauthrized"
  constructor(
    private route: ActivatedRoute,
    private tostr: ToastrManager,
    private _talent: TalentService,
    private _chat: ChatBotService,
    private loader: AppLoaderService
  ) {
    route.queryParams.subscribe(
      item => {
        this.token = item.token
      }
    )
  }

  ngOnInit(): void {
    this.acceptMail()
  }

  acceptMail() {
    this.loader.start()
    this._chat.acceptMail(this.token).subscribe(
      (resp: Response) => {
        console.log("resp", resp);
        this.loader.stop()
        if (resp[0].isinterested)
          this.randertype = "updated"
        else
          this.randertype = "update"
      }, (err: Response) => {
        this.loader.stop()
        this.randertype = "error"
      }
    )
  }

}
