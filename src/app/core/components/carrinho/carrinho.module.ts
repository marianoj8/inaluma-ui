import { NgModule } from "@angular/core";
import { CarrinhoListComponent } from "./carrinho-list.component";
import { CarrinhoService } from "./carrinho.service";
import { SharedModule } from "src/app/shared/shared.module";

const declarations = [
  CarrinhoListComponent
];

@NgModule({
  declarations: declarations,
  imports: [SharedModule],
  providers: [CarrinhoService]
})
export class CarrinhoModule {}
