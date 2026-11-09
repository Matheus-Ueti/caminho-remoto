import type { CSSProperties, ReactNode } from 'react'
import { cores, fonte } from '@/lib/tema'

type TituloSecaoProps = {
  children: ReactNode
}

export function TituloSecao({ children }: TituloSecaoProps) {
  return <h2 style={estilos.titulo}>{children}</h2>
}

/* ===================== ESTILOS ===================== */
const estilos = {
  titulo: {
    margin: 0,
    fontSize: fonte.tamanho.xl,
    fontWeight: fonte.peso.forte,
    color: cores.texto,
  },
} satisfies Record<string, CSSProperties>
