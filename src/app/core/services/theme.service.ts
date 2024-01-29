import { Injectable, RendererFactory2, inject } from "@angular/core";
import { OverlayContainer } from "@angular/cdk/overlay";
import { THEME_CLASSES } from "src/app/shared/config";
import { LOCAL_STORAGE } from "src/app/shared/config";
import { AuthService } from "../auth/services/auth.service";

@Injectable()
export class ThemeService {
  /* DEPENDENCIES */
  private readonly _renderer = inject(RendererFactory2).createRenderer(null, null);
  private readonly _overlayContainer = inject(OverlayContainer);
  private readonly _authService = inject(AuthService);

  constructor() {
    this._authService.userLogged$.subscribe(() => { this.init() });
  }

  /* MEMBERS */
  private _defaultThemeMode = THEME_CLASSES.dark;

  public init() {
    // If a theme configuration already exists then we should remove it before proceeding
    if(this._currentThemeModeLS) this._unsetTheme(this._currentThemeModeLS);

    // install default theme config
    this._setTheme(this._defaultThemeMode);
  }

  private _setTheme(theme: THEME_CLASSES): boolean {
    try {
      this._manageThemeMode(theme, true);
      localStorage.setItem(LOCAL_STORAGE.themeKey, theme.toString()); // register the theme mode in the local storage

      return true;
    } catch (err) {
      alert('It seems you have disabled storage for our site, in order to proceed, you must activate it!');
      console.log(err.message);

      return false
    }
  }

  private _unsetTheme(theme: THEME_CLASSES) {
    this._manageThemeMode(theme, false);
    localStorage.removeItem(LOCAL_STORAGE.themeKey); // unregister the theme mode in the local storage
  }

  private _manageThemeMode(theme: THEME_CLASSES, install: boolean) {
    if(install) {
      this._renderer.addClass(document.body.parentElement, theme.toString()); // install the theme config on all descendants of MatSidenavContainer
      this._overlayContainer.getContainerElement().classList.add(theme.toString()); // install the theme config on all descendants of MatOverlay
    } else {
      this._renderer.removeClass(document.body.parentElement, theme.toString());
      this._overlayContainer.getContainerElement().classList.remove(theme.toString());
    }
  }

  public toggleDarkMode(): Promise<boolean> {
    const oldThemeMode = this._currentThemeModeLS;
    const newThemeMode = this.isDarkMode() ? THEME_CLASSES.light : THEME_CLASSES.dark;

    this._unsetTheme(oldThemeMode);
    const res = this._setTheme(newThemeMode);

    return res ? Promise.resolve(this.isDarkMode()) : Promise.reject(null);
  }

  private get _currentThemeModeLS(): THEME_CLASSES {
    return localStorage.getItem(LOCAL_STORAGE.themeKey) as THEME_CLASSES;
  }

  public isDarkMode(): boolean {
    return THEME_CLASSES.dark === this._currentThemeModeLS
  }
}
