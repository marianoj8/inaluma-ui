import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "src/environments/environment";
import { API_PRODUTOS_ROUTES, API_SERVICES_ROUTES } from "../config";
import { ItemDTO } from "src/app/core/model/dto/ItemDTO";

@Injectable({providedIn: 'root'})
export class ItemsService {
  /* DEPENDENCIES */
  private readonly _http = inject(HttpClient);

  public fetch(isProduto: boolean) { return this._fetchItem(this._getPath(isProduto)); }
  public getItemByID(id: number, isProduto: boolean) { return this._getItemByID(id, this._getPath(isProduto)); }
  public registerItem(item: ItemDTO, isProduto: boolean) { return this._saveItem(item, this._getPath(isProduto)); }
  public updateItem(item: ItemDTO, isProduto: boolean) { return this._updateItem(item, this._getPath(isProduto)); }
  public deleteItemByID(idItem: number, isProduto: boolean) { return this._deleteItemByID(idItem, this._getPath(isProduto)); }

  // Métodos internos
  private _fetchItem(path: ItemPath) { return this._http.get<ItemDTO[]>(environment.API+path); }
  private _getItemByID(itemID: number, path: ItemPath) { return this._http.get<ItemDTO>(environment.API+path+itemID); }
  private _saveItem(item: ItemDTO, path: ItemPath) { return this._http.post<ItemDTO>(environment.API+path, item); }
  private _updateItem(item: ItemDTO, path: ItemPath) { return this._http.put<ItemDTO>(environment.API+path, item); }
  private _deleteItemByID(itemId: number, path:ItemPath) { return this._http.delete<void>(environment.API+path+itemId)}

  private _getPath(isProduto: boolean): ItemPath {
    return isProduto ? API_PRODUTOS_ROUTES.fetch : API_SERVICES_ROUTES.fetch;
  }
}

type ItemPath = API_PRODUTOS_ROUTES | API_SERVICES_ROUTES;
