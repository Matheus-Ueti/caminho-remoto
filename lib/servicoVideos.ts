// MOCK: hoje devolve dados de `data/`. Ainda não há integração com a API do YouTube.
import { videosMock } from '@/data/videos'
import type { VideoShort } from '@/types'

export async function buscarVideos(): Promise<VideoShort[]> {
  return videosMock
}

export async function buscarVideosDoCurso(cursoSlug: string): Promise<VideoShort[]> {
  return videosMock.filter((video) => video.cursoSlug === cursoSlug)
}

export async function buscarVideosDaVaga(vagaId: string): Promise<VideoShort[]> {
  return videosMock.filter((video) => video.vagaId === vagaId)
}
