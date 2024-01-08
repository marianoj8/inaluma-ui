import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/core/services/theme.service';
import { APP_ROUTES } from 'src/app/shared/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  /* DEPENDENCIES */
  private readonly _themeService = inject(ThemeService);
  private readonly _router = inject(Router);

  /* MEMBERS */
  readonly routes = APP_ROUTES;
  public isDarkThemeMode: boolean;

  constructor() { this.isDarkThemeMode = this._themeService.isDarkMode(); }

  public login() {
    this._router.navigate([APP_ROUTES.signIn]).then();
  }

  public signup() {
    this._router.navigate([APP_ROUTES.signUp]).then();
  }

  public toggleDarkMode() {
    this._themeService.toggleDarkMode().then(res => { this.isDarkThemeMode = res });
  }
}
