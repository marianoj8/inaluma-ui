import { HttpClient, HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import { EventEmitter, Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject, map } from "rxjs";
import { environment } from "src/environments/environment";
import { API_AUTH_ROUTES, APP_ROUTES, LOCAL_STORAGE } from "src/app/shared/config";
import { UserDTO } from "../../model/dto/UserDTO";
import { Perfil } from "../../model/Profiles";
import { ToastrService } from "ngx-toastr";
import { User } from "../../model/User";

@Injectable()
export class AuthService {
  /* DEPENDENCIES */
  private readonly _router = inject(Router);
  private readonly _http = inject(HttpClient);
  private readonly _toastrService = inject(ToastrService);

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
  public get isSignedIn(): boolean {
    return !!this.user;
  }

  /**
   * Logs a user into the app
   * @param user User object to post
   * @external {@link UserDTO}
   */
  public signIn(user: UserDTO, newUser = false): void {
    this.showProgress.emit(true);
    this._http.post<UserDTO>(environment.API + API_AUTH_ROUTES.logIn, user).pipe(
      map(usr => {
        const u = Object.assign(new UserDTO(), usr);
        u.perf = Perfil.getPerfil(u.perfil);

        return u;
      })
    ).subscribe(
      {
        next: (signInRes: UserDTO) => {
          if (signInRes) {
            this.addToLocalStorage(signInRes);
            this.showProgress.emit(false);
            this._userLogActionRequested(true);
            // this._router.navigate([this.routes.home]).then();
            history.back();
            if(newUser) this._toastrService.success('Conta criada e logada com successo','Operação bem Sucedida');
          }
        },
        error: (err: HttpErrorResponse) => {
          if(err.status === HttpStatusCode.InternalServerError)
            this._toastrService.error("Utilizador não encontrado!", 'Erro');
          this.showProgress.emit(false);
        }
      },
    );
  }

  /**
   * Registers a user in the local storage
   * @param signInRes user to register in the local storage
   */
  public addToLocalStorage(signInRes: UserDTO): void {
    localStorage.setItem(LOCAL_STORAGE.user, JSON.stringify(signInRes));
  }

  public signOut(update = true) {
    if(!this.isSignedIn) return;

    localStorage.clear();
    if(update) this._userLogActionRequested(false);
    else this._router.navigate([APP_ROUTES.signIn]).then();
  }

  public isAdmin() {
    return this._checkProfile(Perfil.admin.api);
  }

  public isCliente() {
    return this._checkProfile(Perfil.cliente.api);
  }

  public isFuncionario() {
    return this._checkProfile(Perfil.funcionario.api);
  }

  private _checkProfile(perfil: string) {
    if(!this.isSignedIn) return false;
    return Perfil.compare(this.user.perf, perfil);
  }

  public get user(): User {
    try { return new User(JSON.parse(localStorage.getItem(LOCAL_STORAGE.user))._dto); }
    catch (err) {
      console.error('%cError parsing user', 'font-size:13px;color:red');
      return null;
    }
  }

  private _userLogActionRequested(signedIn: boolean) { this._userLogAction.next(signedIn) }
  public get isEmployee(): boolean { return this.isAdmin() || this.isFuncionario() }
}
