import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { AngularPaginationModule } from '@anishg/angular-pagination'
import { InputFieldsModule } from 'app/input-fields/input-fields.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        AngularPaginationModule,
        InputFieldsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        AngularPaginationModule,
        InputFieldsModule,
        MatPaginatorModule
    ]
})
export class SharedModule {
}
