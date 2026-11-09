import type { CSSProperties, ReactNode } from 'react'
import type { Metadata } from 'next'
import { Cabecalho } from '@/components/Cabecalho'
import { Rodape } from '@/components/Rodape'
import { cores, fonte } from '@/lib/tema'

export const metadata: Metadata = {
  title: { default: 'Caminho Remoto', template: '%s · Caminho Remoto' },
  description: 'Vagas home office e cursos de qualificação para chegar até elas.',
  icons: { icon: '/favicon.svg' },
}

type LayoutPrincipalProps = {
  children: ReactNode
}

export default function LayoutPrincipal({ children }: LayoutPrincipalProps) {
  return (
    <html lang="pt-BR">
      <body style={estilos.corpo}>
        <Cabecalho />
        {children}
        <Rodape />
      </body>
    </html>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  corpo: {
    margin: 0,
    minHeight: '100vh',
    fontFamily: fonte.familia,
    fontSize: fonte.tamanho.md,
    color: cores.texto,
    backgroundColor: cores.fundo,
  },
} satisfies Record<string, CSSProperties>
