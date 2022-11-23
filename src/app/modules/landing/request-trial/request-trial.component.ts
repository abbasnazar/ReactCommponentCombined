import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { ToastrManager } from "ng6-toastr-notifications";
import { ApiService } from "app/common/apiSeivice";
@Component({
  selector: "app-request-trial",
  templateUrl: "request-trial.component.html",
  styleUrls: ["request-trial.component.scss"],
})
export class RequestTrialComponent implements OnInit {
  contactForm: FormGroup;
  userDetails: any = {};
  private apiHelper = new ApiService();

  public data: any = {};

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
    });
  }
  onSubmit() {
    if (!this.userDetails.name)
      return this.tostr.errorToastr("Please enter name", "Oops");
    if (!this.userDetails.email)
      return this.tostr.errorToastr("Please enter email", "Oops");
    if (!this.userDetails.mobile)
      return this.tostr.errorToastr("Please enter Mobile Number", "Oops");
    // console.log('#SHOW o SUBMIT ',this.contactForm.getRawValue())
    console.log("#SHOW o SUBMIT ", this.contactForm.getRawValue());
    this.http
      .post<any>(
        this.apiHelper.path("/api/requestTrial/add"),
        this.contactForm.getRawValue()
      )
      .subscribe((resp: Response) => {
        this.tostr.successToastr("Successfully added !", "Success");
      });
  }
}