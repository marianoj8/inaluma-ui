import { NgModule } from "@angular/core";
import { CarrinhoListComponent } from "./carrinho-list.component";
import { CarrinhoService } from "./carrinho.service";
import { SharedModule } from "src/app/shared/shared.module";
import { SelectClienteDialogComponent } from "./select-cliente-dialog/select-cliente-dialog.component";

const declarations = [
  CarrinhoListComponent,
  SelectClienteDialogComponent
];

@NgModule({
  declarations: declarations,
  imports: [SharedModule],
  providers: [CarrinhoService]
})
export class CarrinhoModule {}
