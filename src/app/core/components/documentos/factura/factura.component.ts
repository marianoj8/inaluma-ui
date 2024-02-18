import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FacturaService } from "../services/factura.service";
import { CarrinhoService } from "../../carrinho/carrinho.service";
import { APP_ROUTES, DOCUMENTO_OPEARATION_TYPE, DOCUMENTO_TYPE } from "src/app/shared/config";
import { Agendamento, DocumentoAbstato, Factura, ItemFactura } from "src/app/core/model";
import { Observable } from "rxjs";
import { User } from "src/app/core/model/User";
import { UsersService } from "../../user/services/users.service";

@Component({
  selector: 'app-factura-component',
  templateUrl: './factura.component.html'
})
export class FacturaComponent {
  /* DEPENDENCIES */
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _facturaService = inject(FacturaService);
  private readonly _carrinhoService = inject(CarrinhoService);
  private readonly _agendamentoService;
  private readonly _usersService = inject(UsersService);
  private _funcionario: User;
  public funcionarios$: Observable<User[]>;

  /* MEMBERS */
  public readonly itens: ItemFactura[];
  public readonly factura: Factura;
  public readonly operationType: DOCUMENTO_OPEARATION_TYPE;
  public readonly documentType: DOCUMENTO_TYPE;
  private readonly _factura: Factura;
  public totalDocumento: number;

  constructor() {
    this.operationType = this._activatedRoute.snapshot.data.operation;
    this.documentType = this._activatedRoute.snapshot.data.documento;

    if(this.operationType === DOCUMENTO_OPEARATION_TYPE.confirmar) {
      this.totalDocumento = this._carrinhoService.estadoCarrinho.totalCarrinho;
      this.itens = ItemFactura.itemCarrinhoToArray(this._carrinhoService.estadoCarrinho.itens)
    }
  }

  public get statusAgendamento(): string { return this._factura?.agendamento.status.toString() ?? '' }
  public get statusFactura(): string { return this.factura?.status ?? '' }

  public get textBotaoVoltar(): string {
    let txt = 'Voltar';

    if(this.isOperationConfirmar) { txt = 'Editar' }

    return txt;
  }

  public handleBtnVoltarClick(): void {
    let route = '';

    if(this.isOperationConfirmar) route += APP_ROUTES.carrinho.toString();
    else if(this.isDocumentoCompra) route += APP_ROUTES.compras.toString();
    else if(this.isDocumentoAgendamento) route += APP_ROUTES.agendamentos.toString();

    this._router.navigate([route]).then();
  }

  public concluir(): void {}

  public fetchFuncionarios(): void { this.funcionarios$ = this._usersService.fetch$(false) }
  public selecionarFuncionario(funcionario: User): void { this._funcionario = funcionario }
  public get dataCriacao(): Date { return new Date(Date.parse(this._documento.criacao)) }
  public get dataAgendada(): Date { return new Date(Date.parse(this._factura?.agendamento.criacao)) }
  public get nomeCliente(): string { return this._documento?.nomeCompletoCliente ?? '' }
  public get nomeFuncionario(): string { return this._documento?.nomeClompletoFuncionario ?? '' }
  private get _documento(): DocumentoAbstato { return this.isDocumentoAgendamento ? this._factura?.agendamento : this._factura; }
  public get numeroDocumento(): string { return this._documento?.numero ?? '' }
  public get rotuloNumeroDocumento(): string {return this._documento?.nomeDocumento ?? '' }
  public get isDocumentoCompra(): boolean { return this.documentType === DOCUMENTO_TYPE.compra }
  public get isDocumentoAgendamento(): boolean { return this.documentType === DOCUMENTO_TYPE.agendamento }
  public get isOperationConfirmar(): boolean { return this.operationType === DOCUMENTO_OPEARATION_TYPE.confirmar }
  public get isOperationEditar(): boolean { return this.operationType === DOCUMENTO_OPEARATION_TYPE.editar }
  public get isOperationVisualizar(): boolean { return this.operationType === DOCUMENTO_OPEARATION_TYPE.visualizar }
  public get hasFucnionario(): boolean { return (!!this._documento?.cliente) ?? false }
}
