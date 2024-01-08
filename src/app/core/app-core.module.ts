import { NgModule } from "@angular/core";
import { LayoutModule } from "./components/layout/layout.module";
import { ThemeService } from "./services/theme.service";
import { AuthModule } from "./auth/auth.module";

@NgModule({
  exports: [
    LayoutModule,
    AuthModule
  ],
  providers: [ThemeService]
}) export class CoreModule {}
