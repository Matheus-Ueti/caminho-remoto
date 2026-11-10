import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { DicasEmVideo } from '@/components/DicasEmVideo'
import { AreaDaPagina } from '@/components/ui/AreaDaPagina'
import { BotaoLink } from '@/components/ui/BotaoLink'
import { Selo } from '@/components/ui/Selo'
import { buscarVagaPorId } from '@/lib/servicoVagas'
import { buscarVideosDaVaga } from '@/lib/servicoVideos'
import { cores, espaco, fonte } from '@/lib/tema'

type PaginaVagaProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PaginaVagaProps): Promise<Metadata> {
  const { id } = await params
  const vaga = await buscarVagaPorId(id)
  return { title: vaga?.titulo ?? 'Vaga' }
}

export default async function PaginaVaga({ params }: PaginaVagaProps) {
  const { id } = await params
  const vaga = await buscarVagaPorId(id)
  if (!vaga) notFound()
  const videos = await buscarVideosDaVaga(id)

  return (
    <main>
      <AreaDaPagina>
        <div style={estilos.pagina}>
          <div style={estilos.selos}>
            <Selo variante="sucesso">100% remota</Selo>
            {vaga.salario && <Selo>{vaga.salario}</Selo>}
          </div>
          <h1 style={estilos.titulo}>{vaga.titulo}</h1>
          <p style={estilos.empresa}>
            {vaga.empresa} · {vaga.local}
          </p>
          <p style={estilos.resumo}>{vaga.resumo}</p>
          <div>
            <BotaoLink href={vaga.link} tamanho="grande">
              Candidatar-se no site da vaga
            </BotaoLink>
          </div>
        </div>
        <DicasEmVideo videos={videos} />
      </AreaDaPagina>
    </main>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  pagina: {
    display: 'flex',
    flexDirection: 'column',
    gap: espaco.md,
    marginTop: espaco.xl,
    maxWidth: 720,
  },
  selos: { display: 'flex', flexWrap: 'wrap', gap: espaco.sm },
  titulo: { margin: 0, fontSize: fonte.tamanho.xxl, fontWeight: fonte.peso.negrito },
  empresa: { margin: 0, fontSize: fonte.tamanho.lg, color: cores.textoSuave },
  resumo: { margin: 0, lineHeight: 1.6 },
} satisfies Record<string, CSSProperties>
