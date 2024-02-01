import { AbstractUserDTO } from "./AbstractUserDTO";
import { UserDTO } from "./UserDTO";

export class ApplicationUserDTO extends AbstractUserDTO {
  public funcionario: UserDTO;
  public cliente: UserDTO;
}
