import { AbstractUserDTO } from "./AbstractUserDTO";
import { User } from "./User";

export class ApplicationUser extends AbstractUserDTO {
  public funcionario: User;
  public cliente: User;
}
