import type { CSSProperties, ReactNode } from 'react'
import { LARGURA_MAXIMA_DA_PAGINA, espaco } from '@/lib/tema'

type AreaDaPaginaProps = {
  children: ReactNode
}

export function AreaDaPagina({ children }: AreaDaPaginaProps) {
  return <div style={estilos.area}>{children}</div>
}

/* ===================== ESTILOS ===================== */
const estilos = {
  area: { maxWidth: LARGURA_MAXIMA_DA_PAGINA, margin: '0 auto', padding: `0 ${espaco.md}px` },
} satisfies Record<string, CSSProperties>
