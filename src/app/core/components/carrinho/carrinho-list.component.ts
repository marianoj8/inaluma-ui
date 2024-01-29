import { Component, inject } from "@angular/core";
import { CarrinhoService } from "./carrinho.service";
import { ItemCarrinho } from "../../model/ItemCarrinho";
import { Location } from "@angular/common";
import { AuthService } from "../../auth/services/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { SelectClienteDialogComponent } from "./select-cliente-dialog/select-cliente-dialog.component";

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
  public voltar(): void { this._location.back(); }
  public get temServico(): boolean { return this._carrinhoService.temServico; }
  public get temItens(): boolean { return this._carrinhoService.temItens }
  public get tipoOperacao(): string { return this.temServico ? 'Agendamento' : 'Compra' }
  public get itensNoCarrinho(): number { return this._carrinhoService.estadoCarrinho.qtdItens }
  public get totalAPagar(): number { return this._carrinhoService.estadoCarrinho.totalCarrinho }
  public get hasCliente(): boolean { return this._carrinhoService.hasCliente }
  public get isCliente(): boolean { return this._authService.isCliente() }
  public get nomeCompleto(): string { return this._carrinhoService.cliente?.nome + " " + this._carrinhoService.cliente?.sobrenome }
  public cancelar(): void { this._carrinhoService.destruir(this.tipoOperacao) }
  public esvaziarCarrinho(): void { this._carrinhoService.esvaziar() }
  public get isSignedIn(): boolean { return this._authService.isSignedIn }
  public get podeConfirmar(): boolean {
    return false;
  }
}
