import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { Root } from 'app/common/root';
import { ApiService } from 'app/common/apiSeivice';

@Injectable()
export class AuthService {
    // Private
    private _authenticated: boolean;
    private apiHelper = new ApiService()

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private http: HttpClient,
        private root: Root
    ) {
        // Set the defaults
        this._authenticated = false;
    }


    signIn(credentials: { email: string, password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this.http.post(this.apiHelper.path('/api/auth/verify'), credentials).pipe(
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.root.userInFo(response[0])

                // Set the authenticated flag to true
                this._authenticated = true;

                // Return a new observable with the response
                return of(response);
            })
        );
    }


    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('auth');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        let auth = localStorage.getItem('auth')
        let user = auth ? JSON.parse(auth) : {}

        if (user.token)
            return of(true)
        else
            return of(false)
    }


    // auth apis
    // -----------------------------------------------
    getCity = () => {
        return this.http.get(this.apiHelper.path('/api/cities/get'))
    }
    Register = (userObj) => {
        return this.http.post(this.apiHelper.path('/api/auth/register'), userObj)
    }

    forgotPassword = (email) => {
        return this.http.get(this.apiHelper.path('/api/auth/forgotpassword?email=' + email))
    }

    resetPassword = (password, token) => {
        return this.http.get(this.apiHelper.path(`/api/auth/resetpassword/${password}?token=${token}`))
    }

    getAccessRights = () => {
        return this.http.get(this.apiHelper.path(`/api/auth/getaccessrights`), this.apiHelper.getAccessToken())
    }

    updateUser = (obj) => {
        return this.http.post(this.apiHelper.path(`/api/auth/update`), obj, this.apiHelper.getAccessToken())
    }

    changePassword = (obj) => {
        return this.http.post(this.apiHelper.path(`/api/auth/changepassword`), obj, this.apiHelper.getAccessToken())
    }

    userActivateDeactivate = (obj) => {
        return this.http.post(this.apiHelper.path(`/api/auth/useractivatedeactivate`), obj, this.apiHelper.getAccessToken())
    }
    uploadLogo = (obj) => {
        return this.http.post(this.apiHelper.path(`/api/auth/uploadlogo`), obj, this.apiHelper.getAccessToken())
    }

    updateAdminBySuperadmin = (obj) => {
        return this.http.post(this.apiHelper.path(`/api/auth/updateuser`), obj, this.apiHelper.getAccessToken())
    }

    getFile(filepath) {
        return this.apiHelper.path(`/api/file/${filepath}`)
    }

}
