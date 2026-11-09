import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { BotaoLink } from '@/components/ui/button'
import { Campo } from '@/components/ui/campo'
import { Card } from '@/components/ui/card'
import { TituloPagina } from '@/components/ui/titulos'
import { espaco } from '@/lib/theme'

export const metadata: Metadata = { title: 'Criar conta' }

export default function PaginaCadastro() {
  return (
    <main style={estilos.pagina}>
      <TituloPagina
        titulo="Criar conta"
        descricao="Leva menos de um minuto. Versão de demonstração."
      />
      <Card>
        <Campo id="nome" rotulo="Nome completo" autoComplete="name" />
        <Campo id="email" rotulo="E-mail" tipo="email" autoComplete="email" />
        <Campo id="senha" rotulo="Senha" tipo="password" autoComplete="new-password" />
        <BotaoLink href="/aluno" tamanho="grande">
          Criar conta
        </BotaoLink>
      </Card>
    </main>
  )
}

/* ===================== ESTILOS ===================== */
const estilos: Record<string, CSSProperties> = {
  pagina: {
    maxWidth: 440,
    margin: `${espaco.xl}px auto 0`,
    padding: `0 ${espaco.md}px`,
    display: 'flex',
    flexDirection: 'column',
    gap: espaco.lg,
  },
}
