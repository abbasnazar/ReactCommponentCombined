import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddJobComponent } from './add-job/add-job.component';
import { ViewJobsComponent } from './view-jobs/view-jobs.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'addjob',
        component: AddJobComponent
      },
      {
        path: 'viewjobs',
        component: ViewJobsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
