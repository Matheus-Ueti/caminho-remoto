import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { cadastrarAfiliadoPeloFormulario } from '@/app/afiliado/acoes'
import { AreaDaPagina } from '@/components/ui/AreaDaPagina'
import { Botao } from '@/components/ui/Botao'
import { Campo } from '@/components/ui/Campo'
import { Cartao } from '@/components/ui/Cartao'
import { TituloPagina } from '@/components/ui/TituloPagina'
import { espaco } from '@/lib/tema'

export const metadata: Metadata = { title: 'Cadastro de afiliado' }

export default function PaginaCadastroAfiliado() {
  return (
    <main>
      <AreaDaPagina>
        <div style={estilos.pagina}>
          <TituloPagina titulo="Cadastro de afiliado" descricao="Leva menos de um minuto." />
          <Cartao>
            <form action={cadastrarAfiliadoPeloFormulario} style={estilos.formulario}>
              <Campo id="nome" rotulo="Nome" autoPreenchimento="name" ehObrigatorio />
              <Campo
                id="email"
                rotulo="E-mail"
                tipo="email"
                autoPreenchimento="email"
                ehObrigatorio
              />
              <Botao tamanho="grande">Criar minha conta de afiliado</Botao>
            </form>
          </Cartao>
        </div>
      </AreaDaPagina>
    </main>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  pagina: {
    display: 'flex',
    flexDirection: 'column',
    gap: espaco.lg,
    marginTop: espaco.xl,
    maxWidth: 480,
  },
  formulario: { display: 'flex', flexDirection: 'column', gap: espaco.md },
} satisfies Record<string, CSSProperties>
