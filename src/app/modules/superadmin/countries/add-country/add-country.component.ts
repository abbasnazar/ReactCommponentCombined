import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { AdminService } from 'app/modules/admin/admin.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.scss']
})
export class AddCountryComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AddCountryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    private _admin: AdminService,
    private tostr: ToastrManager,
    private loader: AppLoaderService
  ) { }

  ngOnInit(): void {
    if (this.data.title == 'Update')
      this.data.name = this.data.obj.name

  }

  submit() {
    if (!this.data.name)
      return this.tostr.errorToastr('Please enter name', 'Oops')
    this.loader.start()
    this._admin.addCountries({ name: this.data.name })
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
    if (!this.data.name)
      return this.tostr.errorToastr('Please enter name', 'Oops')
    this.loader.start()
    this._admin.updateCountries({ name: this.data.name, id: this.data.obj.id })
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
