import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'app/app.service';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { AdminService } from 'app/modules/admin/admin.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CrmService } from '../../crm.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddContactComponent implements OnInit {
  contactObj: any = {}
  cityList: any = [];
  companyList: any = [];
  emailOptionList: any = []
  selectedEmailOption: any = [];
  metaDataList: any = [];
  constructor(
    private _crm: CrmService,
    private tostr: ToastrManager,
    private route: Router,
    private _admin: AdminService,
    private loader: AppLoaderService,
    private _app: AppService
  ) {
    this.emailOptionList = _app.emailOptions
    let temp = sessionStorage.getItem('contact')
    sessionStorage.removeItem('contact')
    if (temp)
      this.contactObj = JSON.parse(temp)
    this.selectedEmailOption = this.contactObj.emailoption ? this.contactObj.emailoption.split(',') : []
  }

  ngOnInit(): void {
    this.getCity()
    this.getCompany()
    this._admin.getMetaData('Contact', '1').subscribe(
      (resp: Response) => {
        this.metaDataList = resp
        let metadata = this.contactObj.metadatajson ? JSON.parse(this.contactObj.metadatajson) : {}
        this.metaDataList.forEach(element => {
          element.value = metadata[element.fieldname]
        });

      }
    )
  }

  submit() {
    if (!this.contactObj.name)
      return this.tostr.errorToastr('Please enter name', 'Oops')
    if (!this.contactObj.email)
      return this.tostr.errorToastr('Please enter email', 'Oops')
    if (!this.contactObj.mobile)
      return this.tostr.errorToastr('Please enter mobile', 'Oops')
    if (!this.contactObj.cityid)
      return this.tostr.errorToastr('Please enter city', 'Oops')
    if (this.selectedEmailOption.length > 0)
      this.contactObj.emailoption = this.selectedEmailOption.toString()

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

    let obj = new ContactModel(this.contactObj)

    obj['metadatajson'] = JSON.stringify(metadataObj)

    if (this.contactObj.id) {
      this.loader.start()
      this._crm.updateContacts({ ...obj, id: this.contactObj.id })
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
      this._crm.insertContacts(obj)
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

  getCity() {
    this._admin.getCity().subscribe(
      (resp: Response) => {
        this.cityList = resp
      }, (err: Response) => {
        console.log(err);

      }
    )
  }

  getCompany() {
    this._crm.getCompanies(0).subscribe(
      (resp: Response) => {
        this.companyList = resp
      }, (err: Response) => {
        console.log(err);

      }
    )
  }


  gotoView() {
    this.route.navigateByUrl('/crm/contact')
  }

}

class ContactModel {
  id: number
  name: string
  mobile: number
  email: string
  telephone: number
  contactcompanyid: number
  cityid: number
  address: string
  pincode: string
  emailoption: string
  constructor({ id, name, mobile, email, telephone, contactcompanyid, cityid, address, pincode, emailoption }) {
    this.id = id
    this.name = name
    this.mobile = mobile
    this.email = email
    this.telephone = telephone
    this.contactcompanyid = contactcompanyid
    this.cityid = cityid
    this.address = address
    this.pincode = pincode
    this.emailoption = emailoption
  }
}
