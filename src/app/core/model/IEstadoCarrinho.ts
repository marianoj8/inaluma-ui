import { ItemCarrinho } from "./ItemCarrinho"
import { User } from "./User";

export interface IEstadoCarrinho {
  itens?: ItemCarrinho[],
  totalCarrinho?: number,
  qtdItens?: number;
  cliente?: User
}
