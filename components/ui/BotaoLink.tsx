import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'
import { cores, fonte, raio, sombra } from '@/lib/tema'

type VarianteDoBotao = 'primario' | 'secundario' | 'contorno' | 'branco'
type TamanhoDoBotao = 'normal' | 'grande'

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
  const estiloDoBotao = { ...estilos.base, ...estilos[variante], ...estilos[tamanho] }

  return (
    <Link href={href} style={estiloDoBotao}>
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
