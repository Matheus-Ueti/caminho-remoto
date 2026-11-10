// MOCK: vídeos de EXEMPLO. Os ids abaixo não são de vídeos reais: troque pelos ids dos seus Shorts.
// O id é o código depois de `/shorts/` no endereço (ex.: youtube.com/shorts/ABC123 → 'ABC123').
import type { VideoShort } from '@/types'

export const videosMock: VideoShort[] = [
  {
    idDoYoutube: 'EXEMPLO0001',
    titulo: 'Exemplo: o que faz um atendente remoto',
    area: 'Atendimento',
    cursoSlug: 'atendimento-ao-cliente-remoto',
  },
  {
    idDoYoutube: 'EXEMPLO0002',
    titulo: 'Exemplo: rotina de um assistente administrativo em casa',
    area: 'Administrativo',
    cursoSlug: 'assistente-administrativo-digital',
  },
  {
    idDoYoutube: 'EXEMPLO0003',
    titulo: 'Exemplo: por onde começar a estudar dados',
    area: 'Dados',
    cursoSlug: 'dados-para-iniciantes',
  },
]
