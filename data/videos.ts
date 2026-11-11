// MOCK: vídeos de EXEMPLO, ainda não gravados (emBreve). Ao ter um Short real, troque o id e apague o emBreve.
// O id é o código depois de `/shorts/` no endereço (ex.: youtube.com/shorts/ABC123 → 'ABC123').
import type { VideoShort } from '@/types'

export const videosMock: VideoShort[] = [
  {
    idDoYoutube: 'EXEMPLO0001',
    titulo: 'Como funciona um atendimento remoto?',
    area: 'Atendimento',
    cursoSlug: 'atendimento-ao-cliente-remoto',
    emBreve: true,
  },
  {
    idDoYoutube: 'EXEMPLO0002',
    titulo: 'Como organizar uma rotina de trabalho em casa?',
    area: 'Administrativo',
    cursoSlug: 'assistente-administrativo-digital',
    emBreve: true,
  },
  {
    idDoYoutube: 'EXEMPLO0003',
    titulo: 'Por onde começar a estudar análise de dados?',
    area: 'Dados',
    cursoSlug: 'dados-para-iniciantes',
    emBreve: true,
  },
]
