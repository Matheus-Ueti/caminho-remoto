import type { CSSProperties } from 'react'
import { Selo } from '@/components/ui/Selo'
import { espaco } from '@/lib/tema'

type ListaCompetenciasProps = {
  competenciasExigidas: string[]
  competenciasComprovadas: string[]
}

export function ListaCompetencias({
  competenciasExigidas,
  competenciasComprovadas,
}: ListaCompetenciasProps) {
  return (
    <ul style={estilos.lista}>
      {competenciasExigidas.map((competencia) => {
        const estaComprovada = competenciasComprovadas.includes(competencia)
        const varianteDoSelo = estaComprovada ? 'sucesso' : 'aviso'
        const textoDoSelo = estaComprovada ? 'Comprovada' : 'Falta comprovar'

        return (
          <li key={competencia} style={estilos.linha}>
            <Selo variante={varianteDoSelo}>{textoDoSelo}</Selo>
            <span>{competencia}</span>
          </li>
        )
      })}
    </ul>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  lista: { listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: espaco.sm },
  linha: { display: 'flex', alignItems: 'center', gap: espaco.sm },
} satisfies Record<string, CSSProperties>
