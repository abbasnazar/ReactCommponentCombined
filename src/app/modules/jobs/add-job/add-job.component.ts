import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { AdminService } from 'app/modules/admin/admin.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { JobsService } from '../jobs.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import moment from 'moment';
import { Router } from '@angular/router';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddJobComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  private jobid = null
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  positionList: any = []
  selectedPrimarySkills: any = []
  experienceLevelList: any = []
  selectedOtherSkills: any = []
  selectedExclusions: any = []
  selectedLocationList: any = []
  companyList: any = []
  cityList: any = []
  industryDropdown: any = []
  jobType: any = []
  job: any = {}
  noticePeriodList: any = ['15 Days', '1 month', '2 months', '3 months', 'more than 3 months',"Currently Serving Noticeperiod"]
  currencyList: any = []
  metaDataList: any = [];
  city: any = [];
  locationSettings = {
    singleSelection: false,
    idField: 'name',
    textField: 'name',
    itemsShowLimit: 4,
    allowSearchFilter: true,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableCheckAll: true,
    limitSelection: 4
  };
  constructor(
    private _admin: AdminService,
    private _job: JobsService,
    private tostr: ToastrManager,
    private router: Router,
    private loader: AppLoaderService
  ) {
    let temp = sessionStorage.getItem('jobDetails')
    sessionStorage.removeItem('jobDetails')
    if (temp) {
      let tempObj = JSON.parse(temp)
      this.jobid = tempObj.id
      this.job = tempObj
      let requirementsList = this.job.requirements.split(',')
      requirementsList.forEach(element => {
        if (element)
          this.job[element.toLowerCase()] = true;
      });
      this.selectedPrimarySkills = this.job.mainskills ? this.job.mainskills.split(', ').map(i => { return { name: i } }) : []
      this.selectedOtherSkills = this.job.skills ? this.job.skills.split(', ').map(i => { return { name: i } }) : []
      this.selectedExclusions = this.job.exclusion ? this.job.exclusion.split(', ').map(i => { return { name: i } }) : []
      this.selectedLocationList = [{ name: this.job.city }]
      this.locationSettings.singleSelection = true
    }
    console.log('job location', this.job.location);

  }

  ngOnInit(): void {
    this.loadPosition()
    this.getDropdownCompanyPersonAndContact()
    this.getCiry()
    this.getIndustryDropdown()
    this.getJobType()
    this.GetExperienceLevel()
    this.GetCurrencies()
    this.loader.start()
    this._admin.getMetaData('jobs', '1').subscribe(
      (resp: Response) => {
        this.loader.stop()
        this.metaDataList = resp
        let metadata = this.job.metadatajson ? JSON.parse(this.job.metadatajson) : {}
        this.metaDataList.forEach(element => {
          element.value = metadata[element.fieldname]
        });

      }, (err: Response) => {
        this.loader.stop()
      }
    )
  }

  loadPosition() {
    this._admin.getPositionType().subscribe(
      (resp: Response) => {
        this.positionList = resp
        console.log('position', resp);

      }, (err: Response) => {
        console.log(err);

      }
    )
  }

  GetExperienceLevel() {
    this._admin.getExperienceLevel().subscribe(
      (resp: Response) => {
        this.experienceLevelList = resp
      }, (err: Response) => {
        console.log(err);
      }
    )
  }

  GetCurrencies() {
    this._admin.getCurriencies().subscribe(
      (resp: Response) => {
        this.currencyList = resp
      }, (err: Response) => {
        console.log(err);
      }
    )
  }

  add(event: MatChipInputEvent, type: string): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      if (type == 'primary')
        this.selectedPrimarySkills.push({ name: value });
      if (type == 'other')
        this.selectedOtherSkills.push({ name: value });
      if (type == 'exclusions')
        this.selectedExclusions.push({ name: value });
    }

    // Clear the input value
    event.input.value = ''
  }

  remove(item, type): void {

    if (type == 'primary') {
      const index = this.selectedPrimarySkills.indexOf(item);
      if (index >= 0)
        this.selectedPrimarySkills.splice(index, 1);
    }
    if (type == 'other') {
      const index = this.selectedOtherSkills.indexOf(item);
      if (index >= 0)
        this.selectedOtherSkills.splice(index, 1);
    }
    if (type == 'exclusions') {
      const index = this.selectedExclusions.indexOf(item);
      if (index >= 0)
        this.selectedExclusions.splice(index, 1);
    }
    // this.skills.splice(index, 1);

  }

  submit() {
    console.log(this.metaDataList);

    let obj = new AddJobModel(this.job)

    let err = obj.validation()
    if (err)
      return this.tostr.errorToastr(err, 'Error')

    if (this.selectedPrimarySkills.length > 0)
      obj.mainskills = this.selectedPrimarySkills.map(i => i.name).join(', ')
    if (this.selectedOtherSkills.length > 0)
      obj.skills = this.selectedOtherSkills.map(i => i.name).join(', ')
    if (this.selectedExclusions.length > 0)
      obj.exclusion = this.selectedExclusions.map(i => i.name).join(', ')

    let metadataObj = {}
    let metaError = ''
    this.metaDataList.forEach(element => {
      if (!metaError) {
        if (element.mandatory && !element.value)
          metaError = `${element.fieldname} is empty`
        metadataObj[element.fieldname] = element.value
      }
    });
    if (metaError)
      return this.tostr.errorToastr(metaError, 'Error')

    obj['metadatajson'] = JSON.stringify(metadataObj)

    if (this.jobid) {
      if (this.selectedLocationList.length > 0) {
        obj.city = this.selectedLocationList[0].name
      }
      this.loader.start()
      obj['id'] = this.jobid
      this._job.UpdateJob(obj).subscribe(
        (resp: Response) => {
          this.loader.stop()
          this.job = {}
          this.tostr.successToastr('Successfully updated', 'Success')
          this.gotoJobView()
        }, (err: Response) => {
          console.log(err);
          this.loader.stop()
          this.tostr.errorToastr(err.statusText, 'Error')
        }
      )
    } else {
      if (this.selectedLocationList.length > 0) {
        obj.city = this.selectedLocationList
      }
      this.loader.start()
      this._job.InsertJob(obj).subscribe(
        (resp: Response) => {
          this.loader.stop()
          this.job = {}
          this.tostr.successToastr('Successfully added', 'Success')
          this.gotoJobView()
        }, (err: Response) => {
          this.loader.stop()
          console.log(err);

          this.tostr.errorToastr(err.statusText, 'Error')
        }
      )
    }
  }

  getDropdownCompanyPersonAndContact() {
    this._admin.getDropdownCompanyPersonAndContact()
      .subscribe(
        (resp: Response) => {
          this.companyList = resp
          console.log('cp', resp);
        }, (err: Response) => {
          console.log(err);
        }
      )
  }

  getAddress() {
    let contactPersonDetails = this.companyList.filter(item => item.contactPersonId == this.job.contactpersonid)[0]
    this.job.address = (contactPersonDetails.address ? contactPersonDetails.address : '') + (contactPersonDetails.contactPersonCity ? (',' + contactPersonDetails.contactPersonCity) : '')
  }

  getCiry() {
    this._admin.getCity().subscribe(
      (resp: Response) => {
        this.cityList = resp
        // console.log(resp);

      }, (err: Response) => {
        console.log(err);
      }
    )
  }

  gotoJobView() {
    this.router.navigateByUrl('/jobs/viewjobs')
  }

  getIndustryDropdown() {
    this._admin.getDropdownIndustry().subscribe(
      (resp: Response) => {
        this.industryDropdown = resp
        // console.log(resp);

      }, (err: Response) => {
        console.log(err);
      }
    )
  }

  getJobType() {
    this._admin.getJobType().subscribe(
      (resp: Response) => {
        this.jobType = resp
        // console.log(resp);

      }, (err: Response) => {
        console.log(err);
      }
    )
  }
}


