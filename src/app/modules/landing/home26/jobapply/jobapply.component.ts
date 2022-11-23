import { Component, EventEmitter, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { ApiService } from "app/common/apiSeivice";
import { EmailValidation } from "app/common/emailvalidation";
import { ToastrManager } from "ng6-toastr-notifications";
import { TalentService } from "app/modules/talents/talent.service";

@Component({
  selector: "app-jobapply",
  templateUrl: "./jobapply.component.html",
  styleUrls: ["./jobapply.component.scss"],
})
export class JobapplyComponent implements OnInit {
  contactForm: FormGroup;
  userDetails: any = {};
  private apiHelper = new ApiService();

  public data: any = {};
  resumefile: any;
  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private tostr: ToastrManager
  ) {}

  ngOnInit(): void {
    // Create the form
    this.contactForm = this._formBuilder.group({
      req_name: [""],
      req_email: [""],
      req_phn: [""],
      req_msg: [""],
      req_uploadFile: [""],
    });
  }

  getFile(file) {
    this.contactForm.controls['req_uploadFile'].setValue(file.name)
    console.log('getFile',file.name)
    this.resumefile = file

  }
  parse(){
    // if (!url)
    //   return this.tostr.errorToastr('url not found !!!', 'Oops')
    let a = document.createElement('a')
    a.href = `http://localhost:3000`
    // a.href = `http://34.131.81.14:8080`

    a.target = '__blank'
    a.click()
  }
  onSubmit() {
    let fd = new FormData()
    console.log('checkresume',this.resumefile)
    if (this.resumefile) {
      if (this.resumefile.type.indexOf('pdf') == -1 || this.resumefile.type.indexOf('doc') == -1 || this.resumefile.type.indexOf('docx') == -1) {
        return this.tostr.errorToastr('Only pdf,doc and docx file allowed', 'Oops')
        
      }
      fd.append('file', this.resumefile)
    }
    
    if (!this.userDetails.name)
      return this.tostr.errorToastr("Please enter name", "Oops");
    if (!this.userDetails.email)
      return this.tostr.errorToastr("Please enter email", "Oops");
    if (!this.userDetails.mobile)
      return this.tostr.errorToastr("Please enter Mobile Number", "Oops");
    if (!this.userDetails.filename)
      return this.tostr.errorToastr("Please upload your resume", "Oops");
      let a=this.contactForm.getRawValue()
      fd.append('data', JSON.stringify({...a})) 
    // console.log('#SHOW o SUBMIT ',this.contactForm.getRawValue())
    console.log("#SHOW o SUBMIT ", this.contactForm.getRawValue());
    this.http
      .post<any>(
        this.apiHelper.path("/api/jobapply/add"),
        this.contactForm.getRawValue()
      )
      .subscribe((resp: Response) => {
        this.tostr.successToastr("Successfully added !", "Success");
      });
  }
}