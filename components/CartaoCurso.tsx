import Link from 'next/link'
import type { CSSProperties } from 'react'
import { BotaoLink } from '@/components/ui/BotaoLink'
import { Cartao } from '@/components/ui/Cartao'
import { Selo } from '@/components/ui/Selo'
import { formatarPreco } from '@/lib/formatacao'
import { cores, espaco, fonte } from '@/lib/tema'
import type { Curso } from '@/types'

type CartaoCursoProps = {
  curso: Curso
}

export function CartaoCurso({ curso }: CartaoCursoProps) {
  return (
    <Cartao estiloExtra={estilos.cartao}>
      <div style={estilos.selos}>
        <Selo variante="primario">{curso.area}</Selo>
        <Selo>{curso.duracaoEmHoras} horas</Selo>
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
    </Cartao>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  cartao: { height: '100%', boxSizing: 'border-box', gap: espaco.sm },
  selos: { display: 'flex', flexWrap: 'wrap', gap: espaco.sm },
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
} satisfies Record<string, CSSProperties>
