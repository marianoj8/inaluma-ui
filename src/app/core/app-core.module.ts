import { NgModule } from "@angular/core";
import { LayoutModule } from "./components/layout/layout.module";
import { ThemeService } from "./services/theme.service";

@NgModule({
  exports: [
    LayoutModule
  ],
  providers: [
    ThemeService
  ]
}) export class CoreModule {}
