import { Component, OnInit, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { ExportCSV } from 'app/common/export';
import { SearchPipe } from 'app/common/Pipes/search.pipe';
import { TalentService } from 'app/modules/talents/talent.service';
import { AccessRight } from 'app/sidebar/sidebar';
import { ToastrManager } from 'ng6-toastr-notifications';
import { JobDialogComponent } from '../job-dialog/job-dialog.component';
import { JobsService } from '../jobs.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'app/app.service';

@Component({
  selector: 'app-view-jobs',
  templateUrl: './view-jobs.component.html',
  styleUrls: ['./view-jobs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
// export class ViewJobsComponent implements OnInit  {
export class ViewJobsComponent implements AfterViewInit, OnInit {
  rows: any = []
  rows0: any = []
  filter: any = {
  }
  temp: any = []
  data: any = []
  filterObj: any = {}
  isOpen: boolean = false;
  jobDetails: any = { data: [] }
  isLoading: boolean;
  accessRight: any = {}
  selectedTab: string = 'my'
  tableShowColumn: any = {}
  selectedColumn: any = [{ name: 'Job Id', value: false }, { name: 'Issue Date', value: true },
  { name: 'Job Title', value: false }, { name: 'Company Name', value: false }, { name: 'City', value: false },
  { name: 'Created By', value: false }, { name: 'AI Recruiter', value: false }, { name: "Currency", value: false },
  { name: "Address", value: false }, { name: 'Allowed Submittals', value: false }, { name: "Start Date", value: false },
  { name: "End Date", value: false }, { name: "Start Rate", value: false }, { name: "End Rate", value: false },
  { name: "Description", value: false }, { name: 'Exclusion', value: false }, { name: 'Experience', value: false },
  { name: 'Industry Name', value: false }, { name: 'Notice Period', value: false }, { name: 'Openings', value: false }, { name: 'Actions', value: true }]

  exportColumn: any = [{ name: 'Job Id', key: 'id', value: false }, { name: 'Issue Date', key: 'billstartdate', value: false },
  { name: 'Job Title', key: "title", value: false }, { name: 'Company Name', key: 'contactCompanyName', value: false },
  { name: 'City', key: "city", value: false }, { name: 'Created By', key: "createdbyName", value: false },
  { name: 'Address', key: "address", value: false }, { name: 'Skills', key: "skills", value: false },
  { name: 'Description', key: "description", value: false }, { name: 'Experience', key: "experience", value: false },
  { name: "Currency", key: 'currencyName' }, { name: 'Allowed Submittals', key: 'allowedsubmittals' }, { name: "Start Date", key: 'billstartdate' },
  { name: "End Date", key: 'billenddate' }, { name: "Start Rate", key: 'billstartrate' }, { name: "End Rate", key: 'billendrate' },
  { name: "Description", key: 'description' }, { name: 'Exclusion', key: 'exclusion' }, { name: 'Experience', key: 'experience' },
  { name: 'Industry Name', key: 'industryname' }, { name: 'Notice Period', key: 'noticeperiod' }, { name: 'Openings', key: 'openings' }]



  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _jobs: JobsService,
    private dialog: MatDialog,
    private _search: SearchPipe,
    private route: Router,
    private _talent: TalentService,
    private tostr: ToastrManager,
    private access: AccessRight,
    private loader: AppLoaderService,
    private _app: AppService,
    private activeRoute: ActivatedRoute
  ) {
    this.filter = activeRoute.snapshot.queryParams
    // if (this.filter.sdate)
    //   this.selectedTab = 'all'
  }

  ngOnInit(): void {
    this.load()
    this.accessRight = this.access.getAccess()
    console.log('Access ====>', this.accessRight)
  }

  getViewMetadata() {
    this.loader.start()
    this._app.getViewMetadata("jobs").subscribe(
      (resp: Response) => {
        this.loader.stop()
        if (resp[0].metadata) {
          let list = resp[0].metadata.split(',')
          this.selectedColumn.forEach(element => {
            if (list.indexOf(element.name) >= 0) {
              element.value = true
              this.tableShowColumn[element.name] = true
            } else {
              element.value = false
              this.tableShowColumn[element.name] = false
            }
          });
        } else {
          this.selectedColumn.forEach(element => {
            element.value = true
            this.tableShowColumn[element.name] = true

          });
        }

      }, (err: Response) => {
        this.loader.stop()
        console.log(err);

      }
    )
  }

  updateViewMetadata() {
    let selections = []
    this.selectedColumn.forEach(element => {
      // this.tableShowColumn[element.name] = element.value
      if (element.value)
        selections.push(element.name)
    });
    this._app.updateViewMetadata({ name: "jobs", metadata: selections.toString() }).subscribe(
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

  ngAfterViewInit() {
    this.rows.sort = this.sort;
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
    this.temp = []
    this.loader.start()
    this._jobs.getJob(null, this.selectedTab, this.filter.sdate, this.filter.edate).subscribe(
      (resp: any) => {
        console.log(resp[0]);
        // this.rows0 = resp
        if (!this.filter.status) {
          this.temp = resp
        }
        if (this.filter.status == 'success') {
          this.temp = resp.filter(item => (item.status && item.status.trim().toLowerCase() == 'done'))


        }
        if (this.filter.status == 'pending') {
          this.temp = resp.filter(item => !item.status)
        }
        if (this.filter.status == 'failed') {
          this.temp = resp.filter(item => (item.status == 'Failed'))
        }
        this.data = resp
        this.rows = this.temp

        this.loader.stop()
        this.getViewMetadata()
      }, (err: Response) => {
        this.loader.stop()
        console.log(err);
      })
  }

  search() {

    if (!this.filterObj.search)
      this.temp = this.data
    else
      this.temp = this._search.transform(this.data, this.filterObj.search)
    this.getPage(0)
  }

  robotDetails(row) {
    this.jobDetails.title = row.title
    this.jobDetails.contactCompanyName = row.contactCompanyName
    this.isOpen = true
    this.loader.start()
    this._talent.talentRequestSummaryByJobId(row.id).subscribe(
      (resp: Response) => {
        // console.log(resp);
        this.loader.stop()
        this.jobDetails.data = resp
      }, (err: Response) => {
        this.loader.stop()
        console.log(err);
        this.tostr.errorToastr(err.statusText, 'Oops')

      }
    )

  }

  getPage(e = 0, pageSize = 5) {
    this.rows = []
    this.rows = this.temp.slice(e * pageSize, (e + 1) * pageSize)
  }

  goto(botid) {
    console.log('botid', botid);

    // this.route.navigateByUrl('').then(resp => {
    window.open(`#/robots/robotdetails?trid=${botid}`, '__blank')
    // })

  }

  retryTalentRequest(row) {
    if (row.status == 'Done') {
      this.openDialog('Talent Request', row)
    }
    if (row.status == 'Failed') {
      this.openDialog('Retry', { id: row.trid })
    }
  }

  openDialog(type, obj = {}): void {
    console.log('modalObj', obj);

    const dialogRef = this.dialog.open(JobDialogComponent, {
      width: '500px',
      data: { ...obj, title: type, }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load()
        this.isOpen = false
      }
    });
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

    new ExportCSV(finalList).download('jobs')
  }

  addEdit(type, obj = {}) {
    if (type == 'Update') {
      sessionStorage.setItem('jobDetails', JSON.stringify(obj))
    }
    this.route.navigateByUrl('/jobs/addjob')
  }

}
