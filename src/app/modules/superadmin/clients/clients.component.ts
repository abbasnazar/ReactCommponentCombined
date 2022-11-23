import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { ExportCSV } from 'app/common/export';
import { SearchPipe } from 'app/common/Pipes/search.pipe';
import { AdminService } from 'app/modules/admin/admin.service';
import { AccessRight } from 'app/sidebar/sidebar';
import { ClientDialogComponent } from './client-dialog/client-dialog.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AppService } from 'app/app.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'licenses', 'status', 'createdon', 'action', 'detail'];
  rows: any = []
  temp: any = []
  isOpen: boolean = false;
  filterObj: any = {}
  accessRight: any = {}
  licenseDetail: any = { data: [] }
  selectedColumn: any = [{ name: 'Client Name' }, { name: 'Admin ID' }, { name: 'Onboarding Date' }, { name: 'Licenses' },
  { name: 'Mobile' }, { name: 'Phone' }, { name: 'Company' }, { name: 'Address' }, { name: 'Pincode' }, { name: 'Status' }, { name: 'Action' }, { name: 'Detail' }]

  exportColumn: any = [{ name: 'Client Name', key: 'name' }, { name: 'Admin ID', key: 'email' }, { name: 'Onboarding Date', key: 'createdby' }, { name: 'Licenses', key: 'licenses' },
  { name: 'Mobile', key: 'mobile' }, { name: 'Phone', key: 'phoneno' }, { name: 'Company', key: 'company' }, { name: 'Address', key: 'address' }, { name: 'Pincode', key: 'pincode' }, { name: 'Status' }]

  exportEmployeeColumn: any = [{ name: 'Employee Name', key: 'name' }, { name: 'Designation', key: 'designation' }, { name: 'Employee Code', key: 'empcode' }, { name: 'Mobile', key: 'mobile' },
  { name: 'Email', key: 'email' }, { name: 'Date Of Joining', key: 'doj' }, { name: 'Manager', key: 'userName' }, { name: 'Super Manager', key: 'managerName' }, { name: 'Status' }]
  tableShowColumn: any = {}

  constructor(
    private _admin: AdminService,
    private dialog: MatDialog,
    private _search: SearchPipe,
    private access: AccessRight,
    private loader: AppLoaderService,
    private tostr: ToastrManager,
    private router: Router,
    private _app: AppService
  ) { }

  ngOnInit(): void {
    this.load()
    this.accessRight = this.access.getAccess()
  }

  getViewMetadata() {
    this.loader.start()
    this._app.getViewMetadata("clients").subscribe(
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
    this._app.updateViewMetadata({ name: "clients", metadata: selections.toString() }).subscribe(
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

  load() {
    console.log('user load');

    this.loader.start()
    this._admin.getAdminUser().subscribe(
      (resp: Response) => {
        this.rows = resp
        this.temp = resp
        console.log('admin', resp);

        this.loader.stop()
        this.getViewMetadata()
      }, (err: Response) => {
        console.log(err);
        this.loader.stop()
      })
  }

  licensedetail(row) {
    this.licenseDetail.companyName = row.company
    this.licenseDetail.contactName = row.name
    this.isOpen = true
    this.loader.start()
    this._admin.getUsersofclient(row.id).subscribe(
      (resp: Response) => {
        console.log('licence', resp);
        this.loader.stop()
        this.licenseDetail.data = resp
      }, (err: Response) => {
        this.loader.stop()
        console.log(err);
        this.tostr.errorToastr(err.statusText, 'Oops')

      }
    )
  }

  // getPage(e = 0) {
  //   this.rows = []
  //   this.rows = this.temp.slice(e * 8, (e + 1) * 8)
  // }

  goto(type, row) {
    if (type == 'Update')
      sessionStorage.setItem('client', JSON.stringify(row))
    this.router.navigateByUrl('/superadmin/addclient')
  }

  search() {
    if (!this.filterObj.search)
      this.rows = this.temp
    else
      this.rows = this._search.transform(this.temp, this.filterObj.search)
  }

  exportExcel() {

    let finalList = []
    this.rows.forEach(item => {
      let tempObj = {}
      this.exportColumn.forEach(element => {
        if (element.value) {
          if (element.name == 'Status')
            tempObj['Status'] = item.isactive ? 'Active' : 'Deactive'
          else
            tempObj[element.name] = item[element.key] ?? ''
        }
      });
      finalList.push(tempObj)
    });

    new ExportCSV(finalList).download('clients')
  }

  exportEmployeeExcel() {

    let finalList = []
    this.licenseDetail.data.forEach(item => {
      let tempObj = {}
      this.exportEmployeeColumn.forEach(element => {
        if (element.value) {
          if (element.name == 'Status')
            tempObj['Status'] = item.isactive ? 'Active' : 'Deactive'
          else
            tempObj[element.name] = item[element.key] ?? ''
        }
      });
      finalList.push(tempObj)
    });

    new ExportCSV(finalList).download('employee')
  }

  openDialog(type, obj = {}): void {
    // console.log('modalObj', obj);

    const dialogRef = this.dialog.open(ClientDialogComponent, {
      width: '400px',
      data: { ...obj, title: type, }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.load()
    });
  }

}
