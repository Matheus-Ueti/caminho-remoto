// Casos de uso do programa de afiliados. As telas só chamam estas funções.
// MOCK: os dados ficam em memória (`data/afiliados.ts`). Com o backend, só este arquivo muda.
import { cookies } from 'next/headers'
import { dadosDosAfiliados as dados } from '@/data/afiliados'
import {
  COOKIE_DO_AFILIADO,
  ENDERECO_DO_SITE,
  PERCENTUAL_DO_AFILIADO,
} from '@/lib/configuracaoDoAfiliado'
import { buscarCursoPorSlug } from '@/lib/servicoCursos'
import type { Afiliado, LinkDeAfiliado, OrigemDaDivulgacao, ResumoDoAfiliado } from '@/types'

const TAMANHO_DO_CODIGO = 6

// Código curto, fácil de falar num vídeo e de digitar (ex.: "a3f9c2").
function criarCodigo(): string {
  return crypto.randomUUID().replaceAll('-', '').slice(0, TAMANHO_DO_CODIGO)
}

export function cadastrarAfiliado(nome: string, email: string): Afiliado {
  const afiliado = { id: crypto.randomUUID(), nome, email }
  dados.afiliados.push(afiliado)
  return afiliado
}

/** Afiliado cadastrado neste navegador (guardado em cookie, já que o login ainda não é usado aqui). */
export async function buscarAfiliadoDoNavegador(): Promise<Afiliado | undefined> {
  const id = (await cookies()).get(COOKIE_DO_AFILIADO)?.value
  return dados.afiliados.find((afiliado) => afiliado.id === id)
}

export function gerarLink(
  afiliadoId: string,
  cursoSlug: string,
  origem: OrigemDaDivulgacao,
): LinkDeAfiliado {
  const link = { codigo: criarCodigo(), afiliadoId, cursoSlug, origem }
  dados.links.push(link)
  return link
}

export function montarLinkCurto(codigo: string): string {
  return `${ENDERECO_DO_SITE}/s/${codigo}`
}

export function buscarLink(codigo: string): LinkDeAfiliado | undefined {
  return dados.links.find((link) => link.codigo === codigo)
}

/** Devolve o link clicado, ou `undefined` se o código não existe. */
export function registrarClique(codigo: string): LinkDeAfiliado | undefined {
  const link = buscarLink(codigo)
  if (!link) return undefined
  dados.cliques.push({ codigoDoLink: codigo, criadoEm: new Date().toISOString() })
  return link
}

export function calcularComissao(valorDaVenda: number): number {
  return (valorDaVenda * PERCENTUAL_DO_AFILIADO) / 100
}

/** Registra a venda simulada. Se veio de um link de afiliado do mesmo curso, gera a comissão. */
export async function registrarVenda(cursoSlug: string, codigoDoLink?: string): Promise<void> {
  const curso = await buscarCursoPorSlug(cursoSlug)
  if (!curso) return

  const venda = {
    id: crypto.randomUUID(),
    cursoSlug,
    valor: curso.preco,
    codigoDoLink,
    criadaEm: new Date().toISOString(),
  }
  dados.vendas.push(venda)

  const link = codigoDoLink ? buscarLink(codigoDoLink) : undefined
  if (!link || link.cursoSlug !== cursoSlug) return

  dados.comissoes.push({
    vendaId: venda.id,
    afiliadoId: link.afiliadoId,
    valor: calcularComissao(venda.valor),
    status: 'pendente',
  })
}

/** Só para teste: sem pagamento real, a aprovação é feita à mão no painel. */
export function aprovarComissao(vendaId: string): void {
  const comissao = dados.comissoes.find((item) => item.vendaId === vendaId)
  if (comissao) comissao.status = 'aprovada'
}

function contarCliques(codigo: string): number {
  return dados.cliques.filter((clique) => clique.codigoDoLink === codigo).length
}

function contarVendas(codigo: string): number {
  return dados.vendas.filter((venda) => venda.codigoDoLink === codigo).length
}

function somarComissoes(afiliadoId: string, status: 'pendente' | 'aprovada'): number {
  return dados.comissoes
    .filter((comissao) => comissao.afiliadoId === afiliadoId && comissao.status === status)
    .reduce((soma, comissao) => soma + comissao.valor, 0)
}

export function buscarResumoDoAfiliado(afiliado: Afiliado): ResumoDoAfiliado {
  const linksDoAfiliado = dados.links.filter((link) => link.afiliadoId === afiliado.id)
  const links = linksDoAfiliado.map((link) => ({
    link,
    cliques: contarCliques(link.codigo),
    vendas: contarVendas(link.codigo),
  }))

  return {
    afiliado,
    cliques: links.reduce((soma, resultado) => soma + resultado.cliques, 0),
    vendas: links.reduce((soma, resultado) => soma + resultado.vendas, 0),
    comissaoPendente: somarComissoes(afiliado.id, 'pendente'),
    comissaoAprovada: somarComissoes(afiliado.id, 'aprovada'),
    links,
    comissoes: dados.comissoes.filter((comissao) => comissao.afiliadoId === afiliado.id),
  }
}
