import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { ScrollTopModule } from './components/scroll-top/scroll-top.module';
import { TextMaskModule } from 'angular2-text-mask';
import { DialogsModule } from './components/dialogs/dialogs.module';
import { ItemsDataResolver } from './components/items-data.resolver';
import { ItemsService } from './services/items.service';
import { FilesService } from './services/files.service';
import { SharedComponentsModule } from './components/shared-components.module';

@NgModule({
  exports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ScrollTopModule,
    TextMaskModule,
    SharedComponentsModule,
    DialogsModule
  ],
  providers: [
    ItemsService,
    FilesService,
    ItemsDataResolver
  ]
})
export class SharedModule {}
