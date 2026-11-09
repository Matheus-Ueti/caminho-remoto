import type { CSSProperties } from 'react'
import { Badge } from '@/components/ui/badge'
import { BotaoLink } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { formatarPreco } from '@/lib/format'
import { cores, espaco, fonte } from '@/lib/theme'
import type { Curso } from '@/types'

export function CursoRecomendado({ curso }: { curso: Curso }) {
  return (
    <Card estilo={estilos.card}>
      <Badge variante="primario">Curso recomendado para esta vaga</Badge>
      <h3 style={estilos.titulo}>{curso.titulo}</h3>
      <p style={estilos.texto}>{curso.resumo}</p>
      <p style={estilos.meta}>
        {curso.duracaoHoras} horas · certificado com competências verificadas
      </p>
      <div style={estilos.rodape}>
        <span style={estilos.preco}>{formatarPreco(curso.preco)}</span>
        <BotaoLink href={`/cursos/${curso.slug}`}>Ver o curso</BotaoLink>
      </div>
    </Card>
  )
}

/* ===================== ESTILOS ===================== */
const estilos: Record<string, CSSProperties> = {
  card: {
    backgroundColor: cores.primariaSuave,
    border: `1px solid ${cores.primaria}`,
    gap: espaco.sm,
  },
  titulo: { margin: 0, fontSize: fonte.tamanho.lg, fontWeight: fonte.peso.forte },
  texto: { margin: 0, fontSize: fonte.tamanho.sm, color: cores.textoSuave },
  meta: { margin: 0, fontSize: fonte.tamanho.xs, color: cores.textoSuave },
  rodape: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: espaco.md,
  },
  preco: { fontSize: fonte.tamanho.lg, fontWeight: fonte.peso.negrito },
}
