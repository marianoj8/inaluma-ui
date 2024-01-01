export enum APP_ROUTES {
  home = '/app',
  dashboard = '/app/dashboard',

  cliente = '/app/cliente',
  clienteAdd = '/app/cliente/add',
  clienteEdit = '/app/cliente/edit',
  clienteDelete = '/app/cliente/delete',
  clienteConfig = 'app/cliente/config',
  clienteConfigAdd = 'app/cliente/config/add',
  clienteConfigEdit = 'app/cliente/config/edit',
  clienteConfigDelete = 'app/cliente/config/delete',

  ADMIN = '/app/admin',
  ADMIN_ADD = '/app/admin/add',
  ADMIN_EDIT = '/app/admin/edit',
  ADMIN_DELETE = '/app/admin/delete',

  BANCO = '/app/banco',
  BANCO_ADD = '/app/banco/add',
  BANCO_EDIT = '/app/banco/edit',
  BANCO_DELETE = '/app/banco/delete',

  FUNCIONARIO = '/app/funcionario',
  FUNCIONARIO_ADD = '/app/funcionario/add',
  FUNCIONARIO_EDIT = '/app/funcionario/edit',
  FUNCIONARIO_DELETE = '/app/funcionario/delete',

  EMPRESA_CONFIG = '/app/empresa-config',
  EMPRESA_CONFIG_ADD = '/app/empresa-config/add',
  EMPRESA_CONFIG_EDIT = '/app/empresa-config/edit',
  EMPRESA_CONFIG_DELETE = '/app/empresa-config/delete',

  CONSIGNATARIO = '/app/consignatario',
  CONSIGNATARIO_ADD = '/app/consignatario/add',
  CONSIGNATARIO_PAYMENTS = '/app/consignatario/payments',
  CONSIGNATARIO_EDIT = '/app/consignatario/edit',
  CONSIGNATARIO_DETALHE = '/app/consignatario/detalhe',
  CONSIGNATARIO_COMPROVATIVO = '/app/consignatario/comprovativo',
  CONSIGNATARIO_DELETE = '/app/consignatario/delete',

  CONTA_CORRENTE = '/app/conta-corrente',
  CONTA_CORRENTE_DETALHES = '/app/conta-corrente/detalhes',

  PESSOA_CONTATO = '/app/pessoa-contato',
  PESSOA_CONTATO_ADD = '/app/pessoa-contato/add',
  PESSOA_CONTATO_EDIT = '/app/pessoa-contato/edit',
  PESSOA_CONTATO_DELETE = '/app/pessoa-contato/delete',

  PROCESSO = '/app/processo',
  PROCESSO_ADD = '/app/processo/add',
  PROCESSO_EDIT = '/app/processo/edit',
  PROCESSO_DETALHE = '/app/processo/detalhe',
  PROCESSO_DELETE = '/app/processo/delete',
  PROCESSO_MERCADORIA = '/app/processo/mercadoria',

  REQUISICAO = '/app/requisicao',
  REQUISICAO_ADD = '/app/requisicao/add',
  REQUISICAO_EDIT = '/app/requisicao/edit',
  REQUISICAO_DETALHE = '/app/requisicao/detalhe',
  REQUISICAO_FORM_DETALHE = '/app/requisicao/form-detalhe',
  REQUISICAO_DELETE = '/app/requisicao/delete',
  REQUISICAO_MERCADORIA = '/app/requisicao/mercadoria',

  DIREITO_ADUANEIRO = '/app/direito-aduaneiro',
  DIREITO_ADUANEIRO_ADD = '/app/direito-aduaneiro/add',
  DIREITO_ADUANEIRO_EDIT = '/app/direito-aduaneiro/edit',
  DIREITO_ADUANEIRO_DETALHE = '/app/direito-aduaneiro/detalhe',
  DIREITO_ADUANEIRO_DELETE = '/app/direito-aduaneiro/delete',

  FUNDO_ADUANEIRO = '/app/fundo-aduaneiro',
  FUNDO_ADUANEIRO_ADD = '/app/fundo-aduaneiro/add',
  FUNDO_ADUANEIRO_EDIT = '/app/fundo-aduaneiro/edit',
  FUNDO_ADUANEIRO_DETALHE = '/app/fundo-aduaneiro/detalhe',
  FUNDO_ADUANEIRO_DELETE = '/app/fundo-aduaneiro/delete',

  IMPOSICAO = '/app/imposicao',
  IMPOSICAO_ADD = '/app/imposicao/add',
  IMPOSICAO_EDIT = '/app/imposicao/edit',
  IMPOSICAO_DETALHE = '/app/imposicao/detalhe',
  IMPOSICAO_DELETE = '/app/imposicao/delete',

  PERFIL = '/app/perfil',
  PERFIL_ADMIN = '/app/perfil/a',
  PERFIL_FUNCIONARIO = '/app/perfil/f',

  AREA_TRABALHO = '/app/trabalho',
  AREA_TRABALHO_ADD = '/app/trabalho/add',
  AREA_TRABALHO_EDIT = '/app/trabalho/edit',

  PEDIDOS = '/app/pedidos',
  PEDIDOS_PROCESSO_DETALHE = '/app/pedidos/processo/detalhe',
  PEDIDOS_PROCESSO_ADD = '/app/pedidos/processo/add',
  PEDIDOS_PROCESSO_EDIT = '/app/pedidos/processo/edit',
  PEDIDOS_PROCESSO_DELETE = '/app/pedidos/processo/delete',

  CAMBIO = '/app/cambio',
  CAMBIO_ADD = '/app/cambio/add',
  CAMBIO_EDIT = '/app/cambio/edit',
  CAMBIO_DELETE = '/app/cambio/delete',

  INSTANCIA = '/app/instancia',
  INSTANCIA_ADD = '/app/instancia/add',
  INSTANCIA_EDIT = '/app/instancia/edit',
  INSTANCIA_DELETE = '/app/instancia/delete',

  TERMINAL = '/app/terminal',
  TERMINAL_ADD = '/app/terminal/add',
  TERMINAL_EDIT = '/app/terminal/edit',
  TERMINAL_DELETE = '/app/terminal/delete',

  PROCEDENECIA = '/app/procedencia',
  PROCEDENECIA_ADD = '/app/procedencia/add',
  PROCEDENECIA_EDIT = '/app/procedencia/edit',
  PROCEDENECIA_DELETE = '/app/procedencia/delete',

  CATEGORIA = '/app/categoria',
  CATEGORIA_ADD = '/app/categoria/add',
  CATEGORIA_EDIT = '/app/categoria/edit',
  CATEGORIA_DELETE = '/app/categoria/delete',

  HONORARIO = '/app/honorario',
  HONORARIO_ADD = '/app/honorario/add',
  HONORARIO_EDIT = '/app/honorario/edit',
  HONORARIO_DELETE = '/app/honorario/delete',

  GLOBAL_CONFIG = '/app/global-config',

  TYPOGRAPHY = '/app/typography',
  TABLES = '/app/tables',
  NOTIFICATION = '/app/notification',
  UI_ELEMENTS_ICONS = '/app/ui/icons',
  UI_ELEMENTS_CHARTS = '/app/ui/charts',
  UI_ELEMENTS_MAP = '/app/ui/map',

  LOGIN = '/auth/login',
}

