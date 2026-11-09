import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { AreaDaPagina } from '@/components/ui/AreaDaPagina'
import { BarraProgresso } from '@/components/ui/BarraProgresso'
import { BotaoLink } from '@/components/ui/BotaoLink'
import { Cartao } from '@/components/ui/Cartao'
import { Selo } from '@/components/ui/Selo'
import { TituloPagina } from '@/components/ui/TituloPagina'
import { TituloSecao } from '@/components/ui/TituloSecao'
import { buscarAluno } from '@/lib/servicoAluno'
import { buscarCursos } from '@/lib/servicoCursos'
import { LARGURA_MINIMA_DO_CARTAO, cores, criarGrade, espaco, fonte } from '@/lib/tema'

const PROGRESSO_CURSO_CONCLUIDO = 100

export const metadata: Metadata = { title: 'Meus cursos' }

export default async function PaginaAluno() {
  const [aluno, cursos] = await Promise.all([buscarAluno(), buscarCursos()])
  const primeiroNome = aluno.nome.split(' ')[0]

  return (
    <main>
      <AreaDaPagina>
        <div style={estilos.pagina}>
          <TituloPagina titulo={`Olá, ${primeiroNome}`} descricao="Continue de onde parou." />

          <TituloSecao>Meus cursos</TituloSecao>
          <div style={estilos.grade}>
            {aluno.matriculas.map((matricula) => {
              const curso = cursos.find((cursoDaLista) => cursoDaLista.slug === matricula.cursoSlug)
              if (!curso) return null

              const estaConcluido = matricula.progressoEmPorcentagem === PROGRESSO_CURSO_CONCLUIDO
              const varianteDoSelo = estaConcluido ? 'sucesso' : 'primario'
              const textoDoSelo = estaConcluido ? 'Concluído' : 'Em andamento'
              const varianteDoBotao = estaConcluido ? 'contorno' : 'primario'
              const textoDoBotao = estaConcluido ? 'Rever curso' : 'Continuar'

              return (
                <Cartao key={curso.slug}>
                  <div style={estilos.linha}>
                    <strong>{curso.titulo}</strong>
                    <Selo variante={varianteDoSelo}>{textoDoSelo}</Selo>
                  </div>
                  <BarraProgresso
                    porcentagem={matricula.progressoEmPorcentagem}
                    descricao={`Progresso em ${curso.titulo}`}
                  />
                  <span style={estilos.textoSuave}>
                    {matricula.progressoEmPorcentagem}% concluído
                  </span>
                  <BotaoLink href={`/cursos/${curso.slug}`} variante={varianteDoBotao}>
                    {textoDoBotao}
                  </BotaoLink>
                </Cartao>
              )
            })}
          </div>

          <Cartao>
            <strong>Quer outro curso?</strong>
            <span style={estilos.textoSuave}>
              Veja as vagas e descubra qual curso falta para cada uma.
            </span>
            <div>
              <BotaoLink href="/" variante="secundario">
                Ver vagas
              </BotaoLink>
            </div>
          </Cartao>
        </div>
      </AreaDaPagina>
    </main>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  pagina: { display: 'flex', flexDirection: 'column', gap: espaco.lg, marginTop: espaco.xl },
  grade: criarGrade(LARGURA_MINIMA_DO_CARTAO),
  linha: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: espaco.sm,
  },
  textoSuave: { fontSize: fonte.tamanho.sm, color: cores.textoSuave },
} satisfies Record<string, CSSProperties>
