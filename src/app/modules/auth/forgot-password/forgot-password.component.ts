import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TreoAnimations } from '@treo/animations';
import { AuthService } from '../auth.service';

@Component({
    selector: 'auth-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: TreoAnimations
})
export class AuthForgotPasswordComponent implements OnInit {
    forgotPasswordForm: FormGroup;
    message: any;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _auth: AuthService
    ) {
        // Set the defaults
        this.message = null;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Send the reset link
     */
    sendResetLink(): void {
        // Do nothing if the form is invalid
        if (this.forgotPasswordForm.invalid) {
            return;
        }

        // Disable the form
        this.forgotPasswordForm.disable();
        console.log('email=============>', this.forgotPasswordForm.value);


        this._auth.forgotPassword(this.forgotPasswordForm.value.email)
            .subscribe((resp: Response) => {
                this.message = null
                // Re-enable the form
                this.forgotPasswordForm.enable();

                // Reset the form
                this.forgotPasswordForm.reset({});

                // Show the message
                this.message = {
                    appearance: 'outline',
                    content: 'Password reset sent! You\'ll receive an email if you are registered on our system.',
                    shake: false,
                    showIcon: false,
                    type: 'success'
                };

            }, (err: Response) => {
                this.message = null
                this.forgotPasswordForm.enable();
                this.message = {
                    appearance: 'outline',
                    content: err.statusText,
                    shake: false,
                    showIcon: false,
                    type: 'error'
                };
            })

        // Hide the message
        // this.message = null;

        // Do your action here...

        // Emulate server delay
        // setTimeout(() => {

        //     // Re-enable the form
        //     this.forgotPasswordForm.enable();

        //     // Reset the form
        //     this.forgotPasswordForm.reset({});

        //     // Show the message
        //     this.message = {
        //         appearance: 'outline',
        //         content: 'Password reset sent! You\'ll receive an email if you are registered on our system.',
        //         shake: false,
        //         showIcon: false,
        //         type: 'success'
        //     };
        // }, 1000);
    }
}
