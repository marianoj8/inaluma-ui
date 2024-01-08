import { AbstractEntityDTO } from "./AbstractEntityDTO";
import { User } from "./User";

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
  funcionario?: User;
  units?: 'M' | 'H';
  duracao?: number;
}

export class Item {
  constructor (
    public readonly item: ItemDTO,
    public readonly isProduto: boolean,
    public readonly img?: string
  ) {}

  static createArray(dtos: ItemDTO[]) {
    const items = new Array<Item>();

    dtos.forEach(i => {
      items.push(new Item(i, !i?.funcionario, Item._convertDataToBase(i.data)))
    })
  }

  private static _convertDataToBase(data: any): string {
    return '';
  }
}
