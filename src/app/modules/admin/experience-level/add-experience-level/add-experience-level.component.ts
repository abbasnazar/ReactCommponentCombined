import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-experience-level',
  templateUrl: './add-experience-level.component.html',
  styleUrls: ['./add-experience-level.component.scss']
})
export class AddExperienceLevelComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AddExperienceLevelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    private _admin: AdminService,
    private tostr: ToastrManager,
    private loader: AppLoaderService
  ) { }

  ngOnInit(): void {
    if (this.data.title == 'Update') {
      let temp = this.data.obj.name ? this.data.obj.name.split('-') : []
      if (temp.length > 0)
        this.data.from = temp[0]
      if (temp.length > 1)
        this.data.till = temp[1]

    }

  }


  submit() {
    if (this.data.from == null || this.data.from == undefined)
      return this.tostr.errorToastr('From field is empty', 'Oops')
    if (this.data.from < 0 || this.data.till < 0)
      return this.tostr.errorToastr('Negative value not allowed', 'Oops')
    if (this.data.till == null || this.data.till == undefined)
      return this.tostr.errorToastr('Till field is empty', 'Oops')
    if (this.data.from > this.data.till)
      return this.tostr.errorToastr('From is greater than till', 'Oops')

    this.loader.start()
    this._admin.addExperienceLevel({ name: `${this.data.from}-${this.data.till}` }).subscribe(
      (resp: Response) => {
        this.tostr.successToastr('Successfully added', 'Success')
        this.dialogRef.close(true);
        this.loader.stop()
      }, (err: Response) => {
        this.tostr.errorToastr(err.statusText, 'Oops')
        this.loader.stop()
      }
    )
  }

  update() {
    if (this.data.from == null || this.data.from == undefined)
      return this.tostr.errorToastr('From field is empty', 'Oops')
    if (this.data.from < 0 || this.data.till < 0)
      return this.tostr.errorToastr('Negative value not allowed', 'Oops')
    if (this.data.till == null || this.data.till == undefined)
      return this.tostr.errorToastr('Till field is empty', 'Oops')
    if (this.data.from > this.data.till)
      return this.tostr.errorToastr('From is greater than till', 'Oops')
    this.loader.start()
    this._admin.updateExperienceLevel({ id: this.data.obj.id, name: `${this.data.from}-${this.data.till}` })
      .subscribe(
        (resp: Response) => {
          this.tostr.successToastr('Successfully Updated', 'Success')
          this.dialogRef.close(true);
          this.loader.stop()
        }, (err: Response) => {
          this.tostr.errorToastr(err.statusText, 'Oops')
          this.loader.stop()
        }
      )
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
