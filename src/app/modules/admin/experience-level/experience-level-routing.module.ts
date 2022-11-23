import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExperienceLevelComponent } from './experience-level.component';

const routes: Routes = [
  {
    path: '',
    component: ExperienceLevelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperienceLevelRoutingModule { }
