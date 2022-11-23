import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-custom-email',
  templateUrl: './custom-email.component.html',
  styleUrls: ['./custom-email.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomEmailComponent implements OnInit {
  html: string = ''
  isloader: boolean
  emailType: string = 'Chat'
  constructor(
    private _admin: AdminService,
    private tostr: ToastrManager
  ) { }

  ngOnInit() {
    this.load()
  }

  load() {
    document.getElementById('editable').innerHTML = ''
    if (!this.emailType)
      return this.tostr.errorToastr('Please select email type ', 'Oops')
    this.isloader = true

    this._admin.getEmailTemp(this.emailType).subscribe(
      (resp: Response) => {
        document.getElementById('editable').innerHTML = resp[0].data
        this.isloader = false
      }, (err: Response) => {
        this.isloader = false
        // this.tostr.errorToastr(err.statusText, 'Oops')
        this.tostr.errorToastr('Customise Message not configured', 'Oops')
      }
    )
  }

  save(e) {
    console.log('save', this.emailType);
    if (!this.emailType)
      return this.tostr.errorToastr('Please select email type ', 'Oops')

    this.isloader = true
    this._admin.uploadEmailTemp({ data: `${e}`, filename: this.emailType }).subscribe(
      (resp: Response) => {
        this.isloader = false
        this.tostr.successToastr('Successfully saved', 'Success')
      }, (err: Response) => {
        this.isloader = false
        this.tostr.errorToastr(err.statusText, 'Oops')

      }
    )


  }


}
