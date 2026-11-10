import type { CSSProperties } from 'react'
import { Icone } from '@/components/ui/Icone'
import { cores, espaco, fonte, raio, sombra } from '@/lib/tema'

type BarraDeBuscaProps = {
  /** Texto já buscado, para continuar aparecendo no campo. */
  valorInicial?: string
}

// Formulário comum (GET): leva para `/vagas?busca=...` sem precisar de JavaScript.
export function BarraDeBusca({ valorInicial }: BarraDeBuscaProps) {
  return (
    <form role="search" action="/vagas" style={estilos.barra}>
      <Icone nome="busca" tamanho={20} cor={cores.textoSuave} />
      <input
        type="search"
        name="busca"
        defaultValue={valorInicial}
        aria-label="Buscar vagas"
        placeholder="Buscar por cargo, área ou tecnologia..."
        style={estilos.campo}
      />
      <button type="submit" style={estilos.botao}>
        Buscar
      </button>
    </form>
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
