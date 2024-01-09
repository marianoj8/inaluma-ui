import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ThemeService } from "../../services/theme.service";
import { API_AUTH_ROUTES, APP_ROUTES, LOCAL_STORAGE, THEME_CLASSES } from "src/app/shared/config";
import { User } from "../../model/dto/User";

@Injectable({ providedIn: 'root' })
export class AuthService {
  /* DEPENDENCIES */
  private readonly _router = inject(Router);
  private readonly _http = inject(HttpClient);
  private readonly _themeService = inject(ThemeService);

  /* MEMBERS */
  readonly showProgress = new EventEmitter<boolean>();
  readonly routes = APP_ROUTES;

  constructor() { }

  /**
   * Checks if a user is logged in
   * @returns `true` if a user is logged, otherwise `false`
   */
  public isSignedIn(): boolean {
    return !!localStorage.length;
  }


  /**
   * Logs a user into the app
   * @param user User object to post
   * @external {@link User}
   */
  public signIn(user: User): void {
    this.showProgress.emit(true);
    this._http.post<User>(environment.API + API_AUTH_ROUTES.logIn, user)
      .subscribe((signInRes: User) => {
        if (signInRes) {
          this.addToLocalStorage(signInRes);
          this.showProgress.emit(false);
          this._router.navigate([this.routes.home]).then();
        }
      });
  }

  /**
   * Registers a user in the local storage
   * @param signInRes user to register in the local storage
   */
  public addToLocalStorage(signInRes: User): void {
    localStorage.setItem(LOCAL_STORAGE.user, JSON.stringify(signInRes));
  }
}
