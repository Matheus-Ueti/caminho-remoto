import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { BotaoLink } from '@/components/ui/BotaoLink'
import { Campo } from '@/components/ui/Campo'
import { Cartao } from '@/components/ui/Cartao'
import { TituloPagina } from '@/components/ui/TituloPagina'
import { espaco } from '@/lib/tema'

const LARGURA_MAXIMA_DO_FORMULARIO = 440

export const metadata: Metadata = { title: 'Criar conta' }

export default function PaginaCadastro() {
  return (
    <main style={estilos.pagina}>
      <TituloPagina
        titulo="Criar conta"
        descricao="Leva menos de um minuto. Versão de demonstração."
      />
      <Cartao>
        <Campo id="nome" rotulo="Nome completo" autoPreenchimento="name" />
        <Campo id="email" rotulo="E-mail" tipo="email" autoPreenchimento="email" />
        <Campo id="senha" rotulo="Senha" tipo="password" autoPreenchimento="new-password" />
        <BotaoLink href="/aluno" tamanho="grande">
          Criar conta
        </BotaoLink>
      </Cartao>
    </main>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  pagina: {
    maxWidth: LARGURA_MAXIMA_DO_FORMULARIO,
    margin: `${espaco.xl}px auto 0`,
    padding: `0 ${espaco.md}px`,
    display: 'flex',
    flexDirection: 'column',
    gap: espaco.lg,
  },
} satisfies Record<string, CSSProperties>
