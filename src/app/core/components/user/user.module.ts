import { NgModule } from "@angular/core";
import { UserComponent } from "./user.component";
import { SharedModule } from "src/app/shared/shared.module";
import { UsersService } from "./services/users.service";

const declarations = [
  UserComponent
]

@NgModule({
  declarations: declarations,
  imports: [SharedModule],
  exports: [
    ...declarations
  ],
  providers: [
    UsersService
  ]
})
export class UserModule {}
