import type { CSSProperties } from 'react'
import { AreaDaPagina } from '@/components/ui/AreaDaPagina'
import { cores, espaco, fonte } from '@/lib/tema'

export function Rodape() {
  return (
    <footer style={estilos.rodape}>
      <AreaDaPagina>
        <p style={estilos.texto}>
          Caminho Remoto · Versão de demonstração: todas as vagas, cursos e pessoas são dados de
          exemplo.
        </p>
      </AreaDaPagina>
    </footer>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  rodape: {
    borderTop: `1px solid ${cores.borda}`,
    marginTop: espaco.xxl,
    padding: `${espaco.lg}px 0`,
  },
  texto: { margin: 0, fontSize: fonte.tamanho.sm, color: cores.textoSuave },
} satisfies Record<string, CSSProperties>
