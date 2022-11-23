import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { AuthService } from 'app/modules/auth/auth.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  groups: any = []
  selectedGroup: any = []
  constructor(
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    private _admin: AdminService,
    private tostr: ToastrManager,
    private loader: AppLoaderService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    if (this.data.title == 'Assign Group') {
      this.selectedGroup = this.data.groupList.map(i => i.id)
      this.loadGroup()
    }
  }

  loadGroup() {
    this._admin.getGroups().subscribe(
      (resp: Response) => {
        this.groups = resp
      }
    )
  }

  update() {
    if (this.selectedGroup.length == 0)
      return this.tostr.errorToastr('Please select minimum one group', 'Oops')
    let departmentList = this.selectedGroup.map(i => { return { id: i } })
    this.loader.start()
    this._admin.assignGroup({ employeeid: this.data.id, departmentList })
      .subscribe(
        (resp: Response) => {
          this.tostr.successToastr('Successfully assign', 'Success')
          this.dialogRef.close(true)
          this.loader.stop()
        }, (err: Response) => {
          this.tostr.errorToastr(err.statusText, 'Oops')
          this.loader.stop()
        }
      )
  }

  closeDialog(isLoad = false): void {
    this.dialogRef.close(isLoad);
  }

  acrivateDeactivateUser() {
    this.loader.start()
    this._auth.userActivateDeactivate({ email: this.data.email, isactive: !this.data.isactive })
      .subscribe((resp: Response) => {
        this.loader.stop()
        this.tostr.successToastr(`Successfully ${this.data.isactive ? 'Deactivated' : 'Activated'}`, 'Success')
        this.closeDialog(true)
      }, (err: Response) => {
        this.loader.stop()
        this.tostr.errorToastr(err.statusText, 'Error')
      })
  }

}
