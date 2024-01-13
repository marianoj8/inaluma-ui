import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { IEstadoCarrinho } from 'src/app/core/model/IEstadoCarrinho';
import { CarrinhoService } from 'src/app/core/components/carrinho/carrinho.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { APP_ROUTES } from 'src/app/shared/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  /* DEPENDENCIES */
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _themeService = inject(ThemeService);
  private readonly _carrinhoService = inject(CarrinhoService);

  /* MEMBERS */
  readonly routes = APP_ROUTES;
  public isDarkThemeMode: boolean;
  public estadoCarrinho: IEstadoCarrinho;

  constructor() {
    this.isDarkThemeMode = this._themeService.isDarkMode();
    this.estadoCarrinho = this._carrinhoService.estadoCarrinho;
  }

  ngOnInit(): void {
    this._carrinhoService.estadoActualizado$.subscribe(estado => {
      this.estadoCarrinho = estado
    });
  }
  public login(): void {
    if(this.isLogado) {
      this._authService.signOut();

      this._router.navigate([APP_ROUTES.home], {state: {k: 'sign me out'}}).then();
    } else this._router.navigate([APP_ROUTES.signIn], {state: {k: 'sign me in'}}).then();
  }

  public signUp(): void { this._router.navigate([APP_ROUTES.signUp], {state: {k: 'sign me up'}}).then(); }
  public toggleDarkMode(): void { this._themeService.toggleDarkMode().then(res => { this.isDarkThemeMode = res }); }

  public get isLogado(): boolean { return this._authService.isSignedIn; }
  public canAdd(): boolean { return this.isLogado && this._authService.isAdmin(); }
  public get cartColor(): string { return this.showBadge ? 'accent' : 'secondary'; }
  public get showBadge(): boolean { return this._carrinhoService.temItens }
}
