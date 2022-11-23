import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PositionTypeRoutingModule } from './position-type-routing.module';
import { AddPositionTypeComponent } from './add-position-type/add-position-type.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { TreoFindByKeyPipeModule } from '@treo/pipes/find-by-key';
import { TreoAutogrowModule } from '@treo/directives/autogrow';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PositionTypeComponent } from './position-type.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [AddPositionTypeComponent, PositionTypeComponent],
  imports: [
    CommonModule,
    PositionTypeRoutingModule,
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
    MatDialogModule,
    MatSidenavModule,
    MatSelectModule
  ]
})
export class PositionTypeModule { }
