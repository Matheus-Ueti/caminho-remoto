import type { CSSProperties, ReactNode } from 'react'
import { espaco, larguraMaxima } from '@/lib/theme'

export function Container({ children }: { children: ReactNode }) {
  return <div style={estilos.container}>{children}</div>
}

/* ===================== ESTILOS ===================== */
const estilos: Record<string, CSSProperties> = {
  container: { maxWidth: larguraMaxima, margin: '0 auto', padding: `0 ${espaco.md}px` },
}
