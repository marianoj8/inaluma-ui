import { AbstractUserDTO } from "./AbstractUserDTO";

export class User extends AbstractUserDTO {
  public nome: string;
  public sobrenome: string;
  public genero: 'M' | 'F';
  public contato: string;
}
