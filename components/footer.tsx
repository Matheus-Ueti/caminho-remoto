import type { CSSProperties } from 'react'
import { Container } from '@/components/ui/container'
import { cores, espaco, fonte } from '@/lib/theme'

export function Footer() {
  return (
    <footer style={estilos.rodape}>
      <Container>
        <p style={estilos.texto}>
          Caminho Remoto · Versão de demonstração: todas as vagas, cursos e pessoas são dados de
          exemplo.
        </p>
      </Container>
    </footer>
  )
}

/* ===================== ESTILOS ===================== */
const estilos: Record<string, CSSProperties> = {
  rodape: {
    borderTop: `1px solid ${cores.borda}`,
    marginTop: espaco.xxl,
    padding: `${espaco.lg}px 0`,
  },
  texto: { margin: 0, fontSize: fonte.tamanho.sm, color: cores.textoSuave },
}
