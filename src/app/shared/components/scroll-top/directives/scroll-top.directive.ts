import {
  AfterViewInit,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewContainerRef,
  inject
} from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { LayoutService } from 'src/app/core/components/layout/layout.service';
import { SCRTOP_COLOR, SCRTOP_POSITION } from 'src/app/shared/config/consts/types';
import { ConfigOptions, ScrollTopComponent } from '../scroll-top.component';
import { throttleTime, map, pairwise, distinctUntilChanged, share, filter, fromEvent } from 'rxjs';

@Directive({ selector: '[appScrollTop]' })
export class ScrollTopDirective implements OnInit, AfterViewInit {
  /* DEPENDENCIES */
  private readonly _viewContainerRef = inject(ViewContainerRef);
  private readonly _renderer = inject(Renderer2);
  private readonly _layoutService = inject(LayoutService);
  /** The scroll to top trigger */
  private _trigger: ComponentRef<ScrollTopComponent>;
  private _opts: ConfigOptions;

  /** Options to configure the trigger */
  @Input() set appScrollTop(options: ConfigOptions) {
    // set default values for required options and custom values otherwise
    this._opts = {
      color: options?.color ?? SCRTOP_COLOR.primary,
      icon: options?.icon ?? 'chevron',
      opacity: ((options?.opacity >= 0) && (options?.opacity <= 1))
        ? options.opacity : 0.35,
      anchor: options.anchor ?? SCRTOP_POSITION.bottomRight,
      positioning: options.positioning,
      scrollHeight: (options?.scrollHeight >= 30)
        ? options.scrollHeight : 100,
      scrollComponent: options.scrollComponent
    };
  };

  ngOnInit(): void {
    this._trigger = this._viewContainerRef.createComponent(ScrollTopComponent);
    let pai = this._trigger.location.nativeElement;
    let container = this._trigger.instance.container.nativeElement;

    // configure the scroll top component
    this._trigger.instance.icon = this._opts.icon;
    this._trigger.instance.color = this._opts.color;

    this._applyCSSClass(pai, this._opts.anchor.toString());
    this._applyStyles(pai, 'position', this._opts.positioning);

    this._applyStyles(container, 'opacity', `${this._opts.opacity}`);
    this._applyCSSClass(container, 'hide');
  }

  ngAfterViewInit(): void {
    // determine the scrollable component
    const elem = this._opts.scrollComponent ?? this._renderer.parentNode(this._trigger.location);
    const container = this._trigger.instance.container;

    this._doSubscriptions(elem, container);
  }

  private _doSubscriptions(elem: MatSidenavContainer | HTMLElement, container) {
    if(elem instanceof MatSidenavContainer) { // scroll listener for MatSidenavContainer
      const scroll$ = elem.scrollable.elementScrolled().pipe(
        throttleTime(10), // only emit every 10 ms
        map((evt) => evt.target), // get vertical scroll position
        pairwise(), // look at this and the last emitted element
        map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)), // compare this and the last element to figure out scrolling direction
        distinctUntilChanged(), // only emit when scrolling direction changed
        share() // share a single subscription to the underlying sequence in case of multiple subscribers
      )
      const goingUp$ = scroll$.pipe(filter(direction => direction === Direction.Up));
      const goingDown$ = scroll$.pipe(filter(direction => direction === Direction.Down));

      goingUp$.subscribe(() => console.log('scrolling up'));
      goingDown$.subscribe(() => console.log('scrolling down'));

    } else if(elem) // scroll listener for any other element
      this._renderer?.listen(elem, 'scroll', (evt: Event) => {
        this._scrollListener(elem, container, elem);
      });

    this._renderer?.listen(this._trigger.instance.trigger.nativeElement, 'click', () => {
      this._scrollContainer(elem, 0);
    });

    /* this._layoutService.onBodyScrollRequested$.subscribe((scroll) => {this._scrollContainer(elem, scroll) });
    this._layoutService.onBodyScrollRequested$.subscribe((s) => {
      console.log('a scroll was requested so I came =)');
    }); */
  }

  /**
   * @description Apllies css styles on element; If no value is informed, the inverse operation
   * is performed
   * @param elem The element on which to aplly the style
   * @param prop the css property to change
   * @param val the property value to apply
   */
  private _applyStyles(elem: any, prop: string, val?: string): void {
    if(val) this._renderer.setStyle(elem, prop, val);
    else this._renderer.removeStyle(elem, prop);
  }

  /**
   * @description Applies a css class on an element; If no class name is informed, the oposite
   * operation is performed
   * @param elem the element on which the class is to be applied
   * @param val the class to be applied
   */
  private _applyCSSClass(elem: any, val: string, remove = false): void {
    if(remove) this._renderer.removeClass(elem, val);
    else this._renderer.addClass(elem, val);
  }

  /**
   * listener for the scroll trigger
   * @param elem the scrollable component
   * @param container the component to fade
   * @param options the options object
   */
  private _manageVisibility(elem: any, container: ElementRef<any>, options: ConfigOptions) {
    let cont = container.nativeElement ?? container;
    let targ = elem.nativeElement ?? elem
    this._applyCSSClass(cont, 'hide', !(targ.scrollTop < options.scrollHeight));
  }

  private _scrollListener(elem, container, source) {
    this._manageVisibility(elem, container, this._opts);
    this._layoutService.bodyScrolled(source);
  }

  private _scrollContainer(elem: MatSidenavContainer | HTMLElement, scroll: number) {
    const scrollOptions: ScrollToOptions = { behavior: 'smooth', top: scroll };
    if(elem instanceof MatSidenavContainer) elem.scrollable.scrollTo(scrollOptions)
    else elem.scrollTo(scrollOptions);
    this._layoutService.bodyScrolled(elem);
  }

  @HostListener('document:scroll', ['$event.target'])
  public onDocumentScroll(target) {
    this._scrollListener(target.scrollingElement, this._trigger.instance.container, target);
    this._renderer.listen(this._trigger.instance.trigger.nativeElement, 'click', (e) => {
      this._scrollContainer(target.scrollingElement, 0);
    });
  }
}

enum Direction {
  Up = 'Up',
  Down = 'Down'
}
