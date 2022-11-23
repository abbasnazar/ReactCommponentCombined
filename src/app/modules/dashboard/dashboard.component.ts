import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from 'app/app.service';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import moment from 'moment';
import { ApexOptions } from 'ng-apexcharts';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DashboardDialogComponent } from './dashboard-dialog/dashboard-dialog.component';
import { DashboardService } from './dashboard.service';

let currentYear = new Date().getFullYear()

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  jobChart: any
  submissionChart: any
  addedJobChart: any
  jobAddedVsSunmissionChart: any
  teamWiseJobChart: any
  teamWiseTalentExtractedVsClickToCall: any
  teamWiseTalentExtractedVsRightToRepresentChart: any
  teamWiseTalentExtractedVsVideoUploaded: any
  teamWiseTalentExtractedVsTalentsQualified: any
  clientWiseJobChart: any
  clientWiseTalentExtractedVsClickToCall: any
  clientWiseTalentExtractedVsRightToRepresentChart: any
  clientWiseTalentExtractedVsVideoUploaded: any
  clientWiseTalentExtractedVsTalentsQualified: any
  locationWiseJobChart: any
  experienceWiseJobChart: any
  industryWiseJobChart: any
  locationWiseTalentChart: any
  experienceWiseTalentChart: any
  industryWiseTalentChart: any
  afterStat: any = {}
  beforeStat: any = {}
  talentChart: any
  jobPrimarySkills: any
  stat: any = {}
  rows: any = []
  showItem: any = {}
  buttonActive: string = "today"
  customDate: any = {
    sdate: new Date(),
    edate: new Date()
  }
  startDate: string = ''
  endDate: string = ''
  beforeName: string = ''
  locationWiseJobChartloading = true;
  experienceWiseJobChartloading = true;
  industryWiseJobChartloading= true;
  jobAddedVsSunmissionChartloading=true;
  jobPrimarySkillsloading=true;
  addedJobChartloading = true;
  talentChartloading = true;
  locationWiseTalentChartloading=true
  experienceWiseTalentChartloading=true
  industryWiseTalentChartloading=true
  submissionChartloading=true
  teamWiseJobChartloading=true
  teamWiseTalentExtractedVsClickToCallloading=true
  teamWiseTalentExtractedVsRightToRepresentChartloading=true
  teamWiseTalentExtractedVsVideoUploadedloading=true
  teamWiseTalentExtractedVsTalentsQualifiedloading=true
  clientWiseJobChartloading=true
  clientWiseTalentExtractedVsClickToCallloading=true
  clientWiseTalentExtractedVsRightToRepresentChartloading=true
  clientWiseTalentExtractedVsVideoUploadedloading=true
  clientWiseTalentExtractedVsTalentsQualifiedloading=true

  yearList = [];
  selectedYear: any = {
    submission: currentYear,
    talents: currentYear,
    ai: currentYear,
    team: currentYear,
    'job/submission': currentYear,
    'jobbyloc': currentYear,
    'jobbyexp': currentYear,
    'jobbyind': currentYear,
    'talentbyloc': currentYear,
    'talentbyexp': currentYear,
    'talentbyind': currentYear,
  }
  constructor(
    private _dashboard: DashboardService,
    private route: Router,
    private _app: AppService,
    private tostr: ToastrManager,
    private loader: AppLoaderService,
    private dialog: MatDialog,
  ) {

    for (let i = 0; i < 10; i++) {
      this.yearList.push(currentYear - i)
      if ((currentYear - i) == 2020)
        break
    }
  }

  ngOnInit(): void {
    // this._prepareChartDataForJob();
    // this._prepareChartDataForTalent();
    this.getViewMetadata()
    this.loadStatForAdmin()
    // this.loadStat()
    
  }

  goto(type, count) {
    console.log('goto url ', type);
    if (!count)
      return

    let url = ''
    if (type == 'jobadded') {
      url = `/jobs/viewjobs?sdate=${this.startDate}&edate=${this.endDate}`
      this.route.navigateByUrl(`${url}`)
    }
    if (type == 'jobsuccess') {
      url = `/jobs/viewjobs?sdate=${this.startDate}&edate=${this.endDate}&status=success`
      this.route.navigateByUrl(`${url}`)
    }
    if (type == 'jobfailed') {
      url = `/jobs/viewjobs?sdate=${this.startDate}&edate=${this.endDate}&status=failed`
      this.route.navigateByUrl(`${url}`)
    }
    if (type == 'jobpending') {
      url = `/jobs/viewjobs?sdate=${this.startDate}&edate=${this.endDate}&status=pending`
      this.route.navigateByUrl(`${url}`)
    }
    if (type == 'prp') {
      url = `/robots/bystatus/${escape('Pending Right TO Represent')}?sdate=${this.startDate}&edate=${this.endDate}&status=Done`
      this.route.navigateByUrl(`${url}`)
    }
    if (type == 'rrr') {
      url = `/robots/bystatus/${escape('Right TO Represent Received')}?sdate=${this.startDate}&edate=${this.endDate}&status=Done`
      this.route.navigateByUrl(`${url}`)
    }
    if (type == 'vrp') {
      url = `/robots/bystatus/${escape('Video Resume Pending')}?sdate=${this.startDate}&edate=${this.endDate}&status=Done`
      this.route.navigateByUrl(`${url}`)
    }
    if (type == 'vrr') {
      url = `/robots/bystatus/${escape('Video Resume Received (Not Qualified)')}?sdate=${this.startDate}&edate=${this.endDate}&status=Done`
      this.route.navigateByUrl(`${url}`)
    }
    if (type == 'submitted') {
      url = `/robots/bystatus/${escape('Talent Submitted')}?sdate=${this.startDate}&edate=${this.endDate}&status=Done`
      this.route.navigateByUrl(`${url}`)
    }
    if (type == 'qualified') {
      url = `/robots/bystatus/${escape('Submissions Pending (Qualified)')}?sdate=${this.startDate}&edate=${this.endDate}&status=Done`
      this.route.navigateByUrl(`${url}`)
    }
    if (type == 'talentfound') {
      url = `/talent/viewtalent?sdate=${this.startDate}&edate=${this.endDate}`
      this.route.navigateByUrl(`${url}`)
    }
  }

  load(type) {
    this.loader.start()
    this.buttonActive = type
    // this.loadStat()
    this.loadStatForAdmin()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DashboardDialogComponent, {
      width: '900px',
      data: { showItem: this.showItem, title: "Dashboard Setting", }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("refresh metadata");

        this.getViewMetadata()
      }
    });
  }

  // getChart(type) {
  //   if (type == 'submission')
  //     this.getAdminSubmissionChart()
  //   if (type == 'talents')
  //     this.getAdminTalentChart()
  //   if (type == 'ai')
  //     this.getAdminAdddedJobChart()
  //   if (type == 'job/submission')
  //     this.getAdminJobAddedVsSubmissionChart()
  //   if (type == 'team')
  //     this.getAdminTeamWiseJobChart()
  //   if (type == 'jobbyloc')
  //     this.getLocationWiseJobChart()
  //   if (type == 'jobbyexp')
  //     this.getExperienceWiseJobChart()
  //   if (type == 'jobbyind')
  //     this.getIndustryWiseJobChart()
  //   if (type == 'talentbyloc')
  //     this.getLocationWiseTalentChart()
  //   if (type == 'talentbyexp')
  //     this.getExperienceWiseTalentChart()
  //   if (type == 'talentbyind')
  //     this.getIndustryWiseTalentChart()
  // }

  // loadStat() {
  //   this._dashboard.getStats().subscribe(
  //     (resp: any) => {
  //       if (resp.length > 0) {
  //         // console.log(resp);
  //         this.stat.jobAdded = resp[0].JobsAdded.jobscount
  //         this.stat.totalTalents = resp[0].RoboticsTalentCount.totaltalents
  //         this.stat.pendingJobs = resp[0].talentPendingCount.pendingjobs
  //         this.stat.failedJobs = resp[0].talentCount.failed
  //         let tempRobot = resp[0].RoboticsTalentCount ? resp[0].RoboticsTalentCount : {}
  //         let tempList = []
  //         tempList.push({
  //           name: 'Pending Right TO Represent',
  //           value: tempRobot.totaltalents - tempRobot.RTR
  //         })
  //         tempList.push({
  //           name: 'Video Resume Received (Not Qualified)',
  //           value: tempRobot.isvideo - tempRobot.qualified
  //         })
  //         tempList.push({
  //           name: 'Video Resume Pending',
  //           value: tempRobot.RTR - tempRobot.isvideo
  //         })
  //         tempList.push({
  //           name: 'Talent Submitted',
  //           value: tempRobot.submitted
  //         })
  //         tempList.push({
  //           name: 'Submissions Pending (Qualified)',
  //           value: tempRobot.qualified - tempRobot.submitted
  //         })
  //         this.rows = tempList

  //         console.log(this.rows);

  //       }

  //     }
  //   )
  // }

  loadStatForAdmin() {
    let sdate, edate, oldsdate, oldedate
    let d = new Date()
    if (this.buttonActive == 'today') {
      edate = moment().format('YYYY-MM-DD')
      sdate = moment().format('YYYY-MM-DD')
      oldedate = moment().subtract(1, 'd').format('YYYY-MM-DD')
      oldsdate = moment().subtract(1, 'd').format('YYYY-MM-DD')
      this.beforeName = 'Yesterday'
    }
    if (this.buttonActive == 'week') {
      this.beforeName = 'Last Week'
      edate = moment().format('YYYY-MM-DD')
      sdate = moment().subtract(d.getDay(), 'd').format('YYYY-MM-DD')
      oldedate = moment().subtract(d.getDay() + 1, 'd').format('YYYY-MM-DD')
      oldsdate = moment().subtract(d.getDay() + 7, 'd').format('YYYY-MM-DD')
    }
    if (this.buttonActive == 'month') {
      this.beforeName = 'Last Month'
      edate = moment().subtract(1, 'd').format('YYYY-MM-DD')
      sdate = moment().subtract(1, 'months').format('YYYY-MM-DD')
      oldedate = moment(sdate).subtract(1, 'd').format('YYYY-MM-DD')
      oldsdate = moment(sdate).subtract(1, 'months').format('YYYY-MM-DD')
    }

    if (this.buttonActive == '3months') {
      this.beforeName = 'Past 3 Month'
      edate = moment().subtract(1, 'd').format('YYYY-MM-DD')
      sdate = moment().subtract(3, 'months').format('YYYY-MM-DD')
      oldedate = moment(sdate).subtract(1, 'd').format('YYYY-MM-DD')
      oldsdate = moment(sdate).subtract(3, 'months').format('YYYY-MM-DD')
    }
    if (this.buttonActive == '6months') {
      this.beforeName = 'Past 6 Month'
      edate = moment().subtract(1, 'd').format('YYYY-MM-DD')
      sdate = moment().subtract(6, 'months').format('YYYY-MM-DD')
      oldedate = moment(sdate).subtract(1, 'd').format('YYYY-MM-DD')
      oldsdate = moment(sdate).subtract(6, 'months').format('YYYY-MM-DD')
    }
    if (this.buttonActive == 'year') {
      this.beforeName = 'Past Year'
      edate = moment().subtract(1, 'd').format('YYYY-MM-DD')
      sdate = moment().subtract(1, 'year').format('YYYY-MM-DD')
      oldedate = moment(sdate).subtract(1, 'd').format('YYYY-MM-DD')
      oldsdate = moment(sdate).subtract(1, 'years').format('YYYY-MM-DD')
    }
    if (this.buttonActive == 'custom') {
      this.beforeName = 'Custom'
      edate = moment(this.customDate.edate).format('YYYY-MM-DD')
      sdate = moment(this.customDate.sdate).format('YYYY-MM-DD')
    }
    console.log("date =====", sdate, edate);
    this.startDate = sdate
    this.endDate = edate
    this._dashboard.getAdminStats({ sdate, edate}).subscribe(
      (resp: Response) => {
        this.loader.stop()
        console.log('admin stat data =======>', resp);
        this.afterStat = resp[0].current
        this.beforeStat = resp[0].before
      }, (err: Response) => {
        console.log(err);
        this.loader.stop()
      }
    )
    this.getJobChartData(this.startDate,this.endDate)
    this.getTalentChartData(this.startDate,this.endDate)
    this.getAdminSubmissionChart(this.startDate,this.endDate)
    this.getAdminTalentChart(this.startDate,this.endDate)
    this.getAdminAdddedJobChart(this.startDate,this.endDate)
    this.getAdminJobAddedVsSubmissionChart(this.startDate,this.endDate)
    this.getAdminTeamWiseJobChart(this.startDate,this.endDate)
    this.getAdminTeamWiseTalentExtractedVsClickToCall(this.startDate,this.endDate)
    this.getAdminTeamWiseTalentExtractedVsRightToRepresent(this.startDate,this.endDate)
    this.getAdminTeamWiseTalentExtractedVsVideoUploaded(this.startDate,this.endDate)
    this.getAdminTeamWiseTalentExtractedVsTalentsQualified(this.startDate,this.endDate)
    this.getAdminClientWiseJobChart(this.startDate,this.endDate)
    this.getAdminClientWiseTalentExtractedVsClickToCall(this.startDate,this.endDate)
    this.getAdminClientWiseTalentExtractedVsRightToRepresent(this.startDate,this.endDate)
    this.getAdminClientWiseTalentExtractedVsVideoUploaded(this.startDate,this.endDate)
    this.getAdminClientWiseTalentExtractedVsTalentsQualified(this.startDate,this.endDate)
    this.getLocationWiseJobChart(this.startDate,this.endDate)
    this.getExperienceWiseJobChart(this.startDate,this.endDate)
    this.getIndustryWiseJobChart(this.startDate,this.endDate)
    this.getLocationWiseTalentChart(this.startDate,this.endDate)
    this.getExperienceWiseTalentChart(this.startDate,this.endDate)
    this.getIndustryWiseTalentChart(this.startDate,this.endDate)
  }

  statCalculation(after, before) {
    let result = ''


    if (this.beforeName == 'Custom')
      return this.beforeName
    let value = after - before
    if (value > 0)
      result += value + ' More Than ' + this.beforeName
    if (value < 0)
      result += (value * -1) + ' Less Than ' + this.beforeName
    if (value == 0)
      result += ' Equal To ' + this.beforeName

    return result
  }

  getViewMetadata() {

    this.loader.start()
    this._app.getViewMetadata("dashboard").subscribe(
      (resp: Response) => {
        this.loader.stop()
        console.log(resp);
        
        if (resp[0].metadata) {
          this.showItem = {}
          let list = resp[0].metadata.split(',')
          list.forEach(element => {
            this.showItem[element] = true
          });
        }
        // if (resp[0].metadata) {
        //   let list = resp[0].metadata.split(',')
        //   this.selectedColumn.forEach(element => {
        //     if (list.indexOf(element.name) >= 0) {
        //       element.value = true
        //       this.showItem[element.name] = true
        //     } else {
        //       element.value = false
        //       this.showItem[element.name] = false
        //     }
        //   });
        // } else {
        //   this.selectedColumn.forEach(element => {
        //     element.value = true
        //     this.showItem[element.name] = true

        //   });
        // }

      }, (err: Response) => {
        this.loader.stop()
        console.log(err);

      }
    )
  }

  getJobChartData(sdate,edate) {
    this.jobPrimarySkillsloading=true
    this._dashboard.getJobChart({sdate,edate}).subscribe(
      (resp: any) => {
        let data1 = []
        let data2 = []

        resp.forEach(element => {
          data1.push({
            x: element.months,
            y: element.jobsadded
          })
          data2.push({
            x: element.months,
            y: element.jobsdone
          })
        });
        // this.jobChart = this._prepareLineChartData([{ name: 'Added Jobs', data: data1 }, { name: 'Done Jobs', data: data2 }])
        this.jobPrimarySkills = this._prepareBarChartData([{ name: 'Added Jobs', data: data1 }])
        this.jobPrimarySkillsloading=false
      }
    )
  }

  getTalentChartData(sdate,edate) {
    this.talentChartloading=true
    this._dashboard.getTalentChart({sdate,edate}).subscribe(
      (resp: any) => {
        console.log('talent', resp);

        let data1 = []
        let data2 = []

        resp.forEach(element => {
          data1.push({
            x: element.months,
            y: element.submittals
          })
          data2.push({
            x: element.months,
            y: element.talentCount
          })
        });
        this.talentChart = this._prepareLineChartData([{ name: 'Submittals', data: data1 }, { name: 'Talent Count', data: data2 }])
        this.talentChartloading=false
      }
    )
  }

  getAdminSubmissionChart(sdate,edate) {
    this.submissionChartloading=true
    this._dashboard.getAdminSubmissionChart({sdate,edate}).subscribe(
      (resp: Response) => {
        this.submissionChart = this._prepareLineChartData([{ name: 'Submission', data: resp[0]['submission'] }], resp[0]['label'])
        this.submissionChartloading=false
      }
    )
  }

  getAdminTalentChart(sdate,edate) {
    this.talentChartloading=true
    this._dashboard.getAdminTalentChart({sdate,edate}).subscribe(
      (resp: Response) => {
        this.talentChart = this._prepareLineChartData([
          { name: 'Requested', data: resp[0]['talentRequest'] },
          { name: 'Found', data: resp[0]['talentFound'] },
          { name: 'R2R Pndg', data: resp[0]['r2rPending'] },
          { name: 'R2R Rcvd', data: resp[0]['r2rDone'] },
          { name: 'Video Pndg', data: resp[0]['videoPending'] },
          { name: 'Video Rcvd', data: resp[0]['videoDone'] },
          { name: 'Submitted', data: resp[0]['submissionDone'] },
          { name: 'Qualified', data: resp[0]['qualified'] },
        ],
          resp[0]['label'])
          this.talentChartloading=false
      }
    )
  }

  getAdminAdddedJobChart(sdate,edate) {
    this.addedJobChartloading=true
    this._dashboard.getAdminAddedJobChart({sdate,edate}).subscribe(
      (resp: Response) => {
        this.addedJobChart = this._prepareLineChartData([{ name: 'Added Job', data: resp[0]['data'] }], resp[0]['label'])
        this.addedJobChartloading=false
      }
    )
  }

  getAdminJobAddedVsSubmissionChart(sdate,edate) {
   this.jobAddedVsSunmissionChartloading=true
    this._dashboard.getAdminJobAddedVsSubmissionChart({sdate,edate}).subscribe(
      (resp: Response) => {
        this.jobAddedVsSunmissionChart = this._prepareBarChartData([{ name: 'Added Job', data: resp[0]['jobadded'] }, { name: 'Submission', data: resp[0]['submission'] }], resp[0]['label'])
        this.jobAddedVsSunmissionChartloading=false
      }
    )
  }

  getAdminTeamWiseJobChart(sdate,edate) {
      this.teamWiseJobChartloading=true
      this._dashboard.getAdminTeamWiseJobChart({sdate,edate}).subscribe(
      (resp: Response) => {        
        // this.teamWiseJobChart = this._prepareBarChartData([{ name: 'Added Job', data: resp[0]['addedJob'] }, { name: 'Resume', data: resp[0]['resume'] }, { name: 'Submission', data: resp[0]['submission'] }], resp[0]['label'])
        this.teamWiseJobChart = this._prepareBarChartData([{ name: 'Added Job', data: resp[0]['addedJob'] },  { name: 'Submitted Job', data: resp[0]['submission'] }], resp[0]['label'])
        this.teamWiseJobChartloading=false
      }
    )
  }

  getAdminTeamWiseTalentExtractedVsClickToCall(sdate,edate){
    this.teamWiseTalentExtractedVsClickToCallloading=true
    this._dashboard.getAdminTeamWiseTalentExtractedVsClickToCall({sdate,edate}).subscribe(
      (resp: Response) => {
        this.teamWiseTalentExtractedVsClickToCall = this._prepareBarChartData([{ name: 'Talent Extracted', data: resp[0]['resumeCount'] },  { name: 'Click To Call', data: resp[0]['clickToCall'] }], resp[0]['label'])
        this.teamWiseTalentExtractedVsClickToCallloading=false
      }
    )

  }

  getAdminTeamWiseTalentExtractedVsRightToRepresent(sdate,edate){
    this.teamWiseTalentExtractedVsRightToRepresentChartloading=true
    this._dashboard.getAdminTeamWiseTalentExtractedVsRightToRepresent({sdate,edate}).subscribe(
      (resp: Response) => {
        this.teamWiseTalentExtractedVsRightToRepresentChart = this._prepareBarChartData([{ name: 'Talent Extracted', data: resp[0]['resumeCount'] },  { name: 'Right To Represent', data: resp[0]['rightToRepresent'] }], resp[0]['label'])
        this.teamWiseTalentExtractedVsRightToRepresentChartloading=false
      }
    )

  }

  getAdminTeamWiseTalentExtractedVsVideoUploaded(sdate,edate){
    this.teamWiseTalentExtractedVsVideoUploadedloading=true
    this._dashboard.getAdminTeamWiseTalentExtractedVsVideoUploaded({sdate,edate}).subscribe(
      (resp: Response) => {
        this.teamWiseTalentExtractedVsVideoUploaded = this._prepareBarChartData([{ name: 'Talent Extracted', data: resp[0]['resumeCount'] },  { name: 'Video Uploaded', data: resp[0]['videoUploaded'] }], resp[0]['label'])
        this.teamWiseTalentExtractedVsVideoUploadedloading=false
      }
    )

  }

  getAdminTeamWiseTalentExtractedVsTalentsQualified(sdate,edate){
    this.teamWiseTalentExtractedVsTalentsQualifiedloading=true
    this._dashboard.getAdminTeamWiseTalentExtractedVsTalentsQualified({sdate,edate}).subscribe(
      (resp: Response) => {
        this.teamWiseTalentExtractedVsTalentsQualified = this._prepareBarChartData([{ name: 'Talent Extracted', data: resp[0]['resumeCount'] },  { name: 'Talents Qualified', data: resp[0]['talentsQualified'] }], resp[0]['label'])
        this.teamWiseTalentExtractedVsTalentsQualifiedloading=false

      }
    )

  }

  getAdminClientWiseJobChart(sdate,edate) {
    this.clientWiseJobChartloading=true
    this._dashboard.getAdminClientWiseJobChart({sdate,edate}).subscribe(
      (resp: Response) => {
        // this.teamWiseJobChart = this._prepareBarChartData([{ name: 'Added Job', data: resp[0]['addedJob'] }, { name: 'Resume', data: resp[0]['resume'] }, { name: 'Submission', data: resp[0]['submission'] }], resp[0]['label'])
        this.clientWiseJobChart = this._prepareBarChartData([{ name: 'Added Job', data: resp[0]['addedJob'] },  { name: 'Submitted Job', data: resp[0]['submission'] }], resp[0]['label'])
        this.clientWiseJobChartloading=false
      }
    )
  }

  getAdminClientWiseTalentExtractedVsClickToCall(sdate,edate){
    this.clientWiseTalentExtractedVsClickToCallloading=true
    this._dashboard.getAdminClientWiseTalentExtractedVsClickToCall({sdate,edate}).subscribe(
      (resp: Response) => {
        this.clientWiseTalentExtractedVsClickToCall = this._prepareBarChartData([{ name: 'Talent Extracted', data: resp[0]['resumeCount'] },  { name: 'Click To Call', data: resp[0]['clickToCall'] }], resp[0]['label'])
        this.clientWiseTalentExtractedVsClickToCallloading=false
      }
    )

  }

  getAdminClientWiseTalentExtractedVsRightToRepresent(sdate,edate){
    this.clientWiseTalentExtractedVsRightToRepresentChartloading=true
    this._dashboard.getAdminClientWiseTalentExtractedVsRightToRepresent({sdate,edate}).subscribe(
      (resp: Response) => {
        this.clientWiseTalentExtractedVsRightToRepresentChart = this._prepareBarChartData([{ name: 'Talent Extracted', data: resp[0]['resumeCount'] },  { name: 'Right To Represent', data: resp[0]['rightToRepresent'] }], resp[0]['label'])
        this.clientWiseTalentExtractedVsRightToRepresentChartloading=false
      }
    )

  }

  getAdminClientWiseTalentExtractedVsVideoUploaded(sdate,edate){
    this.clientWiseTalentExtractedVsVideoUploadedloading=true
    this._dashboard.getAdminClientWiseTalentExtractedVsVideoUploaded({sdate,edate}).subscribe(
      (resp: Response) => {
        this.clientWiseTalentExtractedVsVideoUploaded = this._prepareBarChartData([{ name: 'Talent Extracted', data: resp[0]['resumeCount'] },  { name: 'Video Uploaded', data: resp[0]['videoUploaded'] }], resp[0]['label'])
        this.clientWiseTalentExtractedVsVideoUploadedloading=false
      }
    )

  }

  getAdminClientWiseTalentExtractedVsTalentsQualified(sdate,edate){
    this.clientWiseTalentExtractedVsTalentsQualifiedloading=true
    this._dashboard.getAdminClientWiseTalentExtractedVsTalentsQualified({sdate,edate}).subscribe(
      (resp: Response) => {
        this.clientWiseTalentExtractedVsTalentsQualified = this._prepareBarChartData([{ name: 'Talent Extracted', data: resp[0]['resumeCount'] },  { name: 'Talents Qualified', data: resp[0]['talentsQualified'] }], resp[0]['label'])
        this.clientWiseTalentExtractedVsTalentsQualifiedloading=false
      }
    )

  }

  getLocationWiseJobChart(sdate,edate) {
    this.locationWiseJobChartloading = true;
    this._dashboard.getAdminLocationWiseJobChart({sdate,edate}).subscribe(
      (resp: Response) => {
        this.locationWiseJobChart = this._prepareHorizontalBarChartData([{ name: 'Job By Location', data: resp[0]['data'] }], resp[0]['label'])
        this.locationWiseJobChartloading = false;
      }
    )

  }

  getExperienceWiseJobChart(sdate,edate) {
    this.experienceWiseJobChartloading = true;
    this._dashboard.getAdminExperienceWiseJobChart({sdate,edate}).subscribe(
      (resp: Response) => {
        this.experienceWiseJobChart = this._prepareHorizontalBarChartData([{ name: 'Job By Experience', data: resp[0]['data'] }], resp[0]['label'])
        this.experienceWiseJobChartloading = false;
      }
    )

  }

  getIndustryWiseJobChart(sdate,edate) {
    this.industryWiseJobChartloading = true;
    this._dashboard.getAdminIndustryWiseJobChart({sdate,edate}).subscribe(
      (resp: Response) => {
        this.industryWiseJobChart = this._prepareHorizontalBarChartData([{ name: 'Job By Industry', data: resp[0]['data'] }], resp[0]['label'])
        this.industryWiseJobChartloading = false;
      }
    )

  }

  getLocationWiseTalentChart(sdate,edate) {
    this.locationWiseTalentChartloading=true
    this._dashboard.getAdminLocationWiseTalentChart({sdate,edate}).subscribe(
      (resp: Response) => {
        this.locationWiseTalentChart = this._prepareHorizontalBarChartData([{ name: 'Talent By Location', data: resp[0]['data'] }], resp[0]['label'])
        this.locationWiseTalentChartloading=false

      }
    )

  }

  getExperienceWiseTalentChart(sdate,edate) {
    this.experienceWiseTalentChartloading=true
    this._dashboard.getAdminExperienceWiseTalentChart({sdate,edate}).subscribe(
      (resp: Response) => {
        this.experienceWiseTalentChart = this._prepareHorizontalBarChartData([{ name: 'Talent By Experience', data: resp[0]['data'] }], resp[0]['label'])
        this.experienceWiseTalentChartloading=false
      }
    )

  }

  getIndustryWiseTalentChart(sdate,edate) {
    this.industryWiseTalentChartloading=true
    this._dashboard.getAdminIndustryWiseTalentChart({sdate,edate}).subscribe(
      (resp: Response) => {
        this.industryWiseTalentChart = this._prepareHorizontalBarChartData([{ name: 'Talent By Industry', data: resp[0]['data'] }], resp[0]['label'])
        this.industryWiseTalentChartloading=false
      }
    )

  }


  private _prepareLineChartData(series = [], categories = []) {
    // Account balance
    return {
      chart: {
        animations: {
          speed: 800,
          animateGradually: {
            enabled: false
          }
        },
        fontFamily: 'inherit',
        foreColor: 'inherit',
        width: '100%',
        height: '100%',
        type: 'area',
        sparkline: {
          enabled: false
        },
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      colors: ['#A3BFFA', '#667EEA'],
      fill: {
        colors: ['#CED9FB', '#AECDFD'],
        opacity: 0.5,
        type: 'solid'
      },
      series,
      stroke: {
        curve: "smooth",
        width: 2
      },
      tooltip: {
        theme: 'dark',
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: 'category',
        categories
      }
    };
  }

  private _prepareBarChartData(series = [], categories = []) {

    return {
      series,
      chart: {
        type: "bar",
        height: 250,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      xaxis: {
        type: "category",
        categories
      }
    }
  }

  private _prepareHorizontalBarChartData(series = [], categories = []) {

    return {
      series,
      chart: {
        type: "bar",
        height: 250,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      xaxis: {
        type: "category",
        categories
      }
    }
  }

}

