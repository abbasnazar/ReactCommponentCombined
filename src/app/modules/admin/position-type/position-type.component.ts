import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { ExportCSV } from 'app/common/export';
import { SearchPipe } from 'app/common/Pipes/search.pipe';
import { AccessRight } from 'app/sidebar/sidebar';
import { AdminService } from '../admin.service';
import { AddPositionTypeComponent } from './add-position-type/add-position-type.component';

@Component({
  selector: 'app-position-type',
  templateUrl: './position-type.component.html',
  styleUrls: ['./position-type.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PositionTypeComponent implements OnInit {
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
    this.load()
    this.accessRight = this.access.getAccess()
  }

  load() {
    this.loader.start()
    this._admin.getPositionType().subscribe(
      (resp: Response) => {
        this.rows = resp
        this.temp = resp
        this.getPage()
        this.loader.stop()
      }, (err: Response) => {
        console.log(err);
        this.loader.stop()
      })
  }


  getPage(e = 0, pageSize = 5) {
    this.rows = []
    this.rows = this.temp.slice(e * pageSize, (e + 1) * pageSize)
  }

  search() {
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
    new ExportCSV(finalList).download('positiontype')
  }

  openDialog(type, obj = {}): void {
    console.log('modalObj', obj);

    const dialogRef = this.dialog.open(AddPositionTypeComponent, {
      width: '400px',
      data: { obj, title: type, }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.load()
    });
  }

}
