import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { AuthService } from 'app/modules/auth/auth.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.scss']
})
export class ClientDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    private _auth: AuthService,
    private tostr: ToastrManager,
    private loader: AppLoaderService
  ) { }

  ngOnInit(): void {
  }




  update() {
    this.loader.start()
    this._auth.userActivateDeactivate({ isactive: this.data.isactive ? 0 : 1, email: this.data.email })
      .subscribe(
        (resp: Response) => {
          this.tostr.successToastr('Successfully updated', 'Success')
          this.dialogRef.close(true)
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
