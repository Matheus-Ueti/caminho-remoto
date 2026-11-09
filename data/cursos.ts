// Dados falsos (mock). As áreas são só exemplos: as profissões do MVP ainda não foram decididas.
import type { Curso } from '@/types'

export const cursosMock: Curso[] = [
  {
    slug: 'atendimento-ao-cliente-remoto',
    titulo: 'Atendimento ao Cliente Remoto',
    resumo: 'Aprenda a atender bem por chat, e-mail e telefone, trabalhando de casa.',
    descricao:
      'Um curso prático para quem quer começar em suporte e atendimento. Você aprende a se comunicar com clareza, resolver problemas e usar as ferramentas que as empresas usam no dia a dia.',
    area: 'Atendimento',
    nivel: 'Primeiro emprego',
    duracaoHoras: 12,
    preco: 197,
    autor: 'Equipe Caminho Remoto',
    modulos: [
      { titulo: 'Como funciona o atendimento remoto', aulas: 5 },
      { titulo: 'Comunicação escrita que resolve', aulas: 8 },
      { titulo: 'Ferramentas de chat e helpdesk', aulas: 7 },
      { titulo: 'Lidando com clientes difíceis', aulas: 6 },
    ],
    aprendizados: [
      'Responder clientes com clareza e empatia',
      'Usar ferramentas de chat e helpdesk',
      'Organizar a rotina de atendimento em casa',
      'Montar um currículo para vagas de suporte',
    ],
    competencias: ['Atendimento ao cliente', 'Comunicação escrita', 'Ferramentas de helpdesk'],
  },
  {
    slug: 'assistente-administrativo-digital',
    titulo: 'Assistente Administrativo Digital',
    resumo: 'Organize rotinas, documentos e planilhas como um profissional remoto.',
    descricao:
      'Do básico de planilhas à organização de agenda e documentos: tudo o que uma empresa espera de quem trabalha com apoio administrativo à distância.',
    area: 'Administrativo',
    nivel: 'Júnior',
    duracaoHoras: 16,
    preco: 247,
    autor: 'Equipe Caminho Remoto',
    modulos: [
      { titulo: 'Rotina administrativa à distância', aulas: 6 },
      { titulo: 'Planilhas do zero ao útil', aulas: 10 },
      { titulo: 'Agenda, e-mails e documentos', aulas: 7 },
      { titulo: 'Organização e prioridades', aulas: 5 },
    ],
    aprendizados: [
      'Criar e organizar planilhas',
      'Gerir agenda e e-mails de um time',
      'Organizar documentos na nuvem',
      'Priorizar tarefas sem supervisão direta',
    ],
    competencias: ['Planilhas', 'Organização administrativa', 'Comunicação escrita'],
  },
  {
    slug: 'dados-para-iniciantes',
    titulo: 'Dados para Iniciantes',
    resumo: 'Leia, organize e apresente dados para apoiar decisões.',
    descricao:
      'Uma porta de entrada para a área de dados: planilhas avançadas, análise básica e gráficos claros, com exercícios baseados em situações reais de empresas.',
    area: 'Dados',
    nivel: 'Júnior',
    duracaoHoras: 20,
    preco: 297,
    autor: 'Equipe Caminho Remoto',
    modulos: [
      { titulo: 'O que faz quem trabalha com dados', aulas: 4 },
      { titulo: 'Planilhas para análise', aulas: 9 },
      { titulo: 'Análise de dados básica', aulas: 10 },
      { titulo: 'Gráficos e apresentação', aulas: 7 },
    ],
    aprendizados: [
      'Limpar e organizar dados em planilhas',
      'Responder perguntas de negócio com números',
      'Criar gráficos fáceis de entender',
      'Apresentar resultados para quem decide',
    ],
    competencias: ['Planilhas', 'Análise de dados básica', 'Visualização de dados'],
  },
]