export const enum USERS_ROUTES {
  login = '/v1/auth/sign-in',

  // users
  users = '/v1/users/',
  entityBySerial = '/v1/users/entity?serial=',
  usersBySerial = '/v1/users?serial=',
  currentUser = '/v1/users/me',
  userTheme = '/v1/users/theme',
  addUserPermissions = '/v1/users/add-permissions?username=',
  removeUserPermissions = '/v1/users/remove-permissions?username=',
  userPermissionsByName = '/v1/users/permissions/user?&username=',
  permissionsByName = '/v1/users/permissions?nome=',
  permissionsNames = '/v1/users/permissions-names?nome=',
  getByUsername = '/v1/users?username=',

  changeUserViewSafely = '/v1/users/change-view-safely?areaTrabalhoId=',
  changeUserView = '/v1/users/change-view?areaTrabalhoId=',
  curUserPermissions = '/v1/users/me/permissions?nome=',
  permissionsListByUsername = '/v1/users/username/',
  userByUsername = '/v1/users/username/',

  admin = '/v1/users/admin/',
  isAdmin = '/v1/users/isAdmin',

  isCliente = '/v1/users/isCliente',
  isNotCliente = '/v1/users/isNotCliente',

  getFuncionario = '/v1/users/funcionario/',
  isFuncionario = '/v1/users/isFuncionario',

  getNotifications = '/topic/notifications',
}

