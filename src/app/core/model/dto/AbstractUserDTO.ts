import { Perfil } from "../Profiles";
import { AbstractEntityDTO } from "./AbstractEntityDTO";

export abstract class AbstractUserDTO extends AbstractEntityDTO {
  public username: string;
  public password: string;
  public estado: boolean;
  public readonly perfil: Perfil;
}
