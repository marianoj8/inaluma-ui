import { Injectable, inject } from "@angular/core";
import { Item } from "../model/dto/ItemDTO";
import { Observable, Subject, delay, forkJoin, from, map, mergeAll, of, switchMap } from "rxjs";
import { Carrinho } from "../model/Carrinho";
import { ItemCarrinho } from "../model/ItemCarrinho";
import { IEstadoCarrinho } from "../model/IEstadoCarrinho";
import { AuthService } from "../auth/services/auth.service";
import { LOCAL_STORAGE } from "src/app/shared/config";
import { ItemsService } from "src/app/shared/services/items.service";

@Injectable()
export class CarrinhoService {
  private readonly _carrinho: Carrinho;
  private readonly _estadoActualizadoSource: Subject<IEstadoCarrinho>;
  public readonly estadoActualizado$: Observable<IEstadoCarrinho>;
  private readonly _itemsService = inject(ItemsService);

  constructor() {
    this._estadoActualizadoSource = new Subject();
    this.estadoActualizado$ = this._estadoActualizadoSource.asObservable();
    this._carrinho = new Carrinho();
  }

  public resetCarrinho(): void {
    this._getCarrinho.reset();
    this._emitEstadoActualizado();
  }

  private _emitEstadoActualizado(): void { console.log(this._getCarrinho); this._estadoActualizadoSource.next(this.estadoCarrinho); }

  public adicionarItem(item: Item) {
    this._getCarrinho.adicionarItem(item);
    this._emitEstadoActualizado();
  }

  public removerItem(item: ItemCarrinho) {
    this._getCarrinho.removerItem(item);
    this._emitEstadoActualizado();
  }

  public aumentarQtd(item: ItemCarrinho, qtd: number): void { this._getCarrinho.somar(item, qtd); }
  public reduzirQtd(item: ItemCarrinho, qtd: number): void { this._getCarrinho.subtrair(item, qtd) }
  private get _getCarrinho(): Carrinho { return this._carrinho }
  public get itensCarrinho(): number { return this._getCarrinho.itensCarrinho }
  public get estadoCarrinho(): IEstadoCarrinho { return this._getCarrinho.estado }
  public get temItens(): boolean { return this._getCarrinho.temItems }
  public restaurarEstado(fromLocalStorage = true): boolean {
    if(fromLocalStorage) {
      try {
        const bkp: any[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE.carrinho));
        if(!bkp.length) return false;

        const sources = new Array<Observable<TipoRequisicao>>();
        bkp.forEach(i => {
          sources.push(this._itemsService.getItemByID(i._item.id, i._item.isProduto).pipe(map(itm => ({qtd: i._qtd, item: itm}))))
        });

        const obs: {[k: number]: Observable<TipoRequisicao>} = {};

        for(let [k,v] of Object.entries(sources)) obs[k] = v;

        forkJoin(obs).subscribe(d => {
          for(let v of Object.values(d)) this._getCarrinho.adicionarItem(v.item, v.qtd);
          localStorage.removeItem(LOCAL_STORAGE.carrinho);
          this._emitEstadoActualizado();
        })

        return true;
      } catch (exc) {
        console.log('%cErro ao restaurar estado do carrinho', 'font-size:15px; color: red');
        console.log(exc)
      }
    }
  }
  public reterEstado(): boolean {
    if(!this.temItens) return false;
    else return this._getCarrinho.reterEstado(); }
}

type TipoRequisicao = {qtd: number, item: Item};
