import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Icone } from '@/components/ui/Icone'
import { Selo } from '@/components/ui/Selo'
import { escolherIconeDaArea } from '@/lib/iconeDaArea'
import { cores, espaco, fonte, raio, sombra } from '@/lib/tema'
import type { Vaga } from '@/types'

type CartaoVagaProps = {
  vaga: Vaga
}

export function CartaoVaga({ vaga }: CartaoVagaProps) {
  return (
    <article style={estilos.cartao}>
      <div style={estilos.icone}>
        <Icone nome={escolherIconeDaArea(vaga.area)} tamanho={28} cor={cores.primaria} />
      </div>
      <div style={estilos.meio}>
        <h3 style={estilos.titulo}>
          <Link href={`/vagas/${vaga.id}`} style={estilos.link}>
            {vaga.titulo}
          </Link>
        </h3>
        <span style={estilos.empresa}>{vaga.empresa}</span>
        <div style={estilos.selos}>
          {vaga.temTrabalhoRemoto && <Selo variante="primario">Remoto</Selo>}
          <Selo>{vaga.nivel}</Selo>
        </div>
      </div>
      <div style={estilos.salario}>
        <strong style={estilos.valor}>{vaga.salario}</strong>
        <span style={estilos.porMes}>por mês</span>
      </div>
    </article>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  cartao: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: espaco.md,
    padding: espaco.md,
    backgroundColor: cores.superficie,
    border: `1px solid ${cores.borda}`,
    borderRadius: raio.lg,
    boxShadow: sombra.leve,
  },
  icone: {
    width: 56,
    height: 56,
    borderRadius: raio.md,
    backgroundColor: cores.primariaSuave,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  meio: { flex: 1, minWidth: 160, display: 'flex', flexDirection: 'column', gap: 2 },
  titulo: { margin: 0, fontSize: fonte.tamanho.md, fontWeight: fonte.peso.negrito },
  link: { color: cores.texto, textDecoration: 'none' },
  empresa: { fontSize: fonte.tamanho.sm, color: cores.textoSuave },
  selos: { display: 'flex', flexWrap: 'wrap', gap: espaco.xs, marginTop: espaco.xs },
  salario: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' },
  valor: { fontSize: fonte.tamanho.sm, color: cores.primaria },
  porMes: { fontSize: fonte.tamanho.xs, color: cores.textoSuave },
} satisfies Record<string, CSSProperties>
