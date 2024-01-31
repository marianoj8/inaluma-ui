import { EstadoCarrinho } from "./EstadoCarrinho";
import { Item } from "./dto/ItemDTO";

export class ItemCarrinho {
  constructor(
    private readonly _item: Item,
    private _qtd = 1
  ) {}

  public get item(): Item { return this._item }
  public get qtd(): number { return this._qtd }
  public get total(): number { return this.qtd * this.item.item.preco }
  public somar(qtd: number): boolean { this._qtd += qtd; return true; }

  public static fromEstadoCarrinho(estadoCarrinho: EstadoCarrinho): ItemCarrinho[] { return this.forLocalStorage(estadoCarrinho.itens) }

  public static forLocalStorage(itens: ItemCarrinho[]): ItemCarrinho[] {
    const arr = new Array<ItemCarrinho>();

    for(let item of itens) {
      arr.push(new ItemCarrinho(new Item(item._item.item, item._item.isProduto, item._item.id), item._qtd))
    }

    return arr;
  }
}
