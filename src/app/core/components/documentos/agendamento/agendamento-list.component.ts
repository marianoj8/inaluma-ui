import { Component, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { Agendamento } from "src/app/core/model/Agendamento";
import { CarrinhoService } from "../../carrinho/carrinho.service";
import { ActivatedRoute, Router } from "@angular/router";
import { APP_ROUTES } from "src/app/shared/config";
import { DocumentoAbstato } from "src/app/core/model/DocumentoAbstrato";

@Component({
  selector: 'app-agendamento-list',
  templateUrl: './agendamento-list.component.html'
})
export class AgendamentoListComponent {
  /* DEPENDENCIES */
  private readonly _toastrService = inject(ToastrService);
  private readonly _dialogService = inject(MatDialog);
  private readonly _router = inject(Router);
  private readonly _activeRoute = inject(ActivatedRoute);
  private readonly _carrinhoService = inject(CarrinhoService);

  /* MEMBERS */
  public agendamentos: Agendamento[];

  public back() { history.back() }

  public new() {
    const state: IDocumentoStateObject = {
      document: DOCUMENT_NAMES.agendamento,
      createNew: !this._carrinhoService.temServico,
      hideShopping: false
    };

    this._router.navigate([APP_ROUTES.carrinho], {state}).then();
  }
}

export interface IDocumentoStateObject {
  document: DOCUMENT_NAMES;
  createNew: boolean;
  hideShopping: boolean
}

export const enum DOCUMENT_NAMES { agendamento, factura }
