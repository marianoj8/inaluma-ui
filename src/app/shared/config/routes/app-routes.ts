
export enum APP_ROUTES {
  signIn = '/auth/log-in',
  signUp = '/auth/sign-up',

  home = '/',

  funcionarios = '/funcionarios',
  funcionarios_add = '/funcionarios/add',
  funcionarios_edit = '/funcionarios/edit',
  funcionarios_del = '/funcionarios/del',

  clientes = '/funcionarios',
  clientes_add = '/funcionarios/add',
  clientes_edit = '/funcionarios/edit',
  clientes_del = '/funcionarios/del',

  produtos = '/produtos',
  produtos_add = '/produtos/add',
  produtos_edit = '/produtos/edit',
  produtos_del = '/produtos/del',
  produtos_comprar = '/produtos/comprar/',

  servicos = '/servicos',
  servicos_add = '/servicos/add',
  servicos_edit = '/servicos/edit',
  servicos_del = '/servicos/del',
  servicos_agendar = '/servicos/agendar',

  agendamentos = '/agendamentos',
  agendamentos_confirmar = '/agendamentos/confirmar',
  agendamentos_editar = '/agendamentos/editar',
  agendamentos_visualizar = '/agendamentos/visualizar',

  compras = '/compras',
  compras_confirmar = '/compras/confirmar',
  compras_editar = '/compras/editar',
  compras_visualizar = '/compras/visualizar',

  carrinho = '/carrinho'
}
