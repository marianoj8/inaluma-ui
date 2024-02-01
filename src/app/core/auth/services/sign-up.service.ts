import { Injectable, inject } from "@angular/core";
import { UsersService } from "../../components/user/services/users.service";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { ApplicationUserDTO } from "../../model/dto/ApplicationUserDTO";
import { API_APPLICATION_USER_ROUTES, API_USERS_ROUTES, Operation } from "src/app/shared/config";
import { environment } from "src/environments/environment";
import { Observable, map, switchMap } from "rxjs";

@Injectable()
export class ApplicationUserService {
  /* DEPENDENCIES */
  private readonly _http = inject(HttpClient);
  private readonly _authService = inject(AuthService);
  private readonly _usersService = inject(UsersService);

  /* MEMBERS */

  public signUp(appUser: ApplicationUserDTO): Observable<ApplicationUserDTO> {
    const usr = appUser.perf.isCliente ? appUser.cliente : appUser.funcionario;

    return this._usersService.saveByUser(appUser.perf.isCliente, usr).pipe(
      switchMap(usr => {
        appUser.perf.isCliente ? appUser.cliente = usr : appUser.funcionario = usr;

        return this.save(appUser)
      })
    )
  }

  public fetch() { return this._http.get<ApplicationUserDTO[]>(this._path(Operation.fetch)); }
  public deleteByID(id: number) { return this._http.delete<void>(this._path(Operation.delete)+id) }
  public getByID(id: number) { return this._http.get<ApplicationUserDTO>(this._path(Operation.get)+id) }
  public save(usr: ApplicationUserDTO) { return this._http.post<ApplicationUserDTO>(this._path(Operation.post), usr) }
  public update(usr: ApplicationUserDTO) { return this._http.put<ApplicationUserDTO>(this._path(Operation.put), usr) }

  private _path(op: Operation): string {
    let route = environment.API;

    switch(op) {
      case Operation.fetch:
      case Operation.post:
      case Operation.put:
        route += API_APPLICATION_USER_ROUTES.fetchPutPost;
        break;
      case Operation.get:
      case Operation.delete:
        route += API_APPLICATION_USER_ROUTES.getDeleteByID;
    }

    return route;
  }
}
