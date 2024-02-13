
export class TiposProdutos {
  public static tipos = [
    'Base líquida',
    'Base em pó',
    'Glitter',
    'Corretivo N° 1',
    'Corretivo N° 2',
    'Spray fixador',
    'Pincel',
    'Paleta de sombras',
    'Paleta de corretivos',
    'Blush tom rosa',
    'Blush Líquido',
    'Batom Vermelho',
    'Batom Roxo',
    'Batom Rosa',
    'Gloss com Glitter',
    'Gloss sem Glitter',
    'Cílios Postiços',
    'Cola de Cílios',
    'Lápis preto',
    'Lápis Marrom',
    'Lápis Marrom escuro',
    'Delineador',
    'Máscara de Cílios/ Rímel',
    'Iluminador em glitter',
    'Puff/Esponja',
    'Valenia Araújo Castanheta',
    'Gel de sobrancelha',
    'Escova sobrancelha'
  ]

  public static filtrar(val: string): string[] {
    const s = val.trim().toLowerCase();

    return TiposProdutos.tipos.filter(tipo => tipo.toLowerCase().includes(s));
  }
}
