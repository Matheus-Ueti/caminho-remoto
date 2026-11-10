'use client' // Precisa do navegador: desenha no canvas a cada quadro da animação.

import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { desenharFundoEmFaixas } from '@/lib/fundoEmFaixas'

// O degradê é suave, então desenhamos em 1/3 da resolução e o navegador amplia. Fica bem mais leve.
const ESCALA_DA_RESOLUCAO = 1 / 3
const RELOGIO_INICIAL_DA_ONDA = 20.75
const VELOCIDADE_DA_ONDA = 1.2
const MILISSEGUNDOS_POR_SEGUNDO = 1000

// Textura de "granulado" do original, feita com um filtro SVG de ruído.
const TEXTURA_DE_GRANULADO = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.210'/></svg>")`

/** Fundo animado em faixas. Ocupa todo o elemento pai, que precisa de `position: relative`. */
export function FundoAnimado() {
  const referenciaDoCanvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = referenciaDoCanvas.current
    const contexto = canvas?.getContext('2d')
    if (!canvas || !contexto) return

    // Quem pediu "menos movimento" no sistema vê o fundo parado.
    const deveFicarParado = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const inicio = performance.now()
    let idDoQuadro = 0

    const ajustarTamanho = () => {
      canvas.width = Math.max(1, Math.ceil(canvas.clientWidth * ESCALA_DA_RESOLUCAO))
      canvas.height = Math.max(1, Math.ceil(canvas.clientHeight * ESCALA_DA_RESOLUCAO))
    }

    const desenharQuadro = (agora: number) => {
      const segundos = deveFicarParado ? 0 : (agora - inicio) / MILISSEGUNDOS_POR_SEGUNDO
      const relogioDaOnda = RELOGIO_INICIAL_DA_ONDA + segundos * VELOCIDADE_DA_ONDA
      desenharFundoEmFaixas(contexto, canvas.width, canvas.height, relogioDaOnda)
      if (!deveFicarParado) idDoQuadro = requestAnimationFrame(desenharQuadro)
    }

    // Quando o tamanho da tela muda, o canvas é limpo; por isso redesenhamos.
    const observadorDeTamanho = new ResizeObserver(() => {
      ajustarTamanho()
      if (deveFicarParado) desenharQuadro(inicio)
    })
    observadorDeTamanho.observe(canvas)
    ajustarTamanho()
    idDoQuadro = requestAnimationFrame(desenharQuadro)

    return () => {
      cancelAnimationFrame(idDoQuadro)
      observadorDeTamanho.disconnect()
    }
  }, [])

  return (
    <div aria-hidden="true" style={estilos.fundo}>
      <canvas ref={referenciaDoCanvas} style={estilos.canvas} />
      <div style={estilos.granulado} />
    </div>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  fundo: { position: 'absolute', inset: 0, backgroundColor: '#FFFFFF' },
  canvas: { display: 'block', width: '100%', height: '100%' },
  granulado: {
    position: 'absolute',
    inset: 0,
    backgroundImage: TEXTURA_DE_GRANULADO,
    backgroundSize: '120px 120px',
    mixBlendMode: 'overlay',
  },
} satisfies Record<string, CSSProperties>
