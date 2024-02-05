import { STATUS_AGENDAMENTO, STATUS_FACTURA } from "src/app/shared/config";
import { AbstractEntityDTO } from "./AbstractEntityDTO";
import { UserDTO } from "./UserDTO";

export abstract class DocumentoAbstratoDTO extends AbstractEntityDTO {
  public status: STATUS_AGENDAMENTO | STATUS_FACTURA;
  public user: UserDTO;
  public cliente: UserDTO;
  public funcionario: UserDTO;
}
