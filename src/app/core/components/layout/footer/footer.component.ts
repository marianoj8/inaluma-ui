import { Component, OnInit } from '@angular/core';
import { APP_ROUTES } from 'src/app/core/config/routes';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  readonly routes = APP_ROUTES;
  readonly ano: number;

  constructor() {
    this.ano = new Date(Date.now()).getFullYear();
  }

  ngOnInit(): void {
  }

}
