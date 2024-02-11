import { AbstractEntityDTO } from "./AbstractEntityDTO";
import { UserDTO } from "./UserDTO";

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
  funcionario?: UserDTO;
  units?: 'M' | 'H';
  duracao?: number;
}

export class Item {
  constructor (
    public readonly item: ItemDTO,
    public readonly isProduto: boolean,
    public readonly id = item.id,
    public imgSrc?: string,
  ) {}

  public get nome(): string { return this.item.nome; }
  public get descricao(): string { return this.item.descricao; }
  public get preco(): number { return this.item.preco; }
  public get estado(): boolean { return this.item.estado; }

  public get tipo(): string {
    if(this.isProduto) return this.item.tipo;
    else throw new Error("Method not implemented");
  }

  public get code(): string {
    if(this.isProduto) return this.item.code;
    else throw new Error("Method not implemented");
  }

  public get stock(): number {
    if(this.isProduto) return this.item.stock;
    else throw new Error("Method not implemented");
  }

  public get units(): string {
    if(!this.isProduto) return this.item.units;
    else throw new Error("Method not implemented");
  }

  public get duracao(): number {
    if(!this.isProduto) return this.item.duracao;
    else throw new Error("Method not implemented");
  }

  public get itemTypeName(): string { return this.isProduto ? 'Produto' : 'Serviço' }

  public equals(o: Object): boolean {
    return (o instanceof Item) ? this.id === (o as Item).id && this.isProduto === (o as Item).isProduto : false;
  }

  static createArray(dtos: ItemDTO[]) {
    const items = new Array<Item>();

    dtos.forEach(i => {
      items.push(new Item(i, !i?.units))
    })

    return items;
  }
}
