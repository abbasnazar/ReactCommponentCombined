import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'jobtype',
                loadChildren: () => import('./job-type/job-type.module').then(m => m.JobTypeModule)
            },
            {
                path: 'companytype',
                loadChildren: () => import('./company-type/company-type.module').then(m => m.CompanyTypeModule)
            },
            {
                path: 'positiontype',
                loadChildren: () => import('./position-type/position-type.module').then(m => m.PositionTypeModule)
            },
            {
                path: 'experiencelevel',
                loadChildren: () => import('./experience-level/experience-level.module').then(m => m.ExperienceLevelModule)
            },
            {
                path: 'roles',
                loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule)
            },
            {
                path: 'groups',
                loadChildren: () => import('./group/group.module').then(m => m.GroupModule)
            },
            {
                path: 'users',
                loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
            },
            {
                path: 'customemail',
                loadChildren: () => import('./custom-email/custom-email.module').then(m => m.CustomEmailModule)
            },
            {
                path: 'metadata',
                loadChildren: () => import('./metadata/metadata.module').then(m => m.MetadataModule)
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }