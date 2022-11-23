import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'app/app.service';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ChatBotService } from '../chatbot/chatbot.service';

@Component({
  selector: 'app-job-descriptions',
  templateUrl: './job-descriptions.component.html',
  styleUrls: ['./job-descriptions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobDescriptionsComponent implements OnInit {

  token: String;
  randertype: string = "render"
  descObj: any = {}
  constructor(
    private route: ActivatedRoute,
    private tostr: ToastrManager,
    private loader: AppLoaderService,
    private _chat: ChatBotService,
    private _app: AppService,
    private router: Router
  ) {
    route.queryParams.subscribe(
      item => {
        this.token = item.token
      }
    )
  }

  ngOnInit(): void {

    this.load()
  }

  apply() {
    this.router.navigateByUrl(`thankyou?token=${this.token}`)
  }

  getImage() {
    return this._app.getFile(this.descObj.logo)
  }

  load() {
    this.loader.start()
    this._chat.getJdByToken(this.token).subscribe(
      (resp: any) => {
        // console.log("resp", resp);
        if (resp.length > 0) {
          this.descObj = resp[0]
        }
        this.loader.stop()
      }, (err: Response) => {
        this.loader.stop()
        this.randertype = "error"
      }
    )
  }

}
