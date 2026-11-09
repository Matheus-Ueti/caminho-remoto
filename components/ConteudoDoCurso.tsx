import type { CSSProperties } from 'react'
import { Selo } from '@/components/ui/Selo'
import { TituloSecao } from '@/components/ui/TituloSecao'
import { cores, espaco, fonte, raio } from '@/lib/tema'
import type { Curso } from '@/types'

type ConteudoDoCursoProps = {
  curso: Curso
}

export function ConteudoDoCurso({ curso }: ConteudoDoCursoProps) {
  return (
    <>
      <TituloSecao>O que você vai aprender</TituloSecao>
      <ul style={estilos.lista}>
        {curso.aprendizados.map((aprendizado) => (
          <li key={aprendizado}>{aprendizado}</li>
        ))}
      </ul>

      <TituloSecao>Conteúdo do curso</TituloSecao>
      <ol style={estilos.modulos}>
        {curso.modulos.map((modulo) => (
          <li key={modulo.titulo} style={estilos.modulo}>
            <span>{modulo.titulo}</span>
            <span style={estilos.aulas}>{modulo.quantidadeDeAulas} aulas</span>
          </li>
        ))}
      </ol>

      <TituloSecao>Competências no seu certificado</TituloSecao>
      <div style={estilos.selos}>
        {curso.competencias.map((competencia) => (
          <Selo key={competencia} variante="sucesso">
            {competencia}
          </Selo>
        ))}
      </div>
    </>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  lista: { margin: 0, paddingLeft: espaco.lg, lineHeight: 1.8 },
  modulos: { listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: espaco.sm },
  modulo: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: espaco.md,
    padding: `${espaco.sm}px ${espaco.md}px`,
    backgroundColor: cores.superficie,
    border: `1px solid ${cores.borda}`,
    borderRadius: raio.md,
  },
  aulas: { color: cores.textoSuave, fontSize: fonte.tamanho.sm },
  selos: { display: 'flex', flexWrap: 'wrap', gap: espaco.sm },
} satisfies Record<string, CSSProperties>
