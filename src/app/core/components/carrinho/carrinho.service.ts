import { Injectable, inject } from "@angular/core";
import { Item } from "../../model/dto/ItemDTO";
import { Observable, Subject, forkJoin, from, map, mergeAll, of } from "rxjs";
import { Carrinho } from "../../model/Carrinho";
import { ItemCarrinho } from "../../model/ItemCarrinho";
import { IEstadoCarrinho } from "../../model/IEstadoCarrinho";
import { DIALOG_CONTROLS, DIALOG_RESPONSES, LOCAL_STORAGE } from "src/app/shared/config";
import { ItemsService } from "src/app/shared/services/items.service";
import { AuthService } from "../../auth/services/auth.service";
import { ToastrService } from "ngx-toastr";
import { FilesService } from "src/app/shared/services/files.service";
import { User } from "../../model/dto/User";
import { Perfil } from "../../model/Profiles";
import { ConfirmDialogComponent } from "src/app/shared/components/dialogs/confirm-dialog/confirm-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { IDialogsResponses } from "../../model";

@Injectable()
export class CarrinhoService {
  /* DEPENDENCIES */
  private readonly _itemsService = inject(ItemsService);
  private readonly _authService = inject(AuthService);
  private readonly _toastrService = inject(ToastrService);
  private readonly _filesService = inject(FilesService);
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
          const usr = JSON.parse(localStorage.getItem(LOCAL_STORAGE.user)) as User;
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

  private _emitEstadoActualizado(): void { this._estadoActualizadoSource.next(this.estadoCarrinho); }

  public adicionarItem(item: Item) {
    console.log(item);
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
  public get servico(): ItemCarrinho { return this._getCarrinho.servico }
  public get produtos(): ItemCarrinho[] { return this._getCarrinho.produtos }

  public get temServico(): boolean { return this._getCarrinho.temServico }

  public removerItem(item: ItemCarrinho) {
    this._getCarrinho.removerItem(item);
    this._emitEstadoActualizado();
    this._toastrService.info('Item removido do carrinho', 'Notificação');
  }

  public aumentarQtd(item: ItemCarrinho, qtd: number): boolean {
    const rslt = this._getCarrinho.somar(item, qtd);

    if(rslt) this._emitEstadoActualizado();
    else this._toastrService.error('Erro, stock insuficiente', 'Operação Proibida');

    return rslt;
  }
  public reduzirQtd(item: ItemCarrinho, qtd: number): boolean {
    const rslt = this._getCarrinho.subtrair(item, qtd);

    if(rslt) this._emitEstadoActualizado();
    else this._toastrService.error('Erro, quatia negativa ou nula', 'Operação Proibida');

    return rslt
  }
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
        let cnt: TipoRequisicao;

        bkp.forEach(i => {
          this._itemsService.getItemByID(i._item.id, i._item.isProduto).pipe(
            map(itm => {
              cnt = {qtd: i._qtd, item: itm};
              return from(this._filesService.getImage(itm.id, itm.isProduto));
            }),
            mergeAll(),
            map(file => {
              const fr = new FileReader();
              fr.onload = (ev: any) => {
                cnt.item.imgSrc = ev.target.result;
                this._getCarrinho.adicionarItem(cnt.item, cnt.qtd);
                this._emitEstadoActualizado();
                sources.push(of(cnt));
              };

              fr.readAsDataURL(file);
              if(localStorage.getItem(LOCAL_STORAGE.carrinho)) localStorage.removeItem(LOCAL_STORAGE.carrinho);

              return cnt;
            }),
          ).subscribe(res => {

            console.log(res)
          })
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
  public estaNoCarrinho(item: ItemCarrinho): boolean { return this._getCarrinho.temItem(item) }
  public reterEstado(): boolean {
    if(!this.temItens) return false;
    else return this._getCarrinho.reterEstado();
  }
  public get hasCliente(): boolean { return this._getCarrinho.hasCliente }
  public get cliente(): User { return this._getCarrinho.cliente }
  public selecionarCliente(usr: User): void { this._getCarrinho.selecionarCliente(usr); }
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
}

type TipoRequisicao = {qtd: number, item: Item};
