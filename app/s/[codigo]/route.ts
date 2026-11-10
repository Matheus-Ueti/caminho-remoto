// Link curto de divulgação (`/s/a3f9c2`): conta o clique, guarda quem indicou e leva ao curso.
// Curto de propósito: dá para falar num Short ou colocar na bio, onde links longos atrapalham.
import { NextResponse, type NextRequest } from 'next/server'
import { COOKIE_DE_ATRIBUICAO, DIAS_DE_ATRIBUICAO } from '@/lib/configuracaoDoAfiliado'
import { montarDestinoDoLink, registrarClique } from '@/lib/servicoAfiliados'

const UM_DIA_EM_SEGUNDOS = 24 * 60 * 60

type Contexto = {
  params: Promise<{ codigo: string }>
}

export async function GET(pedido: NextRequest, { params }: Contexto) {
  const { codigo } = await params
  const link = registrarClique(codigo)
  if (!link) return NextResponse.redirect(new URL('/', pedido.url))

  const resposta = NextResponse.redirect(new URL(montarDestinoDoLink(link), pedido.url))
  // Um clique novo substitui o anterior: a última indicação leva o crédito.
  resposta.cookies.set(COOKIE_DE_ATRIBUICAO, codigo, {
    maxAge: DIAS_DE_ATRIBUICAO * UM_DIA_EM_SEGUNDOS,
    httpOnly: true,
    sameSite: 'lax',
  })
  return resposta
}
