// Busca as vagas na API (pasta CaminhoRemotoAPI), que as traz do Jooble.
// Se a API estiver fora do ar, o site mostra a lista vazia em vez de quebrar.
import { ENDERECO_DA_API } from '@/lib/servicoAutenticacao'
import type { Vaga } from '@/types'

export async function buscarVagas(): Promise<Vaga[]> {
  try {
    // `no-store`: busca sempre na API, para o site não guardar vagas antigas.
    const resposta = await fetch(`${ENDERECO_DA_API}/vagas`, { cache: 'no-store' })
    if (!resposta.ok) return []
    return await resposta.json()
  } catch {
    return []
  }
}

export async function buscarVagaPorId(id: string): Promise<Vaga | undefined> {
  try {
    const resposta = await fetch(`${ENDERECO_DA_API}/vagas/${id}`, { cache: 'no-store' })
    if (!resposta.ok) return undefined
    return await resposta.json()
  } catch {
    return undefined
  }
}
