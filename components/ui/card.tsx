import type { CSSProperties, ReactNode } from 'react'
import { cores, espaco, raio } from '@/lib/theme'

interface CardProps {
  children: ReactNode
  /** Estilos extras do chamador (ex.: altura total). */
  estilo?: CSSProperties
}

export function Card({ children, estilo }: CardProps) {
  return <div style={{ ...estilos.card, ...estilo }}>{children}</div>
}

/* ===================== ESTILOS ===================== */
const estilos: Record<string, CSSProperties> = {
  card: {
    backgroundColor: cores.superficie,
    border: `1px solid ${cores.borda}`,
    borderRadius: raio.lg,
    padding: espaco.lg,
    display: 'flex',
    flexDirection: 'column',
    gap: espaco.md,
  },
}
