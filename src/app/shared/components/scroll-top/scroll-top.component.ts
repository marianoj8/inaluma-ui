import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { SCRTOP_COLOR, SCRTOP_POSITION } from 'src/app/shared/config/consts/types';

export interface ConfigOptions {
  icon?: string,
  color?: SCRTOP_COLOR,
  /** transparency level */
  opacity?: number,
  anchor: SCRTOP_POSITION,
  /** whether the trigger is to be fixed system level or section level */
  positioning: 'absolute' | 'fixed',
  scrollHeight?: number,
  /** the reference of the object to attach the scroll event listener to */
  scrollComponent?: object
}

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss']
})
export class ScrollTopComponent {
  @ViewChild('container', {static: true, read: ElementRef}) container!: ElementRef<HTMLDivElement>;
  @ViewChild('trigger', {static: true, read: ElementRef}) trigger!: ElementRef<MatButton>;
  icon!: string;
  color!: SCRTOP_COLOR;
}
