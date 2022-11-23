import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { EmailValidation } from 'app/common/emailvalidation';
import { AdminService } from 'app/modules/admin/admin.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CrmService } from '../../crm.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddCompanyComponent implements OnInit {
  companyObj: any = {}
  cityList: any = [];
  companyTypeList: any = [];
  metaDataList: any = [];
  constructor(
    private _crm: CrmService,
    private _admin: AdminService,
    private tostr: ToastrManager,
    private route: Router,
    private loader: AppLoaderService
  ) {
    let temp = sessionStorage.getItem('company')
    sessionStorage.removeItem('company')
    if (temp)
      this.companyObj = JSON.parse(temp)
  }

  ngOnInit(): void {
    this.loadCity()
    this.loadCompanyType()

    this._admin.getMetaData('Company', '1').subscribe(
      (resp: Response) => {
        this.metaDataList = resp
        let metadata = this.companyObj.metadatajson ? JSON.parse(this.companyObj.metadatajson) : {}
        this.metaDataList.forEach(element => {
          element.value = metadata[element.fieldname]
        });

      }
    )

  }

  gotoView() {
    this.route.navigateByUrl('/crm/company')
  }

  loadCity() {
    this._admin.getCity().subscribe(
      (resp: Response) => {
        this.cityList = resp
      }, (err: Response) => {
        console.log(err);

      }
    )
  }

  loadCompanyType() {
    this._admin.getCompanyType().subscribe(
      (resp: Response) => {
        this.companyTypeList = resp
        // console.log(this.companyTypeList);

      }, (err: Response) => {
        console.log(err);

      }
    )
  }

  submit() {
    if (!this.companyObj.name)
      return this.tostr.errorToastr('Please enter name!', 'Oops')
    if (!this.companyObj.email)
      return this.tostr.errorToastr('Please enter emailid !', 'Oops')
    let msg = new EmailValidation().valid(this.companyObj.email)
    if (msg)
      return this.tostr.errorToastr(msg, 'Oops')
    if (!this.companyObj.govtid)
      return this.tostr.errorToastr('Please enter govtid !', 'Oops')
    if (!this.companyObj.cityid)
      return this.tostr.errorToastr('Please select city !', 'Oops')
    if (!this.companyObj.typeid)
      return this.tostr.errorToastr('Please select company type !', 'Oops')
    if (!this.companyObj.pincode)
      return this.tostr.errorToastr('Please enter pincode !', 'Oops')

    let metadataObj = {}
    let metaError = ''
    this.metaDataList.forEach(element => {
      if (!metaError) {
        if (element.mandatory && element.value)
          metaError = `${element.fieldname} is empty`
        metadataObj[element.fieldname] = element.value
      }
    });
    if (metaError)
      return this.tostr.errorToastr(metaError, 'Error')

    let obj = new CompanyModel(this.companyObj)

    obj['metadatajson'] = JSON.stringify(metadataObj)

    if (this.companyObj.id) {
      this.loader.start()
      this._crm.updateCompanies({ ...obj, id: this.companyObj.id })
        .subscribe((resp: Response) => {
          this.tostr.successToastr('Successfully updated', 'Success')
          this.gotoView()
          this.loader.stop()
        }, (err: Response) => {
          this.loader.stop()
          this.tostr.errorToastr(err.statusText, 'Oops')
        })

    } else {
      this.loader.start()
      this._crm.addCompanies(obj)
        .subscribe((resp: Response) => {
          this.tostr.successToastr('Successfully inserted', 'Success')
          this.gotoView()
          this.loader.stop()
        }, (err: Response) => {
          this.loader.stop()
          this.tostr.errorToastr(err.statusText, 'Oops')
        })
    }
  }


}


class CompanyModel {
  name: string
  email: string
  mobile: number
  phoneno: number
  govtid: string
  cityid: number
  typeid: number
  location: string
  address: string
  pincode: number
  constructor({ name, email, mobile, phoneno, govtid, cityid, typeid, location, address, pincode }) {
    this.name = name
    this.email = email
    this.mobile = mobile
    this.phoneno = phoneno
    this.govtid = govtid
    this.cityid = cityid
    this.typeid = typeid
    this.location = location
    this.address = address
    this.pincode = pincode
  }
}




