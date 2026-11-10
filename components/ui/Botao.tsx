import type { ReactNode } from 'react'
import {
  montarEstiloDoBotao,
  type TamanhoDoBotao,
  type VarianteDoBotao,
} from '@/components/ui/BotaoLink'

type BotaoProps = {
  variante?: VarianteDoBotao
  tamanho?: TamanhoDoBotao
  children: ReactNode
}

/** Botão que envia o formulário em que está. Para navegar, use `BotaoLink`. */
export function Botao({ variante = 'primario', tamanho = 'normal', children }: BotaoProps) {
  return (
    <button type="submit" style={montarEstiloDoBotao(variante, tamanho)}>
      {children}
    </button>
  )
}
