import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoUploaderComponent } from './video-uploader.component';
import { FormsModule } from '@angular/forms';
import { VideoUploaderRouter } from './video-uploader.route';
import { ChatBotService } from '../chatbot/chatbot.service';
import { TalentService } from '../talents/talent.service';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TreoCardModule } from '@treo/components/card';
import { TreoMessageModule } from '@treo/components/message';

@NgModule({
  declarations: [VideoUploaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    VideoUploaderRouter,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    TreoCardModule,
    TreoMessageModule,
    SharedModule
  ],
  providers: [ChatBotService, TalentService]
})

export class VideoUploaderModule { }
