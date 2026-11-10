'use client' // Precisa de estado: o vídeo só carrega depois do clique.

import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Icone } from '@/components/ui/Icone'
import { cores, espaco, fonte, gradientes, raio } from '@/lib/tema'
import type { VideoShort } from '@/types'

type PlayerDeShortProps = {
  video: VideoShort
}

/**
 * Antes do clique, mostra só um cartão com o título: nada é carregado do YouTube.
 * Depois do clique, abre o player do youtube-nocookie.com, que não grava cookies de rastreamento.
 */
export function PlayerDeShort({ video }: PlayerDeShortProps) {
  const [estaTocando, setEstaTocando] = useState(false)

  if (estaTocando) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${video.idDoYoutube}?autoplay=1`}
        title={video.titulo}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        style={estilos.moldura}
      />
    )
  }

  return (
    <button type="button" onClick={() => setEstaTocando(true)} style={estilos.capa}>
      <span style={estilos.area}>{video.area}</span>
      <span style={estilos.botaoPlay}>
        <Icone nome="play" tamanho={28} cor={cores.primaria} />
      </span>
      <span style={estilos.titulo}>{video.titulo}</span>
    </button>
  )
}

/* ===================== ESTILOS ===================== */
const formatoVertical: CSSProperties = {
  width: '100%',
  aspectRatio: '9 / 16',
  border: 0,
  borderRadius: raio.lg,
}

const estilos = {
  moldura: { ...formatoVertical, backgroundColor: cores.azulEscuro },
  capa: {
    ...formatoVertical,
    position: 'relative',
    padding: espaco.md,
    cursor: 'pointer',
    background: gradientes.escuro,
    color: cores.primariaTexto,
    fontFamily: fonte.familia,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  area: {
    padding: `2px ${espaco.sm}px`,
    borderRadius: raio.pilula,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    fontSize: fonte.tamanho.xs,
    fontWeight: fonte.peso.forte,
  },
  // Centralizado no cartão, sem depender do tamanho do título.
  botaoPlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 56,
    height: 56,
    borderRadius: raio.pilula,
    backgroundColor: cores.superficie,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: { fontSize: fonte.tamanho.sm, fontWeight: fonte.peso.negrito, lineHeight: 1.35 },
} satisfies Record<string, CSSProperties>
