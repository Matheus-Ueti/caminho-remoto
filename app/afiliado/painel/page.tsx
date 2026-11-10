import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import type { CSSProperties } from 'react'
import { aprovarComissaoPeloPainel } from '@/app/afiliado/acoes'
import { BotaoCopiar } from '@/components/BotaoCopiar'
import { AreaDaPagina } from '@/components/ui/AreaDaPagina'
import { Botao } from '@/components/ui/Botao'
import { BotaoLink } from '@/components/ui/BotaoLink'
import { Cartao } from '@/components/ui/Cartao'
import { Selo } from '@/components/ui/Selo'
import { TituloPagina } from '@/components/ui/TituloPagina'
import { TituloSecao } from '@/components/ui/TituloSecao'
import { NOMES_DAS_ORIGENS } from '@/lib/configuracaoDoAfiliado'
import { formatarPreco } from '@/lib/formatacao'
import {
  buscarAfiliadoDoNavegador,
  buscarResumoDoAfiliado,
  montarLinkCurto,
} from '@/lib/servicoAfiliados'
import { buscarCursos } from '@/lib/servicoCursos'
import { LARGURA_MINIMA_DO_INDICADOR, cores, criarGrade, espaco, fonte } from '@/lib/tema'

export const metadata: Metadata = { title: 'Painel do afiliado' }

export default async function PaginaPainelAfiliado() {
  const afiliado = await buscarAfiliadoDoNavegador()
  if (!afiliado) redirect('/afiliado/cadastro')

  const resumo = buscarResumoDoAfiliado(afiliado)
  const cursos = await buscarCursos()
  const tituloDoCurso = (slug: string) => cursos.find((curso) => curso.slug === slug)?.titulo

  const indicadores = [
    { rotulo: 'Cliques', valor: String(resumo.cliques) },
    { rotulo: 'Vendas', valor: String(resumo.vendas) },
    { rotulo: 'Comissão pendente', valor: formatarPreco(resumo.comissaoPendente) },
    { rotulo: 'Comissão aprovada', valor: formatarPreco(resumo.comissaoAprovada) },
  ]

  return (
    <main>
      <AreaDaPagina>
        <div style={estilos.pagina}>
          <TituloPagina titulo={`Olá, ${afiliado.nome}`} descricao="Resultados dos seus links." />

          <div style={estilos.grade}>
            {indicadores.map((indicador) => (
              <Cartao key={indicador.rotulo}>
                <span style={estilos.textoSuave}>{indicador.rotulo}</span>
                <span style={estilos.valor}>{indicador.valor}</span>
              </Cartao>
            ))}
          </div>

          <div style={estilos.cabecalhoDaSecao}>
            <TituloSecao>Seus links</TituloSecao>
            <BotaoLink href="/afiliado/novo-link">Criar novo link</BotaoLink>
          </div>
          {resumo.links.length === 0 && (
            <p style={estilos.textoSuave}>Você ainda não criou nenhum link.</p>
          )}
          {resumo.links.length > 0 && (
            <div style={estilos.rolagem}>
              <table style={estilos.tabela}>
                <thead>
                  <tr>
                    <th style={estilos.celula}>Curso</th>
                    <th style={estilos.celula}>Origem</th>
                    <th style={estilos.celula}>Link</th>
                    <th style={estilos.celula}>Cliques</th>
                    <th style={estilos.celula}>Vendas</th>
                  </tr>
                </thead>
                <tbody>
                  {resumo.links.map(({ link, cliques, vendas }) => (
                    <tr key={link.codigo}>
                      <td style={estilos.celula}>{tituloDoCurso(link.cursoSlug)}</td>
                      <td style={estilos.celula}>{NOMES_DAS_ORIGENS[link.origem]}</td>
                      <td style={estilos.celula}>
                        <div style={estilos.linkComBotao}>
                          <code>{montarLinkCurto(link.codigo)}</code>
                          <BotaoCopiar texto={montarLinkCurto(link.codigo)} />
                        </div>
                      </td>
                      <td style={estilos.celula}>{cliques}</td>
                      <td style={estilos.celula}>{vendas}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <TituloSecao>Comissões</TituloSecao>
          {resumo.comissoes.length === 0 && (
            <p style={estilos.textoSuave}>Nenhuma venda pelos seus links ainda.</p>
          )}
          {resumo.comissoes.map((comissao) => (
            <Cartao key={comissao.vendaId}>
              <div style={estilos.linkComBotao}>
                <strong>{formatarPreco(comissao.valor)}</strong>
                <Selo variante={comissao.status === 'pendente' ? 'aviso' : 'sucesso'}>
                  {comissao.status}
                </Selo>
                {comissao.status === 'pendente' && (
                  // Só para teste: sem pagamento real, a aprovação é feita à mão.
                  <form action={aprovarComissaoPeloPainel.bind(null, comissao.vendaId)}>
                    <Botao variante="contorno">Aprovar (teste)</Botao>
                  </form>
                )}
              </div>
            </Cartao>
          ))}
        </div>
      </AreaDaPagina>
    </main>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  pagina: { display: 'flex', flexDirection: 'column', gap: espaco.lg, marginTop: espaco.xl },
  grade: criarGrade(LARGURA_MINIMA_DO_INDICADOR),
  textoSuave: { margin: 0, fontSize: fonte.tamanho.sm, color: cores.textoSuave },
  valor: { fontSize: fonte.tamanho.xxl, fontWeight: fonte.peso.negrito },
  cabecalhoDaSecao: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: espaco.md,
  },
  rolagem: { overflowX: 'auto' },
  tabela: { width: '100%', borderCollapse: 'collapse', fontSize: fonte.tamanho.sm },
  celula: { padding: espaco.sm, borderBottom: `1px solid ${cores.borda}`, textAlign: 'left' },
  linkComBotao: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: espaco.sm },
} satisfies Record<string, CSSProperties>
