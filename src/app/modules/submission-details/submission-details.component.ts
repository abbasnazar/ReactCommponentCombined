import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { TalentService } from '../talents/talent.service';

@Component({
  selector: 'app-submission-details',
  templateUrl: './submission-details.component.html',
  styleUrls: ['./submission-details.component.scss']
})
export class SubmissionDetailsComponent implements OnInit {
  private token: string
  rows: any = []
  isError: boolean
  showColumn: any = {}
  constructor(
    private _talent: TalentService,
    private activeRoute: ActivatedRoute,
    private loader: AppLoaderService
  ) {
    this.token = this.activeRoute.snapshot.queryParams.token
  }

  ngOnInit(): void {
    if (this.token)
      this.load()
  }

  load() {
    this.loader.start()
    this._talent.getTalentByToken(this.token).subscribe(
      (resp: any) => {
        this.loader.stop()
        if (resp.length > 0) {
          let list = resp[0].emailoption ? resp[0].emailoption.split(',') : ''
          list.forEach(element => {
            this.showColumn[element] = true
          });
        }
        this.rows = resp
        console.log(resp);

      }, (err: Response) => {
        this.loader.stop()
        this.isError = true
      }
    )
  }

}
