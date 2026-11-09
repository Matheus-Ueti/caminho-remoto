// MOCK: hoje devolve dados de `data/`. Com o backend, só o corpo destas funções muda.
import { afiliadoMock, alunoMock } from '@/data/aluno'
import { cursosMock } from '@/data/cursos'
import type { Aluno, ResumoDoAfiliado, Vaga } from '@/types'

export async function buscarAluno(): Promise<Aluno> {
  return alunoMock
}

export async function buscarResumoDoAfiliado(): Promise<ResumoDoAfiliado> {
  return afiliadoMock
}

/** Competências comprovadas pelos certificados que o aluno já recebeu. */
export function calcularCompetenciasVerificadas(aluno: Aluno): string[] {
  const cursosConcluidos = new Set(aluno.certificados.map((certificado) => certificado.cursoSlug))
  const cursosComCertificado = cursosMock.filter((curso) => cursosConcluidos.has(curso.slug))
  return cursosComCertificado.flatMap((curso) => curso.competencias)
}

/** Competências que a vaga exige e o aluno ainda não comprovou. */
export function calcularCompetenciasFaltantes(vaga: Vaga, aluno: Aluno): string[] {
  const comprovadas = new Set(calcularCompetenciasVerificadas(aluno))
  return vaga.competenciasExigidas.filter((competencia) => !comprovadas.has(competencia))
}
