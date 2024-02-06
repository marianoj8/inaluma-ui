import { NgModule } from "@angular/core";
import { LandingPageComponent } from "../visitor/landing-page/landing-page.component";
import { DocumentoFiltroComponent } from "./documento-filtro/documento-filtro.component";
import { ItemDetailsComponent } from "./item-details/item-details.component";
import { ItemFormComponent } from "./item-form/item-form.component";
import { ItemListComponent } from "./item-list/item-list.component";
import { ListItemPreviewComponent } from "./item-list/list-item-preview/list-item-preview.component";
import { ItemPreviewComponent } from "./item-preview/item-preview.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material.module";

const declarations = [
  LandingPageComponent,
  ItemPreviewComponent,
  ItemDetailsComponent,
  ItemFormComponent,
  ItemListComponent,
  ListItemPreviewComponent,
  DocumentoFiltroComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule
  ]
})
export class SharedComponentsModule {}
