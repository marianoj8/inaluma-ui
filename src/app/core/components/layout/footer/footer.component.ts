import { Component } from '@angular/core';
import { APP_ROUTES } from 'src/app/shared/config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  /* MEMBERS */
  readonly routes = APP_ROUTES;
  readonly ano: number;
  readonly facebook = 'https://www.facebook.com/inalumamakeup';
  readonly twitter = '#';
  readonly instagram = '#';

  constructor() {
    this.ano = new Date(Date.now()).getFullYear();
  }
}
