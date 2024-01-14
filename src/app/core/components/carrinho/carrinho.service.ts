import { Injectable, inject } from "@angular/core";
import { Item } from "../../model/dto/ItemDTO";
import { Observable, Subject, forkJoin, map } from "rxjs";
import { Carrinho } from "../../model/Carrinho";
import { ItemCarrinho } from "../../model/ItemCarrinho";
import { IEstadoCarrinho } from "../../model/IEstadoCarrinho";
import { LOCAL_STORAGE } from "src/app/shared/config";
import { ItemsService } from "src/app/shared/services/items.service";
import { AuthService } from "../../auth/services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class CarrinhoService {
  /* DEPENDENCIES */
  private readonly _itemsService = inject(ItemsService);
  private readonly _authService = inject(AuthService);
  private readonly _snackBar = inject(MatSnackBar);

  /* MEMBERS */
  private readonly _carrinho: Carrinho;
  private readonly _estadoActualizadoSource: Subject<IEstadoCarrinho>;
  public readonly estadoActualizado$: Observable<IEstadoCarrinho>;

  constructor() {
    this._estadoActualizadoSource = new Subject();
    this.estadoActualizado$ = this._estadoActualizadoSource.asObservable();
    this._carrinho = new Carrinho();
  }

  public resetCarrinho(): void {
    this._getCarrinho.reset();
    this._emitEstadoActualizado();
  }

  private _emitEstadoActualizado(): void { this._estadoActualizadoSource.next(this.estadoCarrinho); }

  public adicionarItem(item: Item) {
    if(!this._authService.isSignedIn) {
      this._snackBar.open('Para adicionar itens ao carrinho deve iniciar sessão', 'Ok', {duration: 2500});
      return;
    }

    this._snackBar.open('Item adicionado ao carrinho com sucesso', 'Ok', {duration: 2000});

    this._getCarrinho.adicionarItem(item);
    this._emitEstadoActualizado();
  }
  public get servico(): ItemCarrinho { return this._getCarrinho.servico }
  public get produtos(): ItemCarrinho[] { return this._getCarrinho.produtos }

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
        if(!bkp?.length) return false;

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
    else return this._getCarrinho.reterEstado();
  }
}

type TipoRequisicao = {qtd: number, item: Item};
