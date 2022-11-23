import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { MatDrawer } from "@angular/material/sidenav";
import { ActivatedRoute, Router } from "@angular/router";
import { SearchPipe } from "app/common/Pipes/search.pipe";
import { TalentService } from "app/modules/talents/talent.service";
import { ChatBotService } from "app/modules/chatbot/chatbot.service";
import { ToastrManager } from "ng6-toastr-notifications";
import { ExportCSV } from "app/common/export";
import { RobotsService } from "../robots.service";
import { RobotDialogComponent } from "../robot-dialog/robot-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { AppLoaderService } from "app/common/app-loader/app-loader.service";
import { AccessRight } from "app/sidebar/sidebar";
import { JobDialogComponent } from "app/modules/jobs/job-dialog/job-dialog.component";
import { AppService } from "app/app.service";

@Component({
  selector: "app-robot-details",
  templateUrl: "./robot-details.component.html",
  styleUrls: ["./robot-details.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class RobotDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    "option",
    "name",
    "relevance",
    "willingness",
    "pos",
    "source",
    "status",
    "actions",
  ];
  rows: any = [];
  rows0: any = [];
  temp: any = [];
  data: any = [];
  robotsDetails: any = { data: [] };
  filterObj: any = {};
  accessRight: any = {};
  trid: string;
  @ViewChild("matDrawer", { static: true })
  matDrawer: MatDrawer;
  isOpen: boolean = false;
  sideData: any = {};

  constructor(
    private _talent: TalentService,
    private _chatbot: ChatBotService,
    private _robot: RobotsService,
    // private dialog: MatDialog,
    private _search: SearchPipe,
    private tostr: ToastrManager,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private loader: AppLoaderService,
    private _app: AppService
  ) {
    this.trid = this.route.snapshot.queryParamMap.get("trid");
  }

  ngOnInit(): void {
    this.load(1, "all");
  }

  load(page, type) {
    console.log("talent req id", this.trid);
    console.log("page", page);
    console.log("type", type);

    this.loader.start();
    this._talent.getTalentByTelantRequestId(this.trid).subscribe(
      (resp: Response) => {
        this.rows = resp;
        this.temp = resp;
        this.data = resp;
        console.log("talentfetchdata", resp[0]);

        this.getPage();
        this.loader.stop();
      },
      (err: Response) => {
        this.loader.stop();
        this.tostr.errorToastr(err.statusText, "Oops");
      }
    );
  }

  clickToCall(obj) {
    this.loader.start();
    this.tostr.successToastr("connecting please wait");
    this._talent.shareCallDetails(obj).subscribe(
      (resp: Response) => {
        console.log("resp", resp);
        this.loader.stop();
        this.tostr.successToastr(resp[0].body, "call connected");
      },
      (err: Response) => {
        console.log("err", err);
        this.loader.stop();
        this.tostr.errorToastr(err.statusText, "Oops unable to call");
      }
    );
  }

  download(url) {
    let pathList = url.replace("gs://", "").split("/");
    if (pathList.length > 1) {
      this._app.getSignUrl(pathList[0], pathList[1]).subscribe((resp: any) => {
        let a = document.createElement("a");
        a.href = resp[0];
        a.target = "__blank";
        a.click();
      });
    }
  }

  showVideo() {
    const dialogRef = this.dialog.open(RobotDialogComponent, {
      width: "700px",
      data: { ...{ video: this.sideData.video }, title: "Video" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.load(1, "all");
    });
  }

  submissionEmail() {
    let jobid = null;
    let finalList = [];
    let finalKeys = [];
    let printList = [];
    this.temp.forEach((element) => {
      let obj = Object.assign({}, element);
      if (obj.isSelected) {
        printList.push({
          name: element.name,
          uri: element.uri,
          video: element.video,
          willingness: Math.round(element.willingness * 100),
          pos: Math.round(element.pos * 100),
          relevance: Math.round(element.relevance * 100),
          facebook: element.facebook,
          linkedin: element.linkedin,
          twitter: element.twitter,
          mobile: element.mobile,
          email: element.email,
        });
        if (finalKeys.length == 0) {
          let keyList = element.emailoption.split(",");
          this._app.emailOptions.forEach((item) => {
            if (keyList.indexOf(item.label) >= 0) {
              finalKeys.push(item);
            }
          });
        }
        jobid = element.jobid;

        let obj = {};
        finalKeys.forEach((key) => {
          obj[key.label] = element[key.value];
        });
        obj["resumeUrl"] = element.resumeurl;
        obj["tjmid"] = element.talentjobmappingid;
        finalList.push(obj);
      }
    });
    if (finalList.length == 0)
      return this.tostr.errorToastr("Please select Candidate");
    console.log("final list ", printList);

    this.loader.start();
    this._talent
      .submissionEmail({ list: finalList, printList, jobid })
      .subscribe(
        (resp: Response) => {
          this.loader.stop();
          this.tostr.successToastr("Successfully sent ", "Success");
        },
        (err: Response) => {
          this.loader.stop();
          this.tostr.errorToastr(err.statusText, "Error");
        }
      );
  }
  robotDetails(row) {
    this.robotsDetails.title = row.title;
    this.robotsDetails.contactCompanyName = row.contactCompanyName;
    this.isOpen = true;
    this.loader.start();
    this._talent.talentRequestSummaryByJobId(row.id).subscribe(
      (resp: Response) => {
        // console.log(resp);
        this.loader.stop();
        this.robotsDetails.data = resp;
      },
      (err: Response) => {
        this.loader.stop();
        console.log(err);
        this.tostr.errorToastr(err.statusText, "Oops");
      }
    );
  }

  // uploadPortal() {
  //   let jobid = []
  //   let finalList = []
  //   let finalKeys = []
  //   let printList = []
  //   this.temp.forEach(element => {
  //     let obj = Object.assign({}, element)
  //     if (obj.isSelected) {
  //       printList.push({
  //         resumeurl: element.resumeurl,
  //         name: element.name,
  //         title:element.title,
  //         email: element.email,
  //         mobile: element.mobile,
  //         pan_number: element.pan_number,
  //         uri: element.uri,
  //         totalexperienceyear: element.totalexperienceyear,
  //         relevant_experience: element.relevant_experience,
  //         currentcity: element.currentcity,
  //         notice_period: element.notice_period,
  //         buyrate: element.buyrate ,
  //         dateofbirth: element.dateofbirth,

  //       })
  //       if (finalKeys.length == 0) {
  //         let keyList = element.uploadoption.split(',')
  //         // let keyList = element.emailoption.split(',')
  //         this._app.uploadOptions.forEach(item => {
  //           // this._app.emailOptions.forEach(item => {
  //           if (keyList.indexOf(item.label) >= 0) {
  //             finalKeys.push(item)
  //           }
  //         });
  //       }
  //       jobid = element.jobid

  //       let obj = {}
  //       finalKeys.forEach(key => {
  //         obj[key.label] = element[key.value]
  //       });
  //       obj['resumeUrl'] = element.resumeurl
  //       obj['tjmid'] = element.talentjobmappingid
  //       finalList.push(obj)
  //       console.log('finalList ',finalList);
  //     };
  //   })
  //   if (finalList.length == 0)
  //     return this.tostr.errorToastr('Please select Candidate')
  //   console.log('final list ', printList);

  //   this.loader.start()
  //   // this._talent.uploadPortal({ list: finalList, printList, jobid }).subscribe(
  //      this._talent.uploadPortal({finalList}).subscribe(
  //     (resp: Response) => {
  //       this.loader.stop()
  //       this.tostr.successToastr('Successfully sent ', 'Success')
  //     }, (err: Response) => {
  //       this.loader.stop()
  //       this.tostr.errorToastr(err.statusText, 'Error')
  //     }
  //   )
  // }

  uploadPortal() {
    let jobid = null;
    let trid = null;
    let finalList = [];
    let finalKeys = [];
    let printList = [];

    this.temp.forEach((element) => {
      let obj = Object.assign({}, element);
      if (obj.isSelected) {
        printList.push({
          // jobid: element.jobid,
          jobid: element.jobid,
          trid: this.trid,
          id: element.id,
          resumeurl: element.resumeurl,
          name: element.name,
          title: element.title,
          email: element.email,
          mobile: element.mobile,
          pan_number: element.pan_number,
          uri: element.uri,
          totalexperienceyear: element.totalexperienceyear,
          relevant_experience: element.relevant_experience,
          currentcity: element.currentcity,
          notice_period: element.notice_period,
          buyrate: element.buyrate,
          dateofbirth: element.dateofbirth,
        });
      }
      if (finalKeys.length == 0) {
        let keyList = element.emailoption.split(",");
        // let keyList = element.upload.split(',')
        this._app.emailOptions.forEach((item) => {
          // this._app.upload.forEach(item => {
          if (keyList.indexOf(item.label) >= 0) {
            finalKeys.push(item);
          }
          console.log("item ", item);
        });

        (jobid = element.jobid), (trid = this.trid);

        let obj = {};
        finalKeys.forEach((key) => {
          obj[key.label] = element[key.value];
        });
        obj["resumeUrl"] = element.resumeurl;
        obj["tjmid"] = element.talentjobmappingid;
        obj["trid"] = this.trid;
        finalList.push(obj);
        console.log("obj ", obj);
      }
    });
    if (finalList.length == 0)
      return this.tostr.errorToastr("Please select Candidate");

    this.loader.start();
    // this._talent.uploadPortal({ list: finalList, printList,jobid }).subscribe(
    //  this._talent.uploadPortal({list: printList,printList,jobid},'naukri').subscribe(
    this._robot
      .uploadPortal({ list: printList, finalList, jobid }, "naukri")
      .subscribe(
        (resp: Response) => {
          this.loader.stop();
          this.tostr.successToastr("Successfully sent ", "Success");
        },
        (err: Response) => {
          this.loader.stop();
          this.tostr.errorToastr(err.statusText, "Error");
          console.log("printList ", printList);
          console.log("finalList ", finalList);
          console.log("jobid ", jobid);
          console.log("trid ", trid);
        }
      );
  }

  // openDialog(type, obj = {}): void {
  //   console.log('modalObj', obj);

  //   const dialogRef = this.dialog.open(JobDialogComponent, {
  //     width: '500px',
  //     data: { ...obj, title: type, }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.load()
  //       this.isOpen = false
  //     }
  //   });
  // }

  getVideoPath() {
    return this._chatbot.getVideos(this.sideData.video);
  }

  openDialog(type, obj = {}, selectionType): void {
    console.log("modalObj", obj);
    let data = [];
    if (selectionType == "single") {
      data = [
        {
          talentid: obj["id"],
          jobid: obj["jobid"],
          type: type.toLowerCase(),
          userid: obj["mobile"],
          useremail: obj["email"],
        },
      ];
    } else if (selectionType == "multi") {
      this.rows.forEach((element) => {
        if (element.isSelected) {
          data.push({
            talentid: element["id"],
            jobid: element["jobid"],
            type: type.toLowerCase(),
            userid: element["mobile"],
            useremail: element["email"],
          });
          console.log("data ", data);
        }
      });
    }

    const dialogRef = this.dialog.open(RobotDialogComponent, {
      width: "400px",
      data: { data, title: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.load(1, "all");
    });
  }

  persentageCalculation(value) {
    if (!value) return "0%";
    else {
      return Number(value) * 100;
    }
  }

  details(row) {
    console.log("details", row);
    this.sideData = row;
    // this.router.navigateByUrl('/robots/robotdetails/side')
    this.isOpen = true;
  }

  profile() {
    sessionStorage.setItem("profile", JSON.stringify(this.sideData));
    this.router.navigateByUrl("/robots/robot_profile");
  }

  getPage(e = 0, pageSize = 5) {
    this.rows = [];
    this.rows = this.temp.slice(e * pageSize, (e + 1) * pageSize);
  }

  goto(row) {
    if (row.id) sessionStorage.setItem("talent", JSON.stringify(row));
    this.router.navigateByUrl("/talent/addtalent");
  }
  search() {
    if (!this.filterObj.search) this.temp = this.temp;
    else this.temp = this._search.transform(this.data, this.filterObj.search);

    this.getPage();
  }

  selectAll() {
    this.rows.forEach((element) => {
      element.isSelected = element.isSelected ? false : true;
    });
  }

  export() {
    let finalList = [];
    this.temp.forEach((element) => {
      finalList.push({
        Name: element.name,
        Mobile: element.mobile,
        Email: element.email,
        City: element.currentcity,
        "Highest Degree": element.highestdegree,
        Skills: element.keyskills,
        Relevance: element.relevance,
        Willingness: element.willingness,
        Pos: element.pos,
        Overall: element.overall,
        "Job Title": element.title,
        "Experience(in year)": `${element.totalexperienceyear}.${element.totalexperiencemonth}`,
        "Work Experience": element.workexperience,
      });
    });
    new ExportCSV(finalList).download("robotdetails");
  }
}
