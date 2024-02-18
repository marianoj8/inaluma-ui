import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { AgendamentoListComponent } from "./agendamento/agendamento-list.component";
import { DocumentoItemComponent } from "./documento-item/documento-item.component";
import { AgendamentosService } from "./services/agendamento.service";
import { ItemsFacturaService } from "./services/items-factura.service";
import { FacturaService } from "./services/factura.service";
import { FacturaItemcomponent } from "./factura/factura-item/factura-item.component";
import { FacturaComponent } from "./factura/factura.component";

const declarations = [
  AgendamentoListComponent,
  DocumentoItemComponent,
  FacturaComponent,
  FacturaItemcomponent
];

@NgModule({
  declarations: declarations,
  imports: [
    SharedModule
  ],
  providers: [
    AgendamentosService,
    ItemsFacturaService,
    FacturaService
  ]
})
export class DocumentosModule {}
