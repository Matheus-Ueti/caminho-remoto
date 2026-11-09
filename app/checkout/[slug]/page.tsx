import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { BotaoLink } from '@/components/ui/button'
import { Campo } from '@/components/ui/campo'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { TituloPagina } from '@/components/ui/titulos'
import { buscarCursoPorSlug, listarCursos } from '@/lib/cursos-service'
import { formatarPreco } from '@/lib/format'
import { cores, espaco, fonte } from '@/lib/theme'

interface Props {
  params: Promise<{ slug: string }>
}

export const metadata: Metadata = { title: 'Finalizar compra' }

export async function generateStaticParams() {
  const cursos = await listarCursos()
  return cursos.map((curso) => ({ slug: curso.slug }))
}

export default async function PaginaCheckout({ params }: Props) {
  const { slug } = await params
  const curso = await buscarCursoPorSlug(slug)
  if (!curso) notFound()

  return (
    <main>
      <Container>
        <div style={estilos.pagina}>
          <TituloPagina
            titulo="Finalizar compra"
            descricao="Pagamento de demonstração: nada é cobrado."
          />
          <div style={estilos.colunas}>
            <Card>
              <strong>Seus dados</strong>
              <Campo id="nome" rotulo="Nome completo" autoComplete="name" />
              <Campo id="email" rotulo="E-mail" tipo="email" autoComplete="email" />
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
            </Card>

            <Card>
              <strong>Resumo</strong>
              <p style={estilos.resumo}>{curso.titulo}</p>
              <p style={estilos.resumo}>{curso.duracaoHoras} horas · certificado incluso</p>
              <div style={estilos.total}>
                <span>Total</span>
                <span style={estilos.preco}>{formatarPreco(curso.preco)}</span>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </main>
  )
}

/* ===================== ESTILOS ===================== */
const estilos: Record<string, CSSProperties> = {
  pagina: { display: 'flex', flexDirection: 'column', gap: espaco.lg, marginTop: espaco.xl },
  colunas: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
    gap: espaco.md,
    alignItems: 'start',
  },
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
}
