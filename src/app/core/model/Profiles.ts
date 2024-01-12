import { IEntityValue } from "./IEntityValue";

export class Perfil {
  public static readonly names: IEntityValue[] = [
    {view: 'Funcionário', api: 'FUNCIONARIO'},
    {view: 'Cliente', api: 'CLIENTE'},
    {view: 'Administrador', api: 'ADMIN'}
  ];

  static get admin() {
    return Perfil._findName('ADMIN');
  }
  static get cliente(): IEntityValue {
    return Perfil._findName('CLIENTE');
  }
  static get funcionario(): IEntityValue {
    return Perfil._findName('FUNCIONARIO');
  }

  private static _findName(name: string): IEntityValue {
    return this.names.find(i => i.api === name);
  }
}
