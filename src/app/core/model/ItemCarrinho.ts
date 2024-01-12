import { Item } from "./dto/ItemDTO";

export class ItemCarrinho {
  constructor(
    private readonly _item: Item,
    private _qtd = 1
  ) {}

  public get item(): Item { return this._item }
  public get qtd(): number { return this._qtd }
  public get total(): number { return this.qtd * this.item.item.preco }
  public somar(qtd: number): number { return this._qtd += qtd }
}
