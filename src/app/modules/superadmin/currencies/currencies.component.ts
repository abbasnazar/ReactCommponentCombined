import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { ExportCSV } from 'app/common/export';
import { SearchPipe } from 'app/common/Pipes/search.pipe';
import { AdminService } from 'app/modules/admin/admin.service';
import { AccessRight } from 'app/sidebar/sidebar';
import { AddCurrencyComponent } from './add-currency/add-currency.component';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CurrenciesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'createdon', 'action'];
  rows: any = []
  temp: any = []
  data: any = []
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
    this._admin.getCurriencies().subscribe(
      (resp: Response) => {
        this.rows = resp
        this.temp = resp
        this.data = resp
        this.getPage()
        this.loader.stop()
      }, (err: Response) => {
        console.log(err);
        this.loader.stop()
      })
  }


  getPage(e = 0, pageSize = 8) {
    this.rows = []
    this.rows = this.temp.slice(e * pageSize, (e + 1) * pageSize)
  }

  search() {
    if (!this.filterObj.search)
      this.temp = this.data
    else
      this.temp = this._search.transform(this.data, this.filterObj.search)
    this.getPage()
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
    const dialogRef = this.dialog.open(AddCurrencyComponent, {
      width: '400px',
      data: { obj, title: type, }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.load()
    });
  }

}
