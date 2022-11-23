import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobTypeComponent } from './job-type.component';

const routes: Routes = [
  {
    path: '',
    component: JobTypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobTypeRoutingModule { }
