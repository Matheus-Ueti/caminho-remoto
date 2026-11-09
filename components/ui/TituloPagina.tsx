import type { CSSProperties } from 'react'
import { cores, espaco, fonte } from '@/lib/tema'

type TituloPaginaProps = {
  titulo: string
  descricao?: string
}

export function TituloPagina({ titulo, descricao }: TituloPaginaProps) {
  return (
    <div style={estilos.bloco}>
      <h1 style={estilos.titulo}>{titulo}</h1>
      {descricao && <p style={estilos.descricao}>{descricao}</p>}
    </div>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  bloco: { display: 'flex', flexDirection: 'column', gap: espaco.sm },
  titulo: {
    margin: 0,
    fontSize: fonte.tamanho.xxl,
    fontWeight: fonte.peso.negrito,
    color: cores.texto,
  },
  descricao: { margin: 0, fontSize: fonte.tamanho.lg, color: cores.textoSuave },
} satisfies Record<string, CSSProperties>
