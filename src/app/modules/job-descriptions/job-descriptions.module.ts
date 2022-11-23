import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobDescriptionsRoutingModule } from './job-descriptions-routing.module';
import { JobDescriptionsComponent } from './job-descriptions.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChatBotService } from '../chatbot/chatbot.service';


@NgModule({
  declarations: [JobDescriptionsComponent],
  imports: [
    CommonModule,
    JobDescriptionsRoutingModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [ChatBotService]
})


export class JobDescriptionsModule { }
