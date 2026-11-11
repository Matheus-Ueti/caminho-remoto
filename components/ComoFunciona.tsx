import type { CSSProperties } from 'react'
import { Icone } from '@/components/ui/Icone'
import type { NomeDoIcone } from '@/components/ui/Icone'
import { LARGURA_MINIMA_DO_PASSO, cores, criarGrade, espaco, fonte } from '@/lib/tema'

const passos: { icone: NomeDoIcone; titulo: string; texto: string }[] = [
  {
    icone: 'maleta',
    titulo: 'Encontre uma vaga',
    texto: 'Descubra oportunidades de trabalho remoto.',
  },
  { icone: 'play', titulo: 'Faça o curso ideal', texto: 'Aprenda o que falta para se candidatar.' },
  {
    icone: 'medalha',
    titulo: 'Receba seu certificado',
    texto: 'Comprove sua qualificação com um certificado.',
  },
  { icone: 'aviao', titulo: 'Candidate-se', texto: 'Mostre seu novo perfil para as empresas.' },
]

export function ComoFunciona() {
  const ultimoPasso = passos.length - 1

  return (
    <section style={estilos.secao}>
      <div>
        <h2 style={estilos.titulo}>Como funciona?</h2>
        <p style={estilos.subtitulo}>
          Encontre a vaga, descubra o que falta aprender e prepare-se para se candidatar.
        </p>
      </div>
      <ol style={estilos.lista}>
        {passos.map((passo, posicao) => (
          <li key={passo.titulo} style={estilos.passo}>
            <div style={estilos.marcador}>
              <span style={estilos.numero}>{posicao + 1}</span>
              {/* A linha liga este passo ao próximo; o último não tem. */}
              {posicao < ultimoPasso && <span style={estilos.linha} />}
            </div>
            <Icone nome={passo.icone} tamanho={22} cor={cores.primaria} />
            <strong style={estilos.nomeDoPasso}>{passo.titulo}</strong>
            <span style={estilos.texto}>{passo.texto}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  secao: { display: 'flex', flexDirection: 'column', gap: espaco.xl, marginTop: espaco.xxl },
  titulo: {
    margin: 0,
    fontSize: fonte.tamanho.xxl,
    fontWeight: fonte.peso.extra,
    letterSpacing: fonte.espacamentoDosTitulos,
    color: cores.texto,
  },
  subtitulo: { margin: `${espaco.xs}px 0 0`, fontSize: fonte.tamanho.lg, color: cores.textoSuave },
  lista: {
    ...criarGrade(LARGURA_MINIMA_DO_PASSO),
    gap: espaco.lg,
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  passo: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: espaco.sm },
  marcador: { alignSelf: 'stretch', display: 'flex', alignItems: 'center', gap: espaco.sm },
  numero: {
    width: 28,
    height: 28,
    flexShrink: 0,
    borderRadius: 999,
    border: `2px solid ${cores.primaria}`,
    backgroundColor: cores.superficie,
    color: cores.primaria,
    fontSize: fonte.tamanho.xs,
    fontWeight: fonte.peso.negrito,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linha: { flex: 1, height: 2, backgroundColor: cores.borda },
  nomeDoPasso: { fontSize: fonte.tamanho.md, color: cores.texto },
  texto: { fontSize: fonte.tamanho.sm, color: cores.textoSuave, maxWidth: 220 },
} satisfies Record<string, CSSProperties>
