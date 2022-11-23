import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { RequestTrialComponent } from 'app/modules/landing/request-trial/request-trial.component';
import { ApplyJobsComponent } from 'app/modules/apply-jobs/apply-jobs.component';
// import { JobapplyComponent } from './modules/landing/home/jobapply/jobapply.component';

// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

    // Redirect signed in user to the '/example'
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard' },

    // Auth routes (guest)
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule) },
            { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule) },
            { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule) },
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
            { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule) },
            { path: 'uploadvideo', loadChildren: () => import('app/modules/video-uploader/video-uploader.module').then(m => m.VideoUploaderModule) },
            { path: 'thankyou', loadChildren: () => import('app/modules/thankyou/thankyou.module').then(m => m.ThankyouModule) },
            { path: 'jobdescription', loadChildren: () => import('app/modules/job-descriptions/job-descriptions.module').then(m => m.JobDescriptionsModule) },
            { path: 'submissiondetails', loadChildren: () => import('app/modules/submission-details/submission-details.module').then(m => m.SubmissionDetailsModule) }
        ]
    },

    // Auth routes (logged in)
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule) },
            { path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule) }
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule) },
           
            // { path: 'requestTrial', component:RequestTrialComponent },
            // { path: 'jobapply', component:JobapplyComponent },

            // { path: 'apply-jobs', component:ApplyJobsComponent },
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },

        children: [

            // Example
            { path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule) },
            { path: 'dashboard', loadChildren: () => import('app/modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'admin', loadChildren: () => import('app/modules/admin/admin.module').then(m => m.AdminModule) },
            { path: 'jobs', loadChildren: () => import('app/modules/jobs/jobs.module').then(m => m.JobsModule) },
            { path: 'robots', loadChildren: () => import('app/modules/robots/robots.module').then(m => m.RobotsModule) },
            { path: 'talent', loadChildren: () => import('app/modules/talents/talents.module').then(m => m.TalentsModule) },
            { path: 'crm', loadChildren: () => import('app/modules/crm/crm.module').then(m => m.CrmModule) },
            { path: 'profile', loadChildren: () => import('app/modules/user-profile/user-profile.module').then(m => m.UserProfileModule) },
            { path: 'setting', loadChildren: () => import('app/modules/setting/setting.module').then(m => m.SettingModule) },
            { path: 'superadmin', loadChildren: () => import('app/modules/superadmin/superadmin.module').then(m => m.SuperadminModule) },

            // 404 & Catch all
            // { path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/error-404/error-404.module').then(m => m.Error404Module) },
            // { path: '**', redirectTo: '404-not-found' }
        ]
    }
];
