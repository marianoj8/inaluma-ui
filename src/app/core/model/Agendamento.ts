import { STATUS_AGENDAMENTO, STATUS_FACTURA } from "src/app/shared/config";
import { DocumentoAbstato } from "./DocumentoAbstrato";

export class Agendamento extends DocumentoAbstato {
  public get status(): STATUS_AGENDAMENTO { return this.getStatus<STATUS_AGENDAMENTO>(); }
}
