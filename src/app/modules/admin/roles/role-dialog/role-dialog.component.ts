import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { AccessRight } from 'app/sidebar/sidebar';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.scss']
})
export class RoleDialogComponent implements OnInit {
  displayedColumns: any = ['name', 'view', 'add', 'edit', 'delete']
  rows: any = []
  constructor(
    private dialogRef: MatDialogRef<RoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    private _admin: AdminService,
    private tostr: ToastrManager,
    private access: AccessRight,
    private loader: AppLoaderService
  ) { }

  ngOnInit(): void {

    if (this.data.title == 'Access Right') {
      this.getAssignRights()
    }
  }


  submit() {
    if (!this.data.name)
      return this.tostr.errorToastr('Please enter name', 'Oops')
    this._admin.addRoles({ name: this.data.name })
      .subscribe((resp: Response) => {
        this.tostr.successToastr('Successfully inserted', 'Success')
        this.dialogRef.close(true)
      }, (err: Response) => {
        this.tostr.errorToastr(err.statusText, 'Oops')
      })
  }

  submitAccessRight() {
    this.loader.start()
    this._admin.assignRight({ roleid: this.data.id, rightsList: this.rows }).subscribe(
      (resp: Response) => {
        this.tostr.successToastr('Successfully assign', 'Success')
        this.dialogRef.close(true)
        this.loader.stop()
      }, (err: Response) => {
        this.loader.stop()
        this.tostr.errorToastr(err.statusText, 'Oops')
      }
    )
  }

  getAssignRights() {
    let modules = this.access.getModules()
    let temp: any[] = modules.map(i => i.name)
    this.loader.start()
    this._admin.getAssignRight(this.data.id).subscribe(
      (resp: any[]) => {
        if (resp.length > 0) {
          resp.forEach(element => {
            let index = temp.indexOf(element.name)
            if (index >= 0) {
              modules[index] = element
            }
          });
        }
        this.rows = modules
        this.loader.stop()
      }, (err: Response) => {
        console.log(err);
        this.loader.stop()
      }
    )
  }

  update() {
    if (!this.data.name)
      return this.tostr.errorToastr('Please enter name', 'Oops')
    this.loader.start()
    this._admin.updateRoles({ name: this.data.name, id: this.data.id })
      .subscribe((resp: Response) => {
        this.loader.stop()
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
