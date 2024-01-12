import { IEntityValue } from "./IEntityValue";
export class Sexo {
  public static readonly names: IEntityValue[] = [
    {api: 'F', view: 'Femenino'},
    {api: 'M', view: 'Masculino'}
  ];

  public static get masculino() {
    return;
  }

  public static get femenino() {
    return ;
  }
}
