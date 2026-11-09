import type { NomeDoIcone } from '@/components/ui/Icone'

// Usamos um ícone por área no lugar de logos de empresas, que não temos autorização para usar.
const iconePorArea: Record<string, NomeDoIcone> = {
  Atendimento: 'fone',
  Administrativo: 'planilha',
  Dados: 'grafico',
}

const ICONE_PADRAO: NomeDoIcone = 'maleta'

export function escolherIconeDaArea(area: string): NomeDoIcone {
  return iconePorArea[area] ?? ICONE_PADRAO
}
