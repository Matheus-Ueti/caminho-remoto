'use client' // Copiar para a área de transferência só funciona no navegador.

import { useState } from 'react'
import { montarEstiloDoBotao } from '@/components/ui/BotaoLink'

type BotaoCopiarProps = {
  texto: string
}

export function BotaoCopiar({ texto }: BotaoCopiarProps) {
  const [foiCopiado, setFoiCopiado] = useState(false)

  async function copiar() {
    await navigator.clipboard.writeText(texto)
    setFoiCopiado(true)
  }

  return (
    <button type="button" onClick={copiar} style={montarEstiloDoBotao('secundario', 'normal')}>
      {/* aria-live avisa leitores de tela quando o texto muda para "Copiado!". */}
      <span aria-live="polite">{foiCopiado ? 'Copiado!' : 'Copiar'}</span>
    </button>
  )
}
