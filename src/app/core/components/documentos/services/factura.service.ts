import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { Factura, FacturaDTO } from "src/app/core/model";
import { API_FACTURA_ROUTES, Operation } from "src/app/shared/config";
import { environment } from "src/environments/environment";

@Injectable()
export class FacturaService {
  /* DEPENDENCIEs */
  private readonly _http = inject(HttpClient);

  /* MEMBERS */
  public fetch(): Observable<Factura[]> { return this._http.get<FacturaDTO[]>(this.getPath(Operation.fetch)).pipe(map(fats => fats.map(fat => new Factura(fat)))); }
  public put(dto: FacturaDTO): Observable<Factura> { return this._dtoToModel(this._http.put<FacturaDTO>(this.getPath(Operation.put), dto)) }
  public post(dto: FacturaDTO): Observable<Factura> { return this._dtoToModel(this._http.put<FacturaDTO>(this.getPath(Operation.post), dto)) }
  public getByID(id: number): Observable<Factura> { return this._dtoToModel(this._http.get<FacturaDTO>(this.getPath(OperationsExtended.getDeleteByID, id.toString()))) }
  public deleteByID(id: number): Observable<void> { return this._http.delete<void>(this.getPath(OperationsExtended.getDeleteByID, id.toString())); }

  public getByClienteID(id: number): Observable<Factura> {
    return this._dtoToModel(this._http.get<FacturaDTO>(this.getPath(OperationsExtended.getByClienteID, id.toString())));
  }

  public getByAgendamentoID(id: number): Observable<Factura> {
    return this._dtoToModel(this._http.get<FacturaDTO>(this.getPath(OperationsExtended.getByAgendamentoID, id.toString())));
  }

  private _dtoToModel(src$: Observable<FacturaDTO>): Observable<Factura> { return src$.pipe(map(fat => new Factura(fat))); }

  private getPath(operation: FinalOperation, par = ''): string {
    let endpoint = environment.API;

    switch(operation) {
      case Operation.fetch:
      case Operation.post:
      case Operation.put:
        endpoint += API_FACTURA_ROUTES.fetchPutPost;
        break;
      case OperationsExtended.getDeleteByID:
        endpoint += API_FACTURA_ROUTES.getDeleteByID;
        break;
      case OperationsExtended.getByClienteID:
        endpoint += API_FACTURA_ROUTES.getByClienteID;
        break;
      case OperationsExtended.getByAgendamentoID:
        endpoint += API_FACTURA_ROUTES.getByAgendamentoID;
    }

    return endpoint + par;
  }
}

enum OperationsExtended {
  getDeleteByID,
  getByClienteID,
  getByAgendamentoID
}

type FinalOperation = Operation | OperationsExtended;

/* type FinalOperation = Operation & {
  getDeleteByID,
  getByClienteID,
  getByAgendamentoID
}; */
