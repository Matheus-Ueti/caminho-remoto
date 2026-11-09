import type { CSSProperties } from 'react'
import { cores, espaco, fonte, raio } from '@/lib/theme'

interface CampoProps {
  id: string
  rotulo: string
  tipo?: 'text' | 'email' | 'password' | 'tel'
  placeholder?: string
  autoComplete?: string
}

export function Campo({ id, rotulo, tipo = 'text', placeholder, autoComplete }: CampoProps) {
  return (
    <div style={estilos.grupo}>
      <label htmlFor={id} style={estilos.rotulo}>
        {rotulo}
      </label>
      <input
        id={id}
        name={id}
        type={tipo}
        placeholder={placeholder}
        autoComplete={autoComplete}
        style={estilos.input}
      />
    </div>
  )
}

/* ===================== ESTILOS ===================== */
const estilos: Record<string, CSSProperties> = {
  grupo: { display: 'flex', flexDirection: 'column', gap: espaco.xs },
  rotulo: { fontSize: fonte.tamanho.sm, fontWeight: fonte.peso.medio, color: cores.texto },
  input: {
    height: 40,
    padding: '0 12px',
    border: `1px solid ${cores.borda}`,
    borderRadius: raio.md,
    fontSize: fonte.tamanho.md,
    fontFamily: fonte.familia,
    color: cores.texto,
    backgroundColor: cores.superficie,
  },
}
