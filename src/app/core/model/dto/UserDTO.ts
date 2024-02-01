import { AbstractUserDTO } from "./AbstractUserDTO";

export class UserDTO extends AbstractUserDTO {
  public nome: string;
  public sobrenome: string;
  public genero: 'M' | 'F';
  public contato: string;
}
