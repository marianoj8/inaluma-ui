import { Perfil } from "./Profiles";
import { UserDTO } from "./dto";

export class User {
  constructor(private readonly _dto: UserDTO) {}

  public get dto(): UserDTO { return this._dto }
  public get nome(): string { return this._dto.nome }
  public get sobrenome(): string { return this._dto.sobrenome }
  public get perf(): Perfil { return this._dto.perf }
  public get perfil(): string { return this._dto.perfil }
}
