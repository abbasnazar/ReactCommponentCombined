import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'app/app.service';
import { Root } from 'app/common/root';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SettingDialogComponent } from './setting-dialog/setting-dialog.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingComponent implements OnInit {
  message: any;
  settingObj: any = {}
  updateObj: any = {}
  uploadImage: any;
  imageUrl: string | ArrayBuffer;
  loader: boolean = false;
  constructor(
    private root: Root,
    private _app: AppService,
    private tostr: ToastrManager,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.load()
  }

  load() {
    this._app.getSettings().subscribe(
      (resp: any) => {
        if (resp.length > 0) {
          this.settingObj = resp[0]
          console.log(resp);

        }
      }, (err: Response) => {
        console.log(err);

      }
    )
  }

  openDialog(type, obj = {}): void {
    console.log('modalObj', obj);
    obj['settingid'] = this.settingObj.id
    const dialogRef = this.dialog.open(SettingDialogComponent, {
      width: '500px',
      data: { ...obj, title: type, }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.load()
      }
    });
  }


  save() {
    this.updateObj.id = this.settingObj.id
    this.updateObj.mobile = this.settingObj.mobile
    this.updateObj.hosturl = this.settingObj.hosturl
    this.updateObj.portno = this.settingObj.portno
    this.updateObj.senderemail = this.settingObj.senderemail
    this.updateObj.senderpassword = this.settingObj.senderpassword
    if (this.settingObj.id) {      
      this._app.updateSettings(this.updateObj).subscribe(
        (resp: Response) => {
          this.tostr.successToastr('Successfully updated', 'Success')
        }, (err: Response) => {
          this.tostr.errorToastr(err.statusText, 'Oops')
        }
      )
    } else {
      this._app.insertSettings(this.settingObj).subscribe(
        (resp: Response) => {
          this.tostr.successToastr('Successfully added', 'Success')
        }, (err: Response) => {
          this.tostr.errorToastr(err.statusText, 'Oops')
        }
      )
    }
  }

  back() {
    history.back()
  }



}
