import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { AreaDaPagina } from '@/components/ui/AreaDaPagina'
import { BotaoLink } from '@/components/ui/BotaoLink'
import { Cartao } from '@/components/ui/Cartao'
import { TituloPagina } from '@/components/ui/TituloPagina'
import {
  DIAS_DE_ATRIBUICAO,
  PERCENTUAL_DA_PLATAFORMA,
  PERCENTUAL_DO_AFILIADO,
} from '@/lib/configuracaoDoAfiliado'
import { LARGURA_MINIMA_DO_PASSO, cores, criarGrade, espaco, fonte } from '@/lib/tema'

export const metadata: Metadata = { title: 'Seja afiliado' }

const PASSOS = [
  {
    titulo: '1. Cadastre-se',
    texto: 'Informe seu nome e e-mail. Não há custo para participar.',
  },
  {
    titulo: '2. Crie seus links',
    texto: 'Escolha um curso e onde vai divulgar: YouTube Shorts, Instagram, WhatsApp ou outro.',
  },
  {
    titulo: '3. Acompanhe no painel',
    texto: 'Veja os cliques, as vendas e as comissões de cada link.',
  },
]

export default function PaginaSejaAfiliado() {
  return (
    <main>
      <AreaDaPagina>
        <div style={estilos.pagina}>
          <TituloPagina
            titulo="Seja afiliado"
            descricao="Indique cursos do Caminho Remoto e receba uma comissão por cada venda feita pelo seu link."
          />

          <div style={estilos.grade}>
            {PASSOS.map((passo) => (
              <Cartao key={passo.titulo}>
                <strong>{passo.titulo}</strong>
                <span style={estilos.texto}>{passo.texto}</span>
              </Cartao>
            ))}
          </div>

          <Cartao>
            <strong>Como funciona a comissão</strong>
            <span style={estilos.texto}>
              Valores de exemplo, ainda em definição: {PERCENTUAL_DO_AFILIADO}% de cada venda para
              quem indicou e {PERCENTUAL_DA_PLATAFORMA}% de taxa da plataforma. A venda conta para
              você se a pessoa comprar em até {DIAS_DE_ATRIBUICAO} dias depois de clicar no seu
              link. Se ela clicar no link de outra pessoa depois, o último link leva a venda.
            </span>
          </Cartao>

          <div>
            <BotaoLink href="/afiliado/cadastro" tamanho="grande">
              Quero ser afiliado
            </BotaoLink>
          </div>
        </div>
      </AreaDaPagina>
    </main>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  pagina: { display: 'flex', flexDirection: 'column', gap: espaco.lg, marginTop: espaco.xl },
  grade: criarGrade(LARGURA_MINIMA_DO_PASSO),
  texto: { fontSize: fonte.tamanho.sm, color: cores.textoSuave, lineHeight: 1.6 },
} satisfies Record<string, CSSProperties>
