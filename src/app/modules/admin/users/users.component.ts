import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'app/app.service';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { EmailValidation } from 'app/common/emailvalidation';
import { ExportCSV } from 'app/common/export';
import { SearchPipe } from 'app/common/Pipes/search.pipe';
import { AccessRight } from 'app/sidebar/sidebar';
import moment from 'moment';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminService } from '../admin.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['name', 'phone', 'email', 'designation', 'doj', 'manager', 'group', 'action'];
  rows: any = []
  temp: any = []
  filterObj: any = {}
  userDetails: any = {}
  isOpen: boolean = false
  accessRight: any = {}
  tableShowColumn: any = {}
  selectedColumn: any = [{ name: 'Name', value: false }, { name: 'Email', value: true }, { name: 'Designation', value: false }, { name: 'DOJ', value: false }, { name: 'Manager', value: false },
  { name: 'Group', value: true }, { name: 'Actions', value: true }]

  constructor(
    private _admin: AdminService,
    private dialog: MatDialog,
    private _search: SearchPipe,
    private tostr: ToastrManager,
    private access: AccessRight,
    private loader: AppLoaderService,
    private _app: AppService
  ) { }

  ngOnInit(): void {
    this.load()
    this.accessRight = this.access.getAccess()
  }


  load() {
    this.loader.start()
    this._admin.getUsers().subscribe(
      (resp: Response) => {
        this.rows = resp
        this.temp = resp
        // this.getPage()
        this.loader.stop()
        this.getViewMetadata()
      }, (err: Response) => {
        console.log(err);
        this.loader.stop()
      })
  }

  getViewMetadata() {
    this.loader.start()
    this._app.getViewMetadata("users").subscribe(
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
    this._app.updateViewMetadata({ name: "users", metadata: selections.toString() }).subscribe(
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
        Createdon: element.createdon
      })
    });
    new ExportCSV(finalList).download('users')
  }

  addUpdate(type, row) {
    this.userDetails = {}
    if (type == 'update')
      this.userDetails = Object.assign({}, row)
    this.isOpen = true
  }

  submit() {
    if (!this.userDetails.name)
      return this.tostr.errorToastr('Please enter name', 'Oops')
    if (!this.userDetails.email)
      return this.tostr.errorToastr('Please enter email', 'Oops')
    let msg = new EmailValidation().valid(this.userDetails.email)
    if (msg)
      return this.tostr.errorToastr(msg, 'Oops')
    if (!this.userDetails.mobile)
      return this.tostr.errorToastr('Please enter Mobile', 'Oops')
    this.loader.start()
    if (this.userDetails.doj)
      this.userDetails.doj = moment(this.userDetails.doj).format('yyyy-M-D')
    this._admin.addUser(this.userDetails).subscribe(
      (resp: Response) => {
        this.loader.stop()
        this.load()
        this.isOpen = false
        this.tostr.successToastr('Successfully added !', 'Success')
      }, (err: Response) => {
        this.loader.stop()
        this.tostr.errorToastr(err.statusText, 'Oops')
      }
    )
  }

  update() {
    if (!this.userDetails.name)
      return this.tostr.errorToastr('Please enter name', 'Oops')
    if (!this.userDetails.email)
      return this.tostr.errorToastr('Please enter email', 'Oops')
    let msg = new EmailValidation().valid(this.userDetails.email)
    if (msg)
      return this.tostr.errorToastr(msg, 'Oops')
    if (!this.userDetails.mobile)
      return this.tostr.errorToastr('Please enter Mobile', 'Oops')
    if (this.userDetails.doj)
      this.userDetails.doj = moment(this.userDetails.doj).format('yyyy-M-D')
    this.loader.start()
    this._admin.updateUser(new EditModal(this.userDetails)).subscribe(
      (resp: Response) => {
        this.loader.stop()
        this.load()
        this.tostr.successToastr('Successfully updated !', 'Success')
        this.isOpen = false

      }, (err: Response) => {
        this.tostr.errorToastr(err.statusText, 'Oops')
        this.loader.stop()
      }
    )

  }

  openDialog(type, obj = {}): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: { ...obj, title: type, }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.load()
    });
  }

}



class EditModal {
  id: number
  name: string
  mobile: number
  email: string
  designation: string
  empcode: string
  doj: string
  managerid: number
  constructor({ id, name, mobile, email, designation, empcode, doj, managerid }) {
    this.id = id
    this.name = name
    this.mobile = mobile
    this.email = email
    this.designation = designation
    this.empcode = empcode
    this.doj = doj
    this.managerid = isNaN(Number(managerid)) ? null : managerid
  }
}
