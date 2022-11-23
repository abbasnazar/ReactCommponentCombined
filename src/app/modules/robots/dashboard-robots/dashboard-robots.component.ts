import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { SearchPipe } from 'app/common/Pipes/search.pipe';
import { TalentService } from 'app/modules/talents/talent.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-dashboard-robots',
  templateUrl: './dashboard-robots.component.html',
  styleUrls: ['./dashboard-robots.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardRobotsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['botid', 'jobdetails', 'mobile', 'name', 'relevance', 'willingness', 'pos', 'company', 'createdon'];

  temp: any = []
  rows: any = [];
  filterObj: any = {}
  accessRight: any = {}
  isLoading: boolean;
  status: string;


  constructor(
    private _talent: TalentService,
    private _search: SearchPipe,
    private route: ActivatedRoute,
    private tostr: ToastrManager,
    private router: Router,
    private loader: AppLoaderService
  ) {
    this.status = this.route.snapshot.paramMap.get("status");
    this.filterObj.sdate = this.route.snapshot.queryParams.sdate
    this.filterObj.edate = this.route.snapshot.queryParams.edate
  }

  ngOnInit(): void {
    this.load()
  }

  ngAfterViewInit() {
    this.rows.paginator = this.paginator;
  }

  load() {
    let params = ''
    if (this.status == 'Pending Right TO Represent')
      params = 'isRTR'
    else if (this.status == 'Right TO Represent Received')
      params = 'isRRR'
    else if (this.status == 'Video Resume Pending')
      params = 'isVRP'
    else if (this.status == 'Video Resume Received (Not Qualified)')
      params = 'isVR'
    else if (this.status == 'Talent Submitted')
      params = 'isTS'
    else if (this.status == 'Submissions Pending (Qualified)')
      params = 'isTSP'
    else
      return

    this.loader.start()
    this._talent.GetTalentDetailByTalentStatus(params, this.filterObj.sdate, this.filterObj.edate).subscribe(
      (resp: Response) => {

        this.temp = resp
        this.temp.forEach(applicant => {
          applicant.status = applicant.issubmited ? 'Submitted' : (applicant.interested && !applicant.isqualified) ? 'Right to Represent' : (applicant.video && applicant.isqualified && !applicant.issubmited) ? 'Qualified' : 'Pending'
        });
        if (this.temp.length == 0)
          this.tostr.errorToastr('No data found', 'Oops')
        this.rows = this.temp;
        this.loader.stop()
        this.getPage()
      }, (err: Response) => {
        this.tostr.errorToastr(err.statusText, 'Oops Something went wrong')
        console.log(err)
        this.loader.stop()
      }
    )
  }

  getPage(e = 0) {
    this.rows = []
    this.rows = this.temp.slice(e * 8, (e + 1) * 8)
  }

  goto(row) {
    sessionStorage.setItem('profile', JSON.stringify(row))
    this.router.navigateByUrl('/robots/robot_profile')
  }

  clickToCall(obj) {
    this.loader.start()
    this.tostr.successToastr('connecting please wait')
    this._talent.shareCallDetails(obj).subscribe(
      (resp: Response) => {
        this.loader.stop()
        this.tostr.successToastr(resp[0].body, 'call connected')

      }, (err: Response) => {
        this.loader.stop()
        this.tostr.errorToastr(err.statusText, 'Oops unable to call');

      }
    )
  }

  persentageCalculation(value) {
    if (!value)
      return '0%'
    else {
      return (Number(value) * 100)
    }
  }

  search() {
    console.log('search======>', this.filterObj.search);

    if (!this.filterObj.search)
      this.rows = this.temp
    else
      this.rows = this._search.transform(this.temp, this.filterObj.search)
  }

  export() {
  }

  openDialog(type, obj = {}): void {
    console.log('modalObj', obj);


  }

}
