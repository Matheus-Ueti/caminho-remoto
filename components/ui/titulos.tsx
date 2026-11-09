import type { CSSProperties, ReactNode } from 'react'
import { cores, espaco, fonte } from '@/lib/theme'

export function TituloPagina({ titulo, descricao }: { titulo: string; descricao?: string }) {
  return (
    <div style={estilos.bloco}>
      <h1 style={estilos.h1}>{titulo}</h1>
      {descricao && <p style={estilos.descricao}>{descricao}</p>}
    </div>
  )
}

export function TituloSecao({ children }: { children: ReactNode }) {
  return <h2 style={estilos.h2}>{children}</h2>
}

/* ===================== ESTILOS ===================== */
const estilos: Record<string, CSSProperties> = {
  bloco: { display: 'flex', flexDirection: 'column', gap: espaco.sm },
  h1: {
    margin: 0,
    fontSize: fonte.tamanho.xxl,
    fontWeight: fonte.peso.negrito,
    color: cores.texto,
  },
  descricao: { margin: 0, fontSize: fonte.tamanho.lg, color: cores.textoSuave },
  h2: { margin: 0, fontSize: fonte.tamanho.xl, fontWeight: fonte.peso.forte, color: cores.texto },
}
