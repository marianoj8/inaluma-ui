import { AbstractEntityDTO } from "./AbstractEntityDTO"
import { AgendamentoDTO } from "./AgendamentoDTO";
import { FacturaDTO } from "./FacturaDTO";
import { Item } from "./ItemDTO";

export class ItemFacturaDTO extends AbstractEntityDTO {
  qty: number;
  preco: number;
  produto: Item;
  servico: Item;
  factura: FacturaDTO;
  agendamento: AgendamentoDTO;
}
