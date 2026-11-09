const formatadorDeMoeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export function formatarPreco(valor: number): string {
  return formatadorDeMoeda.format(valor)
}

// O horário do meio-dia evita que o fuso horário mostre o dia anterior.
export function formatarData(dataIso: string): string {
  return new Date(`${dataIso}T12:00:00`).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}
