import { AbstractEntityDTO } from "./AbstractEntityDTO";

export class FuncionarioDTO extends AbstractEntityDTO {
  nome: string;
  sobrenome: string;
  contacto: string;
  estado: boolean;
  genero: 'M' | 'F'
}
