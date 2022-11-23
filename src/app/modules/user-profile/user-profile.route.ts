
import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { UserProfileComponent } from "./user-profile.component";


const route: Route[] = [
    {
        path: '',
        component: UserProfileComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(route)],
    exports: [RouterModule]
})

export class UserProfileRoute { }