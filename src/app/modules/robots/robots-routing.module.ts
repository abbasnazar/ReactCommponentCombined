import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardRobotsComponent } from './dashboard-robots/dashboard-robots.component';
import { RobotDetailsComponent } from './robot-details/robot-details.component';
import { RobotListComponent } from './robot-list/robot-list.component';
import { RobotProfileComponent } from './robot-profile/robot-profile.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'robotlist',
        component: RobotListComponent
      },
      {
        path: 'robotdetails',
        component: RobotDetailsComponent,
        // children: [
        //   {
        //     path: 'side',
        //     component: RobotSideDetailsComponent
        //   }
        // ]
      },
      {
        path: 'robot_profile',
        component: RobotProfileComponent
      },
      {
        path: 'bystatus/:status',
        component: DashboardRobotsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RobotsRoutingModule { }
