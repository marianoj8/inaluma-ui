import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from "@angular/core";
import { MatSidenavContainer } from "@angular/material/sidenav";
import { ConfigOptions } from "src/app/shared/components/scroll-top/scroll-top.component";
import { LAYOUT_FLAGS, CSS_HIDE } from "../../config/consts";
import { HeaderComponent } from "./header/header.component";
import { LayoutService, SideMenuState } from "./layout.service";
import { SCRTOP_POSITION, SCRTOP_COLOR } from "src/app/shared/config/consts/types";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  providers: [LayoutComponent],
})
export class LayoutComponent implements OnInit {
  public isAdminLoggedIn: boolean;
  public showSidebar = false;
  public showProgressBar = true;
  public classList!: { hide: boolean; sm: boolean };
  public config!: ConfigOptions;
  public position = SCRTOP_POSITION.bottomRight;
  public color = SCRTOP_COLOR.accent;
  @ViewChild(MatSidenavContainer, { static: true })
  sidenavContainer: MatSidenavContainer;
  @ViewChild(HeaderComponent, { read: ElementRef })
  theHeader: ElementRef<HTMLElement>;

  constructor(
    private _layoutService: LayoutService,
    private _renderer: Renderer2
  ) {
    let prevValue = 0;

    this._layoutService.onBodyScrolled$.subscribe(
      (source: MatSidenavContainer | HTMLElement) => {
        let offset = (
          source as MatSidenavContainer
        )._content.measureScrollOffset('top');
        const headHeight = Number.parseInt(LAYOUT_FLAGS.headerHeight);

        if (offset > prevValue) {
          offset < headHeight
            ? (this.theHeader.nativeElement.style.cssText = `margin-top: -${offset}px`)
            : this.theHeader.nativeElement.classList.add(CSS_HIDE);
          _layoutService.topHeaderHidden(offset);
        } else {
          this.theHeader.nativeElement.classList.remove(CSS_HIDE);
          this._renderer.removeStyle(
            this.theHeader.nativeElement,
            'margin-top'
          );
        }
        prevValue = offset;
      }
    );
  }

  ngOnInit(): void {
    // options for the scrolltop button
    this.config = {
      anchor: SCRTOP_POSITION.bottomRight,
      opacity: 0.36,
      scrollHeight: 100,
      icon: 'north',
      color: SCRTOP_COLOR.primary,
      positioning: 'fixed',
      scrollComponent: this.sidenavContainer,
    };
  }
}
