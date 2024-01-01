import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable, OnInit, Renderer2 } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { Subject, Subscription } from 'rxjs';
import { MEDIA_BREAKPOINTS } from '../../config/consts';

export const enum SideMenuState {
  Expanded = 2,
  Shrinked = 1,
  Hidden = 0
}

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private _sideMenuShrinked = true;
  private _sideMenuHidden = false;
  private _formPagesShowing = false;

  // Observable sources
  private _watchScreenSizeSource = new Subject<BreakpointState>();
  private _hideSideMenuSource = new Subject<boolean>();
  private _changeSizeSource = new Subject<boolean>();
  private _showFormPagesSource = new Subject<boolean>();
  private _hideTopHeaderSource = new Subject<number>();
  private _bodyScrolledSource = new Subject<MatSidenavContainer | HTMLElement>();
  private _bodyScrollRequestedSource = new Subject<number>();

  // Observable streams
  hideSideMenu$ = this._hideSideMenuSource.asObservable();
  sidebarSizeChanged$ = this._changeSizeSource.asObservable();
  accountPagesShown$ = this._showFormPagesSource.asObservable();
  onHideTopHeader$ = this._hideTopHeaderSource.asObservable();
  onBodyScrolled$ = this._bodyScrolledSource.asObservable();
  onBodyScrollRequested$ = this._bodyScrollRequestedSource.asObservable();

  constructor(
    private _breakpointObserver: BreakpointObserver
  ) { }

  //service message commands

  /**
   * Subscribes an observable to watch for changes on the viewport;
   * Internally, it uses a `BreakPointObserver` object set to observe `breakpoint`
   * @param breakpoint the viewport size to observe
   * @param callback the observer to subscribe
   * @returns the subscription for this computation
   */
  watchViewportSize(breakpoint: MEDIA_BREAKPOINTS, callback: any): Subscription {
    const observable = this._breakpointObserver.observe(breakpoint);
    const subscription = observable.subscribe(this._watchScreenSizeSource);

    // merges and returns both subscriptions
    subscription.add(this._watchScreenSizeSource.subscribe(callback));
    return subscription;
  }

  /**
   * Toggles the sidemenu open state and multicasts the new state to all registered observers
   * @returns `true` if the side menu is currently hidden and `false` if not.
   */
  hideSideMenu(): boolean {
    this._sideMenuHidden = !this._sideMenuHidden;
    this._hideSideMenuSource.next(this._sideMenuHidden);

    return this._sideMenuHidden;
  }

  /**
   * Toggles the side menu size to `shrinked` or `expanded`
   * @returns `true` if the side menu's current state is `shrinked` and `false` if it is `expanded`
   */
  resizeSideMenu(): boolean {
    this._sideMenuShrinked = !this._sideMenuShrinked;
    this._changeSizeSource.next(this._sideMenuShrinked);

    return this._sideMenuShrinked;
  }

  /** Returns the current side menu state */
  get sideMenuState(): SideMenuState {
    let state: SideMenuState;

    if(this._sideMenuHidden)
      state = SideMenuState.Hidden;
    else
      state = (this._sideMenuShrinked)
        ? SideMenuState.Shrinked
        : SideMenuState.Expanded;

    return state;
  }

  /**
   * Evaluates a media size against the current viewport size
   * @param size the screen breakpoint to evaluate
   * @returns `true` if the query matches and `false`otherwise
   */
  currentViewportSize(size: MEDIA_BREAKPOINTS): boolean {
    return this._breakpointObserver.isMatched(size);
  }

  /** Toggles header, footer and main sidebar visibility and publishes the change to all subscribed observers */
  showAccountPages(): void {
    this._showFormPagesSource.next(this._formPagesShowing = !this._formPagesShowing);
  }

  /** Returns the current visibility state for the account pages (sign in and register pages) */
  get accountPagesShowing(): boolean {
    return this._formPagesShowing;
  }

  scrollBody(offset: number) { this._bodyScrollRequestedSource.next(offset) }
  bodyScrolled(offset: MatSidenavContainer | HTMLElement) { this._bodyScrolledSource.next(offset) }
  topHeaderHidden(offset: number) { this._hideTopHeaderSource.next(offset) }
}
