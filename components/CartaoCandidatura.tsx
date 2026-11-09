import type { CSSProperties } from 'react'
import { CursoRecomendado } from '@/components/CursoRecomendado'
import { BotaoLink } from '@/components/ui/BotaoLink'
import { Cartao } from '@/components/ui/Cartao'
import { cores, espaco, fonte } from '@/lib/tema'
import type { Curso } from '@/types'

type CartaoCandidaturaProps = {
  competenciasFaltantes: string[]
  cursoRecomendado?: Curso
}

function montarMensagemDeFaltas(competenciasFaltantes: string[]): string {
  const quantidade = competenciasFaltantes.length
  const palavra = quantidade === 1 ? 'competência' : 'competências'
  return `Você ainda precisa comprovar ${quantidade} ${palavra}: ${competenciasFaltantes.join(', ')}.`
}

export function CartaoCandidatura({
  competenciasFaltantes,
  cursoRecomendado,
}: CartaoCandidaturaProps) {
  const estaProntoParaSeCandidatar = competenciasFaltantes.length === 0

  if (estaProntoParaSeCandidatar) {
    return (
      <Cartao>
        <strong>Você cumpre os requisitos</strong>
        <p style={estilos.texto}>
          Seus certificados comprovam tudo o que a vaga pede. A empresa verá isso no seu perfil.
        </p>
        <BotaoLink href="/perfil" tamanho="grande">
          Candidatar-me
        </BotaoLink>
      </Cartao>
    )
  }

  return (
    <div style={estilos.coluna}>
      <Cartao>
        <strong>Falta pouco para esta vaga</strong>
        <p style={estilos.texto}>{montarMensagemDeFaltas(competenciasFaltantes)}</p>
      </Cartao>
      {cursoRecomendado && <CursoRecomendado curso={cursoRecomendado} />}
    </div>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  coluna: { display: 'flex', flexDirection: 'column', gap: espaco.md },
  texto: { margin: 0, fontSize: fonte.tamanho.sm, color: cores.textoSuave },
} satisfies Record<string, CSSProperties>
