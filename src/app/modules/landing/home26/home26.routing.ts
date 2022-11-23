import { Route } from '@angular/router';
import { LandingHomeComponent } from './home.component';
import { LandingHomeModule } from './home.module';
import { JobapplyComponent } from './jobapply/jobapply.component';

export const landingHomeRoutes: Route[] = [
    {
        path     : '',
        component: LandingHomeComponent
    },
    {
        path     : 'jobapply',
        component: JobapplyComponent
    }
];
