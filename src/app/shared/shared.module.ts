import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { ScrollTopModule } from './components/scroll-top/scroll-top.module';

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ScrollTopModule
  ],
})
export class SharedModule {}
