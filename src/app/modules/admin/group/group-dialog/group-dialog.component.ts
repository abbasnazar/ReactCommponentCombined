import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss']
})
export class GroupDialogComponent implements OnInit {
  roles: any = []
  selectedRoles: any
  constructor(
    private dialogRef: MatDialogRef<GroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    private _admin: AdminService,
    private tostr: ToastrManager,
    private loader: AppLoaderService
  ) { }

  ngOnInit(): void {
    if (this.data.title == 'Assign Roles') {
      this.selectedRoles = this.data.rolesList.map(i => i.id)

      this.getRoles()
    }

  }

  submit() {
    if (!this.data.name)
      return this.tostr.errorToastr('Please enter name', 'Oops')
    this.loader.start()
    this._admin.addGroup({ name: this.data.name })
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
    this._admin.updateGroup({ name: this.data.name, id: this.data.id })
      .subscribe((resp: Response) => {
        this.tostr.successToastr('Successfully updated', 'Success')
        this.dialogRef.close(true)
        this.loader.stop()
      }, (err: Response) => {
        this.loader.stop()
        this.tostr.errorToastr(err.statusText, 'Oops')
      })
  }

  updateRoles() {
    this.loader.start()
    let roleList = this.selectedRoles.map(i => { return { id: i } })
    this._admin.assignRoles({ groupid: this.data.id, roleList })
      .subscribe(
        (resp: Response) => {
          this.tostr.successToastr('Successfully assign', 'Success')
          this.dialogRef.close(true)
          this.loader.stop()
        }, (err: Response) => {
          this.loader.stop()
          this.tostr.errorToastr(err.statusText, 'Oops')
        })

  }

  getRoles() {
    this.loader.start()
    this._admin.getRoles().subscribe(
      (resp: Response) => {
        this.roles = resp
        this.loader.stop()
      }, (err: Response) => {
        this.loader.stop()
      }
    )
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
