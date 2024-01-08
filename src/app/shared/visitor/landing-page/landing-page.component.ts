import { Component, OnInit } from '@angular/core';
import { APP_ROUTES } from '../../config';
import { ItemDTO } from 'src/app/core/model/dto/ItemDTO';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent implements OnInit {
  readonly pathFotoCapa = '../../../../assets/images/capa.png.jpg';
  public items: ItemDTO[];
  public readonly routes = APP_ROUTES;

  ngOnInit(): void {
  }
}
