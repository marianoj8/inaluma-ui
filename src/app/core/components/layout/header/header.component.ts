import { Component, OnInit } from '@angular/core';
import { APP_ROUTES } from 'src/app/core/config/routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  readonly routes = APP_ROUTES;

  constructor() { }

  ngOnInit(): void {
  }

}
