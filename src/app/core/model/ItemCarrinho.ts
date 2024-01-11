import { ItemDTO } from "./dto/ItemDTO";

export class ItemCarrinho {
  constructor(
    private readonly _item: ItemDTO,
    private _qtd = 1
  ) {}

  public get item(): ItemDTO { return this._item }
  public get qtd(): number { return this._qtd }
  public get total(): number { return this.qtd * this.item.preco }
  public somar(qtd: number): number { return this._qtd += qtd }
}
