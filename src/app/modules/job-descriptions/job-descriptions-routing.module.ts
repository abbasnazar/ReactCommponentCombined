import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobDescriptionsComponent } from './job-descriptions.component';

const routes: Routes = [
  {
    path: '',
    component: JobDescriptionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobDescriptionsRoutingModule { }
