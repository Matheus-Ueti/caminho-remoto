export type NivelDaVaga = 'Primeiro emprego' | 'Júnior' | 'Pleno'

/** Vaga home office vinda da API, que a busca em sites de fora (hoje o Jooble). */
export interface Vaga {
  id: string
  titulo: string
  empresa: string
  local: string
  /** Pode vir vazio: muitas vagas não informam o salário. */
  salario: string
  resumo: string
  /** Endereço da vaga no site original, onde a pessoa se candidata. */
  link: string
  atualizadaEm: string
}

export interface Modulo {
  titulo: string
  quantidadeDeAulas: number
}

export interface Curso {
  slug: string
  titulo: string
  resumo: string
  descricao: string
  area: string
  nivel: NivelDaVaga
  duracaoEmHoras: number
  preco: number
  autor: string
  modulos: Modulo[]
  aprendizados: string[]
  /** Competências que o certificado do curso comprova. */
  competencias: string[]
}

export interface Matricula {
  cursoSlug: string
  /** De 0 a 100. */
  progressoEmPorcentagem: number
}

export interface Certificado {
  codigo: string
  cursoSlug: string
  emitidoEm: string
}

export interface Aluno {
  nome: string
  email: string
  matriculas: Matricula[]
  certificados: Certificado[]
}

/** Short do YouTube mostrado no site, na seção "Dicas em vídeo". */
export interface VideoShort {
  /** O código depois de `/shorts/` no endereço do vídeo. */
  idDoYoutube: string
  titulo: string
  area: string
  cursoSlug?: string
  vagaId?: string
}

/* ===================== AFILIADOS ===================== */

export type OrigemDaDivulgacao = 'youtube_shorts' | 'instagram' | 'whatsapp' | 'outro'

export type StatusDaComissao = 'pendente' | 'aprovada' | 'paga'

export interface Afiliado {
  id: string
  nome: string
  email: string
}

export interface LinkDeAfiliado {
  /** Código curto do link: o endereço fica `/s/[codigo]`. */
  codigo: string
  afiliadoId: string
  cursoSlug: string
  origem: OrigemDaDivulgacao
}

export interface Clique {
  codigoDoLink: string
  criadoEm: string
}

/** Venda simulada: ainda não existe pagamento de verdade. */
export interface Venda {
  id: string
  cursoSlug: string
  valor: number
  /** Link que levou a pessoa a comprar. Vazio quando a venda não veio de afiliado. */
  codigoDoLink?: string
  criadaEm: string
}

export interface Comissao {
  vendaId: string
  afiliadoId: string
  valor: number
  status: StatusDaComissao
}

export interface ResultadoDoLink {
  link: LinkDeAfiliado
  cliques: number
  vendas: number
}

export interface ResumoDoAfiliado {
  afiliado: Afiliado
  cliques: number
  vendas: number
  comissaoPendente: number
  comissaoAprovada: number
  links: ResultadoDoLink[]
  comissoes: Comissao[]
}

export interface UsuarioLogado {
  /** Identificador da pessoa no Keycloak (um texto, não um número). */
  id: string
  nome: string
  email: string
}
