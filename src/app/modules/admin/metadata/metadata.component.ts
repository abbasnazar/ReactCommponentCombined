import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { ExportCSV } from 'app/common/export';
import { SearchPipe } from 'app/common/Pipes/search.pipe';
import { AccessRight } from 'app/sidebar/sidebar';
import { AdminService } from '../admin.service';
import { AddMetadataComponent } from './add-metadata/add-metadata.component';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MetadataComponent implements OnInit {
  displayedColumns: string[] = ['fieldname', 'tablename', 'type', 'mandatory', 'status', 'createdon', 'action'];
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
    this._admin.getMetaData().subscribe(
      (resp: Response) => {
        this.rows = resp
        this.temp = resp
        this.loader.stop()
        this.getPage()
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
    new ExportCSV(finalList).download('metadata')
  }

  openDialog(type, obj = {}): void {

    const dialogRef = this.dialog.open(AddMetadataComponent, {
      width: '500px',
      data: { ...obj, title: type, }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.load()
    });
  }

}
