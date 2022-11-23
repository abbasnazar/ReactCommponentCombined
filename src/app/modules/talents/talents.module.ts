import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TalentsRoutingModule } from './talents-routing.module';
import { ViewTalentsComponent } from './view-talents/view-talents.component';
import { TalentService } from './talent.service';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { AddTalentComponent } from './add-talent/add-talent.component';
import { MatChipsModule } from '@angular/material/chips';
import { AdminService } from '../admin/admin.service';
import { NgxDatatableModule } from "@swimlane/ngx-datatable"
import { MatSelectModule } from '@angular/material/select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TalentProfileComponent } from './talent-profile/talent-profile.component';
import { ChatBotService } from '../chatbot/chatbot.service';


@NgModule({
  declarations: [ViewTalentsComponent, AddTalentComponent, TalentProfileComponent],
  imports: [
    CommonModule,
    TalentsRoutingModule,
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
    NgMultiSelectDropDownModule
  ],
  providers: [TalentService, SearchPipe, AdminService, ChatBotService]
})
export class TalentsModule { }
