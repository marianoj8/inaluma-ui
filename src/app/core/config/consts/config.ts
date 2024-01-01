
export enum CONSTS_VARS {
  cookieXSRFTokenKey = 'XSRF-TOKEN=',
  applicationDocumentTitle = 'Wasp Logística',
  forbiddenUsername = 'administrator'
}

export enum LOCAL_STORAGE {
  themeKey = 'user-theme',
  sessionKey = 'token',
  sessionTTL = 'expirationTime',
  sessionUsername = 'username',
  sessionEmail = 'email',
  sessionAccessType = 'accessType',
  currentUserView = 'currentView'
}

export enum PEDIDOS_TYPE_NAMES {
  dar = 'D.A.R',
  imposicao = 'Imposição'
}

export enum PEDIDOS_TYPE_CODES {
  dar,
  imposicao
}

const PEDIDOS_TYPES: string[] = [];
PEDIDOS_TYPES[PEDIDOS_TYPE_CODES.dar] = PEDIDOS_TYPE_NAMES.dar;
PEDIDOS_TYPES[PEDIDOS_TYPE_CODES.imposicao] = PEDIDOS_TYPE_NAMES.imposicao;

export enum MEDIA_BREAKPOINTS {
  small = 'all and (max-width: 768px)',
  medium = 'all and (max-width: 1000px)',
  large = 'all and (max-width: 1300px)'
}

export enum FORMULA_CALC {
  vpcf = 'VPCF',
  vmc = 'VM/C',
  vm = 'VM',
  nc_vm = 'NC*VM'
}

export enum TIPOS_CAMPO_NAMES {
  um = 'Taxa Fixa / FOB',
  dois = 'Taxa Fixa / CIF',
  tres = 'Escala / FOB',
  quatro = 'Escala / CIF',
  cinco = '(VP)AD',
  seis = 'Valor Monetário'
}

export enum TIPOS_CAMPO_VALUES {
  um = '1',
  dois = '2',
  tres = '3',
  quatro = '4',
  cinco = '5',
  seis = '6'
}

export enum LAYOUT_FLAGS {
  headerHeight = '128px',
  footerHeight = '130px'
}

export { PEDIDOS_TYPES };
