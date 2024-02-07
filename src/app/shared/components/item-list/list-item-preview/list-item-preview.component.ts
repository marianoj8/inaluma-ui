import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Item } from "src/app/core/model/dto/ItemDTO";
import { CarrinhoService } from "src/app/core/components/carrinho/carrinho.service";
import { APP_ROUTES } from "src/app/shared/config";
import { ItemsService } from "src/app/shared/services/items.service";
import { ItemCarrinho } from "src/app/core/model/ItemCarrinho";
import { AuthService } from "src/app/core/auth/services/auth.service";
import { TooltipPosition } from "@angular/material/tooltip";
import { formatNumber } from "@angular/common";

@Component({
  selector: 'app-list-item-preview',
  templateUrl: './list-item-preview.component.html'
})
export class ListItemPreviewComponent {
  /* DEPENDENCIES */
  private readonly _itemsService = inject(ItemsService);
  private readonly _carrinhoService = inject(CarrinhoService);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  /* MEMBERS */
  @Output() removeChild: EventEmitter<Item>;
  @Input() item: Item;
  @Input() itemCarrinho: ItemCarrinho;
  @Input() isDialog: boolean = false;

  isDeleting: boolean;
  showInfo: boolean;
  public readonly hideShopping: boolean;

  constructor() {
    this.removeChild = new EventEmitter();
    this.isDeleting = false;
    this.showInfo = false;

    this.hideShopping = this._route.snapshot.data.hideShopping;
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

  public adicionarItemCarrinho(): void { this._carrinhoService.adicionarItem(this.item); }
  public removerItemCarrinho(): void { this._carrinhoService.removerItem(this.itemCarrinho) }

  public get estado(): string {
    let estado = this.isEsgotado ? "Esgotado" : "Em Estoque";
    if(this.isIndisponível) estado = "Indisponível";

    return estado;
  }

  public get isEsgotado(): boolean { return this._item?.item.stock === 0 }
  public get isIndisponível(): boolean { return this._item?.item.estado}
  private get _item(): Item { return this.item ? this.item : this.itemCarrinho?.item; }
  public get quantidade(): string { return formatNumber(this.itemCarrinho.qtd, 'pt', '1.0-0') }
  public get total(): string { return this._formatNumber(this.itemCarrinho.total) }
  public get isCarrinhoItem(): boolean { return !!this.itemCarrinho }
  public get img(): string { return this._item?.imgSrc }
  public get nome(): string { return this._item?.item.nome }
  public get stock(): string { return this._formatNumber(this._item?.item.stock) }
  public get codigo(): string { return this._item?.item.code }
  public get descricao(): string { return this._item?.item.descricao }
  public get preco(): string { return this._formatNumber(this._item?.item.preco) }
  public get isVisitor(): boolean { return this._authService.isSignedIn }
  public get isCliente(): boolean { return this._authService.isCliente() }
  public get isLogado(): boolean { return this._authService.isSignedIn }
  public get isInCart(): boolean { return this._carrinhoService.estaNoCarrinho(this.itemCarrinho) }
  public get tipPosition(): TooltipPosition { return 'before' }
  public get tipShowDelay(): number { return 1000 }
  public get tipHideDelay(): number { return 250 }
  public get hasDescription(): boolean { return !!this._item.descricao }
  public get itemType() { return this._item.isProduto ? 'Produto' : 'Serviço'; }

  private _formatNumber(num: number):string { return formatNumber(num, 'pt-pt', '2.2-2') }

  public somar(qtd: string): void {
    if(!this.isProduto) return;
    this._carrinhoService.aumentarQtd(this.itemCarrinho, Number(qtd));
  }

  public subtrair(qtd: string): void {
    if(!this.isProduto) return;
    this._carrinhoService.reduzirQtd(this.itemCarrinho, Number(qtd));
  }
}
