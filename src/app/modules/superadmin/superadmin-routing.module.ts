import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CitiesComponent } from './cities/cities.component';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { ClientsComponent } from './clients/clients.component';
import { CountriesComponent } from './countries/countries.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { StatesComponent } from './states/states.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'clients',
      component: ClientsComponent
    },
    {
      path: 'addclient',
      component: AddClientComponent
    },
    {
      path: 'currencies',
      component: CurrenciesComponent
    },
    {
      path: 'countries',
      component: CountriesComponent
    },
    {
      path: 'states',
      component: StatesComponent
    },
    {
      path: 'cities',
      component: CitiesComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminRoutingModule { }
