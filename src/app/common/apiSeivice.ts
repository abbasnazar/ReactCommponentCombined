import { HttpHeaders } from '@angular/common/http';

export class ApiService {

  private port = 9097
  private baseurl = `${window.location.protocol}//${window.location.hostname}:${this.port}`;
  // private baseurl = `${window.location.protocol}//server.jobmojo.ai`  

  path(p) {
    return this.baseurl + p
  }

  getAccessToken = () => {
    let userdetails = JSON.parse(localStorage.getItem('auth'))
    if (userdetails && userdetails.token) {
      let header = new HttpHeaders({
        // 'Content-Type':  'application/json',
        'authToken': userdetails.token
      })
      // console.log('tokenheader',header);

      // header.append()
      return { headers: header }
    }
  }
}