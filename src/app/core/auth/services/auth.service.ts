import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { APP_ROUTES, LOCAL_STORAGE, USERS_ROUTES, THEME_CLASSES } from "src/app/core/config/consts";
import { ApplicationUser } from "src/app/shared/model/ApplicationUser";
import { CustomToken } from "src/app/shared/model/utils/CustomToken";
import { User } from "src/app/shared/model/utils/User";
import { environment } from "src/environments/environment";
import { ThemeService } from "../../users/perfil/services/theme.service";
import { API_AUTH_ROUTES } from "src/app/core/config/consts/routes/api_routes";
import { SignInResponse } from "src/app/shared/model/SignInResponse";

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
          // this._router.navigate([this.routes.dashboard]).then();
          this._router.navigate([this.routes.PROCESSO]).then();
        }
      });
  }

  /**
   * Registers a user into the system
   * @param user The user to register
   * @returns ApplicationUser
   * @see {@link ApplicationUser}
   */
  public signUp(user: ApplicationUser): Observable<ApplicationUser> {
    return this._http.post<ApplicationUser>(`${environment.API+USERS_ROUTES.usersBySerial+user.numeroSerie}`, user).pipe(take(1));
  }

  /** Signs a logged user out of the application */
  public signOut(): void {
    this.clearLocalStorage();
    this._router.navigate([APP_ROUTES.LOGIN]).then();
  }

  /**
   * Updates a user's data in the system
   * @param user The user to update
   * @returns Observable<ApplicationUser>
   */
  public updateUser(user: ApplicationUser): Observable<ApplicationUser> {
    return this._http.put<ApplicationUser>(`${environment.API+USERS_ROUTES.usersBySerial+user.numeroSerie}`, user).pipe(take(1));
  }

  /**
   * Registers a user in the local storage
   * @param signInRes user to register in the local storage
   */
  public addToLocalStorage(signInRes: SignInResponse): void {
    // TODO: add the user's current view type on the Custom Token
    // TODO: add the session's TTL to the response object
    localStorage.setItem(LOCAL_STORAGE.sessionKey, signInRes.user.accessToken);
    // localStorage.setItem(LOCAL_STORAGE.sessionTTL, signInRes.expiration);
    localStorage.setItem(LOCAL_STORAGE.sessionAccessType, signInRes.user.accessType);
    localStorage.setItem(LOCAL_STORAGE.sessionUsername, signInRes.user.username);
    localStorage.setItem(LOCAL_STORAGE.sessionEmail, signInRes.user.email);
    this._themeService.update(THEME_CLASSES.dark.includes(signInRes.user.theme.toLowerCase()) ? THEME_CLASSES.dark : THEME_CLASSES.light);

    this.getCurrentUser().subscribe((cu)=> {
      localStorage.setItem(LOCAL_STORAGE.currentUserView, cu.areaTrabalho.descricao);
    });
  }

  /** Clears current user's local storage data and navigates to login page */
  public clearLocalStorage(): void {
    this._themeService.deactivateTheme(this._themeService.getCurrentThemeLS);
    localStorage.clear();
    this._themeService.init();
  }

  public getCurrentUser(): Observable<ApplicationUser> {
    return this._http.get<ApplicationUser>(`${environment.API + USERS_ROUTES.currentUser}`);
  }

  public getUserByAdminId(adminId: number): Observable<ApplicationUser> {
    return this._http.get<ApplicationUser>(`${environment.API + USERS_ROUTES.admin + adminId}`).pipe();
  }

  public getUserByFuncionarioId(funcionarioId: number): Observable<ApplicationUser> {
    return this._http.get<ApplicationUser>(`${environment.API + USERS_ROUTES.getFuncionario + funcionarioId}`).pipe();
  }

  public isAdminEntity(): Observable<boolean> {
    return this._http.get<boolean>(`${environment.API + USERS_ROUTES.isAdmin}`);
  }

  public isFuncionario(): Observable<boolean> {
    return this._http.get<boolean>(`${environment.API + USERS_ROUTES.isFuncionario}`);
  }

  public isCliente(): Observable<boolean> {
    return this._http.get<boolean>(`${environment.API + USERS_ROUTES.isCliente}`);
  }

  public getUserByLogin(login: string): Observable<ApplicationUser> {
    return this._http.get<ApplicationUser>(environment.API+USERS_ROUTES.getByUsername+login);
  }

  public isNotCliente(): Observable<boolean> {
    /*FIXME wouldn't it be better to reuse the `isCliente` method? */
    return this._http.get<boolean>(`${environment.API + USERS_ROUTES.isNotCliente}`);
  }

  public loadEntityBySerial(serial: string): Observable<ApplicationUser> {
    return this._http.get<ApplicationUser>(`${environment.API + USERS_ROUTES.entityBySerial + serial}`).pipe(take(1));
  }
}
