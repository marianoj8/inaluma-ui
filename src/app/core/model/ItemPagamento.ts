import { METODO_PAGAMENTO } from "src/app/shared/config";
import { ItemPagamentoDTO } from "./dto/ItemPagamentoDTO";

export class ItemPagamento {
  constructor(private readonly _dto: ItemPagamentoDTO) {}

  public get quantia(): number { return this._dto.valorPagamento; }
  public get criacao(): string { return this._dto.createdAt; }
  public get metodo(): METODO_PAGAMENTO { return this._dto.metodo; }
}
