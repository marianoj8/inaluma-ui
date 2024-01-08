import { Component, inject } from "@angular/core";
import { User } from "../../model/dto/User";
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
  public users: User[];
  public userToPreview: User;
  public isPreviewing: boolean;

  constructor() {
    this.users = [];
    this.isPreviewing = false;
  }

  public previewUser(user: User) {

  }
}
