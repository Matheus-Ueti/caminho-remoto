import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { CartaoCandidatura } from '@/components/CartaoCandidatura'
import { ListaCompetencias } from '@/components/ListaCompetencias'
import { AreaDaPagina } from '@/components/ui/AreaDaPagina'
import { Selo } from '@/components/ui/Selo'
import { TituloSecao } from '@/components/ui/TituloSecao'
import {
  buscarAluno,
  calcularCompetenciasFaltantes,
  calcularCompetenciasVerificadas,
} from '@/lib/servicoAluno'
import { buscarCursoPorSlug } from '@/lib/servicoCursos'
import { buscarVagaPorId, buscarVagas } from '@/lib/servicoVagas'
import { LARGURA_MINIMA_DA_COLUNA, cores, criarGrade, espaco, fonte } from '@/lib/tema'

type PaginaVagaProps = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const vagas = await buscarVagas()
  return vagas.map((vaga) => ({ id: vaga.id }))
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

  const [curso, aluno] = await Promise.all([buscarCursoPorSlug(vaga.cursoSlug), buscarAluno()])
  const competenciasComprovadas = calcularCompetenciasVerificadas(aluno)
  const competenciasFaltantes = calcularCompetenciasFaltantes(vaga, aluno)

  return (
    <main>
      <AreaDaPagina>
        <div style={estilos.pagina}>
          <div style={estilos.principal}>
            <div style={estilos.selos}>
              <Selo variante="primario">{vaga.area}</Selo>
              <Selo>{vaga.nivel}</Selo>
              <Selo variante="sucesso">100% remota</Selo>
            </div>
            <h1 style={estilos.titulo}>{vaga.titulo}</h1>
            <p style={estilos.empresa}>
              {vaga.empresa} · {vaga.salario}
            </p>
            <p style={estilos.descricao}>{vaga.descricao}</p>

            <TituloSecao>Requisitos</TituloSecao>
            <ul style={estilos.requisitos}>
              {vaga.requisitos.map((requisito) => (
                <li key={requisito}>{requisito}</li>
              ))}
            </ul>

            <TituloSecao>Competências exigidas</TituloSecao>
            <ListaCompetencias
              competenciasExigidas={vaga.competenciasExigidas}
              competenciasComprovadas={competenciasComprovadas}
            />
          </div>

          <aside aria-label="Sua candidatura">
            <CartaoCandidatura
              competenciasFaltantes={competenciasFaltantes}
              cursoRecomendado={curso}
            />
          </aside>
        </div>
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
  empresa: { margin: 0, fontSize: fonte.tamanho.lg, color: cores.textoSuave },
  descricao: { margin: 0, lineHeight: 1.6 },
  requisitos: { margin: 0, paddingLeft: espaco.lg, lineHeight: 1.8 },
} satisfies Record<string, CSSProperties>
