import { STATUS_AGENDAMENTO } from "src/app/shared/config";
import { DocumentoAbstato } from "./DocumentoAbstrato";
import { AgendamentoDTO } from "./dto";

export class Agendamento extends DocumentoAbstato {
  public get getDTO(): AgendamentoDTO { return this.documento<AgendamentoDTO>(); }
  public get status(): STATUS_AGENDAMENTO { return this.getStatus<STATUS_AGENDAMENTO>(); }
  public get nomeDocumento(): string { return 'Agendamento'; }
}
