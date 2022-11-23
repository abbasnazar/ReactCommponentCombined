import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from './chatbot.component';
import { ChatbotRoute } from './chatbot.route';
import { FormsModule } from '@angular/forms';
import { ChatBotService } from './chatbot.service';
import { TalentService } from '../talents/talent.service';
// import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ChatbotComponent],
  imports: [
    CommonModule,
    ChatbotRoute,
    FormsModule,
    // SharedModule
  ],
  providers:[ChatBotService,TalentService]
  
})

export class ChatbotModule { }
