import type { CSSProperties } from 'react'
import { cores, espaco, fonte, raio } from '@/lib/tema'

type CampoProps = {
  id: string
  rotulo: string
  tipo?: 'text' | 'email' | 'password' | 'tel'
  textoDeExemplo?: string
  autoPreenchimento?: string
  ehObrigatorio?: boolean
}

export function Campo({
  id,
  rotulo,
  tipo = 'text',
  textoDeExemplo,
  autoPreenchimento,
  ehObrigatorio = false,
}: CampoProps) {
  return (
    <div style={estilos.grupo}>
      <label htmlFor={id} style={estilos.rotulo}>
        {rotulo}
      </label>
      <input
        id={id}
        name={id}
        type={tipo}
        placeholder={textoDeExemplo}
        autoComplete={autoPreenchimento}
        required={ehObrigatorio}
        style={estilos.campo}
      />
    </div>
  )
}

/* ===================== ESTILOS ===================== */
// Exportado para o `CampoDeEscolha` ter o mesmo visual.
export const estilos = {
  grupo: { display: 'flex', flexDirection: 'column', gap: espaco.xs },
  rotulo: { fontSize: fonte.tamanho.sm, fontWeight: fonte.peso.medio, color: cores.texto },
  campo: {
    height: 40,
    padding: '0 12px',
    border: `1px solid ${cores.borda}`,
    borderRadius: raio.md,
    fontSize: fonte.tamanho.md,
    fontFamily: fonte.familia,
    color: cores.texto,
    backgroundColor: cores.superficie,
  },
} satisfies Record<string, CSSProperties>
