import type { CSSProperties, ReactNode } from 'react'
import { cores, fonte, raio } from '@/lib/theme'

type Variante = 'neutro' | 'primario' | 'sucesso' | 'aviso'

export function Badge({
  variante = 'neutro',
  children,
}: {
  variante?: Variante
  children: ReactNode
}) {
  return <span style={{ ...estilos.base, ...estilos[variante] }}>{children}</span>
}

/* ===================== ESTILOS ===================== */
const estilos: Record<string, CSSProperties> = {
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
}
