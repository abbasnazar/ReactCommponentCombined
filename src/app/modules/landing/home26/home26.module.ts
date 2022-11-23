import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'app/shared/shared.module';
import { LandingHomeComponent } from 'app/modules/landing/home/home.component';
import { landingHomeRoutes } from 'app/modules/landing/home/home.routing';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { AppLoaderService } from 'app/common/app-loader/app-loader.service';
import { EmailValidation } from 'app/common/emailvalidation';
import moment from 'moment';
import { ToastrManager } from 'ng6-toastr-notifications';
import { TalentService } from '../../talents/talent.service';


//add


import { CommonModule } from '@angular/common';
import { SearchPipe } from 'app/common/Pipes/search.pipe';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TreoAutogrowModule } from '@treo/directives/autogrow';
import { TreoFindByKeyPipeModule } from '@treo/pipes/find-by-key';

import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { JobapplyComponent } from 'app/modules/landing/home/jobapply/jobapply.component';


import { MatChipsModule } from '@angular/material/chips';

import { NgxDatatableModule } from "@swimlane/ngx-datatable"
import { MatSelectModule } from '@angular/material/select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';




// end talent copied



@NgModule({
    
        declarations: [ 
            LandingHomeComponent,
            JobapplyComponent,
             ],
            


        imports: [
          CommonModule,
          MatAutocompleteModule,
          MatButtonModule,
          MatCheckboxModule,
          MatDatepickerModule,
          MatDividerModule,
          MatFormFieldModule,
          MatIconModule,
          MatInputModule,
          MatMenuModule,
          MatMomentDateModule,
          MatProgressBarModule,
          MatRippleModule,
          MatTooltipModule,
          TreoAutogrowModule,
          TreoFindByKeyPipeModule,
          SharedModule,
          FormsModule,
          MatTabsModule,
          MatSidenavModule,
          MatChipsModule,
          NgxDatatableModule,
          MatSelectModule,
          NgMultiSelectDropDownModule,
         
          
          
          
          RouterModule.forChild(landingHomeRoutes),
          MatButtonModule,
          SharedModule
        ],


    providers: [TalentService,SearchPipe]
  })
  export class LandingHomeModule { }