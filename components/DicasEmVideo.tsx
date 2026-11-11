import type { CSSProperties } from 'react'
import { PlayerDeShort } from '@/components/PlayerDeShort'
import { cores, espaco, fonte } from '@/lib/tema'
import type { VideoShort } from '@/types'

// Largura mínima de cada vídeo: 3 por linha no computador e 1 no celular.
const LARGURA_MINIMA_DO_VIDEO = 340

type DicasEmVideoProps = {
  videos: VideoShort[]
}

/** Seção de Shorts. Não aparece quando não há vídeo relacionado. */
export function DicasEmVideo({ videos }: DicasEmVideoProps) {
  if (videos.length === 0) return null

  return (
    <section aria-labelledby="titulo-dicas-em-video" style={estilos.secao}>
      <h2 id="titulo-dicas-em-video" style={estilos.titulo}>
        Dicas em vídeo
      </h2>
      <div style={estilos.grade}>
        {videos.map((video) => (
          <PlayerDeShort key={video.idDoYoutube} video={video} />
        ))}
      </div>
    </section>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  secao: { display: 'flex', flexDirection: 'column', gap: espaco.md, marginTop: espaco.xxl },
  titulo: {
    margin: 0,
    fontSize: fonte.tamanho.xl,
    fontWeight: fonte.peso.extra,
    letterSpacing: fonte.espacamentoDosTitulos,
    color: cores.texto,
  },
  // auto-fill (e não auto-fit): com poucos vídeos, eles não esticam além do tamanho dos demais.
  grade: {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fill, minmax(min(${LARGURA_MINIMA_DO_VIDEO}px, 100%), 1fr))`,
    gap: espaco.md,
  },
} satisfies Record<string, CSSProperties>
