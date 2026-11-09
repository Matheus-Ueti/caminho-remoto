// Dados falsos (mock) da pessoa "logada". Não existe login de verdade ainda.
import type { Aluno, ResumoAfiliado } from '@/types'

export const alunoMock: Aluno = {
  nome: 'Maria Exemplo',
  email: 'maria@exemplo.com.br',
  matriculas: [
    { cursoSlug: 'atendimento-ao-cliente-remoto', progresso: 100 },
    { cursoSlug: 'assistente-administrativo-digital', progresso: 45 },
  ],
  certificados: [
    {
      codigo: 'CR-2026-000123',
      cursoSlug: 'atendimento-ao-cliente-remoto',
      emitidoEm: '2026-10-21',
    },
  ],
}

// Comissão e percentuais ainda não foram definidos, então não aparecem aqui.
export const afiliadoMock: ResumoAfiliado = {
  link: 'https://caminhoremoto.com.br/r/maria-exemplo',
  cliques: 128,
  vendas: 6,
}
