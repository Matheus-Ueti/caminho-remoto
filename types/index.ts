export type NivelVaga = 'Primeiro emprego' | 'Júnior' | 'Pleno'

export interface Vaga {
  id: string
  titulo: string
  empresa: string
  area: string
  nivel: NivelVaga
  remota: boolean
  salario: string
  descricao: string
  requisitos: string[]
  /** Competências que a vaga exige. Os nomes batem com `Curso.competencias`. */
  competenciasExigidas: string[]
  /** Curso que prepara para esta vaga. */
  cursoSlug: string
}

export interface Modulo {
  titulo: string
  aulas: number
}

export interface Curso {
  slug: string
  titulo: string
  resumo: string
  descricao: string
  area: string
  nivel: NivelVaga
  duracaoHoras: number
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
  progresso: number
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

export interface ResumoAfiliado {
  link: string
  cliques: number
  vendas: number
}
