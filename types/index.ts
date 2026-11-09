export type NivelDaVaga = 'Primeiro emprego' | 'Júnior' | 'Pleno'

export interface Vaga {
  id: string
  titulo: string
  empresa: string
  area: string
  nivel: NivelDaVaga
  temTrabalhoRemoto: boolean
  salario: string
  descricao: string
  requisitos: string[]
  /** Competências que a vaga exige. Os nomes são iguais aos de `Curso.competencias`. */
  competenciasExigidas: string[]
  /** Curso que prepara a pessoa para esta vaga. */
  cursoSlug: string
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
