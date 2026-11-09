import type { CSSProperties } from 'react'
import { Icone } from '@/components/ui/Icone'
import type { NomeDoIcone } from '@/components/ui/Icone'
import { cores, espaco, fonte } from '@/lib/tema'

const selos: { icone: NomeDoIcone; linha1: string; linha2: string }[] = [
  { icone: 'casa', linha1: 'Trabalho 100%', linha2: 'remoto' },
  { icone: 'formatura', linha1: 'Cursos com', linha2: 'certificado' },
  { icone: 'escudo', linha1: 'Plataforma', linha2: 'segura' },
]

export function SelosDeConfianca() {
  return (
    <ul style={estilos.lista}>
      {selos.map((selo) => (
        <li key={selo.icone} style={estilos.selo}>
          <Icone nome={selo.icone} tamanho={24} cor={cores.primaria} />
          <span style={estilos.texto}>
            {selo.linha1}
            <br />
            {selo.linha2}
          </span>
        </li>
      ))}
    </ul>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  lista: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: espaco.lg,
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  selo: { display: 'flex', alignItems: 'center', gap: espaco.sm },
  texto: { fontSize: fonte.tamanho.sm, lineHeight: 1.3, color: cores.texto },
} satisfies Record<string, CSSProperties>
