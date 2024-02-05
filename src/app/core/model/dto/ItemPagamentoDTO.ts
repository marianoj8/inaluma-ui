import { METODO_PAGAMENTO, STATUS_PAGAMENTO } from "src/app/shared/config";
import { AbstractEntityDTO } from "./AbstractEntityDTO";

export class ItemPagamentoDTO extends AbstractEntityDTO {
  public status: STATUS_PAGAMENTO;
  public metodo: METODO_PAGAMENTO;
  public valorPagamento: number;
  // public factura: FacturaDTO;
}
