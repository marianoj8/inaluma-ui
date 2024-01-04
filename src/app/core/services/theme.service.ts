import { Injectable, RendererFactory2, inject } from "@angular/core";
import { OverlayContainer } from "@angular/cdk/overlay";
import { THEME_CLASSES } from "src/app/shared/config";
import { LOCAL_STORAGE } from "src/app/shared/config";

@Injectable()
export class ThemeService {
  /* DEPENDENCIES */
  private readonly _renderer = inject(RendererFactory2).createRenderer(null, null);
  private readonly _overlayContainer = inject(OverlayContainer);

  /* MEMBERS */
  private _defaultThemeMode = THEME_CLASSES.dark;

  public init() { this._setTheme(this._defaultThemeMode) }

  private _setTheme(theme: THEME_CLASSES) {
    this._renderer.addClass(document.body, theme.toString());
    this._overlayContainer.getContainerElement().classList.add(theme.toString());
    localStorage.setItem(LOCAL_STORAGE.themeKey, theme.toString());
  }

  private _deactivateTheme(theme: THEME_CLASSES) {
    this._renderer.removeClass(document.body, theme.toString());
    this._overlayContainer.getContainerElement().classList.remove(theme.toString());
  }

  public toggleDarkMode() {

  }

  public isDarkMode() {
    return localStorage.getItem(LOCAL_STORAGE.themeKey)
  }
}
