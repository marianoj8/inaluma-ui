import { Injectable, inject } from "@angular/core";
import { Item } from "../../model/dto/ItemDTO";
import { Observable, Subject, from, map, mergeAll, of, switchMap } from "rxjs";
import { Carrinho } from "../../model/Carrinho";
import { ItemCarrinho } from "../../model/ItemCarrinho";
import { IEstadoCarrinho } from "../../model/IEstadoCarrinho";
import { DIALOG_CONTROLS, DIALOG_RESPONSES, LOCAL_STORAGE } from "src/app/shared/config";
import { ItemsService } from "src/app/shared/services/items.service";
import { AuthService } from "../../auth/services/auth.service";
import { ToastrService } from "ngx-toastr";
import { UserDTO } from "../../model/dto/UserDTO";
import { Perfil } from "../../model/Profiles";
import { ConfirmDialogComponent } from "src/app/shared/components/dialogs/confirm-dialog/confirm-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { IDialogsResponses } from "../../model";
import { User } from "../../model/User";

@Injectable()
export class CarrinhoService {
  /* DEPENDENCIES */
  private readonly _itemsService = inject(ItemsService);
  private readonly _authService = inject(AuthService);
  private readonly _toastrService = inject(ToastrService);
  private readonly _diagService = inject(MatDialog);

  /* MEMBERS */
  private readonly _carrinho: Carrinho;
  private readonly _estadoActualizadoSource: Subject<IEstadoCarrinho>;
  public readonly estadoActualizado$: Observable<IEstadoCarrinho>;

  constructor() {
    this._estadoActualizadoSource = new Subject();
    this.estadoActualizado$ = this._estadoActualizadoSource.asObservable();
    this._carrinho = new Carrinho();
    this._authService.userLogged$.subscribe(signed => {
      if(!signed) this._resetCarrinho(true);
      else {
        try {
          const usr = this._authService.user;
          if(usr.perfil === Perfil.cliente.api) this.selecionarCliente(usr);
        } catch(exc) {
          this._toastrService.error('Erro ao iniciar sessão!', 'Erro');
          this._authService.signOut(false);
        }
      }
    });
  }

  private _resetCarrinho(removeUser: boolean): void {
    this._getCarrinho.reset(removeUser);
    this._emitEstadoActualizado();
  }

  public get getItens(): ItemCarrinho[] { return this._getCarrinho.itens }

  private _emitEstadoActualizado(): void { this._estadoActualizadoSource.next(this.estadoCarrinho); }

  public adicionarItem(item: Item) {
    if(!this._authService.isSignedIn) {
      this._toastrService.error('Para adicionar itens ao carrinho deve iniciar sessão', 'Proibido');
      return;
    }

    if (this._getCarrinho.adicionarItem(item)) {
      this._emitEstadoActualizado();
      this._toastrService.success('Item adicionado ao carrinho com sucesso', 'Sucesso');
    } else {
      if(item.isProduto) this._toastrService.error('Stock insuficiente!', 'Operação Abortada');
      else this._toastrService.error('Não pode ter mais de um serviço em um agendamento!', 'Operação Proibida');
    }
  }

  public adicionarItens(itens: Item[]): void {
    if(this._getCarrinho.adicionarItens(itens)) {
      this._emitEstadoActualizado();
      this._toastrService.success('Itens adicionado ao carrinho com sucesso');
    } else {
      this._emitEstadoActualizado();
      this._toastrService.error('Erro ao adicionar itens ao carrinho!');
    }
  }

  public get servico(): ItemCarrinho { return this._getCarrinho.servico }
  public get produtos(): ItemCarrinho[] { return this._getCarrinho.produtos }
  public get temServico(): boolean { return this._getCarrinho.temServico }
  public get temProdutos(): boolean { return this._getCarrinho.temProdutos }

  public removerItem(item: ItemCarrinho) {
    this._diagService.open(
      ConfirmDialogComponent,
      {
        disableClose: true,
        data: {
          controls: DIALOG_CONTROLS.yes_no,
          isNegativeWarn: false,
          message: 'Confirma a remoção do ítem do carrinho?',
          title: 'Remover Ítem'
        }
      }
    ).afterClosed().subscribe((resp: IDialogsResponses) => {
      if(resp.response === DIALOG_RESPONSES.yes) {
        this._getCarrinho.removerItem(item);
        this._emitEstadoActualizado();
        this._toastrService.info('Item removido do carrinho', 'Notificação');
      }
    })
  }

