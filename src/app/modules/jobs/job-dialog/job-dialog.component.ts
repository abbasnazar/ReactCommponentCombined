import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TalentService } from 'app/modules/talents/talent.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-job-dialog',
  templateUrl: './job-dialog.component.html',
  styleUrls: ['./job-dialog.component.scss']
})
export class JobDialogComponent implements OnInit {
  countList: any = Array(61).fill(0).map((x, i) => 95 - i)
  constructor(
    private dialogRef: MatDialogRef<JobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    private _jobs: JobsService,
    private tostr: ToastrManager,
    private _talent: TalentService
  ) { }

  ngOnInit(): void {
    if (this.data.title == 'Talent Request') {
      this.data.relevanceRequest = 70
      this.data.willingnessRequest = 60
      this.data.posRequest = 60
    }
  }

  delete() {
    this._jobs.deteteJob(this.data.id).subscribe(
      (resp: Response) => {
        this.tostr.successToastr(resp[0], 'Success')
        this.dialogRef.close(true);
      }, (err: Response) => {
        this.tostr.errorToastr(err.statusText, 'Oops')
      }
    )
  }

  deleteAndRetry(id, type) {
    this._talent.deleteTalentRequest(id, type).subscribe(
      (resp: Response) => {
        this.tostr.successToastr(resp[0], 'Success')
        this.dialogRef.close(true);
      }, (err: Response) => {
        this.tostr.errorToastr(err.statusText, 'Oops')
      }
    )

  }

  requestTalent() {

    let finalObj = {
      id: this.data.id,
      description: this.data.description,
      skills: this.data.skills,
      mainskills: this.data.mainskills,
      title: this.data.title,
      experience: this.data.experience,
      billrate: this.data.paystartrate,
      endrate: this.data.payendrate,
      cityName: this.data.city,
      submittals: Number(this.data.allowedsubmittals),
      currencyName: this.data.currencyName,
      industrydomain: this.data.industrydomain,
      role: this.data.role,
      relevancerequest: this.data.relevanceRequest,
      willingnessrequest: this.data.willingnessRequest,
      posrequest: this.data.posRequest,
      prefloc: this.data.prefloc,
      noticeperiod: this.data.noticeperiod,
      positiontype: this.data.positiontype,
      exclusion: this.data.exclusion
    }
    // added prefloc
    this._jobs.talentRequest(finalObj, 'naukri').subscribe(
      (resp: Response) => {
        this.tostr.successToastr('Successfully accepted', 'Success')
        this.dialogRef.close(true);
      }, (err: Response) => {
        this.tostr.errorToastr(err.statusText, 'Oops')
      }
    )

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
