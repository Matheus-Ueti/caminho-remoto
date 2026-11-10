// MOCK: hoje devolve dados de `data/`. Com o backend, só o corpo destas funções muda.
import { alunoMock } from '@/data/aluno'
import { cursosMock } from '@/data/cursos'
import type { Aluno } from '@/types'

export async function buscarAluno(): Promise<Aluno> {
  return alunoMock
}

/** Competências comprovadas pelos certificados que o aluno já recebeu. */
export function calcularCompetenciasVerificadas(aluno: Aluno): string[] {
  const cursosConcluidos = new Set(aluno.certificados.map((certificado) => certificado.cursoSlug))
  const cursosComCertificado = cursosMock.filter((curso) => cursosConcluidos.has(curso.slug))
  return cursosComCertificado.flatMap((curso) => curso.competencias)
}
