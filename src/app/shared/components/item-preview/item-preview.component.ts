import { Component, Input, inject } from "@angular/core";
import { Router } from "@angular/router";
import { APP_ROUTES } from "../../config";
import { Item } from "src/app/core/model/dto/ItemDTO";

@Component({
  selector: 'app-item-preview',
  templateUrl: './item-preview.component.html'
})
export class ItemPreviewComponent {
  /* DEPENDENCIES */
  private readonly _router = inject(Router);

  /* MEMBERS */
  @Input() item: Item;

  public openDetails() {
    this._router.navigate([APP_ROUTES.produtos_comprar, this.item.id]).then();
  }
}
