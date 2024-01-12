import { LOCAL_STORAGE } from "src/app/shared/config";
import { IEstadoCarrinho } from "./IEstadoCarrinho";
import { ItemCarrinho } from "./ItemCarrinho";
import { Item, ItemDTO } from "./dto/ItemDTO";
import { User } from "./dto/User";

export class Carrinho {
  constructor(
    private readonly _cliente?: User,
    private readonly _itens: ItemCarrinho[] = [],
    private readonly _user?: User
  ) {}

  public reset(): void {
    if(!this.temItems) return;

    this.itens.splice(0, this.itensCarrinho);
  }

  public get itensCarrinho(): number { return this.itens.length }
  private get itens(): ItemCarrinho[] { return this._itens }
  public get cliente(): User { return this._cliente }
  public get utilizador(): User { return this._user }

  public get total(): number {
    let total = 0;

    if(this.temItems) this.itens.forEach(x => { total += x.total });
    return total;
  }

  public get temItems(): boolean { return this.itensCarrinho > 0 }
  public adicionarItem(item: Item, qtd = 1): void {
    if(!item.isProduto && this.temServico) return; // não pode ter mais de um serviço no carrinho

    const existe = this._temItem(item); // determina se deve: adicionar um produto novo, ou se atualizar um existente

    if(existe) this.somar(existe, qtd);
    else this.itens.push(new ItemCarrinho(item, qtd));
  }
  public get estado(): IEstadoCarrinho { return {qtdItens: this.itensCarrinho, totalCarrinho: this.total} }
  private _indItem(item: ItemCarrinho): number { return this.itens.indexOf(item) }
  public removerItem(item: ItemCarrinho): void { this.itens.splice(this._indItem(item), 1) }
  public somar(item: ItemCarrinho, qtd:  number): number { return this.getItem(item).somar(qtd) }
  public subtrair(item: ItemCarrinho, qtd: number): number {return this.getItem(item).somar(-qtd) }
  private _temItem(item: Item): ItemCarrinho { return this.itens.find(i => (i.item.id === item.id) && (i.item.isProduto === item.isProduto)) }
  public get temServico(): boolean {
    let tem = false;

    for(let item of this.itens) {
      if (!item.item.isProduto) {
        tem = true;
        break;
      }
    }

    return tem;
  }
  public podeSubtrair(item: ItemCarrinho, qtd: number): boolean { return this.getItem(item).qtd - qtd >= 0 }
  public getItem(i: ItemCarrinho): ItemCarrinho { return this.itens.find(x => (i.item.id === x.item.id) && (i.item.isProduto === x.item.isProduto)) }
  public reterEstado(): boolean {
    const bkp = new Array<ItemCarrinho>();

    this.itens.forEach(i => {
      const item = new Item(new ItemDTO(i.item.id), i.item.isProduto);
      bkp.push(new ItemCarrinho(item, i.qtd))
    });

    localStorage.setItem(LOCAL_STORAGE.carrinho, JSON.stringify(bkp));

    return true;
  }
}
