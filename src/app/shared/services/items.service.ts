import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "src/environments/environment";
import { API_PRODUTOS_ROUTES, API_SERVICES_ROUTES } from "../config";
import { ItemDTO } from "src/app/core/model/dto/ItemDTO";

@Injectable({providedIn: 'root'})
export class ItemsService {
  /* DEPENDENCIES */
  private readonly _http = inject(HttpClient);

  public fetch(isProduto: boolean) { return this._fetchItem(this._getPath(isProduto, Operation.fetch)); }
  public getItemByID(id: number, isProduto: boolean) { return this._getItemByID(id, this._getPath(isProduto, Operation.get)); }
  public registerItem(item: ItemDTO, isProduto: boolean) { return this._saveItem(item, this._getPath(isProduto, Operation.save)); }
  public updateItem(item: ItemDTO, isProduto: boolean) { return this._updateItem(item, this._getPath(isProduto, Operation.update)); }
  public deleteItemByID(idItem: number, isProduto: boolean) { return this._deleteItemByID(idItem, this._getPath(isProduto, Operation.delete)); }

  // Métodos internos
  private _fetchItem(path: string) { return this._http.get<ItemDTO[]>(path); }
  private _getItemByID(itemID: number, path: string) { return this._http.get<ItemDTO>(path+itemID); }
  private _saveItem(item: ItemDTO, path: string) { return this._http.post<ItemDTO>(path, item); }
  private _updateItem(item: ItemDTO, path: string) { return this._http.put<ItemDTO>(path, item); }
  private _deleteItemByID(itemId: number, path:string) { return this._http.delete<void>(path+itemId)}

  private _getPath(isProduto: boolean, operation: Operation): string {
    let path = environment.API;

    switch (operation) {
      case Operation.fetch:
        path += isProduto ? API_PRODUTOS_ROUTES.fetch : API_SERVICES_ROUTES.fetch;
        break;
      case Operation.get:
        path += isProduto ? API_PRODUTOS_ROUTES.getByID : API_SERVICES_ROUTES.getByID;
        break;
      case Operation.save:
        path += isProduto ? API_PRODUTOS_ROUTES.create : API_SERVICES_ROUTES.create;
        break;
      case Operation.delete:
        path += isProduto ? API_PRODUTOS_ROUTES.deleteByID : API_SERVICES_ROUTES.deleteByID
        break;
      case Operation.update:
        path += isProduto ? API_PRODUTOS_ROUTES.update : API_SERVICES_ROUTES.update;
        break;
    }

    return path;
  }
}

enum Operation {
  fetch,
  get,
  save,
  delete,
  update
}
