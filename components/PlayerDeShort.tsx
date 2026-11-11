'use client' // Precisa de estado: o vídeo só carrega depois do clique.

import { useState } from 'react'
import type { CSSProperties } from 'react'
import { CapaDaArea } from '@/components/CapaDaArea'
import { Icone } from '@/components/ui/Icone'
import { cores, espaco, fonte, raio, sombra } from '@/lib/tema'
import type { VideoShort } from '@/types'

type PlayerDeShortProps = {
  video: VideoShort
}

/**
 * Antes do clique, mostra só a capa: nada é carregado do YouTube.
 * Depois do clique, abre o player do youtube-nocookie.com, que não grava cookies de rastreamento.
 * Vídeo marcado como "em breve" não toca.
 */
export function PlayerDeShort({ video }: PlayerDeShortProps) {
  const [estaTocando, setEstaTocando] = useState(false)
  const podeTocar = !video.emBreve

  return (
    <article style={estilos.cartao}>
      {estaTocando ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.idDoYoutube}?autoplay=1`}
          title={video.titulo}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          style={estilos.moldura}
        />
      ) : (
        <div style={estilos.imagem}>
          <CapaDaArea area={video.area} />
          <span style={estilos.categoria}>{video.area}</span>
          {podeTocar ? (
            <button
              type="button"
              onClick={() => setEstaTocando(true)}
              aria-label={`Assistir: ${video.titulo}`}
              style={estilos.botaoPlay}
            >
              <Icone nome="play" tamanho={18} cor={cores.primaria} />
            </button>
          ) : (
            <span style={estilos.emBreve}>Em breve</span>
          )}
        </div>
      )}
      <h3 style={estilos.titulo}>{video.titulo}</h3>
    </article>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  cartao: { display: 'flex', flexDirection: 'column', gap: espaco.sm },
  imagem: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: raio.md,
    border: `1px solid ${cores.borda}`,
  },
  moldura: {
    width: '100%',
    aspectRatio: '16 / 9',
    border: 0,
    borderRadius: raio.md,
    backgroundColor: cores.azulEscuro,
  },
  categoria: {
    position: 'absolute',
    top: espaco.sm,
    left: espaco.sm,
    padding: '2px 10px',
    borderRadius: raio.pilula,
    backgroundColor: cores.superficie,
    color: cores.texto,
    fontSize: fonte.tamanho.xs,
    fontWeight: fonte.peso.forte,
  },
  botaoPlay: {
    position: 'absolute',
    right: espaco.sm,
    bottom: espaco.sm,
    width: 40,
    height: 40,
    padding: 0,
    border: 0,
    borderRadius: raio.pilula,
    backgroundColor: cores.superficie,
    boxShadow: sombra.media,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emBreve: {
    position: 'absolute',
    right: espaco.sm,
    bottom: espaco.sm,
    padding: '2px 10px',
    borderRadius: raio.pilula,
    backgroundColor: cores.azulEscuro,
    color: cores.primariaTexto,
    fontSize: fonte.tamanho.xs,
    fontWeight: fonte.peso.forte,
  },
  titulo: {
    margin: 0,
    fontSize: fonte.tamanho.md,
    lineHeight: 1.35,
    fontWeight: fonte.peso.negrito,
    color: cores.texto,
  },
} satisfies Record<string, CSSProperties>