  public aumentarQtd(item: ItemCarrinho, qtd: number): boolean {
    if(!qtd) {
      this._toastrService.error('O incremento dever ser maior ou igual a 1', 'Operação Proibida');
      return false;
    }

    const rslt = this._getCarrinho.somar(item, qtd);

    if(rslt) this._emitEstadoActualizado();
    else this._toastrService.error('Erro, stock insuficiente', 'Operação Proibida');

    return rslt;
  }
  public reduzirQtd(item: ItemCarrinho, qtd: number): boolean {
    if(!qtd) {
      this._toastrService.error('O decremento dever ser maior ou igual a 1', 'Operação Proibida');
      return false;
    }

    const rslt = this._getCarrinho.subtrair(item, qtd);

    if(rslt) this._emitEstadoActualizado();
    else this._toastrService.error('Erro, quantia negativa ou nula', 'Operação Proibida');

    return rslt
  }
  private get _getCarrinho(): Carrinho { return this._carrinho }
  public get itensCarrinho(): number { return this._getCarrinho.itensCarrinho }
  public get estadoCarrinho(): IEstadoCarrinho { return this._getCarrinho.estado }
  public get temItens(): boolean { return this._getCarrinho.temItems }

  public restaurarEstado(fromLocalStorage = true): boolean {
    if(fromLocalStorage) {
      const bkp = this._getCarrinho.restaurarEstadoLS();

      if(!bkp) return false;

      from(bkp.itens).pipe(
        map(itemC => this._itemsService.getItemByID$(itemC.item).pipe(map(itm => new ItemCarrinho(itm, itemC.qtd)))),
        mergeAll(),
        switchMap(item => {
          this._getCarrinho.adicionarItem(item.item, item.qtd);
          this._emitEstadoActualizado();

          /* if(bkp.user?.id) return this._usersService.getByID(true, bkp.user.id);
          else */ return of(null);
        }),
      ).subscribe(usr => {
        if(usr) {
          this.selecionarCliente(usr);
          bkp.user = null;
        }

        localStorage.removeItem(LOCAL_STORAGE.carrinho);
      });

      return true;
    }
  }

  public estaNoCarrinho(item: ItemCarrinho | Item): boolean { return this._getCarrinho.temItem(item) }

  public reterEstado(): boolean {
    if(!this.temItens) return false;
    else return this._getCarrinho.reterEstado();
  }

  public get hasCliente(): boolean { return this._getCarrinho.hasCliente }
  public get cliente(): User { return this._getCarrinho.cliente }
  public get nomeCompletoCliente(): string { return this.cliente.nome + ' ' + this.cliente.sobrenome }
  public selecionarCliente(usr: User): void { this._getCarrinho.selecionarCliente(usr) }

  public destruir(operacao: string): void {
    if(!this.temItens) this._toastrService.error('Carrinho vazio!', 'Operaçao Proibida');
    else this._diagService.open(
        ConfirmDialogComponent,
        {
          width: 'auto',
          height: 'auto',
          disableClose: true,
          data: {
            controls: DIALOG_CONTROLS.confirm_cancel,
            isNegativeWarn: false,
            message: 'Confirma a destruição deste carrinho?',
            title: 'Cancelar ' + operacao
          }
        }
      ).afterClosed().subscribe((resp: IDialogsResponses) => {
        if(resp.response === DIALOG_RESPONSES.confirm) this._resetCarrinho(false);
      });
  }

  public esvaziar(): void {
    if(!this.temItens) this._toastrService.error('Carrinho vazio!', 'Operaçao Proibida');
    else this._diagService.open(
        ConfirmDialogComponent,
        {
          width: 'auto',
          height: 'auto',
          disableClose: false,
          data: {
            controls: DIALOG_CONTROLS.yes_no,
            isNegativeWarn: false,
            message: 'Tem a certeza que deseja esvaziar o carrinho?',
            title: 'Limpar Carrinho'
          }
        }
      ).afterClosed()
      .subscribe((res: IDialogsResponses) => {
        if(res.response === DIALOG_RESPONSES.yes) this._getCarrinho.esvaziar();
      });
  }

  public get temCliente(): boolean { return this._getCarrinho.temCliente }
}

type TipoRequisicao = {qtd: number, item: Item};
