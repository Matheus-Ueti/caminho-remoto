import type { CSSProperties, ReactNode } from 'react'
import { cores, fonte } from '@/lib/tema'

// Alturas das barras do gráfico na tela do notebook, subindo da esquerda para a direita.
const BARRAS = [
  { x: 128, altura: 44 },
  { x: 178, altura: 72 },
  { x: 228, altura: 100 },
  { x: 278, altura: 132 },
]
const BASE_DAS_BARRAS = 246

type CartaoFlutuanteProps = {
  x: number
  y: number
  titulo: string
  texto: string
  corDoIcone: string
  fundoDoIcone: string
  desenhoDoIcone: ReactNode
}

// Cartãozinho branco que "flutua" sobre o notebook (ex.: "Vaga remota").
function CartaoFlutuante({
  x,
  y,
  titulo,
  texto,
  corDoIcone,
  fundoDoIcone,
  desenhoDoIcone,
}: CartaoFlutuanteProps) {
  return (
    <g transform={`translate(${x} ${y})`} filter="url(#sombra-do-cartao)">
      <rect width={176} height={60} rx={14} fill={cores.superficie} />
      <circle cx={32} cy={30} r={18} fill={fundoDoIcone} />
      <g stroke={corDoIcone} strokeWidth={2.2} fill="none" strokeLinecap="round">
        {desenhoDoIcone}
      </g>
      <text x={60} y={27} fontSize={14} fontWeight={fonte.peso.negrito} fill={cores.texto}>
        {titulo}
      </text>
      <text x={60} y={45} fontSize={12} fill={cores.textoSuave}>
        {texto}
      </text>
    </g>
  )
}

/** Desenho do banner: notebook com um gráfico subindo, uma vaga e um certificado. */
export function IlustracaoDoBanner() {
  return (
    <svg viewBox="0 0 480 380" style={estilos.desenho} aria-hidden="true">
      <defs>
        <filter id="sombra-do-cartao" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow
            dx={0}
            dy={8}
            stdDeviation={10}
            floodColor={cores.azulEscuro}
            floodOpacity={0.18}
          />
        </filter>
      </defs>

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

      <CartaoFlutuante
        x={8}
        y={20}
        titulo="Vaga remota"
        texto="Trabalhe de casa"
        corDoIcone={cores.primaria}
        fundoDoIcone={cores.primariaSuave}
        desenhoDoIcone={
          <>
            <rect x={23} y={25} width={18} height={13} rx={2} />
            <path d="M28 25 V22 H36 V25" />
          </>
        }
      />
      <CartaoFlutuante
        x={296}
        y={240}
        titulo="Certificado"
        texto="Curso concluído"
        corDoIcone={cores.sucesso}
        fundoDoIcone={cores.sucessoSuave}
        desenhoDoIcone={
          <>
            <circle cx={32} cy={27} r={6} />
            <path d="M28 32 L26 40 L32 37 L38 40 L36 32" />
          </>
        }
      />
    </svg>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  desenho: { width: '100%', maxWidth: 520, height: 'auto', fontFamily: fonte.familia },
} satisfies Record<string, CSSProperties>
