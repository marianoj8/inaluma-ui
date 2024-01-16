import { NgModule } from "@angular/core";
import { ConfirmDialogComponent as ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../../material.module";

const declarations = [
  ConfirmDialogComponent
];

@NgModule({
  declarations: declarations,
  exports: [
    ...declarations
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class DialogsModule {}
