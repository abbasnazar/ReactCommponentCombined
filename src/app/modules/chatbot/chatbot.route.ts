import { Routes, RouterModule } from "@angular/router";
import { ChatbotComponent } from './chatbot.component';
import { NgModule } from '@angular/core';


const route: Routes = [
    {
        path: '',
        component: ChatbotComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(route)],
    exports: [RouterModule]
})

export class ChatbotRoute { }