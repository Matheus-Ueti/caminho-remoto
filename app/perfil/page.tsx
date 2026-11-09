import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { AreaDaPagina } from '@/components/ui/AreaDaPagina'
import { Cartao } from '@/components/ui/Cartao'
import { Selo } from '@/components/ui/Selo'
import { TituloPagina } from '@/components/ui/TituloPagina'
import { TituloSecao } from '@/components/ui/TituloSecao'
import { formatarData } from '@/lib/formatacao'
import { buscarAluno, calcularCompetenciasVerificadas } from '@/lib/servicoAluno'
import { buscarCursos } from '@/lib/servicoCursos'
import { LARGURA_MINIMA_DO_CARTAO, cores, criarGrade, espaco, fonte } from '@/lib/tema'

export const metadata: Metadata = { title: 'Meu perfil' }

export default async function PaginaPerfil() {
  const [aluno, cursos] = await Promise.all([buscarAluno(), buscarCursos()])
  const competenciasSemRepeticao = [...new Set(calcularCompetenciasVerificadas(aluno))]

  return (
    <main>
      <AreaDaPagina>
        <div style={estilos.pagina}>
          <TituloPagina
            titulo={aluno.nome}
            descricao="Este é o perfil que as empresas veem quando você se candidata."
          />

          <TituloSecao>Competências verificadas</TituloSecao>
          <div style={estilos.selos}>
            {competenciasSemRepeticao.map((competencia) => (
              <Selo key={competencia} variante="sucesso">
                {competencia}
              </Selo>
            ))}
          </div>

          <TituloSecao>Certificados</TituloSecao>
          <div style={estilos.grade}>
            {aluno.certificados.map((certificado) => {
              const curso = cursos.find(
                (cursoDaLista) => cursoDaLista.slug === certificado.cursoSlug,
              )
              if (!curso) return null

              return (
                <Cartao key={certificado.codigo}>
                  <Selo variante="sucesso">Verificado</Selo>
                  <strong>{curso.titulo}</strong>
                  <span style={estilos.textoSuave}>
                    Emitido em {formatarData(certificado.emitidoEm)} · {curso.duracaoEmHoras} horas
                  </span>
                  <span style={estilos.codigo}>Código: {certificado.codigo}</span>
                </Cartao>
              )
            })}
          </div>
        </div>
      </AreaDaPagina>
    </main>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  pagina: { display: 'flex', flexDirection: 'column', gap: espaco.lg, marginTop: espaco.xl },
  selos: { display: 'flex', flexWrap: 'wrap', gap: espaco.sm },
  grade: criarGrade(LARGURA_MINIMA_DO_CARTAO),
  textoSuave: { fontSize: fonte.tamanho.sm, color: cores.textoSuave },
  codigo: {
    fontSize: fonte.tamanho.xs,
    color: cores.textoSuave,
    fontFamily: 'ui-monospace, monospace',
  },
} satisfies Record<string, CSSProperties>
