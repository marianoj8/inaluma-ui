import { formatNumber } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ItemCarrinho } from "src/app/core/model";
import { FACTURA_ITEM_VIEW_MODE } from "src/app/shared/config";

@Component({
  selector: 'app-factura-item',
  templateUrl: './factura-item.component.html'
})
export class FacturaItemcomponent {
  /* DEPENDENCIES */
  /* MEMBERS */
  @Input() item: ItemCarrinho;
  @Input() viewMode: FACTURA_ITEM_VIEW_MODE;
  public FACTURA_ITEM_VIEW_MODE = FACTURA_ITEM_VIEW_MODE;

  public get preco(): string { return this._formatNumber(this.item.preco); }
  public get qtd(): string { return this._formatNumber(this.item.qtd) }
  public get total(): string { return this._formatNumber(this.item.total) }
  public get nome(): string { return this.item.nome }
  public get imgSrc(): string { return this.item.imgSrc }
  public get imgAltText(): string { return 'Imagem do ' + this.item.itemTypeName }

  public isCurrentViewMode(mode: FACTURA_ITEM_VIEW_MODE): boolean { return this.viewMode === mode }

  private _formatNumber(val: number, format = '1.0-2'): string { return formatNumber(val, 'pt', format) }
}
