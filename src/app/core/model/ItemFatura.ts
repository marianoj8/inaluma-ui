import { ItemCarrinho } from "./ItemCarrinho";
import { Item } from "./dto";
import { ItemFacturaDTO } from "./dto/ItemFacturaDTO";

export class ItemFactura {
  constructor(public readonly dto: ItemFacturaDTO) {}

  public static itemCarrinhoToArray(itens: ItemCarrinho[]): ItemFactura[] {
    const res = new Array<ItemFactura>();

    for(let item of itens) {
      let dto = new ItemFacturaDTO();
      dto.preco = item.preco;
      item.item.isProduto ? dto.produto = item.item : dto.servico = item.item;
      dto.qty = item.qtd;

      res.push(new ItemFactura(dto));
    }

    return res;
  }

  public get nome(): string { return this._item.nome; }
  public get descricao(): string { return this._item.descricao; }
  public get total(): number { return this.preco * this.quantidade; }
  public get preco(): number { return this.dto.preco; }
  public get quantidade(): number { return this.dto.qty; }
  private get _item(): Item { return this.dto.servico ? this.dto.servico : this.dto.produto; }
}
