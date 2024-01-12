import { ItemCarrinho } from "./ItemCarrinho"

export interface IEstadoCarrinho {
  itens?: ItemCarrinho[],
  totalCarrinho?: number,
  qtdItens?: number
}
