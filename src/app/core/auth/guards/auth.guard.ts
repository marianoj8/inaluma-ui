import { Injectable } from '@angular/core';
import { Route, CanLoad, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { APP_ROUTES } from 'src/app/core/config/routes/app-routes';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private _authService: AuthService, private _router: Router) { }

  canLoad(route: Route): Observable<boolean | UrlTree> |  UrlTree | boolean {
    return this.verifyAcess();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> |  UrlTree | boolean {
    return this.verifyAcess();
  }

  /**
   * Checks whether the current user is logged in and whether the session is still valid;
   * Should the test fail, the user is redirected to the login page and navigation to the `original route` is
   * canceled
   * @returns `true` if user has permission, otherwise returns `false`
   */
  private verifyAcess(): Observable<boolean | UrlTree> | boolean | UrlTree {
    return this._authService.isSessionDead()
      ? this._router.parseUrl(APP_ROUTES.signIn) : true;
  }
}
