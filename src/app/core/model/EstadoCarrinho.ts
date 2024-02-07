import { LOCAL_STORAGE } from "src/app/shared/config";
import { ItemCarrinho } from "./ItemCarrinho";
import { UserDTO } from "./dto";

export class EstadoCarrinho {
  private constructor(
    public readonly itens: ItemCarrinho[],
    public user?: UserDTO
  ) {}

  public static saveToLocalStorage(itens: ItemCarrinho[], user?:UserDTO): boolean {
    try {
      if(!(itens.length || user)) return false;

      const items = ItemCarrinho.forLocalStorage(itens);
      const estado = user ? new EstadoCarrinho(items, new UserDTO(user.id)) : new EstadoCarrinho(items);

      localStorage.setItem(LOCAL_STORAGE.carrinho, JSON.stringify(estado));

      return true;
    } catch(exc) {
      console.error("Couldn't save data to local storage; check reason below:");
      console.error(exc);
    }
  }

  public static readFromLocalStorage(): EstadoCarrinho {
    let bkp = localStorage.getItem(LOCAL_STORAGE.carrinho);

    if(!bkp) return null;

    const parsedBkp = JSON.parse(bkp) as EstadoCarrinho;
    let estado: EstadoCarrinho;
    const itens = ItemCarrinho.fromEstadoCarrinho(parsedBkp);

    estado = parsedBkp.user ? new EstadoCarrinho(itens, new UserDTO(parsedBkp.user.id)) : new EstadoCarrinho(itens);

    return estado;
  }

  public get temUser(): boolean { return !!this.user; }
}