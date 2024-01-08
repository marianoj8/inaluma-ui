import { NgModule } from "@angular/core";
import { LogInComponent } from "./components/log-in/log-in.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { SharedModule } from "src/app/shared/shared.module";

const declarations = [
  LogInComponent,
  SignUpComponent
]

@NgModule({
  declarations: declarations,
  imports: [SharedModule]
})
export class AuthModule {}
