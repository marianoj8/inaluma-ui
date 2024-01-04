import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollTopDirective } from './directives/scroll-top.directive';
import { ScrollTopComponent } from './scroll-top.component';
import { MaterialModule } from '../../material.module';

const artifacts = [
  ScrollTopDirective,
  ScrollTopComponent
];

@NgModule({
  declarations: artifacts,
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ...artifacts
  ]
})
export class ScrollTopModule { }
