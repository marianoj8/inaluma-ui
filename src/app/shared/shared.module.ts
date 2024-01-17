import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { ScrollTopModule } from './components/scroll-top/scroll-top.module';
import { ItemPreviewComponent } from './components/item-preview/item-preview.component';
import { LandingPageComponent } from './visitor/landing-page/landing-page.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ListItemPreviewComponent } from './components/item-list/list-item-preview/list-item-preview.component';
import { TextMaskModule } from 'angular2-text-mask';
import { DialogsModule } from './components/dialogs/dialogs.module';
import { ItemsDataResolver } from './components/items-data.resolver';

const declarations = [
  LandingPageComponent,
  ItemPreviewComponent,
  ItemDetailsComponent,
  ItemFormComponent,
  ItemListComponent,
  ListItemPreviewComponent
];

@NgModule({
  declarations: declarations,
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ScrollTopModule,
    TextMaskModule,
    DialogsModule,
    ...declarations
  ],
  providers: [ItemsDataResolver]
})
export class SharedModule {}
