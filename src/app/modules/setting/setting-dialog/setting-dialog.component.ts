import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'app/app.service';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-setting-dialog',
  templateUrl: './setting-dialog.component.html',
  styleUrls: ['./setting-dialog.component.scss']
})
export class SettingDialogComponent implements OnInit {
  settingObj: any = {}
  loader: boolean
  constructor(
    private dialogRef: MatDialogRef<SettingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    private _app: AppService,
    private tostr: ToastrManager
  ) { }

  ngOnInit(): void {
    console.log('Model data', this.data);
    this.settingObj.settingid = this.data.settingid
    if (this.data.id) {
      this.settingObj.id = this.data.id
      this.settingObj.username = this.data.username
      this.settingObj.password = this.data.password
      this.settingObj.email = this.data.email
      this.settingObj.emailpassword = this.data.emailpassword
      this.settingObj.emailhost = this.data.emailhost
      this.settingObj.emailport = this.data.emailport
    }
  }

  save() {
    if (!this.settingObj.username)
      return this.tostr.errorToastr('Please enter username', 'Error')
    if (!this.settingObj.password)
      return this.tostr.errorToastr('Please enter password', 'Error')
    if (!this.settingObj.email)
      return this.tostr.errorToastr('Please enter email', 'Error')
    if (!this.settingObj.emailpassword)
      return this.tostr.errorToastr('Please enter email password', 'Error')
    if (!this.settingObj.emailhost)
      return this.tostr.errorToastr('Please enter email host', 'Error')
    if (!this.settingObj.emailport)
      return this.tostr.errorToastr('Please enter email port', 'Error')

    if (this.data.id) {
      this.loader = true
      this._app.updateRpaSettings(this.settingObj).subscribe(
        (resp: Response) => {
          this.tostr.successToastr('Successfully added', 'Success')
          this.loader = false
          this.closeDialog(true)
        }, (err: Response) => {
          this.tostr.successToastr(err.statusText, 'Error')
          this.loader = false
        }
      )
    } else {
      this.loader = true
      this._app.insertRpaSettings(this.settingObj).subscribe(
        (resp: Response) => {
          this.tostr.successToastr('Successfully updated', 'Success')
          this.loader = false
          this.closeDialog(true)
        }, (err: Response) => {
          this.tostr.successToastr(err.statusText, 'Error')
          this.loader = false
        }
      )

    }

  }

  delete() {
    this._app.deleteRpaSettings(this.data.id).subscribe(
      (resp: Response) => {
        this.tostr.successToastr('Successfully deleted', 'Success')
        this.loader = false
        this.closeDialog(true)
      }, (err: Response) => {
        this.tostr.errorToastr(err.statusText, 'Error')
        this.loader = false
      }
    )
  }


  closeDialog(isload = false): void {
    this.dialogRef.close(isload);
  }

}

