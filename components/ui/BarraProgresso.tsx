import type { CSSProperties } from 'react'
import { cores, raio } from '@/lib/tema'

type BarraProgressoProps = {
  porcentagem: number
  descricao: string
}

export function BarraProgresso({ porcentagem, descricao }: BarraProgressoProps) {
  return (
    <div
      role="progressbar"
      aria-label={descricao}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={porcentagem}
      style={estilos.trilho}
    >
      <div style={{ ...estilos.barra, width: `${porcentagem}%` }} />
    </div>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  trilho: {
    height: 8,
    backgroundColor: cores.neutroSuave,
    borderRadius: raio.pilula,
    overflow: 'hidden',
  },
  barra: { height: '100%', backgroundColor: cores.primaria, borderRadius: raio.pilula },
} satisfies Record<string, CSSProperties>
