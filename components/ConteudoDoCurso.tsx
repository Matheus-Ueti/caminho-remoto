import type { CSSProperties } from 'react'
import { Cartao } from '@/components/ui/Cartao'
import { Icone } from '@/components/ui/Icone'
import { Selo } from '@/components/ui/Selo'
import { TituloSecao } from '@/components/ui/TituloSecao'
import { cores, espaco, fonte, raio } from '@/lib/tema'
import type { Curso } from '@/types'

const LARGURA_MINIMA_DO_APRENDIZADO = 280

type ConteudoDoCursoProps = {
  curso: Curso
}

export function ConteudoDoCurso({ curso }: ConteudoDoCursoProps) {
  return (
    <>
      <TituloSecao>O que você vai aprender</TituloSecao>
      <ul style={estilos.aprendizados}>
        {curso.aprendizados.map((aprendizado) => (
          <li key={aprendizado} style={estilos.aprendizado}>
            <span style={estilos.check}>
              <Icone nome="check" tamanho={16} cor={cores.sucesso} />
            </span>
            {aprendizado}
          </li>
        ))}
      </ul>

      <TituloSecao>Conteúdo do curso</TituloSecao>
      <ol style={estilos.modulos}>
        {curso.modulos.map((modulo, posicao) => (
          <li key={modulo.titulo} style={estilos.modulo}>
            <span style={estilos.numero}>{posicao + 1}</span>
            <span style={estilos.nomeDoModulo}>{modulo.titulo}</span>
            <span style={estilos.aulas}>{modulo.quantidadeDeAulas} aulas</span>
          </li>
        ))}
      </ol>

      <Cartao estiloExtra={estilos.certificado}>
        <div style={estilos.cabecalhoDoCertificado}>
          <Icone nome="medalha" tamanho={32} cor={cores.sucesso} />
          <div>
            <strong>Certificado de conclusão</strong>
            <p style={estilos.textoSuave}>Ao terminar, seu certificado comprova:</p>
          </div>
        </div>
        <div style={estilos.selos}>
          {curso.competencias.map((competencia) => (
            <Selo key={competencia} variante="sucesso">
              {competencia}
            </Selo>
          ))}
        </div>
      </Cartao>
    </>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  aprendizados: {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(min(${LARGURA_MINIMA_DO_APRENDIZADO}px, 100%), 1fr))`,
    gap: espaco.sm,
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  aprendizado: { display: 'flex', alignItems: 'flex-start', gap: espaco.sm, lineHeight: 1.5 },
  check: {
    flexShrink: 0,
    width: 24,
    height: 24,
    borderRadius: raio.pilula,
    backgroundColor: cores.sucessoSuave,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modulos: { listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: espaco.sm },
  modulo: {
    display: 'flex',
    alignItems: 'center',
    gap: espaco.md,
    padding: `${espaco.md}px`,
    backgroundColor: cores.superficie,
    border: `1px solid ${cores.borda}`,
    borderRadius: raio.md,
  },
  numero: {
    flexShrink: 0,
    width: 32,
    height: 32,
    borderRadius: raio.pilula,
    backgroundColor: cores.primariaSuave,
    color: cores.primaria,
    fontWeight: fonte.peso.negrito,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nomeDoModulo: { flex: 1, fontWeight: fonte.peso.medio },
  aulas: { color: cores.textoSuave, fontSize: fonte.tamanho.sm, whiteSpace: 'nowrap' },
  certificado: { backgroundColor: cores.fundoSuave, marginTop: espaco.sm },
  cabecalhoDoCertificado: { display: 'flex', alignItems: 'center', gap: espaco.md },
  textoSuave: { margin: 0, fontSize: fonte.tamanho.sm, color: cores.textoSuave },
  selos: { display: 'flex', flexWrap: 'wrap', gap: espaco.sm },
} satisfies Record<string, CSSProperties>
