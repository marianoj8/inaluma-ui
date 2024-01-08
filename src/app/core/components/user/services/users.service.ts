import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { User } from "src/app/core/model/dto/User";
import { API_USERS_ROUTES } from "src/app/shared/config";

@Injectable()
export class UsersService {
  /* DEPENDENCIES */
  private readonly _http = inject(HttpClient);

  private _getPath(isFuncionario: boolean, operation: OperationType) {
    let path: string;

    switch(operation) {
      case OperationType.delete:
        path = isFuncionario ? API_USERS_ROUTES.deleteFuncionarioByID : API_USERS_ROUTES.deleteClienteByID;
        break;
      case OperationType.put:
        path = isFuncionario ? API_USERS_ROUTES.updateFuncionario : API_USERS_ROUTES.updateCliente;
        break;
      case OperationType.fetch:
        path = isFuncionario ? API_USERS_ROUTES.fetchFuncionarios : API_USERS_ROUTES.fetchClientes;
        break;
      case OperationType.get:
        path = isFuncionario ? API_USERS_ROUTES.getFuncionarioByID : API_USERS_ROUTES.getClienteByID;
        break;
      case OperationType.update:
        path = isFuncionario ? API_USERS_ROUTES.deleteFuncionarioByID : API_USERS_ROUTES.deleteClienteByID;
        break;
    }

    return path;
  }
}

enum OperationType {
  put,
  fetch,
  get,
  delete,
  update
}
