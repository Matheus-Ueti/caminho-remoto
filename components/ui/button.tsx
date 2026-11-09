import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'
import { cores, fonte, raio } from '@/lib/theme'

type Variante = 'primario' | 'secundario' | 'contorno'
type Tamanho = 'normal' | 'grande'

function estiloBotao(variante: Variante, tamanho: Tamanho): CSSProperties {
  return { ...estilos.base, ...estilos[variante], ...estilos[tamanho] }
}

interface BotaoLinkProps {
  href: string
  variante?: Variante
  tamanho?: Tamanho
  children: ReactNode
}

export function BotaoLink({
  href,
  variante = 'primario',
  tamanho = 'normal',
  children,
}: BotaoLinkProps) {
  return (
    <Link href={href} style={estiloBotao(variante, tamanho)}>
      {children}
    </Link>
  )
}

interface BotaoProps {
  tipo?: 'button' | 'submit'
  variante?: Variante
  tamanho?: Tamanho
  children: ReactNode
}

export function Botao({
  tipo = 'button',
  variante = 'primario',
  tamanho = 'normal',
  children,
}: BotaoProps) {
  return (
    <button type={tipo} style={estiloBotao(variante, tamanho)}>
      {children}
    </button>
  )
}

/* ===================== ESTILOS ===================== */
const estilos: Record<string, CSSProperties> = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: raio.md,
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
  normal: { height: 40, padding: '0 16px', fontSize: fonte.tamanho.sm },
  grande: { height: 48, padding: '0 24px', fontSize: fonte.tamanho.md },
}
