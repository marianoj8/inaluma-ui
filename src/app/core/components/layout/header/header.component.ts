import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { CarrinhoService } from 'src/app/core/services/carrinho.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { APP_ROUTES } from 'src/app/shared/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  /* DEPENDENCIES */
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _themeService = inject(ThemeService);
  private readonly _carrinhoService = inject(CarrinhoService);

  /* MEMBERS */
  readonly routes = APP_ROUTES;
  public isDarkThemeMode: boolean;
  public itensCarrinho: number;
  public hideBadge: boolean;

  constructor() {
    this.isDarkThemeMode = this._themeService.isDarkMode();
    this.itensCarrinho = this._carrinhoService.itensCarrinho;
    this.hideBadge = !this.itensCarrinho;

    this._carrinhoService.estadoCarrinhoActualizado$.subscribe(estado => {
      console.log(estado);
      this.itensCarrinho = estado.qtdItens
      this.hideBadge;
    });
  }

  public login(): void {
    if(this.isLogado) {
      this._authService.signOut();

      this._router.navigate([APP_ROUTES.home]).then();
    } else this._router.navigate([APP_ROUTES.signIn]).then();
  }

  public signUp(): void { this._router.navigate([APP_ROUTES.signUp]).then(); }
  public toggleDarkMode(): void { this._themeService.toggleDarkMode().then(res => { this.isDarkThemeMode = res }); }

  public get isLogado(): boolean { return this._authService.isSignedIn(); }
  public canAdd(): boolean { return this.isLogado && this._authService.isAdmin(); }
  public get cartColor(): string { return this.hideBadge ? 'secondary' : 'accent'; }
}
