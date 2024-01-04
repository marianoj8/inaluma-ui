import { Component, OnInit, inject } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';
import { APP_ROUTES } from 'src/app/shared/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  /* DEPENDENCIES */
  private readonly _themeService = inject(ThemeService);

  /* MEMBERS */
  readonly routes = APP_ROUTES;
  public isDarkThemeMode: boolean;

  constructor() { this.isDarkThemeMode = this._themeService.isDarkMode(); }

  public toggleDarkMode() {
    this._themeService.toggleDarkMode().then(res => { this.isDarkThemeMode = res });
  }
}
