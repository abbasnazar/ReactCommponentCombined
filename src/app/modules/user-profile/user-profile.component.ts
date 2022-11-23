import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Root } from 'app/common/root';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent implements OnInit {
  message: any;
  profileObj: any = {}
  uploadImage: any;
  imageUrl: string | ArrayBuffer;
  loader: boolean = false;
  constructor(
    private root: Root,
    private _auth: AuthService,
    private tostr: ToastrManager
  ) { }

  ngOnInit(): void {
    this.profileObj = this.root.getUser()
  }

  save() {
    let fd = new FormData()
    fd.append('file', this.uploadImage)
    if (!this.profileObj.name)
      return this.tostr.errorToastr('Please enter name', 'Oops')
    if (!this.profileObj.mobile)
      return this.tostr.errorToastr('Please enter mobile', 'Oops')
    fd.append('data', JSON.stringify({ name: this.profileObj.name, mobile: this.profileObj.mobile }))
    this.loader = true
    this._auth.updateUser(fd).subscribe(
      (resp: Response) => {
        this.tostr.successToastr('Successfully updated')
        // console.log(resp);
        if (resp[0].pic)
          this.profileObj.pic = resp[0].pic

        localStorage.setItem('auth', JSON.stringify(this.profileObj))
        location.reload()
        this.loader = false
      }, (err: Response) => {
        this.loader = false
        this.tostr.errorToastr(err.statusText, 'Oops')
      }
    )
  }



  upload(file) {
    this.uploadImage = file[0]
    if (file && file[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = (event) => {
        // console.log(event.target['result']);
        this.imageUrl = event.target['result'];
      }
    }
  }

  getProfilePic() {
    if (!this.profileObj.pic)
      return null
    return this._auth.getFile(this.profileObj.pic)
  }


  back() {
    history.back()
  }



}
