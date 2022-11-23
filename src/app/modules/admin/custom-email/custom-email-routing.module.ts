import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomEmailComponent } from './custom-email.component';

const routes: Routes = [
  {
    path: '',
    component: CustomEmailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomEmailRoutingModule { }
