import type { CSSProperties } from 'react'
import { listarVagas } from '@/lib/vagas-service'

export async function VagasList() {
  const vagas = await listarVagas()

  return (
    <ul style={estilos.lista}>
      {vagas.map((vaga) => (
        <li key={vaga.id} style={estilos.item}>
          <strong>{vaga.titulo}</strong>
          <div>
            {vaga.empresa} · {vaga.area}
          </div>
        </li>
      ))}
    </ul>
  )
}

/* ===================== ESTILOS ===================== */
const estilos: Record<string, CSSProperties> = {
  lista: { listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 },
  item: { border: '1px solid #ddd', borderRadius: 8, padding: 16 },
}
