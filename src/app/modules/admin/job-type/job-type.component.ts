import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { SearchPipe } from 'app/common/Pipes/search.pipe';
import { AdminService } from '../admin.service';
import { AddJobTypeComponent } from './add-job-type/add-job-type.component';
import { ExportCSV } from '../../../common/export';
import { AccessRight } from 'app/sidebar/sidebar';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';

@Component({
  selector: 'app-job-type',
  templateUrl: './job-type.component.html',
  styleUrls: ['./job-type.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobTypeComponent implements OnInit {

  displayedColumns: string[] = ['name', 'createdon', 'action'];
  rows: any = []
  temp: any = []
  filterObj: any = {}
  accessRight: any = {}

  isLoading: boolean;

  constructor(
    private _admin: AdminService,
    private dialog: MatDialog,
    private _search: SearchPipe,
    private access: AccessRight,
    private loader: AppLoaderService
  ) { }

  ngOnInit(): void {
    console.log('job type is running ...........');
    this.load()
    this.accessRight = this.access.getAccess()
  }

  load() {
    this.loader.start()
    this._admin.getJobType().subscribe(
      (resp: Response) => {
        this.rows = resp
        this.temp = resp
        this.loader.stop()
        this.getPage()
      }, (err: Response) => {
        this.loader.stop()
        console.log(err);

      })
  }

  getPage(e = 0, pageSize = 5) {
    this.rows = []
    this.rows = this.temp.slice(e * pageSize, (e + 1) * pageSize)
  }

  search() {
    console.log('search======>', this.filterObj.search);

    if (!this.filterObj.search)
      this.rows = this.temp
    else
      this.rows = this._search.transform(this.temp, this.filterObj.search)
  }

  export() {
    let finalList = []
    this.rows.forEach(element => {
      finalList.push({
        Name: element.name,
        Createdon: element.createdon
      })
    });
    new ExportCSV(finalList).download('jobtype')
  }

  openDialog(type, obj = {}): void {
    console.log('modalObj', obj);

    const dialogRef = this.dialog.open(AddJobTypeComponent, {
      width: '400px',
      data: { obj, title: type, }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.load()
    });
  }

}
