import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { Badge } from '@/components/ui/badge'
import { BotaoLink } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { TituloSecao } from '@/components/ui/titulos'
import { buscarCursoPorSlug, listarCursos } from '@/lib/cursos-service'
import { formatarPreco } from '@/lib/format'
import { cores, espaco, fonte } from '@/lib/theme'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const cursos = await listarCursos()
  return cursos.map((curso) => ({ slug: curso.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const curso = await buscarCursoPorSlug(slug)
  return { title: curso?.titulo ?? 'Curso' }
}

export default async function PaginaCurso({ params }: Props) {
  const { slug } = await params
  const curso = await buscarCursoPorSlug(slug)
  if (!curso) notFound()

  const totalAulas = curso.modulos.reduce((soma, modulo) => soma + modulo.aulas, 0)

  return (
    <main>
      <Container>
        <div style={estilos.pagina}>
          <div style={estilos.principal}>
            <div style={estilos.etiquetas}>
              <Badge variante="primario">{curso.area}</Badge>
              <Badge>{curso.nivel}</Badge>
            </div>
            <h1 style={estilos.titulo}>{curso.titulo}</h1>
            <p style={estilos.texto}>{curso.descricao}</p>
            <p style={estilos.autor}>Por {curso.autor}</p>

            <TituloSecao>O que você vai aprender</TituloSecao>
            <ul style={estilos.lista}>
              {curso.aprendizados.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <TituloSecao>Conteúdo do curso</TituloSecao>
            <ol style={estilos.modulos}>
              {curso.modulos.map((modulo) => (
                <li key={modulo.titulo} style={estilos.modulo}>
                  <span>{modulo.titulo}</span>
                  <span style={estilos.aulas}>{modulo.aulas} aulas</span>
                </li>
              ))}
            </ol>

            <TituloSecao>Competências no seu certificado</TituloSecao>
            <div style={estilos.etiquetas}>
              {curso.competencias.map((competencia) => (
                <Badge key={competencia} variante="sucesso">
                  {competencia}
                </Badge>
              ))}
            </div>
          </div>

          <aside aria-label="Compra">
            <Card>
              <span style={estilos.preco}>{formatarPreco(curso.preco)}</span>
              <p style={estilos.detalhe}>
                {curso.duracaoHoras} horas · {totalAulas} aulas · certificado incluso
              </p>
              <BotaoLink href={`/checkout/${curso.slug}`} tamanho="grande">
                Comprar agora
              </BotaoLink>
              <p style={estilos.detalhe}>Pagamento de demonstração: nada é cobrado.</p>
            </Card>
          </aside>
        </div>
      </Container>
    </main>
  )
}

/* ===================== ESTILOS ===================== */
const estilos: Record<string, CSSProperties> = {
  pagina: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
    gap: espaco.xl,
    marginTop: espaco.xl,
    alignItems: 'start',
  },
  principal: { display: 'flex', flexDirection: 'column', gap: espaco.md },
  etiquetas: { display: 'flex', flexWrap: 'wrap', gap: espaco.sm },
  titulo: { margin: 0, fontSize: fonte.tamanho.xxl, fontWeight: fonte.peso.negrito },
  texto: { margin: 0, lineHeight: 1.6 },
  autor: { margin: 0, fontSize: fonte.tamanho.sm, color: cores.textoSuave },
  lista: { margin: 0, paddingLeft: espaco.lg, lineHeight: 1.8 },
  modulos: { listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: espaco.sm },
  modulo: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: espaco.md,
    padding: `${espaco.sm}px ${espaco.md}px`,
    backgroundColor: cores.superficie,
    border: `1px solid ${cores.borda}`,
    borderRadius: 10,
  },
  aulas: { color: cores.textoSuave, fontSize: fonte.tamanho.sm },
  preco: { fontSize: fonte.tamanho.xxl, fontWeight: fonte.peso.negrito },
  detalhe: { margin: 0, fontSize: fonte.tamanho.sm, color: cores.textoSuave },
}
