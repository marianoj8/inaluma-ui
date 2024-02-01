import { Component, inject } from "@angular/core";
import { UserDTO } from "../../model/dto/UserDTO";
import { UsersService } from "./services/users.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent {
  /* DEPENDENCIES */
  public readonly _usersService = inject(UsersService);
  // public readonly ;

  /* MEMBERS */
  public users: UserDTO[];
  public userToPreview: UserDTO;
  public isPreviewing: boolean;

  constructor() {
    this.users = [];
    this.isPreviewing = false;
  }

  public previewUser(user: UserDTO) {

  }
}
