import { NgModule } from "@angular/core";
import { ConfirmDialogComponent as ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../../material.module";
import { SelectItemsDialogComponent } from "./select-items/select-items.component";
import { SharedComponentsModule } from "../shared-components.module";

const declarations = [
  ConfirmDialogComponent,
  SelectItemsDialogComponent
];

@NgModule({
  declarations: declarations,
  exports: [
    ...declarations
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedComponentsModule
  ]
})
export class DialogsModule {}
