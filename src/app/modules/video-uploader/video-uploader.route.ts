import { Routes, RouterModule } from "@angular/router";
import { VideoUploaderComponent } from './video-uploader.component';
import { NgModule } from '@angular/core';


const route: Routes = [
    {
        path: '',
        component: VideoUploaderComponent
    }
]



@NgModule({
    imports: [RouterModule.forChild(route)],
    exports: [RouterModule]
})

export class VideoUploaderRouter { }