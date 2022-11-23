/* tslint:disable:max-line-length */
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TreoNavigationItem } from '@treo/components/navigation';

export const Sidebar: TreoNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'DASHBOARD',
        subtitle: 'Commonly used shortcuts',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'dashboard.dashboard',
                title: 'Dashboard',
                type: 'basic',
                link: '/dashboard',
                icon: 'mat_outline:home'
            },
            {
                id: 'dashboard.jobs',
                title: 'Jobs',
                type: 'basic',
                link: '/jobs/viewjobs',
                icon: 'mat_outline:local_mall',

            },
            {
                id: 'dashboard.talent',
                title: 'Talent',
                type: 'basic',
                link: '/talent/viewtalent',
                icon: 'dripicons:user-group'
            },
            {
                id: 'dashboard.companies',
                title: 'Companies',
                type: 'basic',
                link: '/crm/company',
                icon: 'business'
            },
            {
                id: 'dashboard.contacts',
                title: 'Contacts',
                type: 'basic',
                link: '/crm/contact',
                icon: 'dripicons:user-id'
            },

        ]
    },
    // {
    //     id: 'intelligence',
    //     title: 'INTELLIGENCE',
    //     subtitle: 'AI powered searches',
    //     type: 'group',
    //     icon: 'apps',
    //     children: [
    //         {
    //             id: 'admin.robotlists',
    //             title: 'Robot Lists',
    //             type: 'basic',
    //             link: '/robots/robotlist',
    //             icon: 'mat_outline:article'
    //         },
    //     ]
    // },
    {
        id: 'admin',
        title: 'Admin',
        subtitle: 'Configuration options',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'admin.role',
                title: 'Roles',
                type: 'basic',
                link: '/admin/roles',
                icon: 'design_services'
            },
            {
                id: 'groups',
                title: 'Groups',
                type: 'basic',
                link: '/admin/groups',
                icon: 'heroicons_outline:user-group'
            },
            {
                id: 'admin.users',
                title: 'Users',
                type: 'basic',
                link: '/admin/users',
                icon: 'perm_identity'
            },
            {
                id: 'admin.jobtype',
                title: 'Jobs Type',
                type: 'basic',
                link: '/admin/jobtype',
                icon: 'mat_outline:local_mall'
            },
            {
                id: 'admin.companytype',
                title: 'Company Type',
                type: 'basic',
                link: '/admin/companytype',
                icon: 'business'
            },
            {
                id: 'admin.positiontype',
                title: 'Position Type',
                type: 'basic',
                link: '/admin/positiontype',
                icon: 'home_work'
            },
            {
                id: 'admin.experiancelevel',
                title: 'Experience Level',
                type: 'basic',
                link: '/admin/experiencelevel',
                icon: 'receipt_long'
            },
            {
                id: 'admin.metadata',
                title: 'Metadata',
                type: 'basic',
                link: '/admin/metadata',
                icon: 'mat_outline:list_alt'
            },
            {
                id: 'admin.customemail',
                title: 'Custom Email',
                type: 'basic',
                link: '/admin/customemail',
                icon: 'mat_outline:list_alt'
            },

        ]
    }
]
export const superAdmin: TreoNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'DASHBOARD',
        subtitle: 'Commonly used shortcuts',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'dashboard.dashboard',
                title: 'Dashboard',
                type: 'basic',
                link: '/dashboard',
                icon: 'mat_outline:home'
            },
            {
                id: 'admin.newclient',
                title: 'Clients',
                type: 'basic',
                link: '/superadmin/clients',
                icon: 'heroicons_outline:user-add'
            }
        ]
    },
    {
        id: 'admin',
        title: 'Admin',
        subtitle: 'Configuration options',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'admin.countries',
                title: 'Countries',
                type: 'basic',
                link: '/superadmin/countries',
                icon: 'heroicons_outline:location-marker',

            },
            {
                id: 'admin.state',
                title: 'States',
                type: 'basic',
                link: '/superadmin/states',
                icon: 'mat_outline:location_city',
            },
            {
                id: 'admin.city',
                title: 'Cities',
                type: 'basic',
                link: '/superadmin/cities',
                icon: 'iconsmind:city_hall'
            },
            {
                id: 'admin.currencies',
                title: 'Currencies',
                type: 'basic',
                link: '/superadmin/currencies',
                icon: 'heroicons_outline:academic-cap'
            }
        ]
    }
]

@Injectable({ providedIn: 'root' })

export class AccessRight {
    private linkAllowed: any = {}
    private userDetails: any = {}
    // private router: Router
    constructor(
        private router: Router
    ) {
        let temp = JSON.parse(localStorage.getItem('auth'))
        if (temp)
            this.userDetails = temp

    }
    getModules() {
        let finalMudules = []
        Sidebar.forEach(main => {
            main.children.forEach(sub => {
                finalMudules.push({ name: `${main.title}-${sub.title}` })
            });
        });
        return finalMudules

    }

    getAccess() {
        if (this.userDetails.type == 'admin' || this.userDetails.type == 'superadmin' || this.userDetails.type == 'employee') {
            return {
                addaccess: true,
                deleteaccess: true,
                editaccess: true,
                readaccess: true
            }
        } else {

            let temp = sessionStorage.getItem('access')
            if (temp)
                this.linkAllowed = JSON.parse(temp)
            return this.linkAllowed[this.router.url]
        }
    }

    accessRight() {
        if (!this.userDetails)
            return []
        else if (this.userDetails.type == 'admin') {
            return Sidebar
        } else if (this.userDetails.type == 'superadmin') {
            return superAdmin
        } else {
            let finalMudules = []
            let allowedModule = {}
            let mainHash = {}
            let temp = {}
            if (this.userDetails.accessRight && this.userDetails.accessRight.length > 0) {
                this.userDetails.accessRight.forEach(element => {
                    allowedModule[element.formname] = Object.assign({}, element)
                });
                Sidebar.forEach(main => {
                    main.children.forEach(sub => {
                        if (allowedModule[`${main.title}-${sub.title}`] && allowedModule[`${main.title}-${sub.title}`].readaccess) {
                            if (!mainHash[main.title]) {
                                let temp = Object.assign({}, main)
                                temp.children = [Object.assign({}, sub)]
                                finalMudules.push(temp)
                                mainHash[main.title] = finalMudules.length

                            } else {
                                finalMudules[mainHash[main.title] - 1].children.push(Object.assign({}, sub))
                            }

                            temp[sub.link] = allowedModule[`${main.title}-${sub.title}`]
                        }
                    });
                });
            }
            sessionStorage.setItem('access', JSON.stringify(temp))
            console.log('write access ', this.linkAllowed['/jobs/viewjobs']);

            return finalMudules
        }

    }
}

