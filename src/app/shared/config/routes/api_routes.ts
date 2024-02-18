
export const enum API_PRODUTOS_ROUTES {
  fetch = 'produtos',
  update = 'produtos',
  create = 'produtos',
  getByID = 'produtos/',
  deleteByID = 'produtos/'
}

export const enum API_SERVICES_ROUTES {
  fetch = 'servicos',
  update = 'servicos',
  create = 'servicos',
  getByID = 'servicos/',
  deleteByID = 'servicos/',
}

export const enum API_FILES_ROUTES {
  key = 'file',
  putPostProdutos = 'files/product/img?productId=',
  putPostServicos = 'files/service/img?serviceId=',
  getProdutos = 'files/product/',
  getServicos = 'files/service/'
}

export const enum API_AUTH_ROUTES {
  logIn = 'auth/sign-in'
}

export const enum API_APPLICATION_USER_ROUTES {
  fetchPutPost = 'users',
  getDeleteByID = 'users/',
}


export const enum API_USERS_ROUTES {
  fetchFuncionarios = 'funcionarios',
  updateFuncionario = 'funcionarios',
  postFuncionario = 'funcionarios',
  getFuncionarioByID = 'funcionarios/',
  deleteFuncionarioByID = 'funcionarios/',
  fetchClientes = 'clientes',
  updateCliente = 'clientes',
  postCliente = 'clientes',
  getClienteByID = 'clientes/',
  deleteClienteByID = 'clientes/',
}

export const enum API_AGENDAMENTOS_ROUTES {
  fetchPutPost = 'agendamentos',
  getDeleteByID = 'agendamentos/'
}

export const enum API_FACTURA_ITEMS_ROUTES {
  fetchPutPost = 'items',
  getDeleteByID = 'items/',
  getByFacturaID = 'items/fatura/'
}

export const enum API_FACTURA_ROUTES {
  fetchPutPost = 'facturas',
  getDeleteByID = 'facturas/',
  getByClienteID = 'facturas/cliente/',
  getByAgendamentoID = 'facturas/agendamento/'
}
