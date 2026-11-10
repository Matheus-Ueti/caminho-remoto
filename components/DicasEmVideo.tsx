import type { CSSProperties } from 'react'
import { PlayerDeShort } from '@/components/PlayerDeShort'
import { TituloSecao } from '@/components/ui/TituloSecao'
import { criarGrade, espaco } from '@/lib/tema'
import type { VideoShort } from '@/types'

const LARGURA_MINIMA_DO_VIDEO = 180

type DicasEmVideoProps = {
  videos: VideoShort[]
}

/** Seção de Shorts. Não aparece quando não há vídeo relacionado. */
export function DicasEmVideo({ videos }: DicasEmVideoProps) {
  if (videos.length === 0) return null

  return (
    <section aria-label="Dicas em vídeo" style={estilos.secao}>
      <TituloSecao>Dicas em vídeo</TituloSecao>
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
  secao: { display: 'flex', flexDirection: 'column', gap: espaco.md, marginTop: espaco.xl },
  grade: { ...criarGrade(LARGURA_MINIMA_DO_VIDEO), gap: espaco.md },
} satisfies Record<string, CSSProperties>
