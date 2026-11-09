import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Cartao } from '@/components/ui/Cartao'
import { Selo } from '@/components/ui/Selo'
import { cores, espaco, fonte } from '@/lib/tema'
import type { Vaga } from '@/types'

type CartaoVagaProps = {
  vaga: Vaga
}

export function CartaoVaga({ vaga }: CartaoVagaProps) {
  return (
    <Cartao estiloExtra={estilos.cartao}>
      <div style={estilos.selos}>
        <Selo variante="primario">{vaga.area}</Selo>
        <Selo>{vaga.nivel}</Selo>
        {vaga.temTrabalhoRemoto && <Selo variante="sucesso">100% remota</Selo>}
      </div>
      <h3 style={estilos.titulo}>
        <Link href={`/vagas/${vaga.id}`} style={estilos.link}>
          {vaga.titulo}
        </Link>
      </h3>
      <p style={estilos.empresa}>{vaga.empresa}</p>
      <p style={estilos.salario}>{vaga.salario}</p>
    </Cartao>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  cartao: { height: '100%', boxSizing: 'border-box', gap: espaco.sm },
  selos: { display: 'flex', flexWrap: 'wrap', gap: espaco.sm },
  titulo: { margin: 0, fontSize: fonte.tamanho.lg, fontWeight: fonte.peso.forte },
  link: { color: cores.texto, textDecoration: 'none' },
  empresa: { margin: 0, fontSize: fonte.tamanho.sm, color: cores.textoSuave },
  salario: {
    margin: 0,
    fontSize: fonte.tamanho.md,
    fontWeight: fonte.peso.medio,
    color: cores.texto,
  },
} satisfies Record<string, CSSProperties>
