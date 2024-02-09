import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { AuthService } from "../../auth/services/auth.service";
import { Observable } from "rxjs";

@Injectable()
export class CarrinhoLoadGuard implements CanActivate {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    return this._authService.isSignedIn ? true : this._router.createUrlTree(['/']);
  }
}
