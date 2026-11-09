import type { CSSProperties } from 'react'
import { VagasList } from '@/components/vagas-list'

export default function PaginaInicial() {
  return (
    <main style={estilos.pagina}>
      <h1 style={estilos.titulo}>Vagas home office</h1>
      <VagasList />
    </main>
  )
}

/* ===================== ESTILOS ===================== */
const estilos: Record<string, CSSProperties> = {
  pagina: { maxWidth: 720, margin: '0 auto', padding: 24 },
  titulo: { fontSize: 24, margin: '0 0 16px' },
}
