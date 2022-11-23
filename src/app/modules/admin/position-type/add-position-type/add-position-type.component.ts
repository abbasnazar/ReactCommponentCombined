import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminService } from '../../admin.service';
import { AddCompanyTypeComponent } from '../../company-type/add-company-type/add-company-type.component';

@Component({
  selector: 'app-add-position-type',
  templateUrl: './add-position-type.component.html',
  styleUrls: ['./add-position-type.component.scss']
})
export class AddPositionTypeComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AddCompanyTypeComponent>,
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
    this._admin.insertPositionType({ name: this.data.name })
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
    this._admin.updatePositionType({ name: this.data.name, id: this.data.obj.id })
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
