import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { AgendamentoListComponent } from "./agendamento/agendamento-list.component";
import { DocumentoItemComponent } from "./documento-item/documento-item.component";

const declarations = [
  AgendamentoListComponent,
  DocumentoItemComponent
];

@NgModule({
  declarations: declarations,
  imports: [
    SharedModule
  ]
})
export class DocumentosModule {}
