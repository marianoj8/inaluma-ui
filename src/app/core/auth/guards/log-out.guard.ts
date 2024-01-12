import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { APP_ROUTES } from 'src/app/shared/config';


@Injectable({providedIn: 'root'})
export class LogoutGuard implements CanLoad, CanActivate {
  constructor(private _router: Router, private auhtService: AuthService) { }

  canLoad(route: Route): Observable<boolean | UrlTree> | UrlTree | boolean {
    return this.isLoggedIn();
  }

  canActivate(route, state): Observable<boolean | UrlTree> | UrlTree | boolean {
    return this.isLoggedIn();
  }

  /** Redirects to homepage if there is a valid session and loads current route otherwise */
  private isLoggedIn(): Observable<boolean | UrlTree> | boolean | UrlTree {
    return this.auhtService.isSignedIn
      ? true
      : this._router.parseUrl(APP_ROUTES.home);
  }
}
