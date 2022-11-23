import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RobotsRoutingModule } from './robots-routing.module';
import { RobotListComponent } from './robot-list/robot-list.component';
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
import { MatTabsModule } from '@angular/material/tabs';
import { TalentService } from '../talents/talent.service';
import { RobotDetailsComponent } from './robot-details/robot-details.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RobotProfileComponent } from './robot-profile/robot-profile.component';
import { ChatBotService } from '../chatbot/chatbot.service';
import { RobotDialogComponent } from './robot-dialog/robot-dialog.component';
import { DashboardRobotsComponent } from './dashboard-robots/dashboard-robots.component';
import { RobotsService } from './robots.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [RobotListComponent, RobotDetailsComponent, RobotProfileComponent, RobotDialogComponent, DashboardRobotsComponent],
  imports: [
    CommonModule,
    RobotsRoutingModule,
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
    MatPaginatorModule,
    NgxDatatableModule
  ],
  providers: [SearchPipe, TalentService, ChatBotService, RobotsService]
})
export class RobotsModule { }
