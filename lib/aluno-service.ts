import { afiliadoMock, alunoMock } from '@/data/aluno'
import { cursosMock } from '@/data/cursos'
import type { Aluno, ResumoAfiliado, Vaga } from '@/types'

export async function buscarAluno(): Promise<Aluno> {
  return alunoMock
}

export async function buscarResumoAfiliado(): Promise<ResumoAfiliado> {
  return afiliadoMock
}

/** Competências comprovadas pelos certificados que o aluno já recebeu. */
export function competenciasVerificadas(aluno: Aluno): string[] {
  const slugs = new Set(aluno.certificados.map((certificado) => certificado.cursoSlug))
  return cursosMock.filter((curso) => slugs.has(curso.slug)).flatMap((curso) => curso.competencias)
}

/** O que a vaga exige e o aluno ainda não comprovou. */
export function competenciasFaltantes(vaga: Vaga, aluno: Aluno): string[] {
  const comprovadas = new Set(competenciasVerificadas(aluno))
  return vaga.competenciasExigidas.filter((competencia) => !comprovadas.has(competencia))
}
