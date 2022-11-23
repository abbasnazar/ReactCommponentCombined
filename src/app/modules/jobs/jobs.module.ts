import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { AddJobComponent } from './add-job/add-job.component';
import { ViewJobsComponent } from './view-jobs/view-jobs.component';
import { JobsService } from './jobs.service';
import { SearchPipe } from 'app/common/Pipes/search.pipe';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
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
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { AdminService } from '../admin/admin.service';
import { MatChipsModule } from '@angular/material/chips';
import { PipeModule } from 'app/common/Pipes/pipes.module';
import { JobDialogComponent } from './job-dialog/job-dialog.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TalentService } from '../talents/talent.service';
import { MatTabsModule } from '@angular/material/tabs';
import { InputFieldsModule } from 'app/input-fields/input-fields.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [AddJobComponent, ViewJobsComponent, JobDialogComponent],
  imports: [
    CommonModule,
    JobsRoutingModule,
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
    MatRadioModule,
    MatChipsModule,
    PipeModule,
    MatSidenavModule,
    MatTabsModule,
    InputFieldsModule,
    NgMultiSelectDropDownModule,
    NgxDatatableModule
  ],
  providers: [JobsService, SearchPipe, AdminService, TalentService]
})
export class JobsModule { }
