import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cores, espaco, fonte } from '@/lib/theme'
import type { Vaga } from '@/types'

export function VagaCard({ vaga }: { vaga: Vaga }) {
  return (
    <Card estilo={estilos.card}>
      <div style={estilos.etiquetas}>
        <Badge variante="primario">{vaga.area}</Badge>
        <Badge>{vaga.nivel}</Badge>
        {vaga.remota && <Badge variante="sucesso">100% remota</Badge>}
      </div>
      <h3 style={estilos.titulo}>
        <Link href={`/vagas/${vaga.id}`} style={estilos.link}>
          {vaga.titulo}
        </Link>
      </h3>
      <p style={estilos.empresa}>{vaga.empresa}</p>
      <p style={estilos.salario}>{vaga.salario}</p>
    </Card>
  )
}

/* ===================== ESTILOS ===================== */
const estilos: Record<string, CSSProperties> = {
  card: { height: '100%', boxSizing: 'border-box', gap: espaco.sm },
  etiquetas: { display: 'flex', flexWrap: 'wrap', gap: espaco.sm },
  titulo: { margin: 0, fontSize: fonte.tamanho.lg, fontWeight: fonte.peso.forte },
  link: { color: cores.texto, textDecoration: 'none' },
  empresa: { margin: 0, fontSize: fonte.tamanho.sm, color: cores.textoSuave },
  salario: {
    margin: 0,
    fontSize: fonte.tamanho.md,
    fontWeight: fonte.peso.medio,
    color: cores.texto,
  },
}
