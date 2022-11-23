import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { AdminService } from 'app/modules/admin/admin.service';
import { AuthService } from 'app/modules/auth/auth.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddClientComponent implements OnInit {
  cityList: any = []
  client: any = {}
  constructor(
    private _auth: AuthService,
    private loader: AppLoaderService,
    private tostr: ToastrManager,
    private _admin: AdminService,
    private router: Router
  ) {
    let temp = sessionStorage.getItem('client')
    sessionStorage.removeItem('client')
    if (temp)
      this.client = JSON.parse(temp)
  }

  ngOnInit(): void {
    this.getCity()
  }

  submit() {
    let obj = {
      "name": this.client.name,
      "mobile": this.client.mobile,
      "email": this.client.email,
      "company": this.client.company,
      "cityid": this.client.cityid,
      "location": this.client.location,
      "address": this.client.address,
      "pincode": this.client.pincode
    }
    this.loader.start()
    if (!this.client.id) {
      obj['password'] = this.client.password
      this._auth.Register(obj).subscribe(
        (resp: Response) => {
          this.loader.stop()
          this.tostr.successToastr('Successfully Registered', 'Success')
          this.gotoClientView()
        }, (err: Response) => {
          this.loader.stop()
          console.log(err);
          this.tostr.errorToastr(err.statusText, 'Oops')

        }
      )
    } else {
      obj['id'] = this.client.id
      this._auth.updateAdminBySuperadmin(obj).subscribe(
        (resp: Response) => {
          this.loader.stop()
          this.tostr.successToastr('Successfully Registered', 'Success')
          this.gotoClientView()
        }, (err: Response) => {
          this.loader.stop()
          console.log(err);
          this.tostr.errorToastr(err.statusText, 'Oops')

        }
      )
    }
  }

  getCity() {
    this._admin.getCity().subscribe(
      (resp: Response) => {
        this.cityList = resp
        console.log(resp);

      }
    )
  }

  gotoClientView() {
    this.client = {}
    this.router.navigateByUrl('/superadmin/clients')
  }

}



