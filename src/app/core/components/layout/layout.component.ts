import { Component, OnInit, ViewChild, ElementRef, Renderer2, inject } from "@angular/core";
import { MatSidenavContainer } from "@angular/material/sidenav";
import { ConfigOptions } from "src/app/shared/components/scroll-top/scroll-top.component";
import { HeaderComponent } from "./header/header.component";
import { LayoutService } from "./layout.service";
import { SCRTOP_POSITION, SCRTOP_COLOR } from "src/app/shared/config/consts/types";
import { ThemeService } from "../../services/theme.service";
import { ScrollDispatcher } from "@angular/cdk/scrolling";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  providers: [LayoutComponent],
})
export class LayoutComponent implements OnInit {
  /* DEPENDENCIES */
  private readonly _themeService = inject(ThemeService);

  /* MEMBERS */
  public isAdminLoggedIn: boolean;
  public showSidebar = false;
  public showProgressBar = true;
  public classList!: { hide: boolean; sm: boolean };
  public config!: ConfigOptions;
  public position = SCRTOP_POSITION.bottomRight;
  public color = SCRTOP_COLOR.accent;

  @ViewChild(MatSidenavContainer, { static: true }) sidenavContainer: MatSidenavContainer;
  @ViewChild(HeaderComponent, { read: ElementRef }) theHeader: ElementRef<HTMLElement>;

  ngOnInit(): void {
    // options for the scrolltop button
    this.config = {
      anchor: SCRTOP_POSITION.bottomRight,
      opacity: 0.36,
      scrollHeight: 100,
      icon: 'north',
      color: SCRTOP_COLOR.secondary,
      positioning: 'fixed',
      scrollComponent: this.sidenavContainer,
    };

    this._themeService.init();
  }
}
