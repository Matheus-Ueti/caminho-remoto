import type { CSSProperties } from 'react'
import { Icone } from '@/components/ui/Icone'
import { cores, espaco, fonte, raio, sombra } from '@/lib/tema'

// MOCK: por enquanto a busca é só visual. Filtrar as vagas ainda não foi pedido.
export function BarraDeBusca() {
  return (
    <div role="search" style={estilos.barra}>
      <Icone nome="busca" tamanho={20} cor={cores.textoSuave} />
      <input
        type="search"
        aria-label="Buscar vagas"
        placeholder="Buscar por cargo, área ou tecnologia..."
        style={estilos.campo}
      />
      <button type="button" style={estilos.botao}>
        Buscar
      </button>
    </div>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  barra: {
    display: 'flex',
    alignItems: 'center',
    gap: espaco.sm,
    maxWidth: 560,
    padding: `6px 6px 6px ${espaco.md}px`,
    backgroundColor: cores.superficie,
    border: `1px solid ${cores.borda}`,
    borderRadius: raio.pilula,
    boxShadow: sombra.media,
  },
  campo: {
    flex: 1,
    minWidth: 0,
    height: 40,
    border: 'none',
    background: 'transparent',
    fontSize: fonte.tamanho.md,
    fontFamily: fonte.familia,
    color: cores.texto,
  },
  botao: {
    height: 44,
    padding: '0 28px',
    border: 'none',
    borderRadius: raio.pilula,
    backgroundColor: cores.primaria,
    color: cores.primariaTexto,
    fontSize: fonte.tamanho.md,
    fontWeight: fonte.peso.forte,
    fontFamily: fonte.familia,
    cursor: 'pointer',
  },
} satisfies Record<string, CSSProperties>
