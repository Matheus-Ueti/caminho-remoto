// MOCK: dados guardados na memória do servidor. Somem quando o `npm run dev` reinicia.
import type { Afiliado, Clique, Comissao, LinkDeAfiliado, Venda } from '@/types'

type DadosDosAfiliados = {
  afiliados: Afiliado[]
  links: LinkDeAfiliado[]
  cliques: Clique[]
  vendas: Venda[]
  comissoes: Comissao[]
}

// Guardado no `globalThis` porque o Next recarrega arquivos durante o desenvolvimento,
// e as listas seriam zeradas a cada recarga.
const memoria = globalThis as typeof globalThis & { dadosDosAfiliados?: DadosDosAfiliados }

memoria.dadosDosAfiliados ??= { afiliados: [], links: [], cliques: [], vendas: [], comissoes: [] }

export const dadosDosAfiliados = memoria.dadosDosAfiliados
