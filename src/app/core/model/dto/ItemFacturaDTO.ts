import { AbstractEntityDTO } from "./AbstractEntityDTO"
import { Item } from "./ItemDTO";

export class ItemFacturaDTO extends AbstractEntityDTO {
  qty: number;
  preco: number;
  produto: Item;
  servico: Item;
  // factura: Factura;
  // agendamento: Agendamento;
}
