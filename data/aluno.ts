// MOCK: dados falsos da pessoa "logada". Ainda não existe login de verdade.
import type { Aluno, ResumoDoAfiliado } from '@/types'

export const alunoMock: Aluno = {
  nome: 'Maria Exemplo',
  email: 'maria@exemplo.com.br',
  matriculas: [
    { cursoSlug: 'atendimento-ao-cliente-remoto', progressoEmPorcentagem: 100 },
    { cursoSlug: 'assistente-administrativo-digital', progressoEmPorcentagem: 45 },
  ],
  certificados: [
    {
      codigo: 'CR-2026-000123',
      cursoSlug: 'atendimento-ao-cliente-remoto',
      emitidoEm: '2026-10-21',
    },
  ],
}

// MOCK: números inventados.
// DECISÃO EM ABERTO: percentuais de comissão do afiliado. Por isso não aparecem aqui.
export const afiliadoMock: ResumoDoAfiliado = {
  link: 'https://caminhoremoto.com.br/r/maria-exemplo',
  cliques: 128,
  vendas: 6,
}
