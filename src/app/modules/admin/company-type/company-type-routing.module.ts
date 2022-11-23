import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyTypeComponent } from './company-type.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyTypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyTypeRoutingModule { }
