import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { CartaoCompra } from '@/components/CartaoCompra'
import { ConteudoDoCurso } from '@/components/ConteudoDoCurso'
import { DicasEmVideo } from '@/components/DicasEmVideo'
import { AreaDaPagina } from '@/components/ui/AreaDaPagina'
import { Selo } from '@/components/ui/Selo'
import { buscarCursoPorSlug, buscarCursos } from '@/lib/servicoCursos'
import { buscarVideosDoCurso } from '@/lib/servicoVideos'
import { LARGURA_MINIMA_DA_COLUNA, cores, criarGrade, espaco, fonte } from '@/lib/tema'

type PaginaCursoProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const cursos = await buscarCursos()
  return cursos.map((curso) => ({ slug: curso.slug }))
}

export async function generateMetadata({ params }: PaginaCursoProps): Promise<Metadata> {
  const { slug } = await params
  const curso = await buscarCursoPorSlug(slug)
  return { title: curso?.titulo ?? 'Curso' }
}

export default async function PaginaCurso({ params }: PaginaCursoProps) {
  const { slug } = await params
  const curso = await buscarCursoPorSlug(slug)
  if (!curso) notFound()
  const videos = await buscarVideosDoCurso(slug)

  return (
    <main>
      <AreaDaPagina>
        <div style={estilos.pagina}>
          <div style={estilos.principal}>
            <div style={estilos.selos}>
              <Selo variante="primario">{curso.area}</Selo>
              <Selo>{curso.nivel}</Selo>
            </div>
            <h1 style={estilos.titulo}>{curso.titulo}</h1>
            <p style={estilos.descricao}>{curso.descricao}</p>
            <p style={estilos.autor}>Por {curso.autor}</p>
            <ConteudoDoCurso curso={curso} />
          </div>

          <aside aria-label="Compra">
            <CartaoCompra curso={curso} />
          </aside>
        </div>
        <DicasEmVideo videos={videos} />
      </AreaDaPagina>
    </main>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  pagina: {
    ...criarGrade(LARGURA_MINIMA_DA_COLUNA),
    gap: espaco.xl,
    marginTop: espaco.xl,
    alignItems: 'start',
  },
  principal: { display: 'flex', flexDirection: 'column', gap: espaco.md },
  selos: { display: 'flex', flexWrap: 'wrap', gap: espaco.sm },
  titulo: { margin: 0, fontSize: fonte.tamanho.xxl, fontWeight: fonte.peso.negrito },
  descricao: { margin: 0, lineHeight: 1.6 },
  autor: { margin: 0, fontSize: fonte.tamanho.sm, color: cores.textoSuave },
} satisfies Record<string, CSSProperties>
