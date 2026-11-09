import type { CSSProperties } from 'react'
import { Cartao } from '@/components/ui/Cartao'
import { TituloSecao } from '@/components/ui/TituloSecao'
import { LARGURA_MINIMA_DO_PASSO, cores, criarGrade, espaco, fonte } from '@/lib/tema'

const passos = [
  { titulo: 'Escolha uma vaga', texto: 'Veja vagas 100% remotas e o que cada uma exige.' },
  {
    titulo: 'Descubra o que falta',
    texto: 'Mostramos as competências que você ainda precisa comprovar.',
  },
  { titulo: 'Faça o curso certo', texto: 'Indicamos o curso que prepara para aquela vaga.' },
  {
    titulo: 'Candidate-se',
    texto: 'Com certificado verificado, a empresa vê que você está pronto.',
  },
]

export function ComoFunciona() {
  return (
    <section style={estilos.secao}>
      <TituloSecao>Como funciona</TituloSecao>
      <ol style={estilos.lista}>
        {passos.map((passo, posicao) => (
          <li key={passo.titulo} style={estilos.passo}>
            <Cartao>
              <span style={estilos.numero} aria-hidden="true">
                {posicao + 1}
              </span>
              <strong>{passo.titulo}</strong>
              <span style={estilos.texto}>{passo.texto}</span>
            </Cartao>
          </li>
        ))}
      </ol>
    </section>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  secao: { display: 'flex', flexDirection: 'column', gap: espaco.md, marginTop: espaco.xl },
  lista: { ...criarGrade(LARGURA_MINIMA_DO_PASSO), listStyle: 'none', padding: 0, margin: 0 },
  passo: { display: 'flex' },
  numero: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: cores.primaria,
    color: cores.primariaTexto,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: fonte.peso.negrito,
  },
  texto: { fontSize: fonte.tamanho.sm, color: cores.textoSuave },
} satisfies Record<string, CSSProperties>
