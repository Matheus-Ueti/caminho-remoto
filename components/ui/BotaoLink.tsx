import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'
import { cores, fonte, raio, sombra } from '@/lib/tema'

export type VarianteDoBotao = 'primario' | 'secundario' | 'contorno' | 'branco'
export type TamanhoDoBotao = 'normal' | 'grande'

/** Mesmo visual para links e botões de formulário (veja `Botao`). */
export function montarEstiloDoBotao(
  variante: VarianteDoBotao,
  tamanho: TamanhoDoBotao,
): CSSProperties {
  return { ...estilos.base, ...estilos[variante], ...estilos[tamanho] }
}

type BotaoLinkProps = {
  href: string
  variante?: VarianteDoBotao
  tamanho?: TamanhoDoBotao
  children: ReactNode
}

export function BotaoLink({
  href,
  variante = 'primario',
  tamanho = 'normal',
  children,
}: BotaoLinkProps) {
  return (
    <Link href={href} style={montarEstiloDoBotao(variante, tamanho)}>
      {children}
    </Link>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: raio.pilula,
    fontFamily: fonte.familia,
    fontWeight: fonte.peso.forte,
    textDecoration: 'none',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  primario: {
    backgroundColor: cores.primaria,
    color: cores.primariaTexto,
    border: '1px solid transparent',
    boxShadow: sombra.leve,
  },
  secundario: {
    backgroundColor: cores.primariaSuave,
    color: cores.primariaForte,
    border: '1px solid transparent',
  },
  contorno: {
    backgroundColor: cores.superficie,
    color: cores.texto,
    border: `1px solid ${cores.borda}`,
  },
  branco: {
    backgroundColor: cores.superficie,
    color: cores.primaria,
    border: '1px solid transparent',
    boxShadow: sombra.media,
  },
  normal: { height: 40, padding: '0 20px', fontSize: fonte.tamanho.sm },
  grande: { height: 52, padding: '0 28px', fontSize: fonte.tamanho.md },
} satisfies Record<string, CSSProperties>
