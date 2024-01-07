import { AbstractEntityDTO } from "./AbstractEntityDTO";
import { FuncionarioDTO } from "./FuncionarioDTO";

export class ItemDTO extends AbstractEntityDTO {
  nome: string;
  descricao: string;
  preco: number;
  data: string[];
  fileName: string;
  contentType: string;
  fixedSize: number;
  estado: boolean;
  tipo?: string;
  stock?: number;
  code?: string;
  funcionario?: FuncionarioDTO;
  units?: 'M' | 'H';
  duracao?: number;
}

export class Item {
  constructor (
    public readonly item: ItemDTO,
    public readonly isProduto: boolean
  ) {}
}
