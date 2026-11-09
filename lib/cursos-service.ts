import { cursosMock } from '@/data/cursos'
import type { Curso } from '@/types'

export async function listarCursos(): Promise<Curso[]> {
  return cursosMock
}

export async function buscarCursoPorSlug(slug: string): Promise<Curso | undefined> {
  return cursosMock.find((curso) => curso.slug === slug)
}
