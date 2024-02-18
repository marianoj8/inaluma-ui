import { IEstadoCarrinho } from "./IEstadoCarrinho";
import { ItemCarrinho } from "./ItemCarrinho";
import { Item } from "./dto/ItemDTO";
import { UserDTO } from "./dto/UserDTO";
import { EstadoCarrinho } from "./EstadoCarrinho";
import { User } from "./User";

export class Carrinho {
  constructor(
    private readonly _itens: ItemCarrinho[] = [],
    private _cliente?: User,
    private _user?: User
  ) {}

  public reset(removeUser: boolean): void {
    if(!this.temItems) return;

    this.itens.splice(0, this.itensCarrinho);
    if(removeUser) this._setCliente(null);
  }

  public get total(): number {
    let total = 0;

    if(this.temItems) this.itens.forEach(x => { total += x.total });
    return total;
  }


  public adicionarItem(item: Item, qtd = 1): boolean {
    if(!item.isProduto && this.temServico) return false; // não pode ter mais de um serviço no carrinho

    const existe = this._temItem(item); // determina se deve: adicionar um produto novo, ou se atualizar um existente

    if(existe) return this.somar(existe, qtd);
    else this.itens.push(new ItemCarrinho(item, qtd));

    return true;
  }

  public adicionarItens(itens: Item[]): boolean {
    let sucesso = true;

    for(let i of itens) {
      if(this._temItem(i)) {
        sucesso = false;
        break;
      }
    }

    if(sucesso) itens.forEach(i => { this.adicionarItem(i)})

    return sucesso;
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

  public somar(item: ItemCarrinho, qtd:  number): boolean {
    if(!this._podeSomar(item.item, qtd)) return  false;
    return this.getItem(item).somar(qtd)
  }

  public subtrair(item: ItemCarrinho, qtd: number): boolean {
    if(!this._podeSubtrair(item.item, qtd)) return false;
    return this.getItem(item).somar(-qtd)
  }

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

  public get servico(): ItemCarrinho {
    if(!this.temServico) return null;
    return this.itens.find(i => !i.item.isProduto);
  }

  public get produtos(): ItemCarrinho[] {
    if(!this.temItems) return [];
    return this.itens.filter(i => i.item.isProduto);
  }

  public temItem(item: ItemCarrinho | Item): boolean {
    let tem = false;

    if(item instanceof Item) tem = !!this._temItem(item);
    else tem = !!this._temItem(item.item);

    return tem;
  }

  public get temItems(): boolean { return this.itensCarrinho > 0 }
  public get hasCliente(): boolean { return !!this.cliente }
  public get estado(): IEstadoCarrinho { return {qtdItens: this.itensCarrinho, totalCarrinho: this.total, itens: this.itens, cliente: this.cliente} }
  public get itensCarrinho(): number { return this.itens?.length }
  public get itens(): ItemCarrinho[] { return this._itens }
  public get cliente(): User { return this._cliente }
  public get utilizador(): User { return this._user }
  private _setCliente(usr: User) { this._cliente = usr }
  private _indItem(item: ItemCarrinho): number { return this.itens.indexOf(item) }
  private _temItem(item: Item): ItemCarrinho { return this.itens.find(i => (i.item.id === item.id) && (i.item.isProduto === item.isProduto)) }
  public removerItem(item: ItemCarrinho): void { this.itens.splice(this._indItem(item), 1) }
  public getItem(i: ItemCarrinho): ItemCarrinho { return this.itens.find(x => (i.item.id === x.item.id) && (i.item.isProduto === x.item.isProduto)) }
  public reterEstado(): boolean { return EstadoCarrinho.saveToLocalStorage(this.itens, this.cliente); }
  public restaurarEstadoLS(): EstadoCarrinho { return EstadoCarrinho.readFromLocalStorage() }
  public selecionarCliente(usr: User): void { this._setCliente(usr) }
  public esvaziar(): void { this.reset(false) }
  public get temCliente(): boolean { return !!this.cliente }
}
