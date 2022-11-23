import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-job-type',
  templateUrl: './add-job-type.component.html',
  styleUrls: ['./add-job-type.component.scss']
})
export class AddJobTypeComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddJobTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    private _admin: AdminService,
    private tostr: ToastrManager,
    private loader: AppLoaderService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data.title == 'Update')
      this.data.name = this.data.obj.name

  }

  submit() {
    if (!this.data.name)
      return this.tostr.errorToastr('Please enter name', 'Oops')
    this.loader.start()
    this._admin.insertJobType({ name: this.data.name })
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
    this._admin.updateJobType({ name: this.data.name, id: this.data.obj.id })
      .subscribe((resp: Response) => {
        this.tostr.successToastr('Successfully updated', 'Success')
        this.dialogRef.close(true)
        this.loader.stop()
      }, (err: Response) => {
        this.loader.stop()
        this.tostr.errorToastr(err.statusText, 'Oops')
      })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
