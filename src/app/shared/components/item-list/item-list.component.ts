import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ItemDTO } from "src/app/core/model/dto/ItemDTO";
import { APP_ROUTES } from "../../config";
import { ItemsService } from "../../services/items.service";
import { switchMap, tap } from "rxjs";
import { FilesService } from "../../services/files.service";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list-theme.scss']
})
export class ItemListComponent implements OnInit {
  /* DEPENDENCIES */
  private readonly _route = inject(ActivatedRoute);
  private readonly _itemsService = inject(ItemsService);
  private readonly _filesService = inject(FilesService);

  /* MEMBERS */
  public itens: ItemDTO[];
  public isProduto: boolean;
  public canSearch: boolean;
  public readonly route: APP_ROUTES;
  public readonly imagePlaceholder: string;

  constructor() {
    this.imagePlaceholder = '../../../../assets/images/No-Image-Placeholder.svg'
    this.route = this.isProduto ? APP_ROUTES.produtos_add : APP_ROUTES.servicos_add;
    this.canSearch = false;

    this._route.data.pipe(
      switchMap(data => {
        this.isProduto = data.isProduto;

        return this._itemsService.fetch(this.isProduto);
      })
    ).subscribe(items => {
      this.itens = items;
      const item = items[0];

      this._filesService.getImage(item.id, this.isProduto).subscribe(v => {
        console.log(v);
      });

      console.log(this.itens);
    });
  }

  ngOnInit(): void {
  }

  toggleSearch(): void { this.canSearch = !this.canSearch; }

  get itemName() {
    return this.isProduto ? 'Produto' : 'Serviço';
  }
}