class AddJobModel {
  title: string;
  reference: string;
  description: string;
  role;
  status;
  priority;
  contactcompanyid;
  contactpersonid;
  address;
  city;
  prefloc;
  currencyid;
  billstartrate;
  billendrate;
  paystartrate;
  payendrate;
  openings;
  allowedsubmittals;
  experiencelevel;
  noticeperiod;
  positiontype;
  billstartdate;
  billenddate;
  industryname;
  industrydomain;
  // ot;
  // references;
  // travel;
  // drugtest;
  // backgroundcheck;
  // securityclearance;
  requirements
  skills;
  mainskills;
  exclusion
  constructor({
    title,
    reference,
    description,
    role,
    status,
    priority,
    contactcompanyid,
    contactpersonid,
    address,
    location,
    prefloc,
    currencyid,
    billstartrate,
    billendrate,
    paystartrate,
    payendrate,
    openings,
    allowedsubmittals,
    experiencelevel,
    noticeperiod,
    positiontype,
    billstartdate,
    billenddate,
    ot,
    references,
    travel,
    drugtest,
    backgroundcheck,
    securityclearance,
    industryname,
    industrydomain,

  }) {
    this.title = title
    this.reference = reference
    this.description = description
    this.role = role
    this.status = status
    this.priority = priority
    this.contactcompanyid = contactcompanyid
    this.contactpersonid = contactpersonid
    this.address = address
    this.city = ''
    this.prefloc = prefloc
    this.currencyid = currencyid
    this.billstartrate = billstartrate
    this.billendrate = billendrate
    this.paystartrate = paystartrate
    this.payendrate = payendrate
    this.openings = openings
    this.allowedsubmittals = allowedsubmittals
    this.experiencelevel = experiencelevel
    this.noticeperiod = noticeperiod
    this.positiontype = positiontype
    this.billstartdate = moment(billstartdate).format('yyyy-M-D')
    this.billenddate = moment(billenddate).format('yyyy-M-D')

    // this.ot = ot
    // this.references = references
    // this.travel = travel
    // this.drugtest = drugtest
    // this.backgroundcheck = backgroundcheck
    // this.securityclearance = securityclearance
    this.skills = ''
    this.mainskills = ''
    this.exclusion = ''
    this.industryname = industryname
    this.industrydomain = industrydomain
    this.role = role
    let tempRequirement = []
    if (ot)
      tempRequirement.push('ot')
    if (reference)
      tempRequirement.push('reference')
    if (travel)
      tempRequirement.push('travel')
    if (drugtest)
      tempRequirement.push('drugTest')
    if (backgroundcheck)
      tempRequirement.push('backgroundCheck')
    if (securityclearance)
      tempRequirement.push('securityClearance')

    this.requirements = tempRequirement.join(',')
  }

