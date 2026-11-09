import type { CSSProperties } from 'react'
import { desenhosDosIcones } from '@/components/ui/desenhosDosIcones'

export type NomeDoIcone = keyof typeof desenhosDosIcones

type IconeProps = {
  nome: NomeDoIcone
  tamanho?: number
  cor?: string
}

export function Icone({ nome, tamanho = 24, cor = 'currentColor' }: IconeProps) {
  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ ...estilos.icone, color: cor }}
    >
      {desenhosDosIcones[nome]}
    </svg>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  icone: { flexShrink: 0, display: 'block' },
} satisfies Record<string, CSSProperties>
