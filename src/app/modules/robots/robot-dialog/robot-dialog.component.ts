import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RobotsService } from '../robots.service';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { ChatBotService } from 'app/modules/chatbot/chatbot.service';
import { TalentService } from 'app/modules/talents/talent.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-robot-dialog',
  templateUrl: './robot-dialog.component.html',
  styleUrls: ['./robot-dialog.component.scss'],
})
export class RobotDialogComponent implements OnInit {

  appliedJobList: any = []

  constructor(
    private dialogRef: MatDialogRef<RobotDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    private tostr: ToastrManager,
    private _talent: TalentService,
    private _chatbot: ChatBotService,
    private loader: AppLoaderService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private _robot: RobotsService,
  ) { }

  // ngOnInit(): void {
  //   if (this.data.title == 'Applied Jobs')
  //     this.loadAppliedJob()
  //   console.log(this.data);

  // }
  ngOnInit(): void {
    if (this.data.title == 'Talent Request') {
      this.data.relevanceRequest = 70
      this.data.willingnessRequest = 60
      this.data.posRequest = 60
    }
  }

  getVideoPath() {
    return this._chatbot.getVideos(this.data.video)

  }

  loadAppliedJob() {
    this.loader.start()
    this._talent.getJobAppliedByTalent(this.data.id)
      .subscribe((resp: Response) => {
        this.loader.stop()
        this.appliedJobList = resp
        console.log("applied job", resp);

      }, (err: Response) => {
        this.loader.stop()
        console.log(err);

        this.tostr.errorToastr(err.statusText, "Error")
      })
  }

  submit() {
    if (this.data.data.length > 0) {
      this.loader.start()
      this._talent.share(this.data.data).subscribe(
        (resp: Response) => {
          this.loader.stop()
          this.tostr.successToastr('Successfully send', 'success')
          this.closeDialog()
        }, (err: Response) => {
          this.loader.stop()
          this.tostr.errorToastr(err.statusText, 'Oops')
        }
      )
    } else {
      this.tostr.errorToastr('Please select minimum one user', 'success')
    }


  }

  profile(row) {
    sessionStorage.setItem('profile', JSON.stringify(row))
    this.router.navigateByUrl('/robots/robot_profile')
    this.closeDialog()
    location.reload()
  }

  parseHtml() {
    return this.sanitizer.bypassSecurityTrustHtml(this.data.html)
  }

  emailReply() {
    if (!this.data.message)
      return this.tostr.errorToastr("Please enter some text", "Error")

    this.loader.start()
    this._talent.emailReply(this.data).subscribe(
      (resp: Response) => {
        this.loader.stop()
        this.tostr.successToastr("Successfully sent", "Success")
        this.closeDialog("email")
      }, (err: Response) => {
        this.loader.stop()
        this.tostr.errorToastr(err.statusText, "Error")
      })
  }

  
  uploadTalent() {
    
    let finalObj = {
      // id: this.data.id,
      // description: this.data.description,
      // skills: this.data.skills,
      // mainskills: this.data.mainskills,
      // title: this.data.title,
      // experience: this.data.experience,
      // billrate: this.data.paystartrate,
      // endrate: this.data.payendrate,
      // cityName: this.data.city,
      // submittals: Number(this.data.allowedsubmittals),
      // currencyName: this.data.currencyName,
      // industrydomain: this.data.industrydomain,
      // role: this.data.role,
      // relevancerequest: this.data.relevanceRequest,
      // willingnessrequest: this.data.willingnessRequest,
      // posrequest: this.data.posRequest,
      // prefloc: this.data.prefloc,
      // noticeperiod: this.data.noticeperiod,
      // positiontype: this.data.positiontype,
      // exclusion: this.data.exclusion
    id: this.data.id,
    resumeurl:this.data.resumeurl,
    name: this.data.name,
    title:this.data.title,
    email: this.data.email,
    mobile: this.data.mobile,
    pan_number: this.data.pan_number,
    uri: this.data.uri,
    totalexperienceyear: this.data.totalexperienceyear,
    relevant_experience: this.data.relevant_experience,
    currentcity: this.data.currentcity,
    notice_period: this.data.notice_period,
    buyrate: this.data.buyrate ,
    dateofbirth: this.data.dateofbirth,
      
    }
    
    // added prefloc
    this._robot.uploadPortal(finalObj, 'naukri').subscribe(
      (resp: Response) => {
        console.log('finalObjjobid ',finalObj);
        this.tostr.successToastr('Successfully accepted', 'Success')
        this.dialogRef.close(true);
      }, (err: Response) => {
        this.tostr.errorToastr(err.statusText, 'Oops')
      }
    )

  }

  deleteUploadRequest(id, type) {
    this._robot.deleteUploadRequest(id, type).subscribe(
      (resp: Response) => {
        this.tostr.successToastr(resp[0], 'Success')
        this.dialogRef.close(true);
      }, (err: Response) => {
        this.tostr.errorToastr(err.statusText, 'Oops')
      }
    )

  }

  closeDialog(type = null) {
    this.dialogRef.close(type)
  }

}
