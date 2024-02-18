import { STATUS_FACTURA } from "src/app/shared/config";
import { DocumentoAbstato } from "./DocumentoAbstrato";
import { Agendamento } from "./Agendamento";
import { FacturaDTO } from "./dto";

export class Factura extends DocumentoAbstato {
  private _agendamento: Agendamento;
  public get status(): STATUS_FACTURA { return this.getStatus<STATUS_FACTURA>(); }

  public get agendamento(): Agendamento {
    if(!this._agendamento) this._agendamento = new Agendamento(this.getDTO.agendamento);
    return this._agendamento;
  }

  public get getDTO(): FacturaDTO { return super.documento<FacturaDTO>(); }
  public get nomeDocumento(): string { return 'Factura'; }
}
