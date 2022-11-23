import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmRoutingModule } from './crm.route';
import { CrmService } from './crm.service';
import { SearchPipe } from 'app/common/Pipes/search.pipe';
import { PipeModule } from 'app/common/Pipes/pipes.module';
import { AdminService } from '../admin/admin.service';



@NgModule({
  imports: [
    CommonModule,
    CrmRoutingModule,
    PipeModule
  ],
  providers: [CrmService, SearchPipe, AdminService],
})
export class CrmModule { }
