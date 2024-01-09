import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Item, ItemDTO } from "src/app/core/model/dto/ItemDTO";
import { APP_ROUTES } from "../../config";
import { ItemsService } from "../../services/items.service";
import { debounceTime, delay, forkJoin, from, map, mergeMap, of, switchAll, switchMap, tap } from "rxjs";
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
  public itens: Item[];
  public isProduto: boolean;
  public canSearch: boolean;
  public readonly imagePlaceholder: string;

  constructor() {
    this.imagePlaceholder = '../../../../assets/images/No-Image-Placeholder.svg'
    this.canSearch = false;

    this._route.data.pipe(
      switchMap(data => this._itemsService.fetch(this.isProduto = data.isProduto)),
      switchMap((items) => from(this.itens = Item.createArray(items))),
      switchMap(d => {
        const test = of({
          item: d,
          blob: this._filesService.getImage(d.item.id, d.isProduto)
        });

        return of(test);
      }),
      switchMap(o => o),
    ).subscribe(data => {
      data.blob.then(b => {
        const reader = new FileReader();

        reader.onloadend = (ev: any) => {
          this.itens[this.itens.indexOf(data.item)].imgSrc = ev.currentTarget.result;
        }

        reader.readAsDataURL(b);
      })
    });
  }

  ngOnInit(): void {
  }

  toggleSearch(): void { this.canSearch = !this.canSearch; }

  get itemName() {
    return this.isProduto ? 'Produto' : 'Serviço';
  }

  get route() {
    return this.isProduto ? APP_ROUTES.produtos_add : APP_ROUTES.servicos_add;
  }
}
