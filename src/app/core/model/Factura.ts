import { STATUS_FACTURA } from "src/app/shared/config";
import { DocumentoAbstato } from "./DocumentoAbstrato";

export class Factura extends DocumentoAbstato {
  public get status(): STATUS_FACTURA { return this.getStatus<STATUS_FACTURA>(); }
}
