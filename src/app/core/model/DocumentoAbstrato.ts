import { STATUS_AGENDAMENTO, STATUS_FACTURA } from "src/app/shared/config";
import { DocumentoAbstratoDTO } from "./dto/DocumentoAbstratoDTO";
import { UserDTO } from "./dto";
import { AgendamentoDTO } from "./dto/AgendamentoDTO";
import { FacturaDTO } from "./dto/FacturaDTO";

export abstract class DocumentoAbstato {
  constructor(private readonly _dto: DocumentoAbstratoDTO) {}

  public get numero(): string {
    if(this._dto instanceof AgendamentoDTO) return this._dto.numeroAgendamento;
    else if(this._dto instanceof FacturaDTO) return this._dto.numeroFatura;
  }

  protected getStatus<T extends STATUS_AGENDAMENTO | STATUS_FACTURA>(): T { return this._dto.status as T; }
  public abstract get status(): STATUS_AGENDAMENTO | STATUS_FACTURA;
  public get criacao(): string { return this._dto.createdAt; }
  public get user(): UserDTO { return this._dto.user; }
  public get cliente(): UserDTO { return this._dto.cliente; }
  public get funcionario(): UserDTO { return this._dto.funcionario; }
  protected documento<T extends DocumentoAbstratoDTO>(): T { return this._dto as T; }
  public abstract get getDTO(): AgendamentoDTO | FacturaDTO;
  public abstract get nomeDocumento(): string;
  public get nomeCompletoCliente(): string { return this.cliente.nome + ' ' + this.cliente.sobrenome }
  public get nomeClompletoFuncionario(): string { return this.funcionario.nome +  ' ' + this.funcionario.sobrenome }
}
