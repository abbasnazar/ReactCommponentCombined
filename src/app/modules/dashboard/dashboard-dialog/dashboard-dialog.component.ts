import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'app/app.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-dashboard-dialog',
  templateUrl: './dashboard-dialog.component.html',
  styleUrls: ['./dashboard-dialog.component.scss']
})
export class DashboardDialogComponent implements OnInit {
  jobList: any = [{ name: 'Jobs Added' }, { name: 'Jobs With RPA' },
  { name: 'Jobs Failed' }, { name: 'Jobs Pending' },
  { name: 'Jobs Added v/s Submission Chart' }, { name: 'Jobs Added v/s Skills Chart' },
  { name: 'Job By Location' }, { name: 'Job By Experience' }, { name: 'Job By Industries' }]
  talentList: any = [{ name: 'Talents Request' }, { name: 'Talent Found' }, { name: 'Talents Chart' },
  { name: 'Talent By Location' }, { name: 'Talent By Experience' }, { name: 'Talent By Industries' },
  { name: "Talents Qualified" }, { name: "Talent Submitted" }]
  otherList: any = [
    { name: "Submission Result" }, { name: "Right To Represent Received" }, { name: 'Right To Represent Pending' }, { name: "Video Resumes Received" },
    { name: "Submission Details" }, { name: 'Video Resume Pending' },
    { name: 'Submission Chart' }, { name: 'AI Recruiter Chart' }, { name: 'Submission by Team Chart' },
  ]
  teamList: any = [
    { name: 'Team Calling' }, { name: 'Team - Submissions' }, { name: 'Team - Jobs Added vs Jobs Submitted' },{name:'Team - Talent Extracted vs Talents ClicktoCall'},
    {name:'Team -Talent Extracted vs Talents Right to represent'}, {name:'Team - Talent Extracted vs Talents Video Uploaded'}, {name:'Team - Talent Extracted vs Talents Qualified'}
  ]
  clientList: any = [
    { name: 'Client - Jobs added vs Jobs Submitted' },{name:'Client - Talent Extracted vs Talents CLicktoCall'},
    {name:'Client - Talent Extracted vs Talents Right to represent'}, {name:'Client - Talent Extracted vs Talents Video Uploaded'}, {name:'Client - Talent Extracted vs Talents Qualified'}
  ]
  constructor(
    private dialogRef: MatDialogRef<DashboardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    private tostr: ToastrManager,
    private _app: AppService
  ) { }

  ngOnInit(): void {
    this.load()
  }

  closeDialog(refresh = false): void {
    this.dialogRef.close(refresh);
  }

  load() {
    this.jobList.forEach(element => {

      if (this.data.showItem[element.name])
        element['value'] = true
    });
    this.talentList.forEach(element => {
      if (this.data.showItem[element.name])
        element['value'] = true
    });
    this.otherList.forEach(element => {
      if (this.data.showItem[element.name])
        element['value'] = true
    });
    this.teamList.forEach(element => {
      if (this.data.showItem[element.name])
        element['value'] = true
    });
    this.clientList.forEach(element => {
      if (this.data.showItem[element.name])
        element['value'] = true
    });
  }

  updateViewMetadata() {
    let selections = []
    this.teamList.forEach(element => {
      if (element.value)
        selections.push(element.name)
    });
    this.clientList.forEach(element => {
      if (element.value)
        selections.push(element.name)
    });
    this.otherList.forEach(element => {
      if (element.value)
        selections.push(element.name)
    });
    this.jobList.forEach(element => {
      if (element.value)
        selections.push(element.name)
    });
    this.talentList.forEach(element => {
      if (element.value)
        selections.push(element.name)
    });
    this._app.updateViewMetadata({ name: "dashboard", metadata: selections.toString() }).subscribe(
      (resp: Response) => {
        this.tostr.successToastr("successfully saved", "Success")
        this.closeDialog(true)
      }, (err: Response) => {
        console.log(err);
        this.tostr.errorToastr(err.statusText, "Error")

      }
    )
  }

}
