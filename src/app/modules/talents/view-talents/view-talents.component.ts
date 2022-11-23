import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AppService } from 'app/app.service';
import { AdminService } from 'app/modules/admin/admin.service';
import moment from 'moment';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { ExportCSV } from 'app/common/export';
import { SearchPipe } from 'app/common/Pipes/search.pipe';
import { AccessRight } from 'app/sidebar/sidebar';
import { ToastrManager } from 'ng6-toastr-notifications';
import { TalentService } from '../talent.service';

@Component({
  selector: 'app-view-talents',
  templateUrl: './view-talents.component.html',
  styleUrls: ['./view-talents.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewTalentsComponent implements OnInit {
  rows: any = []
  temp: any = []
  c = ColumnMode
  tableCustomiseButton = false
  filter: any = {}
  filterObj: any = {}
  trid: string;
  @ViewChild('matDrawer', { static: true })
  matDrawer: MatDrawer;
  isOpen: boolean = false
  talentObj: any = {}
  sideData: any = {}
  resumefile: any
  private talentid = null
  metaDataList: any = []
  accessRight: any = {}
  selectedTab: string = 'my';
  tableShowColumn: any = {
    name: false,
    source: false,
    phone: false,
    email: false,
    city: false,
    receivedon: false,
    action: false
  }
  selectedColumn: any = [{ name: 'Name', value: false }, { name: 'Source', value: false }, { name: 'Phone', value: false }, { name: 'Action', value: false }, { name: 'Email', value: false },
  { name: 'City', value: false }, { name: 'Alternate Phone', value: false }, { name: 'Highest Degree', value: false }, { name: 'Experience', value: false }, { name: 'Available From', value: false }]

  exportColumn: any = [{ name: 'Name', key: 'name', value: false }, { name: 'Source', key: 'source', value: false }, { name: 'Phone', key: "mobile", value: false }, { name: 'Email', key: 'email', value: false },
  { name: 'City', key: "currentcity", value: false }, { name: 'Alternate Mobile', key: "alternatemobile", value: false }, { name: 'Highest Degree', key: "highestdegree", value: false }, { name: 'Skills', key: "keyskills", value: false },
  { name: 'Total Experience Year', key: "totalexperienceyear", value: false }, { name: 'Total Experience Month', key: "totalexperiencemonth", value: false }, { name: 'Facebook', key: 'facebook' }, { name: 'Twitter', key: 'twitter' }
    , { name: 'Linkedin', key: 'linkedin' }]


  constructor(
    private _talent: TalentService,
    // private dialog: MatDialog,
    private _search: SearchPipe,
    private tostr: ToastrManager,
    private route: ActivatedRoute,
    private router: Router,
    private access: AccessRight,
    private loader: AppLoaderService,
    private _app: AppService
  ) {
    this.trid = this.route.snapshot.queryParamMap.get('trid')
    this.filter = route.snapshot.queryParams
    this.accessRight = this.access.getAccess()
    let temp = sessionStorage.getItem('talent')
    sessionStorage.removeItem('talent')
    if (temp) {
      let tempObj = JSON.parse(temp)
      this.talentid = tempObj.id
      this.talentObj = tempObj
    }
  }

  ngOnInit(): void {

    this.load()
  }

  getViewMetadata() {
    this.loader.start()
    this._app.getViewMetadata("talents").subscribe(
      (resp: Response) => {
        this.loader.stop()
        if (resp[0].metadata) {
          let list = resp[0].metadata.split(',')
          this.selectedColumn.forEach(element => {
            if (list.indexOf(element.name) >= 0) {
              element.value = true
              this.tableShowColumn[element.name] = true
            }
            else {
              element.value = false
              this.tableShowColumn[element.name] = false
            }
          });
        } else {
          this.selectedColumn.forEach(element => {
            element.value = true
            this.tableShowColumn[element.name] = true
          })
        }

      }, (err: Response) => {
        this.loader.stop()
        console.log(err);

      }
    )
  }

  getFile(file) {
    this.talentObj.filename = file.name
    this.resumefile = file

  }


  // ---------------
  // submit upload resume

//   submit() {
//     console.log('Talent data +====>', this.talentObj);
//     let parse = this.talentObj.filename
//     // let obj = new UploadResumetModel(this.talentObj)
//     let fd = new FormData()
//   if (!this.talentObj.filename && !this.talentObj.id)
//   return this.tostr.errorToastr('Please upload your resume', 'Oops')
// if (this.resumefile) {
//   if (this.resumefile.type.indexOf('pdf') == 1 || this.resumefile.type.indexOf('doc') == 1 || this.resumefile.type.indexOf('docx') == 1) {
//     return this.tostr.errorToastr('Only pdf,doc and docx file allowed', 'Oops')
//   }
//   fd.append('file', this.resumefile)
// }
// if (!this.talentObj.id) {
//   this.loader.start()
//   this._talent.post_resume(fd).subscribe(
//     (resp: Response) => {
//       this.tostr.successToastr('Successfully added', 'Success')
//       this.talentObj = {}
//       this.loader.stop()
//     }, 
//   )
// } else {
//   this.loader.start()
//   this._talent.post_resume(fd).subscribe(
//     // resume parsing api path update-(.post_resume)---------------------------
//     (resp: Response) => {
//       this.tostr.successToastr('Successfully updated', 'Success')
//       this.talentObj = {}
//       this.router.navigate(['/talent/viewtalent'])
//       this.loader.stop()
//     }, (err: Response) => {
//       this.loader.stop()
//       this.tostr.successToastr(err.statusText, 'Oops')
//     }
//   )

// }

// }

// submit upload module check-----------------



 // ---------------
  // submit upload resume

  uploadParse() {
    console.log('Talent data +====>', this.talentObj);

    let obj = new UploadResumeModel(this.talentObj)
    let err = obj.validation()
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


    let fd = new FormData()
    if (this.talentObj.id) {
      obj['id'] = this.talentObj.id
    }
    if (this.resumefile) {
      if (this.resumefile.type.indexOf('pdf') == 1 || this.resumefile.type.indexOf('doc') == 1 || this.resumefile.type.indexOf('docx') == 1) {
        return this.tostr.errorToastr('Only pdf,doc and docx file allowed', 'Oops')
      }
      fd.append('file', this.resumefile)
    }
    if (!this.talentObj.id) {
      this.loader.start()
      this._talent.upldParse(fd).subscribe(
        (resp: Response) => {
          this.tostr.successToastr('Successfully added', 'Success')
          this.talentObj = {}
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
          this.loader.stop()
        }, (err: Response) => {
          this.loader.stop()
          this.tostr.successToastr(err.statusText, 'Oops')
        }
      )

    }

  }
// submit upload module check-----------------

  updateViewMetadata() {
    let selections = []
    this.selectedColumn.forEach(element => {
      // this.tableShowColumn[element.name] = element.value
      if (element.value)
        selections.push(element.name)
    });
    this._app.updateViewMetadata({ name: "talents", metadata: selections.toString() }).subscribe(
      (resp: Response) => {
        console.log(resp);
        this.tostr.successToastr("successfully saved", "Success")
        this.getViewMetadata()

      }, (err: Response) => {
        console.log(err);
        this.tostr.errorToastr(err.statusText, "Error")

      }
    )
  }

  tabSelection(e) {
    if (e.index == 0) {
      this.selectedTab = 'my'
    }
    if (e.index == 1) {
      this.selectedTab = 'all'
    }
    this.load()

  }

  load(page = 1) {
    this.rows = []
    this.loader.start()
    this._talent.get(null, this.selectedTab, this.filter.sdate, this.filter.edate).subscribe(
      (resp: Response) => {
        this.rows = resp
        this.temp = resp
        this.loader.stop()
        console.log("talent", resp[0]);

        this.getViewMetadata()
      }, (err: Response) => {
        console.log(err);
        this.loader.stop()
      }
    )
  }

  copy(text) {
    let at = document.createElement('textarea')
    document.body.appendChild(at)
    at.value = text
    at.select()
    document.execCommand('copy')
    this.tostr.successToastr('copied !!!')
    document.body.removeChild(at)
  }

  getTable() {

    this.selectedColumn.forEach(element => {
      this.tableShowColumn[element.name] = element.value
    });

  }

  getPage(e = 0, pageSize = 5) {
    this.rows = []
    this.rows = this.temp.slice(e * pageSize, (e + 1) * pageSize)
  }

  download(url) {
    if (!url)
      return this.tostr.errorToastr('url not found !!!', 'Oops')
    let a = document.createElement('a')
    a.href = `https://docs.google.com/gview?url=${url}&embedded=true`
    a.target = '__blank'
    a.click()
  }
  parse(){
    // if (!url)
    //   return this.tostr.errorToastr('url not found !!!', 'Oops')
    let a = document.createElement('a')
    // a.href = `http://localhost:3000`
    a.href = `http://34.131.149.30:8000/`

    a.target = '__blank'
    a.click()
  }
  apiParse() {
    console.log('Talent data +====>', this.talentObj);

    // let obj = new UploadResumeModel(this.talentObj)
    // let err = obj.validation()
    if (!this.talentObj.filename && !this.talentObj.id)
      return this.tostr.errorToastr('Please upload your resume', 'Oops')

    // let metadataObj = {}
    // let metaError = ''
    // this.metaDataList.forEach(element => {
    //   if (!metaError) {
    //     if (element.mandatory && element.value)
    //       metaError = `${element.fieldname} is empty`
    //     metadataObj[element.fieldname] = element.value
    //   }
    // });
    // if (metaError)
    //   return this.tostr.errorToastr(metaError, 'Error')

    // obj['metadatajson'] = JSON.stringify(metadataObj)

    let fd = this.resumefile
    // let fd = new FormData()
    // if (this.talentObj.id) {
    //   obj['id'] = this.talentObj.id
    // }
    // if (this.resumefile) {
      // if (this.resumefile.type.indexOf('pdf') == 1 || this.resumefile.type.indexOf('doc') == 1 || this.resumefile.type.indexOf('docx') == 1) {
      //   return this.tostr.errorToastr('Only pdf,doc and docx file allowed', 'Oops')
      // }
      // fd.append('file', this.resumefile)
    console.log("fd-------------------------",fd)
    // }
    // if (!this.talentObj.id) {
      this.loader.start()
      this._talent.apiParse(fd).subscribe(
        (resp: Response) => {
          this.tostr.successToastr('Successfully added', 'Success')
          // this.talentObj = {}
          this.loader.stop()
        }, (err: Response) => {
          this.loader.stop()
          this.tostr.errorToastr(err.statusText, 'Oops')
        }
      )
    // } else {
    //   this.loader.start()
    //   this._talent.update(fd).subscribe(
    //     (resp: Response) => {
    //       this.tostr.successToastr('Successfully updated', 'Success')
    //       this.talentObj = {}
    //       this.loader.stop()
    //     }, (err: Response) => {
    //       this.loader.stop()
    //       this.tostr.successToastr(err.statusText, 'Oops')
    //     }
    //   )

    // }
      // }

  }

  visitUrl(url) {
    if (!url)
      return this.tostr.errorToastr('url not found !!!', 'Oops')
    let a = document.createElement('a')
    a.href = 'http://' + url
    a.target = '__blank'
    a.click()
  }

  persentageCalculation(value) {
    if (!value)
      return '0%'
    else {
      return (Number(value) * 100)
    }
  }

  details(row) {
    // console.log('details', row);
    this.sideData = row

    this.isOpen = true
  }


  search() {

    if (!this.filterObj.search)
      this.rows = this.temp
    else
      this.rows = this._search.transform(this.temp, this.filterObj.search)
  }

  goto(row) {
    if (row.id)
      sessionStorage.setItem('talent', JSON.stringify(row))
    this.router.navigateByUrl('/talent/addtalent')

  }

  profile() {
    sessionStorage.setItem('talentprofile', JSON.stringify(this.sideData))
    this.router.navigateByUrl('/talent/talentprofile')
  }

  exportExcel() {

    let finalList = []
    this.rows.forEach(item => {
      let tempObj = {}
      this.exportColumn.forEach(element => {
        if (element.value)
          tempObj[element.name] = item[element.key] ?? ''
      });
      finalList.push(tempObj)
    });

    new ExportCSV(finalList).download('talents')
  }

}


class UploadResumeModel {
  
  


  constructor({ 
  }) {
    
    

  }
  validation() {
   
    
   

  }
}
