import type { CSSProperties } from 'react'
import { BotaoLink } from '@/components/ui/BotaoLink'
import { Cartao } from '@/components/ui/Cartao'
import { Selo } from '@/components/ui/Selo'
import { formatarPreco } from '@/lib/formatacao'
import { cores, espaco, fonte } from '@/lib/tema'
import type { Curso } from '@/types'

type CursoRecomendadoProps = {
  curso: Curso
}

export function CursoRecomendado({ curso }: CursoRecomendadoProps) {
  return (
    <Cartao estiloExtra={estilos.cartao}>
      <Selo variante="primario">Curso recomendado para esta vaga</Selo>
      <h3 style={estilos.titulo}>{curso.titulo}</h3>
      <p style={estilos.texto}>{curso.resumo}</p>
      <p style={estilos.detalhe}>
        {curso.duracaoEmHoras} horas · certificado com competências verificadas
      </p>
      <div style={estilos.rodape}>
        <span style={estilos.preco}>{formatarPreco(curso.preco)}</span>
        <BotaoLink href={`/cursos/${curso.slug}`}>Ver o curso</BotaoLink>
      </div>
    </Cartao>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  cartao: {
    backgroundColor: cores.primariaSuave,
    border: `1px solid ${cores.primaria}`,
    gap: espaco.sm,
  },
  titulo: { margin: 0, fontSize: fonte.tamanho.lg, fontWeight: fonte.peso.forte },
  texto: { margin: 0, fontSize: fonte.tamanho.sm, color: cores.textoSuave },
  detalhe: { margin: 0, fontSize: fonte.tamanho.xs, color: cores.textoSuave },
  rodape: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: espaco.md,
  },
  preco: { fontSize: fonte.tamanho.lg, fontWeight: fonte.peso.negrito },
} satisfies Record<string, CSSProperties>
