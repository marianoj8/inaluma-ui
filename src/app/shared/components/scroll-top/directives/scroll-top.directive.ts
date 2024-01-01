import {
  AfterViewInit,
  ComponentRef,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { LayoutService } from 'src/app/core/components/layout/layout.service';
import { SCRTOP_COLOR, SCRTOP_POSITION } from 'src/app/shared/config/consts/types';
import { ConfigOptions, ScrollTopComponent } from '../scroll-top.component';

@Directive({ selector: '[appScrollTop]' })
export class ScrollTopDirective implements OnInit, AfterViewInit {
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

  constructor(
    private viewContainerRef: ViewContainerRef,
    private _renderer: Renderer2,
    private _layoutService: LayoutService
    ) { }

  ngOnInit(): void {
    this._trigger = this.viewContainerRef.createComponent<ScrollTopComponent>(ScrollTopComponent);
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

  private _doSubscriptions(elem, container) {
    if(elem instanceof MatSidenavContainer) // scroll listener for MatSidenavContainer
      (elem as MatSidenavContainer).scrollable.elementScrolled().subscribe((evt: Event) => {
        this._scrollListener(elem.scrollable.getElementRef(), container, elem);
      });
    else // scroll listener for any other element
      this._renderer.listen(elem, 'scroll', (evt: Event) => {
        this._scrollListener(elem, container, elem);
      });

    this._renderer.listen(this._trigger.instance.trigger.nativeElement, 'click', () => {
      this._scrollBody(elem, 0);
    });

    this._layoutService.onBodyScrollRequested$.subscribe((scroll) => { this._scrollBody(elem, scroll) });
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
  private _manageVisibility(elem: ElementRef<any>, container: ElementRef<any>, options: ConfigOptions) {
    this._applyCSSClass(container.nativeElement, 'hide', !(elem.nativeElement.scrollTop < options.scrollHeight));
  }

  private _scrollListener(elem, container, source) {
    this._manageVisibility(elem, container, this._opts);
    this._layoutService.bodyScrolled(source);
  }

  private _scrollBody(elem: any, scroll: number) {
    (elem instanceof MatSidenavContainer)
      ? (elem as MatSidenavContainer).scrollable.scrollTo({ behavior: 'smooth', top: scroll })
      : elem.nativeElement.scrollTop = scroll;
    this._layoutService.bodyScrolled(elem);
  }
}
