import type { CSSProperties, ReactNode } from 'react'
import { cores, espaco, raio } from '@/lib/tema'

type CartaoProps = {
  children: ReactNode
  /** Estilos extras de quem usa o cartão (ex.: altura total). */
  estiloExtra?: CSSProperties
}

export function Cartao({ children, estiloExtra }: CartaoProps) {
  return <div style={{ ...estilos.cartao, ...estiloExtra }}>{children}</div>
}

/* ===================== ESTILOS ===================== */
const estilos = {
  cartao: {
    backgroundColor: cores.superficie,
    border: `1px solid ${cores.borda}`,
    borderRadius: raio.lg,
    padding: espaco.lg,
    display: 'flex',
    flexDirection: 'column',
    gap: espaco.md,
  },
} satisfies Record<string, CSSProperties>
