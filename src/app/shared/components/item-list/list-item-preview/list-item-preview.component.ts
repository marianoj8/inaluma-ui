import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Item, ItemDTO } from "src/app/core/model/dto/ItemDTO";

@Component({
  selector: 'app-list-item-preview',
  templateUrl: './list-item-preview.component.html'
})
export class ListItemPreviewComponent {
  @Input() item: Item;
  @Output() itemClicked: EventEmitter<Item>;

  constructor() {
    this.itemClicked = new EventEmitter();
  }

  get duracao() {
    let unit = this.item.item?.units === 'H' ? 'hora' : 'minuto';
    if(this.item.item?.duracao > 1) unit += 's';

    return this.item.item?.duracao + ' ' + unit;
  }
}
