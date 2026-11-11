import type { CSSProperties, ReactNode } from 'react'
import { cores } from '@/lib/tema'

type CapaDaAreaProps = {
  area: string
}

type Desenho = { fundo: string; formas: ReactNode }

// Atendimento: balões de conversa.
const atendimento: Desenho = {
  fundo: cores.primaria,
  formas: (
    <>
      <rect x={60} y={36} width={130} height={56} rx={14} fill={cores.superficie} />
      <path d="M84 92 L84 112 L106 92 Z" fill={cores.superficie} />
      <rect x={78} y={54} width={80} height={8} rx={4} fill={cores.primaria} opacity={0.5} />
      <rect x={78} y={70} width={52} height={8} rx={4} fill={cores.primaria} opacity={0.3} />
      <rect
        x={140}
        y={104}
        width={120}
        height={46}
        rx={14}
        fill={cores.azulEscuro}
        opacity={0.85}
      />
      <path d="M236 150 L236 166 L216 150 Z" fill={cores.azulEscuro} opacity={0.85} />
      <rect x={158} y={120} width={70} height={8} rx={4} fill={cores.superficie} opacity={0.7} />
    </>
  ),
}

// Administrativo: folha de planilha.
const administrativo: Desenho = {
  fundo: cores.azulEscuro,
  formas: (
    <>
      <rect x={88} y={28} width={144} height={124} rx={10} fill={cores.superficie} />
      <rect x={88} y={28} width={144} height={26} rx={10} fill={cores.primaria} />
      <path
        d="M88 80 H232 M88 106 H232 M88 130 H232 M136 54 V152 M184 54 V152"
        stroke={cores.borda}
        strokeWidth={2}
      />
      <rect x={140} y={84} width={40} height={18} fill={cores.primariaSuave} />
    </>
  ),
}

// Dados: barras de um gráfico.
const dados: Desenho = {
  fundo: cores.primariaSuave,
  formas: (
    <>
      <rect x={84} y={96} width={32} height={54} rx={6} fill={cores.primaria} opacity={0.45} />
      <rect x={128} y={72} width={32} height={78} rx={6} fill={cores.primaria} opacity={0.65} />
      <rect x={172} y={50} width={32} height={100} rx={6} fill={cores.primaria} opacity={0.85} />
      <rect x={216} y={28} width={32} height={122} rx={6} fill={cores.azulEscuro} />
      <rect x={72} y={154} width={188} height={4} rx={2} fill={cores.azulEscuro} opacity={0.3} />
    </>
  ),
}

const desenhoPorArea: Record<string, Desenho> = {
  Atendimento: atendimento,
  Administrativo: administrativo,
  Dados: dados,
}

/** Capa em formato 16:9 feita em SVG: uma cena simples para cada área. */
export function CapaDaArea({ area }: CapaDaAreaProps) {
  const desenho = desenhoPorArea[area] ?? administrativo

  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      style={estilos.capa}
      aria-hidden="true"
    >
      <rect width={320} height={180} fill={desenho.fundo} />
      {desenho.formas}
    </svg>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  capa: { display: 'block', width: '100%', aspectRatio: '16 / 9' },
} satisfies Record<string, CSSProperties>
