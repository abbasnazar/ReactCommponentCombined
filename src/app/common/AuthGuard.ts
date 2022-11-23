import { Injectable } from "@angular/core";
import { CanActivate, CanActivateChild, Router } from "@angular/router";
import { Root } from './root';
import { IntervalManager } from './intervel-manager';

@Injectable()
export class AuthGuard implements CanActivate , CanActivateChild {
    constructor(private root:Root, private router:Router,private interval:IntervalManager){}
    canActivate(){
        return this.root.validate()
    }

    canActivateChild(){
            // console.log(this.interval.myintervalid);            
            clearInterval(this.interval.myintervalid)      
            
        if (!this.root.validate()){
            this.router.navigate(['/auth']);
        }

        return true
    }

    
}