export const enum PEDIDOS_ROUTES {
  home = '/v1/pedidos',
  confirm = '/confirm',
  decline = '/decline',
  fetchByConsignatarioAndProcesso = 'consignatario-processo?consignatarioId=',
  fetchByConsignatarioIdAndProcessoId = 'by?consignatarioId=',
  fetchByTipes = 'by-types?type=',
  fetchDeposited = '/depositados?consignatarioId=',
  fetchNotDeposited = '/not-depositados?consignatarioId=',
  revert = '/revert',
  search = '?descricao=',
  setDeposited = '/set-depositados/',

  // parameters
  paramProcessoID = '&processoId=',
  paramDeposito = '&deposito=',
  paramStatusCode = '&statusCode=',
  paramType = '&type=',
}

export const enum FILES_ROUTES {
  downloadComprovativo = '/v1/files/comprovativo/',
  downloadFatura = '/v1/files/factura/',
  getFileId1 = '/v1/files/file1/',
  getFileId2 = '/v1/files/file2/',
  uploadFactura = '/v1/files/factura/uploadFile?pedidosId=',
  uploadComprovativo = '/v1/files/comprovativo/uploadFile?pedidosId=',

  fileKey = 'file',
}

export const enum CAMBIO_ROUTES {}

export const enum NOTIFICATIONS_ROUTES {
  listNotification = '/v1/notifications',
  listNotificationWithLimit = '/v1/notifications/limit',
}

export const enum HONORARIO_ROUTES {
  home = '/v1/honorarios',
}

export const enum PROCESSO_DETALHES_ROUTES {
  contaFinalByProcID = '/v1/processos-detalhes/report/conta-final?processoDetalheId=',
}

export const enum REQUISICAO_DETALHES_ROUTES {
  report = '/v1/requisicoes-detalhes/report/requisicao?requisicaoDetalheId=',
}

export const enum FINANCAS_ROUTES {
  home = '/app/conta-corrente',
  detalhes = '/app/conta-corrente/detalhes',
  form = '/app/conta-corrente/form',
  processoFinanca = '/financa/processo',
  addFinanca = '/financa/add',
  editFinanca = '/financa/edit',
  detalheFinanca = '/financa/detalhe',
  deleteFinanca = '/financa/delete',
}

export const enum CONTA_CORRENTE_API {
  base = '/v1/conta-corrente',
  baseOutros = '-do',
  baseProcessos = '-df',
  baseRequisicao = '-dr',
  listByClientId = '?clienteId=',
  listByDescription = '?descricao=',

  insertItems = '/items'
}

export const enum SALDO_TOTAL_API {
  base = '/v1/saldo-total/cliente',
  requisicao = '/requisicao',
  processos = '/processos',
  outros = '/outros'
}

export const enum BANCO_API {
  base = '/v1/bancos',
  baseByID = '/v1/bancos/',
}
