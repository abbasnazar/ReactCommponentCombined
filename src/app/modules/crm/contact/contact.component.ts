import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'app/app.service';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { ExportCSV } from 'app/common/export';
import { SearchPipe } from 'app/common/Pipes/search.pipe';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CrmService } from '../crm.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContactComponent implements OnInit {
  rows: any = []
  temp: any = []
  filterObj: any = {}
  tableShowColumn: any = {}
  selectedColumn: any = [{ name: 'Name', value: false }, { name: 'Email', value: true }, { name: 'Address', value: false }, { name: 'City', value: false }, { name: 'Company Name', value: false },
  { name: 'Actions', value: true }]

  isLoading: boolean;

  constructor(
    private _admin: CrmService,
    private _search: SearchPipe,
    private router: Router,
    private loader: AppLoaderService,
    private _app: AppService,
    private tostr: ToastrManager
  ) { }

  ngOnInit(): void {
    console.log('job type is running ...........');
    this.load()
  }

  load() {
    this.loader.start()
    this._admin.getContacts().subscribe(
      (resp: Response) => {
        this.rows = resp
        this.temp = resp
        this.loader.stop()
        // this.getPage()
        this.getViewMetadata()
      }, (err: Response) => {
        console.log(err);

      })
  }

  getViewMetadata() {
    this.loader.start()
    this._app.getViewMetadata("contact").subscribe(
      (resp: Response) => {
        this.loader.stop()
        console.log(resp);

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
    this._app.updateViewMetadata({ name: "contact", metadata: selections.toString() }).subscribe(
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
        Email: element.email,
        Mobile: element.mobile,
        Company: element.contactCompanyName,
        City: element.cityName,
        Address: element.address,

      })
    });
    new ExportCSV(finalList).download('contact')
  }

  addEdit(type, row) {
    if (type == 'edit')
      sessionStorage.setItem('contact', JSON.stringify(row))

    this.router.navigateByUrl('/crm/contact/add')
  }

}
