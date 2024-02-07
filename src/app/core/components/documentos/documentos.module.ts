import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { AgendamentoListComponent } from "./agendamento/agendamento-list.component";
import { DocumentoItemComponent } from "./documento-item/documento-item.component";
import { AgendamentosService } from "./services/agendamento.service";
import { ItemsFacturaService } from "./services/items-factura.service";

const declarations = [
  AgendamentoListComponent,
  DocumentoItemComponent
];

@NgModule({
  declarations: declarations,
  imports: [
    SharedModule
  ],
  providers: [
    AgendamentosService,
    ItemsFacturaService
  ]
})
export class DocumentosModule {}
