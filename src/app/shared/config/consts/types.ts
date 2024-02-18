
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

export enum STATUS_AGENDAMENTO {
  agendado = "Agendado",
  expirado = "Expirado",
  atendido = "Concluído",
  cancelado = 'Cancelado'
}

export enum STATUS_FACTURA {
  paga = 'Liquidada',
  porPagar = 'Por Liquidar',
  anulada = 'Anulada'
}

export enum STATUS_PAGAMENTO {
  confirmado = 'Confirmado',
  anulado = 'Anulado'
}

export enum METODO_PAGAMENTO {
  dinheiro = 'Dinheiro',
  notaDebito = 'Nota de Débito',
  notaCredito = 'Nota de Crédito',
  cartaoDebito = 'Cartão de Débito',
  cartaoCredito = 'Cartão de Crédito'
}

export const enum DOCUMENTO_OPEARATION_TYPE {
  confirmar,
  visualizar,
  editar
}

export const enum DOCUMENTO_TYPE {
  agendamento,
  compra
}

export { SCRTOP_COLOR, SCRTOP_POSITION, DOCUMENT_TYPES, ITEM_TYPES, DOCUMENT_SECTIONS };
