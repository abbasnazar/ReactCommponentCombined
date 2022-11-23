import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { AdminService } from 'app/modules/admin/admin.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss']
})
export class AddCityComponent implements OnInit {
  stateList: any = []
  constructor(
    private dialogRef: MatDialogRef<AddCityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    private _admin: AdminService,
    private tostr: ToastrManager,
    private loader: AppLoaderService
  ) { }

  ngOnInit(): void {
    this.getState()

  }

  getState() {
    this.loader.start()
    this._admin.getStates().subscribe(
      (resp: Response) => {
        this.stateList = resp
        // console.log('state', resp);

        this.loader.stop()
      }, (err: Response) => {
        this.loader.stop()
        this.tostr.errorToastr('error while loading state', 'Oops')
      }
    )
  }

  submit() {
    if (!this.data.stateid)
      return this.tostr.errorToastr('Please select state', 'Oops')
    if (!this.data.name)
      return this.tostr.errorToastr('Please enter city name', 'Oops')
    this.loader.start()
    this._admin.addCity({ name: this.data.name, stateid: this.data.stateid })
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
    if (!this.data.stateid)
      return this.tostr.errorToastr('Please select state', 'Oops')
    if (!this.data.name)
      return this.tostr.errorToastr('Please enter city name', 'Oops')
    this.loader.start()
    this._admin.updateCity({
      id: this.data.id,
      stateid: this.data.stateid,
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
