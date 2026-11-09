import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { Badge } from '@/components/ui/badge'
import { BotaoLink } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Progresso } from '@/components/ui/progress'
import { TituloPagina, TituloSecao } from '@/components/ui/titulos'
import { buscarAluno } from '@/lib/aluno-service'
import { listarCursos } from '@/lib/cursos-service'
import { cores, espaco, fonte, grade } from '@/lib/theme'

export const metadata: Metadata = { title: 'Meus cursos' }

export default async function PaginaAluno() {
  const [aluno, cursos] = await Promise.all([buscarAluno(), listarCursos()])

  return (
    <main>
      <Container>
        <div style={estilos.pagina}>
          <TituloPagina
            titulo={`Olá, ${aluno.nome.split(' ')[0]}`}
            descricao="Continue de onde parou."
          />

          <TituloSecao>Meus cursos</TituloSecao>
          <div style={grade(300)}>
            {aluno.matriculas.map((matricula) => {
              const curso = cursos.find((item) => item.slug === matricula.cursoSlug)
              if (!curso) return null
              const concluido = matricula.progresso === 100
              return (
                <Card key={curso.slug}>
                  <div style={estilos.linha}>
                    <strong>{curso.titulo}</strong>
                    <Badge variante={concluido ? 'sucesso' : 'primario'}>
                      {concluido ? 'Concluído' : 'Em andamento'}
                    </Badge>
                  </div>
                  <Progresso valor={matricula.progresso} rotulo={`Progresso em ${curso.titulo}`} />
                  <span style={estilos.suave}>{matricula.progresso}% concluído</span>
                  <BotaoLink
                    href={`/cursos/${curso.slug}`}
                    variante={concluido ? 'contorno' : 'primario'}
                  >
                    {concluido ? 'Rever curso' : 'Continuar'}
                  </BotaoLink>
                </Card>
              )
            })}
          </div>

          <Card>
            <strong>Quer outro curso?</strong>
            <span style={estilos.suave}>
              Veja as vagas e descubra qual curso falta para cada uma.
            </span>
            <div>
              <BotaoLink href="/" variante="secundario">
                Ver vagas
              </BotaoLink>
            </div>
          </Card>
        </div>
      </Container>
    </main>
  )
}

/* ===================== ESTILOS ===================== */
const estilos: Record<string, CSSProperties> = {
  pagina: { display: 'flex', flexDirection: 'column', gap: espaco.lg, marginTop: espaco.xl },
  linha: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: espaco.sm,
  },
  suave: { fontSize: fonte.tamanho.sm, color: cores.textoSuave },
}
