import type { CSSProperties, ReactNode } from 'react'
import type { Metadata } from 'next'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { cores, fonte } from '@/lib/theme'

export const metadata: Metadata = {
  title: { default: 'Caminho Remoto', template: '%s · Caminho Remoto' },
  description: 'Vagas home office e cursos de qualificação para chegar até elas.',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={estilos.corpo}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

/* ===================== ESTILOS ===================== */
const estilos: Record<string, CSSProperties> = {
  corpo: {
    margin: 0,
    minHeight: '100vh',
    fontFamily: fonte.familia,
    fontSize: fonte.tamanho.md,
    color: cores.texto,
    backgroundColor: cores.fundo,
  },
}
