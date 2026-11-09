// Base de design. Como não usamos CSS, as cores, espaços e fontes ficam aqui, como objetos.
// Segue o padrão neutro do shadcn/ui, com um verde-azulado como cor de destaque.

export const cores = {
  fundo: '#fafafa',
  superficie: '#ffffff',
  borda: '#e4e4e7',
  texto: '#18181b',
  textoSuave: '#52525b',
  primaria: '#0f766e',
  primariaForte: '#115e59',
  primariaTexto: '#ffffff',
  primariaSuave: '#ccfbf1',
  sucesso: '#15803d',
  sucessoSuave: '#dcfce7',
  aviso: '#b45309',
  avisoSuave: '#fef3c7',
  neutroSuave: '#f4f4f5',
} as const

export const espaco = { xs: 4, sm: 8, md: 16, lg: 24, xl: 40, xxl: 64 } as const

export const raio = { sm: 6, md: 10, lg: 16, pilula: 999 } as const

export const fonte = {
  familia: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  tamanho: { xs: 12, sm: 14, md: 16, lg: 18, xl: 24, xxl: 32, hero: 44 },
  peso: { normal: 400, medio: 500, forte: 600, negrito: 700 },
} as const

export const LARGURA_MAXIMA_DA_PAGINA = 1080

// Largura mínima de cada coluna antes de ela quebrar para a linha de baixo.
export const LARGURA_MINIMA_DO_CARTAO = 280
export const LARGURA_MINIMA_DA_COLUNA = 320
export const LARGURA_MINIMA_DO_PASSO = 220
export const LARGURA_MINIMA_DO_INDICADOR = 200

/** Grade responsiva sem media query: as colunas quebram sozinhas conforme a largura da tela. */
export function criarGrade(larguraMinima: number): {
  display: 'grid'
  gridTemplateColumns: string
  gap: number
} {
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(min(${larguraMinima}px, 100%), 1fr))`,
    gap: espaco.md,
  }
}
