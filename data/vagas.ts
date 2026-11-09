// Dados falsos (mock). Empresas e salários são inventados para a demonstração.
import type { Vaga } from '@/types'

export const vagasMock: Vaga[] = [
  {
    id: 'atendente-de-suporte',
    titulo: 'Atendente de suporte',
    empresa: 'Empresa Exemplo A',
    area: 'Atendimento',
    nivel: 'Primeiro emprego',
    remota: true,
    salario: 'R$ 1.800 a R$ 2.200',
    descricao:
      'Atender clientes por chat e e-mail, resolver dúvidas e registrar cada contato. Treinamento inicial pago pela empresa.',
    requisitos: ['Ensino médio completo', 'Computador e internet em casa', 'Boa escrita'],
    competenciasExigidas: ['Atendimento ao cliente', 'Comunicação escrita'],
    cursoSlug: 'atendimento-ao-cliente-remoto',
  },
  {
    id: 'atendente-de-chat',
    titulo: 'Atendente de chat',
    empresa: 'Empresa Exemplo D',
    area: 'Atendimento',
    nivel: 'Primeiro emprego',
    remota: true,
    salario: 'R$ 1.700 a R$ 2.000',
    descricao:
      'Atendimento por chat em horário comercial para uma loja virtual. Metas simples e apoio de um time de líderes.',
    requisitos: ['Ensino médio completo', 'Agilidade na digitação'],
    competenciasExigidas: ['Atendimento ao cliente', 'Ferramentas de helpdesk'],
    cursoSlug: 'atendimento-ao-cliente-remoto',
  },
  {
    id: 'assistente-administrativo',
    titulo: 'Assistente administrativo',
    empresa: 'Empresa Exemplo B',
    area: 'Administrativo',
    nivel: 'Júnior',
    remota: true,
    salario: 'R$ 2.300 a R$ 2.900',
    descricao:
      'Apoiar a diretoria com agenda, planilhas de controle e organização de documentos, tudo de forma remota.',
    requisitos: ['Experiência com planilhas', 'Organização', 'Comunicação clara por escrito'],
    competenciasExigidas: ['Planilhas', 'Organização administrativa', 'Comunicação escrita'],
    cursoSlug: 'assistente-administrativo-digital',
  },
  {
    id: 'auxiliar-administrativo',
    titulo: 'Auxiliar administrativo',
    empresa: 'Empresa Exemplo E',
    area: 'Administrativo',
    nivel: 'Primeiro emprego',
    remota: true,
    salario: 'R$ 1.900 a R$ 2.300',
    descricao:
      'Atualizar cadastros, organizar arquivos digitais e dar suporte a diferentes setores da empresa.',
    requisitos: ['Ensino médio completo', 'Vontade de aprender'],
    competenciasExigidas: ['Organização administrativa', 'Planilhas'],
    cursoSlug: 'assistente-administrativo-digital',
  },
  {
    id: 'analista-de-dados-junior',
    titulo: 'Analista de dados júnior',
    empresa: 'Empresa Exemplo C',
    area: 'Dados',
    nivel: 'Júnior',
    remota: true,
    salario: 'R$ 3.000 a R$ 3.800',
    descricao:
      'Montar relatórios e gráficos para o time comercial, a partir de planilhas e bases simples.',
    requisitos: ['Planilhas intermediárias', 'Interesse por números'],
    competenciasExigidas: ['Planilhas', 'Análise de dados básica', 'Visualização de dados'],
    cursoSlug: 'dados-para-iniciantes',
  },
]
