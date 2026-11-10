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

export interface ResumoDoAfiliado {
  link: string
  cliques: number
  vendas: number
}

export interface UsuarioLogado {
  /** Identificador da pessoa no Keycloak (um texto, não um número). */
  id: string
  nome: string
  email: string
}
