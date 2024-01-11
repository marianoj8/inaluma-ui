import { ItemCarrinho } from "./ItemCarrinho";
import { ItemDTO } from "./dto/ItemDTO";
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

  public get temItems(): boolean { return !!this.itensCarrinho }
  public adicionarItem(item: ItemDTO): void {
    const existe = this._temItem(item);

    if(existe) this.somar(existe, 1);
    else this.itens.push(new ItemCarrinho(item));
  }
  private _indItem(item: ItemCarrinho): number { return this.itens.indexOf(item) }
  public removerItem(item: ItemCarrinho): void { this.itens.splice(this._indItem(item) ,1) }
  public somar(item: ItemCarrinho, qtd:  number): number { return this.getItem(item).somar(qtd) }
  public subtrair(item: ItemCarrinho, qtd: number): number {return this.getItem(item).somar(-qtd) }
  private _temItem(item: ItemDTO): ItemCarrinho { return this.itens.find(i => i.item.id === item.id) }
  public podeSubtrair(item: ItemCarrinho, qtd: number): boolean { return this.getItem(item).qtd - qtd >= 0 }
  public getItem(item: ItemCarrinho): ItemCarrinho { return this.itens.find(x => x.item.id === item.item.id) }
}
