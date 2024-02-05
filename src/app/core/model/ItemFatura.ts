import { Item } from "./dto";
import { ItemFacturaDTO } from "./dto/ItemFacturaDTO";

export class ItemFactura {
  constructor(public readonly dto: ItemFacturaDTO) {}

  public get nome(): string { return this._item.nome; }
  public get descricao(): string { return this._item.descricao; }
  public get total(): number { return this.preco * this.quantidade; }
  public get preco(): number { return this.dto.preco; }
  public get quantidade(): number { return this.dto.qty; }
  private get _item(): Item { return this.dto.servico ? this.dto.servico : this.dto.produto; }
}
