import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/core/model/User";
import { UserDTO } from "src/app/core/model/dto/UserDTO";
import { API_USERS_ROUTES, Operation } from "src/app/shared/config";
import { environment } from "src/environments/environment";

@Injectable()
export class UsersService {
  /* DEPENDENCIES */
  private readonly _http = inject(HttpClient);

  /* MEMBERS */
  public fetch(isCliente: boolean) { return this._http.get<UserDTO[]>(this._getPath(isCliente, Operation.fetch)) }
  public getByID(isCliente: boolean, id: number) { return this._http.get<UserDTO>(this._getPath(isCliente, Operation.get)+id) }
  public updateByUser(isCliente: boolean, usr: UserDTO) { return this._http.put<UserDTO>(this._getPath(isCliente, Operation.put), usr) }
  public saveByUser(isCliente: boolean, usr: UserDTO) { return this._http.post<UserDTO>(this._getPath(isCliente, Operation.post), usr) }
  public deleteById(isCliente: boolean, id: number) { return this._http.delete<void>(this._getPath(isCliente, Operation.delete)+id) }

  private _getPath(isCliente: boolean, operation: Operation) {
    let path = environment.API;

    switch(operation) {
      case Operation.delete:
        path += isCliente ? API_USERS_ROUTES.deleteClienteByID : API_USERS_ROUTES.deleteFuncionarioByID;
        break;
      case Operation.put:
        path += isCliente ? API_USERS_ROUTES.updateCliente : API_USERS_ROUTES.updateFuncionario;
        break;
      case Operation.fetch:
        path += isCliente ? API_USERS_ROUTES.fetchClientes : API_USERS_ROUTES.fetchFuncionarios;
        break;
      case Operation.get:
        path += isCliente ? API_USERS_ROUTES.getClienteByID : API_USERS_ROUTES.getFuncionarioByID;
        break;
      case Operation.post:
        path += isCliente ? API_USERS_ROUTES.postCliente : API_USERS_ROUTES.postFuncionario;
        break;
    }

    return path;
  }
  public fetch$(isCliente: boolean): Observable<User[]> { return this.fetch(isCliente).pipe(wrapDto())}
}

const wrapDto = () => <T extends UserDTO>(src$: Observable<T[]>) => new Observable<User[]>(subscriber => {
  const subs = src$.subscribe(dtos => dtos.map(dto => new User(dto)));

  return () => { subs.unsubscribe() }
});
