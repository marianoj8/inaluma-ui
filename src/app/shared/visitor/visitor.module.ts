import { NgModule } from "@angular/core";
import { SharedModule } from "../shared.module";
import { LandingPageComponent } from "./landing-page/landing-page.component";

const declarations = [
  LandingPageComponent
]

@NgModule({
  declarations: declarations,
  imports: [
    SharedModule
  ],
  exports: [
    ...declarations
  ]
})
export class VisitorModule {}
