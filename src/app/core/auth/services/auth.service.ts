import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { API_AUTH_ROUTES, APP_ROUTES, LOCAL_STORAGE } from "src/app/shared/config";
import { User } from "../../model/dto/User";
import { Perfil } from "../../model/Profiles";

@Injectable({ providedIn: 'root' })
export class AuthService {
  /* DEPENDENCIES */
  private readonly _router = inject(Router);
  private readonly _http = inject(HttpClient);

  /* MEMBERS */
  // ====== Observale sources ====== //
  private readonly _userLogAction: Subject<boolean>;

  // ====== Observales ====== //
  public readonly userLogged$: Observable<boolean>;

  // ====== Other members ====== //
  readonly showProgress = new EventEmitter<boolean>();
  readonly routes = APP_ROUTES;

  constructor() {
    this._userLogAction = new Subject();
    this.userLogged$ = this._userLogAction.asObservable();
  }

  /**
   * Checks if a user is logged in
   * @returns `true` if a user is logged, otherwise `false`
   */
  public isSignedIn(): boolean {
    return !!this.user;
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
          this._userLogActionRequested(true);
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

  public signOut() {
    if(!this.isSignedIn()) return;

    localStorage.clear();
    this._userLogActionRequested(false);
  }

  public isAdmin() {
    return this._checkProfile('admin');
  }

  public isCliente() {
    return this._checkProfile('cliente');
  }

  public isFuncionario() {
    return this._checkProfile('funcionario');
  }

  private _checkProfile(perfil: string) {
    if(!this.isSignedIn()) return false;

    return this.user.perfil === Perfil[perfil].api
  }

  public get user(): User {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_STORAGE.user));
    } catch (err) {
      return null;
    }
  }

  private _userLogActionRequested(signedIn: boolean) {
    this._userLogAction.next(signedIn);
  }
}
