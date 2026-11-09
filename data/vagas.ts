// Dados falsos (mock). Quando o backend existir, este arquivo deixa de ser usado.
import type { Vaga } from '@/types'

export const vagasMock: Vaga[] = [
  {
    id: '1',
    titulo: 'Atendente de suporte',
    empresa: 'Empresa Exemplo A',
    area: 'Atendimento',
    remota: true,
  },
  {
    id: '2',
    titulo: 'Assistente administrativo',
    empresa: 'Empresa Exemplo B',
    area: 'Administrativo',
    remota: true,
  },
  {
    id: '3',
    titulo: 'Analista de dados júnior',
    empresa: 'Empresa Exemplo C',
    area: 'Dados',
    remota: true,
  },
]
