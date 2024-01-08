
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
  postProdutos = 'files/product/img',
  postServicos = 'files/service/img'
}

export const enum API_AUTH_ROUTES {
  logIn,
  logOut
}
