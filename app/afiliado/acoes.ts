'use server'
// Ações dos formulários de afiliado. Rodam no servidor e só repassam os dados para `lib/`.

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { COOKIE_DE_ATRIBUICAO, COOKIE_DO_AFILIADO } from '@/lib/configuracaoDoAfiliado'
import {
  aprovarComissao,
  buscarAfiliadoDoNavegador,
  cadastrarAfiliado,
  gerarLink,
  registrarVenda,
} from '@/lib/servicoAfiliados'
import type { OrigemDaDivulgacao } from '@/types'

const UM_ANO_EM_SEGUNDOS = 365 * 24 * 60 * 60

export async function cadastrarAfiliadoPeloFormulario(formulario: FormData) {
  const afiliado = cadastrarAfiliado(
    String(formulario.get('nome')),
    String(formulario.get('email')),
  )
  ;(await cookies()).set(COOKIE_DO_AFILIADO, afiliado.id, {
    maxAge: UM_ANO_EM_SEGUNDOS,
    httpOnly: true,
    sameSite: 'lax',
  })
  redirect('/afiliado/painel')
}

export async function gerarLinkPeloFormulario(formulario: FormData) {
  const afiliado = await buscarAfiliadoDoNavegador()
  if (!afiliado) redirect('/afiliado/cadastro')

  const cursoSlug = String(formulario.get('curso'))
  const origem = String(formulario.get('origem')) as OrigemDaDivulgacao
  const link = gerarLink(afiliado.id, cursoSlug, origem)
  redirect(`/afiliado/novo-link?codigo=${link.codigo}`)
}

export async function aprovarComissaoPeloPainel(vendaId: string) {
  aprovarComissao(vendaId)
  revalidatePath('/afiliado/painel')
}

/** Compra de demonstração: registra a venda e dá o crédito ao último link de afiliado clicado. */
export async function simularCompra(cursoSlug: string) {
  const codigoDoLink = (await cookies()).get(COOKIE_DE_ATRIBUICAO)?.value
  await registrarVenda(cursoSlug, codigoDoLink)
  redirect('/aluno')
}
