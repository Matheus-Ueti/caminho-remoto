// Regras do programa de afiliados num lugar só, para mudar sem mexer no resto do código.
import type { OrigemDaDivulgacao } from '@/types'

// DECISÃO EM ABERTO: percentuais ainda não definidos. Estes são só valores de exemplo.
export const PERCENTUAL_DO_AFILIADO = 30
export const PERCENTUAL_DA_PLATAFORMA = 10

// DECISÃO EM ABERTO: prazo de atribuição. 30 dias dá tempo para quem viu um Short pensar antes de comprar.
export const DIAS_DE_ATRIBUICAO = 30

export const ENDERECO_DO_SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const NOMES_DAS_ORIGENS: Record<OrigemDaDivulgacao, string> = {
  youtube_shorts: 'YouTube Shorts',
  instagram: 'Instagram',
  whatsapp: 'WhatsApp',
  outro: 'Outro',
}

// Nomes dos cookies: quem é o afiliado neste navegador e qual link trouxe a pessoa.
export const COOKIE_DO_AFILIADO = 'afiliado_id'
export const COOKIE_DE_ATRIBUICAO = 'link_de_afiliado'
