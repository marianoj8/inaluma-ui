import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { ItemDTO } from "src/app/core/model";
import { ItemFactura } from "src/app/core/model/ItemFatura";
import { ItemFacturaDTO } from "src/app/core/model/dto/ItemFacturaDTO";
import { API_FACTURA_ITEMS_ROUTES, Operation } from "src/app/shared/config";
import { environment } from "src/environments/environment";

@Injectable()
export class ItemsFacturaService {
  /* DEPENDENCIES */
  private readonly _http = inject(HttpClient);

  /* MEMBERS */
  public fetch(): Observable<ItemFactura[]> { return this._http.get<ItemFacturaDTO[]>(this._getEndpoint(Operation.fetch)).pipe(map(dtos => this._wrapDTOs(dtos))); }
  public getByID(id: number): Observable<ItemFactura> { return this._http.get<ItemFacturaDTO>(this._getEndpoint(Operation.get).concat(id.toString())).pipe(map(dto => this._wrapDTO(dto))); }
  public getByFaturaID(id: number): Observable<ItemFactura> { return this._http.get<ItemFacturaDTO>(this._getEndpoint(Ops.byFaturaID).concat(id.toString())).pipe(map(dto => this._wrapDTO(dto))); }
  public post(dto: ItemFacturaDTO): Observable<ItemFactura> { return this._http.post<ItemFacturaDTO>(this._getEndpoint(Operation.post), dto).pipe(map(_dto => this._wrapDTO(_dto))); }
  public put(dto: ItemDTO): Observable<ItemFactura> { return this._http.put<ItemFacturaDTO>(this._getEndpoint(Operation.put), dto).pipe(map(_dto => this._wrapDTO(_dto))); }
  public delete(id: number): Observable<void> { return this._http.delete<void>(this._getEndpoint(Operation.delete).concat(id.toString())); }
  private _wrapDTO(dto: ItemFacturaDTO): ItemFactura { return new ItemFactura(dto); }
  private _wrapDTOs(arr: ItemFacturaDTO[]): ItemFactura[] { return arr.map(dto => new ItemFactura(dto)); }

  private _getEndpoint(oper: DocOperation): string {
    let endpoint = environment.API;

    switch(oper) {
      case Operation.fetch:
      case Operation.post:
      case Operation.put:
        endpoint += API_FACTURA_ITEMS_ROUTES.fetchPutPost;
        break;
      case Operation.get:
      case Operation.delete:
        endpoint += API_FACTURA_ITEMS_ROUTES.getDeleteByID;
        break;
      case Ops.byFaturaID:
        endpoint += API_FACTURA_ITEMS_ROUTES.getByFacturaID;
    }

    return endpoint;
  }
}

const enum Ops {
  byFaturaID = 'getFaturaByID'
}

type DocOperation = Operation | Ops;
