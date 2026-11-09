import type { CSSProperties } from 'react'

export function Header() {
  return <header style={estilos.cabecalho}>Caminho Remoto</header>
}

/* ===================== ESTILOS ===================== */
const estilos: Record<string, CSSProperties> = {
  cabecalho: { padding: '16px 24px', fontWeight: 700, borderBottom: '1px solid #ddd' },
}
