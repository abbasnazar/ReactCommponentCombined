import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { AdminService } from 'app/modules/admin/admin.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-add-state',
  templateUrl: './add-state.component.html',
  styleUrls: ['./add-state.component.scss']
})
export class AddStateComponent implements OnInit {
  countryList: any = []
  constructor(
    private dialogRef: MatDialogRef<AddStateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    private _admin: AdminService,
    private tostr: ToastrManager,
    private loader: AppLoaderService
  ) { }

  ngOnInit(): void {
    this.getCountry()

  }

  getCountry() {
    this._admin.getCountries().subscribe(
      (resp: Response) => {
        this.countryList = resp

      }, (err: Response) => {
        this.tostr.errorToastr('error while loading countries', 'Oops')
      }
    )
  }

  submit() {
    if (!this.data.countryid)
      return this.tostr.errorToastr('Please select country', 'Oops')
    if (!this.data.name)
      return this.tostr.errorToastr('Please enter state name', 'Oops')
    this.loader.start()
    this._admin.addStates({ name: this.data.name, countryid: this.data.countryid })
      .subscribe((resp: Response) => {
        this.tostr.successToastr('Successfully inserted', 'Success')
        this.dialogRef.close(true)
        this.loader.stop()
      }, (err: Response) => {
        this.loader.stop()
        this.tostr.errorToastr(err.statusText, 'Oops')
      })
  }

  update() {
    if (!this.data.countryid)
      return this.tostr.errorToastr('Please select country', 'Oops')
    if (!this.data.name)
      return this.tostr.errorToastr('Please enter state name', 'Oops')
    this._admin.updateStates({
      id: this.data.id,
      countryid: this.data.countryid,
      name: this.data.name.trim()
    })
      .subscribe((resp: Response) => {
        this.tostr.successToastr('Successfully updated', 'Success')
        this.dialogRef.close(true)
        this.loader.stop()
      }, (err: Response) => {
        this.tostr.errorToastr(err.statusText, 'Oops')
        this.loader.stop()
      })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
