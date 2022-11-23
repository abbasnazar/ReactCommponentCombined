import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-company-type',
  templateUrl: './add-company-type.component.html',
  styleUrls: ['./add-company-type.component.scss']
})
export class AddCompanyTypeComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AddCompanyTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    private _admin: AdminService,
    private tostr: ToastrManager
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data.title == 'Update')
      this.data.name = this.data.obj.name

  }

  submit() {
    if (!this.data.name)
      return this.tostr.errorToastr('Please enter name', 'Oops')
    this._admin.insertCompanyType({ name: this.data.name })
      .subscribe((resp: Response) => {
        this.tostr.successToastr('Successfully inserted', 'Success')
        this.dialogRef.close(true)
      }, (err: Response) => {
        this.tostr.errorToastr(err.statusText, 'Oops')
      })
  }

  update() {
    if (!this.data.name)
      return this.tostr.errorToastr('Please enter name', 'Oops')
    this._admin.updateCompanyType({ name: this.data.name, id: this.data.obj.id })
      .subscribe((resp: Response) => {
        this.tostr.successToastr('Successfully updated', 'Success')
        this.dialogRef.close(true)
      }, (err: Response) => {
        this.tostr.errorToastr(err.statusText, 'Oops')
      })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
