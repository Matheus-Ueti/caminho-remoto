// As páginas e componentes só falam com este arquivo, nunca direto com os mocks.
// Quando o backend existir, só o corpo destas funções muda (ex.: fetch).
import { vagasMock } from '@/data/vagas'
import type { Vaga } from '@/types'

export async function listarVagas(): Promise<Vaga[]> {
  return vagasMock
}
