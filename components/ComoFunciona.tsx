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
  return (
    <section style={estilos.secao}>
      <div>
        <h2 style={estilos.titulo}>Como funciona?</h2>
        <p style={estilos.subtitulo}>
          Um ecossistema completo para impulsionar sua carreira remota.
        </p>
      </div>
      <ol style={estilos.lista}>
        {passos.map((passo, posicao) => (
          <li key={passo.titulo} style={estilos.passo}>
            <span style={estilos.numero}>{posicao + 1}</span>
            <Icone nome={passo.icone} tamanho={40} cor={cores.primaria} />
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
  },
  subtitulo: { margin: `${espaco.xs}px 0 0`, fontSize: fonte.tamanho.lg, color: cores.textoSuave },
  lista: { ...criarGrade(LARGURA_MINIMA_DO_PASSO), listStyle: 'none', padding: 0, margin: 0 },
  passo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: espaco.sm,
    textAlign: 'center',
  },
  numero: {
    width: 24,
    height: 24,
    borderRadius: 999,
    backgroundColor: cores.primaria,
    color: cores.primariaTexto,
    fontSize: fonte.tamanho.xs,
    fontWeight: fonte.peso.negrito,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nomeDoPasso: { fontSize: fonte.tamanho.md, color: cores.texto },
  texto: { fontSize: fonte.tamanho.sm, color: cores.textoSuave, maxWidth: 220 },
} satisfies Record<string, CSSProperties>
