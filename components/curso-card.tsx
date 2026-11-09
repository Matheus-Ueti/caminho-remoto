import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Badge } from '@/components/ui/badge'
import { BotaoLink } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { formatarPreco } from '@/lib/format'
import { cores, espaco, fonte } from '@/lib/theme'
import type { Curso } from '@/types'

export function CursoCard({ curso }: { curso: Curso }) {
  return (
    <Card estilo={estilos.card}>
      <div style={estilos.etiquetas}>
        <Badge variante="primario">{curso.area}</Badge>
        <Badge>{curso.duracaoHoras} horas</Badge>
      </div>
      <h3 style={estilos.titulo}>
        <Link href={`/cursos/${curso.slug}`} style={estilos.link}>
          {curso.titulo}
        </Link>
      </h3>
      <p style={estilos.resumo}>{curso.resumo}</p>
      <div style={estilos.rodape}>
        <span style={estilos.preco}>{formatarPreco(curso.preco)}</span>
        <BotaoLink href={`/cursos/${curso.slug}`} variante="contorno">
          Ver curso
        </BotaoLink>
      </div>
    </Card>
  )
}

/* ===================== ESTILOS ===================== */
const estilos: Record<string, CSSProperties> = {
  card: { height: '100%', boxSizing: 'border-box', gap: espaco.sm },
  etiquetas: { display: 'flex', flexWrap: 'wrap', gap: espaco.sm },
  titulo: { margin: 0, fontSize: fonte.tamanho.lg, fontWeight: fonte.peso.forte },
  link: { color: cores.texto, textDecoration: 'none' },
  resumo: { margin: 0, flexGrow: 1, fontSize: fonte.tamanho.sm, color: cores.textoSuave },
  rodape: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: espaco.md,
  },
  preco: { fontSize: fonte.tamanho.lg, fontWeight: fonte.peso.negrito, color: cores.texto },
}
