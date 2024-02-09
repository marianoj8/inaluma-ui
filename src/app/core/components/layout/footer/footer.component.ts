import { Component } from '@angular/core';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
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
  public faFacebook = faFacebookF;
  public faInstagram = faInstagram;
  public fbURL: string;

  constructor() {
    this.ano = new Date(Date.now()).getFullYear();
    this.fbURL = 'https://www.facebook.com/valenia.goncalves';
  }
}
