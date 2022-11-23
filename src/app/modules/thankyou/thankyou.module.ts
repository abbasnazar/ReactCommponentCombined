import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThankyouRoutingModule } from './thankyou-routing.module';
import { ThankyouComponent } from './thankyou.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TreoCardModule } from '@treo/components/card';
import { TreoMessageModule } from '@treo/components/message';
import { SharedModule } from 'app/shared/shared.module';
import { TalentService } from '../talents/talent.service';
import { ChatBotService } from '../chatbot/chatbot.service';


@NgModule({
  declarations: [ThankyouComponent],
  imports: [
    CommonModule,
    ThankyouRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    TreoCardModule,
    TreoMessageModule,
    SharedModule
  ],
  providers: [TalentService, ChatBotService]
})
export class ThankyouModule { }
