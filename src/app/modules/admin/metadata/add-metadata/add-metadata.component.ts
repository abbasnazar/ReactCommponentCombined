import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-metadata',
  templateUrl: './add-metadata.component.html',
  styleUrls: ['./add-metadata.component.scss']
})
export class AddMetadataComponent implements OnInit {
  fieldTypeList: any = ['Number', 'Text', 'Dropdown', 'Date']
  constructor(
    private dialogRef: MatDialogRef<AddMetadataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    private _admin: AdminService,
    private tostr: ToastrManager,
    private loader: AppLoaderService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    // if (this.data.title == 'Update')
    //   this.data = this.data.obj

  }

  submit() {
    if (!this.data.fieldname)
      return this.tostr.errorToastr('Please enter fieldname', 'Oops')
    if (!this.data.fieldtype)
      return this.tostr.errorToastr('Please select fieldtype', 'Oops')
    if (this.data.fieldtype == 'Dropdown' && !this.data.json)
      return this.tostr.errorToastr('Please enter dropdown data', 'Oops')
    if (this.data.mandatory == null && this.data.mandatory == undefined)
      return this.tostr.errorToastr('Please select mandatory or not', 'Oops')

    let obj = {
      tablename: this.data.tablename,
      fieldname: this.data.fieldname,
      fieldtype: this.data.fieldtype,
      mandatory: this.data.mandatory,
      json: this.data.json
    }

    if (this.data.fieldtype != 'Dropdown')
      obj['json'] = null
    this.loader.start()
    this._admin.addMetaData(obj)
      .subscribe((resp: Response) => {
        this.tostr.successToastr('Successfully inserted', 'Success')
        this.dialogRef.close(true)
        this.loader.stop()
      }, (err: Response) => {
        this.tostr.errorToastr(err.statusText, 'Oops')
        this.loader.stop()
      })
  }

  update() {
    if (!this.data.fieldname)
      return this.tostr.errorToastr('Please enter fieldname', 'Oops')
    if (!this.data.fieldtype)
      return this.tostr.errorToastr('Please select fieldtype', 'Oops')
    if (this.data.fieldtype == 'Dropdown' && !this.data.json)
      return this.tostr.errorToastr('Please enter dropdown data', 'Oops')
    if (this.data.mandatory == null && this.data.mandatory == undefined)
      return this.tostr.errorToastr('Please select mandatory or not', 'Oops')

    let obj = {
      id: this.data.id,
      tablename: this.data.tablename,
      fieldname: this.data.fieldname,
      fieldtype: this.data.fieldtype,
      mandatory: this.data.mandatory,
      json: this.data.json.toString()
    }

    if (this.data.fieldtype != 'Dropdown')
      obj['json'] = null

    this.loader.start()
    this._admin.updateMetaData(obj)
      .subscribe((resp: Response) => {
        this.tostr.successToastr('Successfully updated', 'Success')
        this.dialogRef.close(true)
        this.loader.stop()
      }, (err: Response) => {
        this.tostr.errorToastr(err.statusText, 'Oops')
        this.loader.stop()
      })
  }

  activateDeactive() {
    this.loader.start()
    this._admin.updateMetaData({
      id: this.data.id,
      isactive: !this.data.isactive
    }).subscribe(
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
