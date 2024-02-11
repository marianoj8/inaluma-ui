import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Item } from "src/app/core/model/dto/ItemDTO";
import { CarrinhoService } from "src/app/core/components/carrinho/carrinho.service";
import { APP_ROUTES } from "src/app/shared/config";
import { ItemsService } from "src/app/shared/services/items.service";
import { ItemCarrinho } from "src/app/core/model/ItemCarrinho";
import { AuthService } from "src/app/core/auth/services/auth.service";
import { TooltipPosition } from "@angular/material/tooltip";
import { formatNumber } from "@angular/common";
import { SelectItemsService } from "../../dialogs/select-items/select-items.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-list-item-preview',
  templateUrl: './list-item-preview.component.html'
})
export class ListItemPreviewComponent implements AfterViewInit, OnDestroy {
  /* DEPENDENCIES */
  private readonly _itemsService = inject(ItemsService);
  private readonly _carrinhoService = inject(CarrinhoService);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  private readonly _selectItemsService = inject(SelectItemsService);

  /* MEMBERS */
  @Output() removeChild: EventEmitter<Item>;
  @Output() markItemRequested: EventEmitter<{item: Item, select: boolean}>;
  @Input() item: Item;
  @Input() itemCarrinho: ItemCarrinho;
  @Input() isDialog: boolean = false;
  private isSelected: boolean;
  private readonly _subscriptions: Subscription[];
  public isNotSelectedService: boolean;

  isDeleting: boolean;
  showInfo: boolean;
  public readonly hideShopping: boolean;

  constructor() {
    this.removeChild = new EventEmitter();
    this.markItemRequested = new EventEmitter();
    this.isDeleting = false;
    this.showInfo = false;
    this.isSelected = false;
    this._subscriptions = new Array<Subscription>();

    this.hideShopping = this._route.snapshot.data.hideShopping;
  }

  ngAfterViewInit(): void {
    if(this.isDialog) {
      this._subscriptions.push(this._selectItemsService.itemSelectionState$.subscribe(response => {
        if(response.item.equals(this._item)) {
          setTimeout(() => { // to avoid expression changed after it was checked
            this.isSelected = response.isSelected
            this.isNotSelectedService = response.temServico && !(this.isProduto || response.isServicoSelected);
          }, 0);
        }
      }));

      if(!this.isProduto) {
        this._subscriptions.push(this._selectItemsService.serviceSelectionState$.subscribe(response => {
          if(!response.item.equals(this._item)) {
            setTimeout(() => { // to avoid expression changed after it was checked
              // to be honest, I have no idea how this works but it does!
              this.isNotSelectedService = response.isServicoSelected;
            }, 0);
          }
        }));
      }

      this._selectItemsService.requestItemSelectionState(this._item);
    }
  }

  get duracao() {
    let unit = this._item?.item?.units === 'H' ? 'hora' : 'minuto';
    if(this._item?.item?.duracao > 1) unit += 's';

    return this._item?.item?.duracao + ' ' + unit;
  }

  get isProduto() { return this._item?.isProduto; }
  toggleIsDeleting() { this.isDeleting = !this.isDeleting; }

  confirmDelete() {
    if(!this.isDeleting) return;
    this._itemsService.deleteItemByID(this._item.item.id, this.isProduto).subscribe(() => { this.removeChild.next(this.item); })
  }

  editItem() {
    const route = this.isProduto ? APP_ROUTES.produtos_edit : APP_ROUTES.servicos_edit;
    this._router.navigate([route], {state: {itemID: this.item.item.id}}).then();
  }

  toggleInfo() { this.showInfo = !this.showInfo }

  public adicionarItemCarrinho(): void {
    if(this.isDialog) this.markItemRequested.emit({item: this._item, select: (this.isSelected = true)});
    else this._carrinhoService.adicionarItem(this.item);
  }

  public removerItemCarrinho(): void {
    if(this.isDialog) this.markItemRequested.emit({item: this._item, select: (this.isSelected = false)});
    else this._carrinhoService.removerItem(this.itemCarrinho);
  }

  public get estado(): string {
    let estado = this.isEsgotado ? "Esgotado" : "Em Estoque";
    if(this.isIndisponível) estado = "Indisponível";

    return estado;
  }

  public get isEsgotado(): boolean { return this._item?.item.stock === 0 }
  public get isIndisponível(): boolean { return this._item?.item.estado}
  private get _item(): Item { return this.item ? this.item : this.itemCarrinho?.item; }
  public get quantidade(): string { return this._formatNumber(this.itemCarrinho.qtd, '1.0-0') }
  public get total(): string { return this._formatNumber(this.itemCarrinho.total) }
  public get isCarrinhoItem(): boolean { return !!this.itemCarrinho }
  public get img(): string { return this._item?.imgSrc }
  public get nome(): string { return this._item?.item.nome }
  public get stock(): string { return this._formatNumber(this._item?.item.stock, '1.0-2') }
  public get codigo(): string { return this._item?.item.code }
  public get descricao(): string { return this._item?.item.descricao }
  public get preco(): string { return this._formatNumber(this._item?.item.preco) }
  public get isVisitor(): boolean { return this._authService.isSignedIn }
  public get isCliente(): boolean { return this._authService.isCliente() }
  public get isLogado(): boolean { return this._authService.isSignedIn }
  public get isInCart(): boolean { return this.isDialog ? this.isSelected : this._carrinhoService.estaNoCarrinho(this.itemCarrinho) }
  public get tipPosition(): TooltipPosition { return 'before' }
  public get tipShowDelay(): number { return 1000 }
  public get tipHideDelay(): number { return 250 }
  public get hasDescription(): boolean { return !!this._item.descricao }
  public get itemType() { return this._item.isProduto ? 'Produto' : 'Serviço'; }

  private _formatNumber(num: number, format = '2.2-2'):string { return formatNumber(num, 'pt-pt', format) }

  public somar(qtd: string): void {
    if(!this.isProduto) return;
    this._carrinhoService.aumentarQtd(this.itemCarrinho, Number(qtd));
  }

  public get showAddToCart(): boolean { return this.isDialog ? this.isSelected : this.hideShopping; }

  public subtrair(qtd: string): void {
    if(!this.isProduto) return;
    this._carrinhoService.reduzirQtd(this.itemCarrinho, Number(qtd));
  }

  ngOnDestroy(): void { this._subscriptions.forEach(s => s.unsubscribe()); }
}
