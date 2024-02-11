import { NgModule } from "@angular/core";
import { LayoutModule } from "./components/layout/layout.module";
import { ThemeService } from "./services/theme.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./components/user/user.module";
import { CarrinhoModule } from "./components/carrinho/carrinho.module";
import { ToastrModule } from "ngx-toastr";
import { DocumentosModule } from "./components/documentos/documentos.module";
import { SectionActivationGuard } from "./services/section-activation.guard";
import { EmployeeGuard } from "./services/employee.guard";

@NgModule({
  imports: [ToastrModule.forRoot()],
  exports: [
    LayoutModule,
    AuthModule,
    UserModule,
    CarrinhoModule,
    DocumentosModule,
    ToastrModule
  ],
  providers: [
    ThemeService,
    SectionActivationGuard,
    EmployeeGuard
  ]
}) export class CoreModule {}