  validation() {
    if (this.billstartdate && this.billenddate) {
      if (new Date(this.billstartdate) > new Date(this.billenddate))
        return 'Start date can not be greater than end date'
    }
    if (!this.title)
      return 'Please enter title'
    if (!this.role)
      return 'Please select positiontype '
    if (!this.status)
      return 'Please select status '
    if (!this.priority)
      return 'Please select priority '
    if (!this.contactcompanyid)
      return 'Please select contact company'
    if (!this.contactpersonid)
      return 'Please select contact person'
    if (!this.address)
      return 'Please enter address'
    if (this.billstartrate == null || this.billstartrate == undefined)
      return 'Please enter bill star trate'
    if (this.billstartrate < 0)
      return 'Negative billrate not allowed'
    if (this.billendrate == null || this.billendrate == undefined)
      return 'Please enter bill end rate'
    if (this.billendrate < 0)
      return 'Negative bill start rate not allowed'
    if (this.paystartrate == null || this.paystartrate == undefined)
      return 'Please enter pay start rate'
    if (this.paystartrate < 0)
      return 'Negative paystartrate not allowed'
    if (this.payendrate == null || this.payendrate == undefined)
      return 'Please enter pay end rate'
    if (this.payendrate < 0)
      return 'Negative pay end rate not allowed'
    if (!this.currencyid)
      return 'Please select currency type'
    if (!this.openings)
      return 'Please enter openings'
    if (this.openings < 0)
      return 'Negative opening not allowed'
    if (!this.allowedsubmittals)
      return 'Please enter allowed submittals'
    if (this.allowedsubmittals < 0)
      return 'Negative submittals not allowed'
    if (!this.experiencelevel)
      return 'Please enter experience level'
    if (!this.requirements)
      return 'Please select requirements'

  }

}
