import { NgModule } from "@angular/core";
import { CarrinhoListComponent } from "./carrinho-list.component";
import { CarrinhoService } from "./carrinho.service";
import { SharedModule } from "src/app/shared/shared.module";
import { SelectClienteDialogComponent } from "./select-cliente-dialog/select-cliente-dialog.component";
import { CarrinhoLoadGuard } from "./carrinho-load.guard";

const declarations = [
  CarrinhoListComponent,
  SelectClienteDialogComponent
];

@NgModule({
  declarations: declarations,
  imports: [SharedModule],
  providers: [
    CarrinhoService,
    CarrinhoLoadGuard
  ]
})
export class CarrinhoModule {}
