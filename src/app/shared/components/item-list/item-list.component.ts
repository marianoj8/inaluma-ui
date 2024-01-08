import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ItemDTO } from "src/app/core/model/dto/ItemDTO";
import { APP_ROUTES } from "../../config";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list-theme.scss']
})
export class ItemListComponent implements OnInit {
  /* DEPENDENCIES */
  private readonly _route = inject(ActivatedRoute);
  public itens: ItemDTO[];
  public isProduto: boolean;
  public canSearch: boolean;
  public readonly route: APP_ROUTES;

  constructor() {
    this._route.data.subscribe(data => { this.isProduto = data.isProduto });
    this.canSearch = false;
    this.route = this.isProduto ? APP_ROUTES.produtos_add : APP_ROUTES.servicos_add;
  }

  ngOnInit(): void {
    console.log(this._route.data)
  }

  toggleSearch(): void { this.canSearch = !this.canSearch; }

  get itemName() {
    return this.isProduto ? 'Produto' : 'Serviço';
  }
}
