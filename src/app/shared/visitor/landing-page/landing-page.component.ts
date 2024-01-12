import { Component, OnInit, inject } from '@angular/core';
import { APP_ROUTES } from '../../config';
import { Item, ItemDTO } from 'src/app/core/model/dto/ItemDTO';
import { ItemsService } from '../../services/items.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent implements OnInit {
  /* DEPENDENCIES */
  private readonly _itemsService = inject(ItemsService);

  /* MEMBERS */
  readonly pathFotoCapa = '../../../../assets/images/capa.png.jpg';
  public produtos: Item[];
  public servicos: Item[];
  public readonly routes = APP_ROUTES;

  constructor() {
    this._itemsService.fetch(true).pipe(take(4)).subscribe(items => { this.produtos = items });
    this._itemsService.fetch(false).pipe(take(4)).subscribe(items => { this.servicos = items });
  }

  ngOnInit(): void {
    this._itemsService.fetch(true)
  }
}
