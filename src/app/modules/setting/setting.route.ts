import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SettingComponent } from "./setting.component";


const route: Routes = [
    {
        path: '',
        component: SettingComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(route)],
    exports: [RouterModule]
})

export class SettingRoute { }