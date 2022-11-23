import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTalentComponent } from './add-talent/add-talent.component';
import { TalentProfileComponent } from './talent-profile/talent-profile.component';
import { ViewTalentsComponent } from './view-talents/view-talents.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'viewtalent',
        component: ViewTalentsComponent
      },
      {
        path: 'addtalent',
        component: AddTalentComponent
      },
      {
        path: 'talentprofile',
        component: TalentProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TalentsRoutingModule { }
