import { LOCAL_STORAGE } from "src/app/shared/config";
import { IEstadoCarrinho } from "./IEstadoCarrinho";
import { ItemCarrinho } from "./ItemCarrinho";
import { Item, ItemDTO } from "./dto/ItemDTO";
import { User } from "./dto/User";

export class Carrinho {
  constructor(
    private readonly _itens: ItemCarrinho[] = [],
    private _cliente?: User,
    private _user?: User
  ) {}

  public reset(removeUser: boolean): void {
    if(!this.temItems) return;

    this.itens.splice(0, this.itensCarrinho);
    if(removeUser) this.setCliente(null);
  }
  private setCliente(usr: User) { this._cliente = usr }
  public get itensCarrinho(): number { return this.itens?.length }
  private get itens(): ItemCarrinho[] { return this._itens }
  public get cliente(): User { return this._cliente }
  public get utilizador(): User { return this._user }

  public get total(): number {
    let total = 0;

    if(this.temItems) this.itens.forEach(x => { total += x.total });
    return total;
  }

  public get temItems(): boolean { return this.itensCarrinho > 0 }
  public adicionarItem(item: Item, qtd = 1): boolean {
    if(!item.isProduto && this.temServico) return false; // não pode ter mais de um serviço no carrinho

    const existe = this._temItem(item); // determina se deve: adicionar um produto novo, ou se atualizar um existente

    if(existe) return this.somar(existe, qtd);
    else this.itens.push(new ItemCarrinho(item, qtd));

    return true;
  }
  private _podeSomar(item: Item, qtd: number): boolean {
    if(!item.isProduto) return false;

    let prod = this._temItem(item);
    if(prod && (prod?.qtd + qtd) > item.item.stock) return false; // não pode superar o stock existente

    return true;
  }
  private _podeSubtrair(item: Item, qtd: number): boolean {
    if(!item.isProduto) return false;

    let prod = this._temItem(item);
    if(prod && (prod?.qtd - qtd) <= 0) return false; // não pode superar o stock existente

    return true;
  }
  public get estado(): IEstadoCarrinho { return {qtdItens: this.itensCarrinho, totalCarrinho: this.total} }
  private _indItem(item: ItemCarrinho): number { return this.itens.indexOf(item) }
  public removerItem(item: ItemCarrinho): void { this.itens.splice(this._indItem(item), 1) }
  public somar(item: ItemCarrinho, qtd:  number): boolean {
    if(!this._podeSomar(item.item, qtd)) return  false;
    return this.getItem(item).somar(qtd)
  }
  public subtrair(item: ItemCarrinho, qtd: number): boolean {
    if(!this._podeSubtrair(item.item, qtd)) return false;
    return this.getItem(item).somar(-qtd)
  }
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
  public get temProdutos(): boolean {
    let tem = false;

    for(let item of this.itens) {
      if (item.item.isProduto) {
        tem = true;
        break;
      }
    }

    return tem;
  }
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
  public get servico(): ItemCarrinho {
    if(!this.temServico) return null;
    return this.itens.find(i => !i.item.isProduto);
  }
  public get produtos(): ItemCarrinho[] {
    if(!this.temItems) return [];
    return this.itens.filter(i => i.item.isProduto);
  }
  public temItem(item: ItemCarrinho): boolean { return !!this._temItem(item.item) }
  public get hasCliente(): boolean { return !!this.cliente }
  public selecionarCliente(usr: User): void { this.setCliente(usr) }
  public esvaziar(): void { this.reset(false) }
}
