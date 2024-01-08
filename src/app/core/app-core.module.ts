import { NgModule } from "@angular/core";
import { LayoutModule } from "./components/layout/layout.module";
import { ThemeService } from "./services/theme.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./components/user/user.module";

@NgModule({
  exports: [
    LayoutModule,
    AuthModule,
    UserModule
  ],
  providers: [ThemeService]
}) export class CoreModule {}
