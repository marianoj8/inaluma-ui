import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, take } from "rxjs";
import { Funcionario } from "../../shared/model/funcionario";

@Injectable({providedIn:'root'})
export class FuncionarioService {

 private url:string = 'http://localhost:8080/v1/funcionarios';

  constructor(private http:HttpClient){

  }

  public getById(id:number): Observable<Funcionario[]> {
      return this.http.get<Funcionario[]>(`${this.url}`).pipe(take(1));
  }
}
