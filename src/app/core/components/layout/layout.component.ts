import { Component, OnInit, ViewChild, ElementRef, inject } from "@angular/core";
import { MatSidenavContainer } from "@angular/material/sidenav";
import { ConfigOptions } from "src/app/shared/components/scroll-top/scroll-top.component";
import { HeaderComponent } from "./header/header.component";
import { SCRTOP_POSITION, SCRTOP_COLOR } from "src/app/shared/config/consts/types";
import { ThemeService } from "../../services/theme.service";
import { ActivationEnd, NavigationStart, Router } from "@angular/router";
import { filter, fromEvent, tap } from "rxjs";
import { CarrinhoService } from "../../services/carrinho.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  providers: [LayoutComponent],
})
export class LayoutComponent implements OnInit {
  /* DEPENDENCIES */
  private readonly _themeService = inject(ThemeService);
  private readonly _router = inject(Router);
  private readonly _carrinhoService = inject(CarrinhoService);

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

  constructor() {
    let pageReloaded: {started?: boolean, ended?: boolean} = {};

    this._router.events.pipe(
      filter(evt => evt instanceof NavigationStart || evt instanceof ActivationEnd),
      tap(evt => {
        if(evt instanceof NavigationStart) pageReloaded.started = true;
        else pageReloaded.ended = true;
      })
    ).subscribe(evt => {
      print_nav_timing_data();

      if(pageReloaded.started && pageReloaded.ended) console.log('location changed');
      else console.log('location not changed');
    });

    window.addEventListener('beforeunload',evt => {
      console.log('%cbefore upload', 'font-size: 10px; color: orange');
      let loadNumber = Number(localStorage.getItem('load')) ?? 1;
      localStorage.setItem('load', (loadNumber+1).toString())
    });

    fromEvent(window, 'load').subscribe((evt) => {
      console.log('%cload event', 'font-size: 14px; color: orange');
    })
  }

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

function print_nav_timing_data() {
  // Use getEntriesByType() to just get the "navigation" events
  var perfEntries = performance.getEntriesByType("navigation");

  for (var i=0; i < perfEntries.length; i++) {
    var p = perfEntries[i];
    console.log(p);
  }
}
