import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.route';
import { AdminService } from './admin.service';
import { SearchPipe } from 'app/common/Pipes/search.pipe';
import { PipeModule } from 'app/common/Pipes/pipes.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AuthService } from '../auth/auth.service';



@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    PipeModule
  ],
  providers: [AdminService, SearchPipe, AuthService],
})
export class AdminModule { }
