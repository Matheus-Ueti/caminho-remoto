import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { AreaDaPagina } from '@/components/ui/AreaDaPagina'
import { BotaoLink } from '@/components/ui/BotaoLink'
import { Campo } from '@/components/ui/Campo'
import { Cartao } from '@/components/ui/Cartao'
import { TituloPagina } from '@/components/ui/TituloPagina'
import { formatarPreco } from '@/lib/formatacao'
import { buscarCursoPorSlug, buscarCursos } from '@/lib/servicoCursos'
import { LARGURA_MINIMA_DA_COLUNA, cores, criarGrade, espaco, fonte } from '@/lib/tema'

type PaginaCheckoutProps = {
  params: Promise<{ slug: string }>
}

export const metadata: Metadata = { title: 'Finalizar compra' }

export async function generateStaticParams() {
  const cursos = await buscarCursos()
  return cursos.map((curso) => ({ slug: curso.slug }))
}

export default async function PaginaCheckout({ params }: PaginaCheckoutProps) {
  const { slug } = await params
  const curso = await buscarCursoPorSlug(slug)
  if (!curso) notFound()

  return (
    <main>
      <AreaDaPagina>
        <div style={estilos.pagina}>
          <TituloPagina
            titulo="Finalizar compra"
            descricao="Pagamento de demonstração: nada é cobrado."
          />
          <div style={estilos.colunas}>
            <Cartao>
              <strong>Seus dados</strong>
              <Campo id="nome" rotulo="Nome completo" autoPreenchimento="name" />
              <Campo id="email" rotulo="E-mail" tipo="email" autoPreenchimento="email" />
              {/* DECISÃO EM ABERTO: meio de pagamento. Pix e cartão abaixo são só exemplo visual. */}
              <strong>Forma de pagamento</strong>
              <div style={estilos.opcoes}>
                <label style={estilos.opcao}>
                  <input type="radio" name="pagamento" defaultChecked /> Pix
                </label>
                <label style={estilos.opcao}>
                  <input type="radio" name="pagamento" /> Cartão de crédito
                </label>
              </div>
              <BotaoLink href="/aluno" tamanho="grande">
                Confirmar compra
              </BotaoLink>
            </Cartao>

            <Cartao>
              <strong>Resumo</strong>
              <p style={estilos.resumo}>{curso.titulo}</p>
              <p style={estilos.resumo}>{curso.duracaoEmHoras} horas · certificado incluso</p>
              <div style={estilos.total}>
                <span>Total</span>
                <span style={estilos.preco}>{formatarPreco(curso.preco)}</span>
              </div>
            </Cartao>
          </div>
        </div>
      </AreaDaPagina>
    </main>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  pagina: { display: 'flex', flexDirection: 'column', gap: espaco.lg, marginTop: espaco.xl },
  colunas: { ...criarGrade(LARGURA_MINIMA_DA_COLUNA), alignItems: 'start' },
  opcoes: { display: 'flex', flexDirection: 'column', gap: espaco.sm },
  opcao: { display: 'flex', alignItems: 'center', gap: espaco.sm, fontSize: fonte.tamanho.md },
  resumo: { margin: 0, color: cores.textoSuave, fontSize: fonte.tamanho.sm },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: espaco.sm,
    borderTop: `1px solid ${cores.borda}`,
  },
  preco: { fontSize: fonte.tamanho.xl, fontWeight: fonte.peso.negrito },
} satisfies Record<string, CSSProperties>
