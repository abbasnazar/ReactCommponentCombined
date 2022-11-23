import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { SearchPipe } from 'app/common/Pipes/search.pipe';
import { TalentService } from 'app/modules/talents/talent.service';
import moment from 'moment';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-robot-list',
  templateUrl: './robot-list.component.html',
  styleUrls: ['./robot-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RobotListComponent implements OnInit {
  displayedColumns: string[] = ['botid', 'jobid', 'issuedate', 'jobtitle', 'status', 'resumesextracted', 'righttorepresent', 'videoresume', 'qualified', 'submitted', 'actions'];
  rows: any = []
  temp: any = []
  filterObj: any = {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _talent: TalentService,
    // private dialog: MatDialog,
    private _search: SearchPipe,
    private tostr: ToastrManager,
    private route: Router
  ) { }

  ngOnInit(): void {
    console.log('job type is running ...........', this.paginator);
    this.load(1, 'all')
  }

  load(page, type) {
    this.rows = []
    this.temp = []
    if (type == 'all') {
      this.filterObj.sdate = 'all'
      this.filterObj.edate = 'all'
    }
    if (type == 'week') {
      this.filterObj.sdate = moment(new Date()).subtract(7, 'days').format('yyyy-M-D')
      this.filterObj.edate = moment(new Date()).format('yyyy-M-D')
    }
    if (type == 'month') {
      this.filterObj.sdate = moment(new Date()).subtract(1, 'month').format('yyyy-M-D')
      this.filterObj.edate = moment(new Date()).format('yyyy-M-D')
    }
    if (type == 'custom') {
      if (!this.filterObj.startdate)
        return this.tostr.errorToastr('Please select start date', 'Oops')
      if (!this.filterObj.enddate)
        return this.tostr.errorToastr('Please select end date', 'Oops')

      this.filterObj.sdate = moment(this.filterObj.startdate).format('yyyy-M-D')
      this.filterObj.edate = moment(this.filterObj.enddate).format('yyyy-M-D')
    }

    this._talent.talentRequestSummary(this.filterObj.sdate, this.filterObj.edate, page - 1, 'all').subscribe(
      (resp: Response) => {
        this.rows = resp
        this.temp = resp
        console.log(resp);


      }, (err: Response) => {
        console.log(err);

      })
  }

  search() {
    console.log('search======>', this.filterObj.search);

    if (!this.filterObj.search)
      this.rows = this.temp
    else
      this.rows = this._search.transform(this.temp, this.filterObj.search)
  }

  page(e) {
    if (e.index >= 3) {
      this.rows = []
      this.temp = []
      return
    }
    let type = e.index == 0 ? 'all' : e.index == 1 ? 'week' : e.index == 2 ? 'month' : 'no'

    this.load(1, type)

  }

  details(row) {
    console.log(row);
    this.route.navigateByUrl(`/robots/robotdetails?trid=${row.id}`)
  }

  // export() {
  //   let finalList = []
  //   this.rows.forEach(element => {
  //     finalList.push({
  //       Name: element.name,
  //       Createdon: element.createdon
  //     })
  //   });
  //   new ExportCSV(finalList).download('companytype')
  // }

  // openDialog(type, obj = {}): void {
  //   console.log('modalObj', obj);

  //   const dialogRef = this.dialog.open(AddCompanyTypeComponent, {
  //     width: '400px',
  //     data: { obj, title: type, }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result)
  //       this.load()
  //   });
  // }

}
