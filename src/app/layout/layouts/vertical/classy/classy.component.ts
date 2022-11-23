import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TreoMediaWatcherService } from '@treo/services/media-watcher';
import { TreoNavigationService } from '@treo/components/navigation';
import { Root } from 'app/common/root';
import { AppService } from 'app/app.service';
import { AuthService } from 'app/modules/auth/auth.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
    selector: 'classy-layout',
    templateUrl: './classy.component.html',
    styleUrls: ['./classy.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
    data: any;
    isScreenSmall: boolean;
    userData: any = {}

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ActivatedRoute} _activatedRoute
     * @param {Router} _router
     * @param {TreoMediaWatcherService} _treoMediaWatcherService
     * @param {TreoNavigationService} _treoNavigationService
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _treoMediaWatcherService: TreoMediaWatcherService,
        private _treoNavigationService: TreoNavigationService,
        private root: Root,
        private _app: AppService,
        private _auth: AuthService,
        private tostr: ToastrManager
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.userData = this.root.getUser()
        this._activatedRoute.data.subscribe((data: Data) => {
            this.data = data.initialData;
        });

        // Subscribe to media changes
        this._treoMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {

                // Check if the breakpoint is 'lt-md'
                this.isScreenSmall = matchingAliases.includes('lt-md');
            });

        this.data.user = this.root.getUser()
    }

    getLogo() {
        return this._app.getFile(this.root.getUser('mainlogo'))
    }

    getclientLogo() {
        return this._app.getFile(this.root.getUser('logo'))
    }

    uploadLogo(file) {
        let fd = new FormData()
        fd.append('file', file)
        this._auth.uploadLogo(fd).subscribe(
            (resp: Response) => {
                if (this.userData.type == 'superadmin')
                    this.userData.mainlogo = resp[0]
                if (this.userData.type == 'admin')
                    this.userData.logo = resp[0]
                this.tostr.successToastr('Successfully update', 'Success')
                localStorage.setItem('auth', JSON.stringify(this.userData))
                // location.reload()
            }, (err: Response) => {
                this.tostr.errorToastr(err.statusText, 'Error')
            }
        )
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param key
     */
    toggleNavigation(key): void {
        // Get the navigation
        const navigation = this._treoNavigationService.getComponent(key);

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
