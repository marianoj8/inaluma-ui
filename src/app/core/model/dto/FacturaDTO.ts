import { AgendamentoDTO } from "./AgendamentoDTO";
import { DocumentoAbstratoDTO } from "./DocumentoAbstratoDTO";

export class FacturaDTO extends DocumentoAbstratoDTO {
  public agendamento: AgendamentoDTO;
  public numeroFatura: string;
}
