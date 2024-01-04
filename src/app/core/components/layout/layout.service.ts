import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private _hideTopHeaderSource = new Subject<number>();
  private _bodyScrolledSource = new Subject<MatSidenavContainer | HTMLElement>();
  private _bodyScrollRequestedSource = new Subject<number>();

  // Observable streams
  onHideTopHeader$ = this._hideTopHeaderSource.asObservable();
  onBodyScrolled$ = this._bodyScrolledSource.asObservable();
  onBodyScrollRequested$ = this._bodyScrollRequestedSource.asObservable();

  constructor(
    private _breakpointObserver: BreakpointObserver
  ) { }

  scrollBody(offset: number) { this._bodyScrollRequestedSource.next(offset) }
  bodyScrolled(offset: MatSidenavContainer | HTMLElement) { this._bodyScrolledSource.next(offset) }
  topHeaderHidden(offset: number) { this._hideTopHeaderSource.next(offset) }
}
