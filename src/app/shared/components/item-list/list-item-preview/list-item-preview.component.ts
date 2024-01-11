import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Item, ItemDTO } from "src/app/core/model/dto/ItemDTO";
import { CarrinhoService } from "src/app/core/services/carrinho.service";
import { APP_ROUTES } from "src/app/shared/config";
import { ItemsService } from "src/app/shared/services/items.service";

@Component({
  selector: 'app-list-item-preview',
  templateUrl: './list-item-preview.component.html'
})
export class ListItemPreviewComponent {
  /* DEPENDENCIES */
  private readonly _itemsService = inject(ItemsService);
  private readonly _carrinhoService = inject(CarrinhoService);
  private readonly _router = inject(Router);

  /* MEMBERS */
  @Output() removeChild: EventEmitter<Item>;
  @Input() item: Item;
  isDeleting: boolean;
  showInfo: boolean;

  constructor() {
    this.removeChild = new EventEmitter();
    this.isDeleting = false;
    this.showInfo = false;
  }

  get duracao() {
    let unit = this.item.item?.units === 'H' ? 'hora' : 'minuto';
    if(this.item.item?.duracao > 1) unit += 's';

    return this.item.item?.duracao + ' ' + unit;
  }

  get isProduto() {
    return this.item.isProduto;
  }

  toggleIsDeleting() {
    this.isDeleting = !this.isDeleting;
  }

  confirmDelete() {
    if(!this.isDeleting) return;

    this._itemsService.deleteItemByID(this.item.item.id, this.isProduto).subscribe(() => {
      this.removeChild.next(this.item);
    })
  }

  editItem() {
    const route = this.isProduto ? APP_ROUTES.produtos_edit : APP_ROUTES.servicos_edit;

    this._router.navigate([route, this.item.item.id]).then();
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;
  }

  public adicionarItemCarrinho(): void {
    this._carrinhoService.adicionarItem(this.item.item);
  }
}
