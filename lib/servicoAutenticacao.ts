// Fala com a API de autenticação (pasta CaminhoRemotoAPI).
// Diferente dos outros serviços, este não é mock: chama o backend de verdade.
// Entrar, criar conta e sair acontecem no Keycloak, com a API fazendo a ponte.
import type { UsuarioLogado } from '@/types'

const ENDERECO_DA_API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

/** Leva para a tela de login do Keycloak. Depois do login, a pessoa volta para a área do aluno. */
export const ENDERECO_PARA_ENTRAR = `${ENDERECO_DA_API}/oauth2/authorization/keycloak`

/** Leva direto para a tela de criar conta do Keycloak. */
export const ENDERECO_PARA_CADASTRAR = `${ENDERECO_PARA_ENTRAR}?cadastro=true`

/** Encerra o login na API e no Keycloak, e volta para a página inicial. */
export const ENDERECO_PARA_SAIR = `${ENDERECO_DA_API}/auth/sair`

/** Devolve quem está logado, ou `null` se ninguém estiver. */
export async function buscarUsuarioLogado(): Promise<UsuarioLogado | null> {
  try {
    // `credentials: 'include'` faz o navegador enviar o cookie de sessão da API.
    const resposta = await fetch(`${ENDERECO_DA_API}/auth/eu`, { credentials: 'include' })
    if (!resposta.ok) return null
    return await resposta.json()
  } catch {
    return null
  }
}
