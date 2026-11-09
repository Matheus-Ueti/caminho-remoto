import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { CursoRecomendado } from '@/components/curso-recomendado'
import { Badge } from '@/components/ui/badge'
import { BotaoLink } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { TituloSecao } from '@/components/ui/titulos'
import { buscarAluno, competenciasFaltantes, competenciasVerificadas } from '@/lib/aluno-service'
import { buscarCursoPorSlug } from '@/lib/cursos-service'
import { cores, espaco, fonte } from '@/lib/theme'
import { buscarVagaPorId, listarVagas } from '@/lib/vagas-service'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const vagas = await listarVagas()
  return vagas.map((vaga) => ({ id: vaga.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const vaga = await buscarVagaPorId(id)
  return { title: vaga?.titulo ?? 'Vaga' }
}

export default async function PaginaVaga({ params }: Props) {
  const { id } = await params
  const vaga = await buscarVagaPorId(id)
  if (!vaga) notFound()

  const [curso, aluno] = await Promise.all([buscarCursoPorSlug(vaga.cursoSlug), buscarAluno()])
  const comprovadas = new Set(competenciasVerificadas(aluno))
  const faltantes = competenciasFaltantes(vaga, aluno)
  const pronto = faltantes.length === 0

  return (
    <main>
      <Container>
        <div style={estilos.pagina}>
          <div style={estilos.principal}>
            <div style={estilos.etiquetas}>
              <Badge variante="primario">{vaga.area}</Badge>
              <Badge>{vaga.nivel}</Badge>
              <Badge variante="sucesso">100% remota</Badge>
            </div>
            <h1 style={estilos.titulo}>{vaga.titulo}</h1>
            <p style={estilos.empresa}>
              {vaga.empresa} · {vaga.salario}
            </p>
            <p style={estilos.texto}>{vaga.descricao}</p>

            <TituloSecao>Requisitos</TituloSecao>
            <ul style={estilos.lista}>
              {vaga.requisitos.map((requisito) => (
                <li key={requisito}>{requisito}</li>
              ))}
            </ul>

            <TituloSecao>Competências exigidas</TituloSecao>
            <ul style={estilos.competencias}>
              {vaga.competenciasExigidas.map((competencia) => {
                const ok = comprovadas.has(competencia)
                return (
                  <li key={competencia} style={estilos.competencia}>
                    <Badge variante={ok ? 'sucesso' : 'aviso'}>
                      {ok ? 'Comprovada' : 'Falta comprovar'}
                    </Badge>
                    <span>{competencia}</span>
                  </li>
                )
              })}
            </ul>
          </div>

          <aside style={estilos.lateral} aria-label="Sua candidatura">
            <Card>
              <strong>{pronto ? 'Você cumpre os requisitos' : 'Falta pouco para esta vaga'}</strong>
              <p style={estilos.textoSuave}>
                {pronto
                  ? 'Seus certificados comprovam tudo o que a vaga pede. A empresa verá isso no seu perfil.'
                  : `Você ainda precisa comprovar ${faltantes.length} ${faltantes.length === 1 ? 'competência' : 'competências'}: ${faltantes.join(', ')}.`}
              </p>
              {pronto && (
                <BotaoLink href="/perfil" tamanho="grande">
                  Candidatar-me
                </BotaoLink>
              )}
            </Card>
            {!pronto && curso && <CursoRecomendado curso={curso} />}
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
  empresa: { margin: 0, fontSize: fonte.tamanho.lg, color: cores.textoSuave },
  texto: { margin: 0, lineHeight: 1.6 },
  lista: { margin: 0, paddingLeft: espaco.lg, lineHeight: 1.8 },
  competencias: { listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: espaco.sm },
  competencia: { display: 'flex', alignItems: 'center', gap: espaco.sm },
  lateral: { display: 'flex', flexDirection: 'column', gap: espaco.md },
  textoSuave: { margin: 0, fontSize: fonte.tamanho.sm, color: cores.textoSuave },
}
