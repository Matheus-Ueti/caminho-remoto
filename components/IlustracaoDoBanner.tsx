import type { CSSProperties } from 'react'
import { cores, fonte } from '@/lib/tema'

// Alturas das barras do gráfico na tela do notebook, subindo da esquerda para a direita.
const BARRAS = [
  { x: 128, altura: 44 },
  { x: 178, altura: 72 },
  { x: 228, altura: 100 },
  { x: 278, altura: 132 },
]
const BASE_DAS_BARRAS = 246

/** Desenho do banner: notebook com um gráfico subindo. */
export function IlustracaoDoBanner() {
  return (
    <svg viewBox="0 0 480 380" style={estilos.desenho} aria-hidden="true">
      {/* Notebook: tela, moldura e base */}
      <rect x={70} y={64} width={340} height={224} rx={18} fill={cores.azulEscuro} />
      <rect x={84} y={78} width={312} height={196} rx={10} fill={cores.superficie} />
      <path d="M36 296 H444 L424 318 H56 Z" fill={cores.superficie} opacity={0.9} />
      <rect x={200} y={290} width={80} height={6} rx={3} fill={cores.borda} />

      {/* Conteúdo da tela: barra de título e gráfico */}
      <rect x={104} y={96} width={110} height={10} rx={5} fill={cores.primariaSuave} />
      <rect x={104} y={114} width={70} height={8} rx={4} fill={cores.borda} />
      {BARRAS.map((barra, posicao) => (
        <rect
          key={barra.x}
          x={barra.x}
          y={BASE_DAS_BARRAS - barra.altura}
          width={32}
          height={barra.altura}
          rx={6}
          fill={cores.primaria}
          opacity={0.45 + posicao * 0.18}
        />
      ))}
      <polyline
        points="132,196 194,172 244,150 300,108"
        fill="none"
        stroke={cores.sucesso}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M286 104 L304 104 L304 122"
        fill="none"
        stroke={cores.sucesso}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  desenho: { width: '100%', maxWidth: 520, height: 'auto', fontFamily: fonte.familia },
} satisfies Record<string, CSSProperties>
