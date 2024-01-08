import { Component, Input } from "@angular/core";
import { ItemDTO } from "src/app/core/model/dto/ItemDTO";

@Component({
  selector: 'app-list-item-preview',
  templateUrl: './list-item-preview.component.html'
})
export class ListItemPreviewComponent {
  @Input() item: ItemDTO;
}
