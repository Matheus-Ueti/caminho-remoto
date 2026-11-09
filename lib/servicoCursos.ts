// MOCK: hoje devolve dados de `data/`. Com o backend, só o corpo destas funções muda.
import { cursosMock } from '@/data/cursos'
import type { Curso } from '@/types'

export async function buscarCursos(): Promise<Curso[]> {
  return cursosMock
}

export async function buscarCursoPorSlug(slug: string): Promise<Curso | undefined> {
  return cursosMock.find((curso) => curso.slug === slug)
}
