import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { AuthService } from '../auth/auth.service';
import { SharedModule } from 'app/shared/shared.module';
import { TreoMessageModule } from '@treo/components/message';
import { TreoCardModule } from '@treo/components/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { SettingRoute } from './setting.route';
import { MatRadioModule } from '@angular/material/radio';
import { SettingDialogComponent } from './setting-dialog/setting-dialog.component';



@NgModule({
  declarations: [SettingComponent, SettingDialogComponent],
  imports: [
    CommonModule,
    SettingRoute,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    TreoCardModule,
    TreoMessageModule,
    SharedModule,
    MatRadioModule
  ],
  providers: [AuthService]

})
export class SettingModule { }
