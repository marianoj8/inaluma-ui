import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, take } from "rxjs";
import { Funcionario } from "../../../shared/model/funcionario";

@Injectable({ providedIn: 'root' })
export class FuncionarioService {

  private url: string = 'http://localhost:8080/v1/funcionarios';

  constructor(private http: HttpClient) {

  }

  public getById(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.url}/${id}`).pipe(take(1));
  }

  public fetch(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.url}`).pipe(take(1));
  }

  public create(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(`${this.url}`, funcionario).pipe(take(1));
  }

  public modify(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.url}`, funcionario).pipe(take(1));
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(take(1));
  }
}
