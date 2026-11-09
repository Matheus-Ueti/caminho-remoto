// Base de design. Como não usamos CSS, as cores, espaços e fontes ficam aqui, como objetos.
// As cores seguem o design da homepage em `../imagens`: branco com azul de destaque.

export const cores = {
  fundo: '#ffffff',
  fundoSuave: '#f5f8ff',
  superficie: '#ffffff',
  borda: '#e3e8f2',
  texto: '#0b1b3f',
  textoSuave: '#4a5876',
  primaria: '#0b5bd3',
  primariaForte: '#0847a6',
  primariaTexto: '#ffffff',
  primariaSuave: '#e8f0fe',
  azulEscuro: '#0a2a6b',
  sucesso: '#15803d',
  sucessoSuave: '#dcfce7',
  aviso: '#b45309',
  avisoSuave: '#fef3c7',
  neutroSuave: '#f1f4f9',
} as const

export const gradientes = {
  banner: `linear-gradient(180deg, ${cores.fundoSuave} 0%, ${cores.fundo} 100%)`,
  escuro: `linear-gradient(135deg, ${cores.azulEscuro} 0%, ${cores.primaria} 100%)`,
} as const

export const sombra = {
  leve: '0 1px 3px rgba(11, 27, 63, 0.06), 0 1px 2px rgba(11, 27, 63, 0.04)',
  media: '0 8px 24px rgba(11, 27, 63, 0.08)',
} as const

export const espaco = { xs: 4, sm: 8, md: 16, lg: 24, xl: 40, xxl: 64 } as const

export const raio = { sm: 6, md: 10, lg: 16, xl: 24, pilula: 999 } as const

export const fonte = {
  familia: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  tamanho: { xs: 12, sm: 14, md: 16, lg: 18, xl: 24, xxl: 32, hero: 52 },
  peso: { normal: 400, medio: 500, forte: 600, negrito: 700, extra: 800 },
  // Títulos grandes ficam mais firmes com as letras um pouco mais juntas.
  espacamentoDosTitulos: '-0.02em',
} as const

export const LARGURA_MAXIMA_DA_PAGINA = 1120

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
