import type { CSSProperties } from 'react'
import { BotaoLink } from '@/components/ui/BotaoLink'
import { Cartao } from '@/components/ui/Cartao'
import { formatarPreco } from '@/lib/formatacao'
import { cores, fonte } from '@/lib/tema'
import type { Curso } from '@/types'

type CartaoCompraProps = {
  curso: Curso
}

export function CartaoCompra({ curso }: CartaoCompraProps) {
  const totalDeAulas = curso.modulos.reduce((soma, modulo) => soma + modulo.quantidadeDeAulas, 0)

  return (
    <Cartao>
      <span style={estilos.preco}>{formatarPreco(curso.preco)}</span>
      <p style={estilos.detalhe}>
        {curso.duracaoEmHoras} horas · {totalDeAulas} aulas · certificado incluso
      </p>
      <BotaoLink href={`/checkout/${curso.slug}`} tamanho="grande">
        Comprar agora
      </BotaoLink>
      <p style={estilos.detalhe}>Pagamento de demonstração: nada é cobrado.</p>
    </Cartao>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  preco: { fontSize: fonte.tamanho.xxl, fontWeight: fonte.peso.negrito },
  detalhe: { margin: 0, fontSize: fonte.tamanho.sm, color: cores.textoSuave },
} satisfies Record<string, CSSProperties>
