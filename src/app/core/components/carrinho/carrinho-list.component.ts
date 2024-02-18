import { Component, inject } from "@angular/core";
import { CarrinhoService } from "./carrinho.service";
import { ItemCarrinho } from "../../model/ItemCarrinho";
import { Location } from "@angular/common";
import { AuthService } from "../../auth/services/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { SelectClienteDialogComponent } from "./select-cliente-dialog/select-cliente-dialog.component";
import { SelectItemsDialogComponent } from "src/app/shared/components/dialogs/select-items/select-items.component";
import { Router } from "@angular/router";
import { APP_ROUTES } from "src/app/shared/config";

@Component({
  selector: 'app-carrinho-list',
  templateUrl: './carrinho-list.component.html'
})
export class CarrinhoListComponent {
  /* DEPENDENCIES */
  private readonly _carrinhoService = inject(CarrinhoService);
  private readonly _authService = inject(AuthService);
  private readonly _location = inject(Location);
  private readonly _diagService = inject(MatDialog);
  private readonly _toastrService = inject(ToastrService);
  private readonly _router = inject(Router);

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
  }

  public adicionarItens() {
    this._diagService.open(
      SelectItemsDialogComponent,
      {
        width: 'auto',
        height: 'auto',
        disableClose: true,
        panelClass: 'adicionar-items-diag'
      }
    ).afterClosed().subscribe(items => { if(items) this._carrinhoService.adicionarItens(items); });
  }

  public selectCliente(): void {
    this._diagService.open(
      SelectClienteDialogComponent,
      {
        width: 'auto',
        height: 'auto'
      }
    ).afterClosed().subscribe(usr => {
      if(usr) {
        this._carrinhoService.selecionarCliente(usr);
        this._toastrService.success('Cliente selecionado', 'Sucesso');
      }
    })
  }

  public confirmar(): void {
    this._router.navigate([this._carrinhoService.temServico ? APP_ROUTES.agendamentos_confirmar : APP_ROUTES.compras_confirmar]).then();
  }

  public voltar(): void { this._location.back(); }
  public get temServico(): boolean { return this._carrinhoService.temServico; }
  public get temItens(): boolean { return this._carrinhoService.temItens }
  public get temProdutos(): boolean { return this._carrinhoService.temProdutos }
  public get nomeTipoOperacao(): string { return this.temServico ? 'Agendamento' : 'Compra' }
  public get itensNoCarrinho(): number { return this._carrinhoService.estadoCarrinho.qtdItens }
  public get totalAPagar(): number { return this._carrinhoService.estadoCarrinho.totalCarrinho }
  public get hasCliente(): boolean { return this._carrinhoService.hasCliente }
  public get isCliente(): boolean { return this._authService.isCliente() }
  public get nomeCompleto(): string { return this._carrinhoService.nomeCompletoCliente }
  public cancelar(): void { this._carrinhoService.destruir(this.nomeTipoOperacao) }
  public esvaziarCarrinho(): void { this._carrinhoService.esvaziar() }
  public get isSignedIn(): boolean { return this._authService.isSignedIn }
  public get podeConfirmar(): boolean { return this._carrinhoService.temItens && this._carrinhoService.temCliente }
}
