import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ThemeService } from "../../services/theme.service";
import { API_AUTH_ROUTES, APP_ROUTES, LOCAL_STORAGE, THEME_CLASSES } from "src/app/shared/config";
import { SignInResponse } from "../../model/dto/SignInResponse";
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
    return !!this.sessionToken;
  }

  /**
   * Gets current users session key
   * @returns the session key
   */
  public get sessionToken(): string {
    return localStorage.getItem(LOCAL_STORAGE.sessionKey);
  }

  /**
   * Checks whether the current session's expired or if there is any session at all
   * @returns `true` if there is no session or if the token has expired, otherwise, it returns `false`
   */
  public isSessionDead(): boolean {
    if (!this.isSignedIn())
      return true;

    const expirationTime = new Date(localStorage.getItem(LOCAL_STORAGE.sessionTTL));
    const currentTime = new Date(Date.now());

    return (expirationTime < currentTime);
  }

  /**
   * Logs a user into the app
   * @param user User object to post
   * @external {@link User}
   */
  public signIn(user: User): void {
    this.showProgress.emit(true);
    this._http.post<SignInResponse>(environment.API + API_AUTH_ROUTES.logIn, {username: user.username, password: user.password})
      .subscribe((signInRes: SignInResponse) => {
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
  public addToLocalStorage(signInRes: SignInResponse): void {
    // // TODO: add the user's current view type on the Custom Token
    // // TODO: add the session's TTL to the response object
    // localStorage.setItem(LOCAL_STORAGE.sessionKey, signInRes.user.accessToken);
    // // localStorage.setItem(LOCAL_STORAGE.sessionTTL, signInRes.expiration);
    // localStorage.setItem(LOCAL_STORAGE.sessionAccessType, signInRes.user.accessType);
    // localStorage.setItem(LOCAL_STORAGE.sessionUsername, signInRes.user.username);
    // localStorage.setItem(LOCAL_STORAGE.sessionEmail, signInRes.user.email);
    // this._themeService.update(THEME_CLASSES.dark.includes(signInRes.user.theme.toLowerCase()) ? THEME_CLASSES.dark : THEME_CLASSES.light);
  }
}
