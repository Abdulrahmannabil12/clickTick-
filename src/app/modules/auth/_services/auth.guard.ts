import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { BaseAuthService } from './base.auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: BaseAuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.isLogin();
    if (currentUser ) {

      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url

    this.authService.logOut();
    this.router.navigate(['auth/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
