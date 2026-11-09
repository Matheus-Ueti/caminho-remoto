// Telas e componentes só falam com os arquivos de `lib/`, nunca direto com `data/`.
// Quando o backend existir, só o corpo destas funções muda (ex.: fetch).
import { vagasMock } from '@/data/vagas'
import type { Vaga } from '@/types'

export async function listarVagas(): Promise<Vaga[]> {
  return vagasMock
}

export async function buscarVagaPorId(id: string): Promise<Vaga | undefined> {
  return vagasMock.find((vaga) => vaga.id === id)
}
