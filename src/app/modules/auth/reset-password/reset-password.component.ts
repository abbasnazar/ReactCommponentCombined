import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { TreoAnimations } from '@treo/animations';
import { TreoValidators } from '@treo/validators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector     : 'auth-reset-password',
    templateUrl  : './reset-password.component.html',
    styleUrls    : ['./reset-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : TreoAnimations
})
export class AuthResetPasswordComponent implements OnInit, OnDestroy
{
    resetPasswordForm: FormGroup;
    message: any;
    password: string
    vpassword: string
    private token: string
    hide: boolean

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _formBuilder: FormBuilder,
        private activeRoute: ActivatedRoute,
        private _auth: AuthService,
        private route: Router
    )
    {
        // Set the defaults
        this.message = null;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.token = activeRoute.snapshot.queryParams.token
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.resetPasswordForm = this._formBuilder.group({
                password       : ['', Validators.required],
                passwordConfirm: ['', Validators.required]
            },
            {
                validators: TreoValidators.mustMatch('password', 'passwordConfirm')
            }
        );
    }

    submit(): void {
        console.log(this.password , this.vpassword);
        
        if (this.resetPasswordForm.invalid){
            return;
        }
        this._auth.resetPassword(this.resetPasswordForm.value.password, this.token)
            .subscribe((resp: Response) => {
            // Disable the form
            this.resetPasswordForm.disable();

            // Hide the message
            this.message = null;
            setTimeout(() => {

                // Re-enable the form
                this.resetPasswordForm.enable();
    
                // Reset the form
                this.resetPasswordForm.reset({});
    
                // Show the message
                this.message = {
                    appearance: 'outline',
                    content   : 'Your password has been reset.',
                    shake     : false,
                    showIcon  : false,
                    type      : 'success'
                };
            }, 1000);            
          }, (err: Response) => {
            this.message = null
            this.resetPasswordForm.enable();
            this.message = {
                appearance: 'outline',
                content: err.statusText,
                shake: false,
                showIcon: false,
                type: 'error'
            };
        })
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
