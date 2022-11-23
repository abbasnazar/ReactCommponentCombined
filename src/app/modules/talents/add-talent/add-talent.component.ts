import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { EmailValidation } from 'app/common/emailvalidation';
import { AdminService } from 'app/modules/admin/admin.service';
import moment from 'moment';
import { ToastrManager } from 'ng6-toastr-notifications';
import { TalentService } from '../talent.service';

@Component({
  selector: 'app-add-talent',
  templateUrl: './add-talent.component.html',
  styleUrls: ['./add-talent.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddTalentComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  private talentid = null
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  talentObj: any = {}
  skills: any = []
  selectedSkills: any = []
  sourceList: any = []
  resumefile: any
  metaDataList: any = [];
  constructor(
    private tostr: ToastrManager,
    private router: Router,
    private _talent: TalentService,
    private _admin: AdminService,
    private loader: AppLoaderService
  ) {
    let temp = sessionStorage.getItem('talent')
    sessionStorage.removeItem('talent')
    if (temp) {
      let tempObj = JSON.parse(temp)
      this.talentid = tempObj.id
      this.talentObj = tempObj
      this.selectedSkills = tempObj.keyskills.split(', ')


    }
  }

  ngOnInit(): void {
    this.getSource()
    this._admin.getMetaData('Talents', '1').subscribe(
      (resp: Response) => {
        this.metaDataList = resp
        let metadata = this.talentObj.metadatajson ? JSON.parse(this.talentObj.metadatajson) : {}
        this.metaDataList.forEach(element => {
          element.value = metadata[element.fieldname]
        });

      }
    )
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.selectedSkills.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  getFile(file) {
    this.talentObj.filename = file.name
    this.resumefile = file

  }

  remove(item): void {
    const index = this.selectedSkills.indexOf(item);
    if (index >= 0)
      this.selectedSkills.splice(index, 1);
  }

  getSource() {
    this._talent.getTelentSource().subscribe(
      (resp: Response) => {
        this.sourceList = resp
        console.log('source ', this.sourceList);

      }, (err: Response) => {
        console.log(err);
        console.log(err);
      }
    )
  }


  submit() {
    console.log('Talent data +====>', this.talentObj);

    let obj = new AddTalentModel(this.talentObj)
    let err = obj.validation()
    if (err)
      return this.tostr.errorToastr(err, 'Oops')

    if (this.selectedSkills.length == 0)
      return this.tostr.errorToastr('Please enter your skills', 'Oops')
    if (!this.talentObj.filename && !this.talentObj.id)
      return this.tostr.errorToastr('Please upload your resume', 'Oops')

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

    obj['metadatajson'] = JSON.stringify(metadataObj)

    let keyskills = this.selectedSkills.join(', ')
    let fd = new FormData()
    if (this.talentObj.id) {
      obj['id'] = this.talentObj.id
    }
    fd.append('data', JSON.stringify({ ...obj, keyskills }))
    if (this.resumefile) {
      if (this.resumefile.type.indexOf('pdf') == 1 || this.resumefile.type.indexOf('doc') == 1 || this.resumefile.type.indexOf('docx') == 1) {
        return this.tostr.errorToastr('Only pdf,doc and docx file allowed', 'Oops')
      }
      fd.append('file', this.resumefile)
    }
    if (!this.talentObj.id) {
      this.loader.start()
      this._talent.insert(fd).subscribe(
        (resp: Response) => {
          this.tostr.successToastr('Successfully added', 'Success')
          this.talentObj = {}
          this.selectedSkills = []
          this.router.navigate(['/talent/viewtalent'])
          this.loader.stop()
        }, (err: Response) => {
          this.loader.stop()
          this.tostr.errorToastr(err.statusText, 'Oops')
        }
      )
    } else {
      this.loader.start()
      this._talent.update(fd).subscribe(
        (resp: Response) => {
          this.tostr.successToastr('Successfully updated', 'Success')
          this.talentObj = {}
          this.selectedSkills = []
          this.router.navigate(['/talent/viewtalent'])
          this.loader.stop()
        }, (err: Response) => {
          this.loader.stop()
          this.tostr.successToastr(err.statusText, 'Oops')
        }
      )

    }

  }




  gotoTalentView() {
    this.router.navigateByUrl('/talent/viewtalent')
  }
}

class AddTalentModel {
  name: string = null
  email: string = null
  mobile: number = null
  alternatemobile: number = null
  dateofbirth:string = null
  pan_number:string = null
  currentcity: string = null
  highestdegree: string = null
  totalexperienceyear: number = null
  totalexperiencemonth: number = null
  sourceid: number = null
  keyskills: string = null
  availablefrom: string = null
  workexperience: string = null
  currentcompany: string = null
  facebook: string = null
  linkedin: string = null
  twitter: string = null

  constructor({ name,
    email,
    mobile,
    alternatemobile,
    dateofbirth,
    pan_number,
    currentcity,
    highestdegree,
    totalexperienceyear,
    totalexperiencemonth,
    sourceid,
    availablefrom,
    workexperience,
    currentcompany,
    facebook,
    twitter,
    linkedin
  }) {
    console.log('availablefrom', availablefrom);

    this.name = name
    this.email = email
    this.mobile = mobile
    this.alternatemobile = alternatemobile
    this.pan_number = pan_number
    this.dateofbirth = dateofbirth
    this.currentcity = currentcity
    this.highestdegree = highestdegree
    this.totalexperienceyear = totalexperienceyear
    this.totalexperiencemonth = totalexperiencemonth
    this.sourceid = sourceid
    this.keyskills = ''
    this.availablefrom = availablefrom ? moment(availablefrom).format('yyyy-M-D') : null
    this.workexperience = workexperience
    this.currentcompany = currentcompany
    this.facebook = facebook
    this.twitter = twitter
    this.linkedin = linkedin

  }

  validation() {
    if (!this.name)
      return 'Name field in empty'
    if (!this.email)
      return 'Email field in empty'
    let msg = new EmailValidation().valid(this.email)
    if (msg)
      return msg
    if (!this.mobile)
      return 'Mobile field in empty'
    if (!this.currentcity)
      return 'Please select city'
    if (!this.highestdegree)
      return 'Please enter your highest degree'
    if (this.totalexperienceyear == null || this.totalexperienceyear == undefined)
      return 'Enter experience  min 0'
    if (this.totalexperiencemonth == null || this.totalexperiencemonth == undefined)
      return 'Enter experience min 0'
    if (!this.sourceid)
      return 'Please select source'
    if (!this.availablefrom)
      return 'Please select available from date'

  }
}


