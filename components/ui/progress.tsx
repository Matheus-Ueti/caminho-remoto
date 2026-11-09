import type { CSSProperties } from 'react'
import { cores, raio } from '@/lib/theme'

export function Progresso({ valor, rotulo }: { valor: number; rotulo: string }) {
  return (
    <div
      role="progressbar"
      aria-label={rotulo}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={valor}
      style={estilos.trilho}
    >
      <div style={{ ...estilos.barra, width: `${valor}%` }} />
    </div>
  )
}

/* ===================== ESTILOS ===================== */
const estilos: Record<string, CSSProperties> = {
  trilho: {
    height: 8,
    backgroundColor: cores.neutroSuave,
    borderRadius: raio.pilula,
    overflow: 'hidden',
  },
  barra: { height: '100%', backgroundColor: cores.primaria, borderRadius: raio.pilula },
}
