import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetadataComponent } from './metadata.component';

const routes: Routes = [
  {
    path: '',
    component: MetadataComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetadataRoutingModule { }
