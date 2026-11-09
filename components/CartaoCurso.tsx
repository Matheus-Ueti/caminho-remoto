import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Icone } from '@/components/ui/Icone'
import { Selo } from '@/components/ui/Selo'
import { formatarPreco } from '@/lib/formatacao'
import { escolherIconeDaArea } from '@/lib/iconeDaArea'
import { cores, espaco, fonte, gradientes, raio, sombra } from '@/lib/tema'
import type { Curso } from '@/types'

type CartaoCursoProps = {
  curso: Curso
}

export function CartaoCurso({ curso }: CartaoCursoProps) {
  return (
    <article style={estilos.cartao}>
      <div style={estilos.capa}>
        <Icone nome={escolherIconeDaArea(curso.area)} tamanho={40} cor={cores.primariaTexto} />
      </div>
      <div style={estilos.conteudo}>
        <h3 style={estilos.titulo}>
          <Link href={`/cursos/${curso.slug}`} style={estilos.link}>
            {curso.titulo}
          </Link>
        </h3>
        <p style={estilos.resumo}>{curso.resumo}</p>
        <div style={estilos.rodape}>
          <span style={estilos.detalhe}>
            {curso.duracaoEmHoras} horas · {formatarPreco(curso.preco)}
          </span>
          <Selo variante="primario">Certificado</Selo>
        </div>
      </div>
    </article>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  cartao: {
    display: 'flex',
    gap: espaco.md,
    padding: espaco.sm,
    backgroundColor: cores.superficie,
    border: `1px solid ${cores.borda}`,
    borderRadius: raio.lg,
    boxShadow: sombra.leve,
  },
  capa: {
    width: 112,
    minHeight: 88,
    flexShrink: 0,
    borderRadius: raio.md,
    background: gradientes.escuro,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  conteudo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: espaco.xs,
    padding: `${espaco.xs}px ${espaco.sm}px ${espaco.xs}px 0`,
  },
  titulo: { margin: 0, fontSize: fonte.tamanho.md, fontWeight: fonte.peso.negrito },
  link: { color: cores.texto, textDecoration: 'none' },
  resumo: { margin: 0, fontSize: fonte.tamanho.sm, color: cores.textoSuave },
  rodape: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: espaco.sm,
    marginTop: 'auto',
  },
  detalhe: { fontSize: fonte.tamanho.xs, color: cores.textoSuave },
} satisfies Record<string, CSSProperties>
