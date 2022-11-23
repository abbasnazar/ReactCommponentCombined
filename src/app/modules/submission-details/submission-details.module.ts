import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubmissionDetailsRoutingModule } from './submission-details-routing.module';
import { SubmissionDetailsComponent } from './submission-details.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TalentService } from '../talents/talent.service';


@NgModule({
  declarations: [SubmissionDetailsComponent],
  imports: [
    CommonModule,
    SubmissionDetailsRoutingModule,
    NgxDatatableModule,
    SharedModule,
    FormsModule

  ],
  providers: [TalentService]
})
export class SubmissionDetailsModule { }
