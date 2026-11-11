import Link from 'next/link'
import type { CSSProperties } from 'react'
import { CapaDaArea } from '@/components/CapaDaArea'
import { Selo } from '@/components/ui/Selo'
import { formatarPreco } from '@/lib/formatacao'
import { cores, espaco, fonte, raio, sombra } from '@/lib/tema'
import type { Curso } from '@/types'

type CartaoCursoProps = {
  curso: Curso
}

export function CartaoCurso({ curso }: CartaoCursoProps) {
  return (
    <article style={estilos.cartao}>
      <div style={estilos.capa}>
        <CapaDaArea area={curso.area} />
      </div>
      <div style={estilos.conteudo}>
        <Selo variante="primario">{curso.area}</Selo>
        <h3 style={estilos.titulo}>
          <Link href={`/cursos/${curso.slug}`} style={estilos.link}>
            {curso.titulo}
          </Link>
        </h3>
        <p style={estilos.resumo}>{curso.resumo}</p>
        <div style={estilos.rodape}>
          <span style={estilos.preco}>{formatarPreco(curso.preco)}</span>
          <span style={estilos.detalhe}>{curso.duracaoEmHoras} horas · Certificado incluso</span>
        </div>
      </div>
    </article>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  cartao: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: cores.superficie,
    border: `1px solid ${cores.borda}`,
    borderRadius: raio.md,
    boxShadow: sombra.leve,
    overflow: 'hidden',
  },
  capa: { borderBottom: `1px solid ${cores.borda}` },
  conteudo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: espaco.sm,
    padding: espaco.lg,
  },
  titulo: {
    margin: 0,
    fontSize: fonte.tamanho.lg,
    lineHeight: 1.3,
    fontWeight: fonte.peso.negrito,
  },
  link: { color: cores.texto, textDecoration: 'none' },
  resumo: { margin: 0, fontSize: fonte.tamanho.sm, color: cores.textoSuave },
  rodape: {
    alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: espaco.sm,
    marginTop: espaco.xs,
  },
  preco: { fontSize: fonte.tamanho.lg, fontWeight: fonte.peso.extra, color: cores.texto },
  detalhe: { fontSize: fonte.tamanho.xs, color: cores.textoSuave },
} satisfies Record<string, CSSProperties>
