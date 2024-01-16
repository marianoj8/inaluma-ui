
enum SCRTOP_COLOR {
  primary = 'primary',
  secondary = 'secondary',
  accent = 'accent'
}
enum SCRTOP_POSITION {
  bottomLeft = 'bottom-left',
  bottomRight = 'bottom-right',
  topLeft = 'top-left',
  topRight = 'top-right'
}

enum ITEM_TYPES {
  mercadoria,
  direito,
  imposicao,
  contentor,
  utilitario
}

enum DOCUMENT_TYPES {
  pedido = 2,
  processo = 1,
  requisicao = 3,
}

enum DOCUMENT_SECTIONS {
  mercadorias,
  refsCliente,
  refsProcesso,
  previsualizar,
  descsAduaneiras,
  dirsImposicoes
}

export const enum Operation {
  fetch,
  get,
  post,
  delete,
  put
}

export const enum DIALOG_RESPONSES {
  yes,
  no,
  cancel,
  confirm
}

export const enum DIALOG_CONTROLS {
  yes_no,
  confirm_cancel
}

export { SCRTOP_COLOR, SCRTOP_POSITION, DOCUMENT_TYPES, ITEM_TYPES, DOCUMENT_SECTIONS };
