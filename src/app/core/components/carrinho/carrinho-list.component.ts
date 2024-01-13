import { Component, OnInit, inject } from "@angular/core";
import { CarrinhoService } from "./carrinho.service";
import { ItemCarrinho } from "../../model/ItemCarrinho";

@Component({
  selector: 'app-carrinho-list',
  templateUrl: './carrinho-list.component.html'
})
export class CarrinhoListComponent {
  /* DEPENDENCIES */
  public readonly _carrinhoService = inject(CarrinhoService);

  /* MEMBERS */
  public produtos: ItemCarrinho[];
  public servico: ItemCarrinho;

  constructor() {
    this.produtos = this._carrinhoService.produtos;
    this.servico = this._carrinhoService.servico;

    this._carrinhoService.estadoActualizado$.subscribe(() => {
      this.produtos = this._carrinhoService.produtos;
      this.servico = this._carrinhoService.servico;
    });

    console.log(this.produtos);
    console.log(this.servico);
  }

  public get temServico(): boolean { return !!this._carrinhoService.servico; }
  public get temItens(): boolean { return this._carrinhoService.temItens }
}
