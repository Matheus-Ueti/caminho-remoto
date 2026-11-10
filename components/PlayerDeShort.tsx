'use client' // Precisa de estado: o vídeo só carrega depois do clique.

import { useState } from 'react'
import type { CSSProperties } from 'react'
import { cores, espaco, fonte, raio } from '@/lib/tema'
import type { VideoShort } from '@/types'

type PlayerDeShortProps = {
  video: VideoShort
}

/**
 * Mostra só a capa do Short. O player do YouTube (pesado) só carrega quando a pessoa clica.
 * Usa youtube-nocookie.com, que não grava cookies de rastreamento antes do play.
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
      <img
        src={`https://i.ytimg.com/vi/${video.idDoYoutube}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        style={estilos.imagem}
      />
      <span style={estilos.titulo}>▶ Assistir: {video.titulo}</span>
    </button>
  )
}

/* ===================== ESTILOS ===================== */
const moldura: CSSProperties = {
  width: '100%',
  aspectRatio: '9 / 16',
  border: 0,
  borderRadius: raio.lg,
  backgroundColor: cores.azulEscuro,
}

const estilos = {
  moldura,
  capa: {
    ...moldura,
    position: 'relative',
    overflow: 'hidden',
    padding: 0,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'flex-end',
  },
  imagem: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' },
  titulo: {
    position: 'relative',
    width: '100%',
    padding: espaco.md,
    textAlign: 'left',
    color: cores.primariaTexto,
    fontSize: fonte.tamanho.sm,
    fontWeight: fonte.peso.negrito,
    background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
  },
} satisfies Record<string, CSSProperties>
