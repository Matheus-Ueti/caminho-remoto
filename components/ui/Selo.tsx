import type { CSSProperties, ReactNode } from 'react'
import { cores, fonte, raio } from '@/lib/tema'

type VarianteDoSelo = 'neutro' | 'primario' | 'sucesso' | 'aviso'

type SeloProps = {
  variante?: VarianteDoSelo
  children: ReactNode
}

export function Selo({ variante = 'neutro', children }: SeloProps) {
  return <span style={{ ...estilos.base, ...estilos[variante] }}>{children}</span>
}

/* ===================== ESTILOS ===================== */
const estilos = {
  base: {
    display: 'inline-block',
    padding: '2px 10px',
    borderRadius: raio.pilula,
    fontSize: fonte.tamanho.xs,
    fontWeight: fonte.peso.forte,
    whiteSpace: 'nowrap',
  },
  neutro: { backgroundColor: cores.neutroSuave, color: cores.textoSuave },
  primario: { backgroundColor: cores.primariaSuave, color: cores.primariaForte },
  sucesso: { backgroundColor: cores.sucessoSuave, color: cores.sucesso },
  aviso: { backgroundColor: cores.avisoSuave, color: cores.aviso },
} satisfies Record<string, CSSProperties>
