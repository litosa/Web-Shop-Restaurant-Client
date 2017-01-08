import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Auth } from '../services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private auth: Auth, private router: Router){

    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(this.auth.authenticated()){
            // localStorage.setItem('redirectUrl', state.url);
            return true;
        }
        else{
            //Om användaren inte är authentiserad routas användaren
            //tillbaka till root-vyn som i detta fallet är home
            // this.router.navigate(['/']);
            return false;
        }
    }
}