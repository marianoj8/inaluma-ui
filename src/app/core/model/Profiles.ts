
export class Perfil {
  public readonly names = [
    'ADMIN',
    'CLIENTE',
    'FUNCIONARIO'
  ];

  static get admin() {
    return {view: 'Administrador', api: 'ADMIN'};
  }
  static get cliente() {
    return {view: 'Cliente', api: 'CLIENTE'};
  }
  static get funcionario() {
    return {view: 'Funcionário', api: 'FUNCIONARIO'};
  }
}
