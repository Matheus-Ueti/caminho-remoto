import type { CSSProperties, ReactNode } from 'react'
import type { Metadata } from 'next'
import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: 'Caminho Remoto',
  description: 'Vagas home office e cursos de qualificação para chegar até elas.',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={estilos.corpo}>
        <Header />
        {children}
      </body>
    </html>
  )
}

/* ===================== ESTILOS ===================== */
const estilos: Record<string, CSSProperties> = {
  corpo: { margin: 0, fontFamily: 'system-ui, sans-serif', minHeight: '100vh' },
}
