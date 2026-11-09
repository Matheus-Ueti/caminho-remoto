import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { AreaDaPagina } from '@/components/ui/AreaDaPagina'
import { Cartao } from '@/components/ui/Cartao'
import { TituloPagina } from '@/components/ui/TituloPagina'
import { TituloSecao } from '@/components/ui/TituloSecao'
import { buscarResumoDoAfiliado } from '@/lib/servicoAluno'
import { LARGURA_MINIMA_DO_INDICADOR, cores, criarGrade, espaco, fonte } from '@/lib/tema'

export const metadata: Metadata = { title: 'Afiliado' }

export default async function PaginaAfiliado() {
  const resumo = await buscarResumoDoAfiliado()
  const taxaDeConversao = ((resumo.vendas / resumo.cliques) * 100).toFixed(1).replace('.', ',')

  const indicadores = [
    { rotulo: 'Cliques no seu link', valor: String(resumo.cliques) },
    { rotulo: 'Vendas', valor: String(resumo.vendas) },
    { rotulo: 'Conversão', valor: `${taxaDeConversao}%` },
  ]

  return (
    <main>
      <AreaDaPagina>
        <div style={estilos.pagina}>
          <TituloPagina
            titulo="Programa de afiliados"
            descricao="Divulgue os cursos e acompanhe o resultado do seu link."
          />

          <Cartao>
            <strong>Seu link de divulgação</strong>
            <code style={estilos.link}>{resumo.link}</code>
          </Cartao>

          <TituloSecao>Resultados</TituloSecao>
          <div style={estilos.grade}>
            {indicadores.map((indicador) => (
              <Cartao key={indicador.rotulo}>
                <span style={estilos.textoSuave}>{indicador.rotulo}</span>
                <span style={estilos.valor}>{indicador.valor}</span>
              </Cartao>
            ))}
          </div>

          {/* DECISÃO EM ABERTO: percentuais de comissão. Por isso nenhum valor em reais aparece. */}
          <Cartao>
            <strong>Comissão</strong>
            <span style={estilos.textoSuave}>
              Os percentuais de comissão ainda serão definidos. Esta tela é só uma demonstração.
            </span>
          </Cartao>
        </div>
      </AreaDaPagina>
    </main>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  pagina: { display: 'flex', flexDirection: 'column', gap: espaco.lg, marginTop: espaco.xl },
  grade: criarGrade(LARGURA_MINIMA_DO_INDICADOR),
  link: {
    padding: `${espaco.sm}px ${espaco.md}px`,
    backgroundColor: cores.neutroSuave,
    borderRadius: 6,
    fontSize: fonte.tamanho.sm,
    overflowWrap: 'anywhere',
  },
  textoSuave: { fontSize: fonte.tamanho.sm, color: cores.textoSuave },
  valor: { fontSize: fonte.tamanho.xxl, fontWeight: fonte.peso.negrito },
} satisfies Record<string, CSSProperties>
