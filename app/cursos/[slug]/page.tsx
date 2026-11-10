import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { CartaoCompra } from '@/components/CartaoCompra'
import { ConteudoDoCurso } from '@/components/ConteudoDoCurso'
import { DicasEmVideo } from '@/components/DicasEmVideo'
import { AreaDaPagina } from '@/components/ui/AreaDaPagina'
import { buscarCursoPorSlug, buscarCursos } from '@/lib/servicoCursos'
import { buscarVideosDoCurso } from '@/lib/servicoVideos'
import { cores, espaco, fonte, gradientes, raio } from '@/lib/tema'

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

  const totalDeAulas = curso.modulos.reduce((soma, modulo) => soma + modulo.quantidadeDeAulas, 0)
  const resumoRapido = [
    `${curso.duracaoEmHoras} horas`,
    `${totalDeAulas} aulas`,
    curso.nivel,
    'Certificado incluso',
  ]

  return (
    <main>
      <section style={estilos.faixa}>
        <AreaDaPagina>
          <div style={estilos.textoDaFaixa}>
            <span style={estilos.area}>{curso.area}</span>
            <h1 style={estilos.titulo}>{curso.titulo}</h1>
            <p style={estilos.descricao}>{curso.descricao}</p>
            <ul style={estilos.resumoRapido}>
              {resumoRapido.map((item) => (
                <li key={item} style={estilos.itemDoResumo}>
                  {item}
                </li>
              ))}
            </ul>
            <p style={estilos.autor}>Por {curso.autor}</p>
          </div>
        </AreaDaPagina>
      </section>

      <AreaDaPagina>
        <div style={estilos.colunas}>
          <div style={estilos.principal}>
            <ConteudoDoCurso curso={curso} />
          </div>
          <aside aria-label="Compra" style={estilos.lateral}>
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
  faixa: { background: gradientes.escuro, color: cores.primariaTexto, padding: `${espaco.xl}px 0` },
  textoDaFaixa: { display: 'flex', flexDirection: 'column', gap: espaco.md, maxWidth: 680 },
  area: {
    alignSelf: 'flex-start',
    padding: `2px ${espaco.sm}px`,
    borderRadius: raio.pilula,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    fontSize: fonte.tamanho.xs,
    fontWeight: fonte.peso.forte,
  },
  titulo: {
    margin: 0,
    fontSize: fonte.tamanho.xxl,
    fontWeight: fonte.peso.extra,
    letterSpacing: fonte.espacamentoDosTitulos,
    lineHeight: 1.15,
  },
  descricao: { margin: 0, fontSize: fonte.tamanho.lg, lineHeight: 1.6, opacity: 0.9 },
  resumoRapido: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: espaco.sm,
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  itemDoResumo: {
    padding: `${espaco.xs}px ${espaco.md}px`,
    borderRadius: raio.pilula,
    border: '1px solid rgba(255, 255, 255, 0.35)',
    fontSize: fonte.tamanho.sm,
  },
  autor: { margin: 0, fontSize: fonte.tamanho.sm, opacity: 0.8 },
  // Flex com pesos diferentes: o conteúdo fica largo e a compra estreita, e no celular empilham.
  colunas: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: espaco.xl,
    marginTop: espaco.xl,
  },
  principal: { flex: '999 1 480px', display: 'flex', flexDirection: 'column', gap: espaco.md },
  // sticky: o cartão de compra acompanha a rolagem no computador.
  lateral: { flex: '1 1 300px', position: 'sticky', top: espaco.lg },
} satisfies Record<string, CSSProperties>
