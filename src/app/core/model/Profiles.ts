import { IEntityValue } from "./IEntityValue";

export class Perfil {
  constructor(private readonly name: IEntityValue) {}

  public static readonly names: IEntityValue[] = [
    {view: 'Funcionário', api: 'FUNCIONARIO'},
    {view: 'Cliente', api: 'CLIENTE'},
    {view: 'Administrador', api: 'ADMIN'}
  ];

  public static get admin() { return Perfil._findName('ADMIN'); }
  public static get cliente(): IEntityValue { return Perfil._findName('CLIENTE'); }
  public static get funcionario(): IEntityValue { return Perfil._findName('FUNCIONARIO'); }

  public get isAdmin(): boolean { return Perfil.admin.api === this.name.api }
  public get isCliente(): boolean { return Perfil.cliente.api === this.name.api }
  public get isFuncionario(): boolean { return Perfil.funcionario.api === this.name.api }

  private static _findName(name: string): IEntityValue { return this.names.find(i => i.api === name); }
  public static compare(p1: Perfil, p2: string): boolean { return p1.name.api === this._findName(p2).api }

  public static getPerfil(perfil: string): Perfil { return new Perfil(this._findName(perfil)); }
}
