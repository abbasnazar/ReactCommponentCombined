import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminRoutingModule } from './superadmin-routing.module';
import { ClientsComponent } from './clients/clients.component';
import { AdminService } from '../admin/admin.service';
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
import { AddClientComponent } from './clients/add-client/add-client.component';
import { AuthService } from '../auth/auth.service';
import { ClientDialogComponent } from './clients/client-dialog/client-dialog.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { AddCurrencyComponent } from './currencies/add-currency/add-currency.component';
import { CountriesComponent } from './countries/countries.component';
import { AddCountryComponent } from './countries/add-country/add-country.component';
import { StatesComponent } from './states/states.component';
import { AddStateComponent } from './states/add-state/add-state.component';
import { CitiesComponent } from './cities/cities.component';
import { AddCityComponent } from './cities/add-city/add-city.component';
import { PipeModule } from 'app/common/Pipes/pipes.module';

import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { InputFieldsModule } from 'app/input-fields/input-fields.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [ClientsComponent,
    AddClientComponent,
    ClientDialogComponent,
    CurrenciesComponent,
    AddCurrencyComponent,
    CountriesComponent,
    AddCountryComponent,
    StatesComponent,
    AddStateComponent,
    CitiesComponent,
    AddCityComponent],
  imports: [
    CommonModule,
    SuperadminRoutingModule,
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
    PipeModule,
    MatRadioModule,
    MatChipsModule,
    MatSidenavModule,
    MatTabsModule,
    InputFieldsModule,
    NgxDatatableModule
  ],
  providers: [AdminService, SearchPipe, AuthService]
})
export class SuperadminModule { }
