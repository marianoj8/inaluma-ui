import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { Agendamento } from "src/app/core/model/Agendamento";
import { AgendamentoDTO } from "src/app/core/model/dto/AgendamentoDTO";
import { API_AGENDAMENTOS_ROUTES, Operation } from "src/app/shared/config";
import { environment } from "src/environments/environment";

@Injectable()
export class AgendamentosService {
  /* DEPENDENCIES */
  private readonly _http = inject(HttpClient);

  /* MEMBERS */
  public fetch(): Observable<Agendamento[]> {
    return this._http.get<AgendamentoDTO[]>(this._getEndpoint(Operation.fetch)).pipe(map(dtos => this._wrapDTOs(dtos)));
  }

  public getByID(id: number): Observable<Agendamento> {
    return this._http.get<AgendamentoDTO>(this._getEndpoint(Operation.get).concat(id.toString())).pipe(map(dto => this._wrapDTO(dto)));
  }

  public post(dto: AgendamentoDTO): Observable<Agendamento> {
    return this._http.post<AgendamentoDTO>(this._getEndpoint(Operation.post), dto).pipe(map(_dto => this._wrapDTO(_dto)))
  }

  public put(dto: AgendamentoDTO): Observable<Agendamento> {
    return this._http.put<AgendamentoDTO>(this._getEndpoint(Operation.put), dto).pipe(map(_dto => this._wrapDTO(_dto)));
  }

  private _wrapDTO(dto: AgendamentoDTO): Agendamento { return new Agendamento(dto); }
  private _wrapDTOs(dtos: AgendamentoDTO[]): Agendamento[] { return dtos.map(dto => new Agendamento(dto)); }

  private _getEndpoint(oper: Operation): string {
    let endpoint = environment.API;

    switch(oper) {
      case Operation.fetch:
      case Operation.put:
      case Operation.post:
        endpoint += API_AGENDAMENTOS_ROUTES.fetchPutPost;
        break;
      case Operation.delete:
      case Operation.get:
        endpoint += API_AGENDAMENTOS_ROUTES.getDeleteByID;
    }

    return endpoint;
  }
}
