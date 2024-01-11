import { Injectable, inject } from "@angular/core";
import { Item, ItemDTO } from "../model/dto/ItemDTO";
import { Observable, Subject } from "rxjs";
import { Carrinho } from "../model/Carrinho";
import { ItemCarrinho } from "../model/ItemCarrinho";
import { IEstadoCarrinho } from "../model/IEstadoCarrinho";
import { AuthService } from "../auth/services/auth.service";

@Injectable()
export class CarrinhoService {
  private readonly _carrinho: Carrinho;
  private readonly _updateCarrinhoSource: Subject<IEstadoCarrinho>;
  public readonly estadoCarrinhoActualizado$: Observable<IEstadoCarrinho>;
  private readonly _authService = inject(AuthService);

  constructor() {
    this._updateCarrinhoSource = new Subject();
    this.estadoCarrinhoActualizado$ = this._updateCarrinhoSource.asObservable();
    this._carrinho = new Carrinho();

    this._authService.userLogged$.subscribe(() => { this.resetCarrinho(); });
  }

  public resetCarrinho(): void {
    this._carrinho.reset();
    this._emitUpdate();
  }

  private _emitUpdate(): void {
    this._updateCarrinhoSource.next({
      totalCarrinho: this._carrinho.total,
      qtdItens: this._carrinho.itensCarrinho
    });
  }

  public adicionarItem(item: ItemDTO) {
    this._getCarrinho.adicionarItem(item);
    this._emitUpdate();
  }

  public removerItem(item: ItemCarrinho) {
    this._getCarrinho.removerItem(item);
    this._emitUpdate();
  }

  public aumentarQtd(item: ItemCarrinho, qtd: number): void {
    this._carrinho.somar(item, qtd);
  }
  public reduzirQtd(item: ItemCarrinho, qtd: number): void { this._carrinho.subtrair(item, qtd) }
  private get _getCarrinho(): Carrinho { return this._carrinho }
  public get itensCarrinho(): number { return this._getCarrinho.itensCarrinho }
}
