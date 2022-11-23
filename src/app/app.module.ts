import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { TreoModule } from '@treo';
import { TreoConfigModule } from '@treo/services/config';
import { TreoMockApiModule } from '@treo/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockDataServices } from 'app/data/mock';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { Root } from './common/root';
import { AuthService } from './modules/auth/auth.service';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AppService } from './app.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginManager } from './common/loginManager';
import { UserProfileComponent } from './modules/user-profile/user-profile.component';
import { AppLoaderComponent } from './common/app-loader/app-loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { RequestTrialComponent } from './modules/landing/request-trial/request-trial.component';
import { FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApplyJobsComponent } from './modules/apply-jobs/apply-jobs.component';
import { LandingHomeComponent } from './modules/landing/home/home.component';
import { LandingHomeModule } from './modules/landing/home/home.module';

const routerConfig: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy',
    useHash: true
};

@NgModule({
    declarations: [
        AppComponent,
        AppLoaderComponent,
        RequestTrialComponent,
        ApplyJobsComponent,
        
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        FormsModule,
        ReactiveFormsModule,
       
        // Treo & Treo Mock API
        TreoModule,
        TreoConfigModule.forRoot(appConfig),
        TreoMockApiModule.forRoot(mockDataServices),

        // Core
        CoreModule,

        // Layout
        LayoutModule,

        // 3rd party modules
        MarkdownModule.forRoot({}),
        ToastrModule.forRoot(),
        MatProgressSpinnerModule,
        MatTableModule,
        MatSortModule,
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        Root,
        AuthService,
        AppService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoginManager,
            multi: true,
        },
    ]
})
export class AppModule {
}
