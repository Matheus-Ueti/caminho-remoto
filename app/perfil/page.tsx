import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { TituloPagina, TituloSecao } from '@/components/ui/titulos'
import { buscarAluno, competenciasVerificadas } from '@/lib/aluno-service'
import { listarCursos } from '@/lib/cursos-service'
import { formatarData } from '@/lib/format'
import { cores, espaco, fonte, grade } from '@/lib/theme'

export const metadata: Metadata = { title: 'Meu perfil' }

export default async function PaginaPerfil() {
  const [aluno, cursos] = await Promise.all([buscarAluno(), listarCursos()])
  const competencias = [...new Set(competenciasVerificadas(aluno))]

  return (
    <main>
      <Container>
        <div style={estilos.pagina}>
          <TituloPagina
            titulo={aluno.nome}
            descricao="Este é o perfil que as empresas veem quando você se candidata."
          />

          <TituloSecao>Competências verificadas</TituloSecao>
          <div style={estilos.etiquetas}>
            {competencias.map((competencia) => (
              <Badge key={competencia} variante="sucesso">
                {competencia}
              </Badge>
            ))}
          </div>

          <TituloSecao>Certificados</TituloSecao>
          <div style={grade(300)}>
            {aluno.certificados.map((certificado) => {
              const curso = cursos.find((item) => item.slug === certificado.cursoSlug)
              if (!curso) return null
              return (
                <Card key={certificado.codigo}>
                  <Badge variante="sucesso">Verificado</Badge>
                  <strong>{curso.titulo}</strong>
                  <span style={estilos.suave}>
                    Emitido em {formatarData(certificado.emitidoEm)} · {curso.duracaoHoras} horas
                  </span>
                  <span style={estilos.codigo}>Código: {certificado.codigo}</span>
                </Card>
              )
            })}
          </div>
        </div>
      </Container>
    </main>
  )
}

/* ===================== ESTILOS ===================== */
const estilos: Record<string, CSSProperties> = {
  pagina: { display: 'flex', flexDirection: 'column', gap: espaco.lg, marginTop: espaco.xl },
  etiquetas: { display: 'flex', flexWrap: 'wrap', gap: espaco.sm },
  suave: { fontSize: fonte.tamanho.sm, color: cores.textoSuave },
  codigo: {
    fontSize: fonte.tamanho.xs,
    color: cores.textoSuave,
    fontFamily: 'ui-monospace, monospace',
  },
}
