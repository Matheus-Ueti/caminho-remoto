import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Selo } from '@/components/ui/Selo'
import { cores, espaco, fonte, raio, sombra } from '@/lib/tema'
import type { Vaga } from '@/types'

type CartaoVagaProps = {
  vaga: Vaga
}

const TIPOS_DE_CONTRATO = ['CLT', 'PJ']

// Só mostramos o contrato quando a própria vaga cita: a API não traz esse dado separado.
function descobrirContratos(vaga: Vaga): string[] {
  const palavras = `${vaga.titulo} ${vaga.resumo}`.toUpperCase().split(/[^A-Z]+/)
  return TIPOS_DE_CONTRATO.filter((contrato) => palavras.includes(contrato))
}

export function CartaoVaga({ vaga }: CartaoVagaProps) {
  const inicialDaEmpresa = vaga.empresa.trim().charAt(0).toUpperCase() || '?'
  const contratos = descobrirContratos(vaga)

  return (
    <article style={estilos.cartao}>
      <div style={estilos.logo} aria-hidden="true">
        {inicialDaEmpresa}
      </div>
      <div style={estilos.meio}>
        <h3 style={estilos.titulo}>
          <Link href={`/vagas/${vaga.id}`} style={estilos.link}>
            {vaga.titulo}
          </Link>
        </h3>
        <span style={estilos.empresa}>{vaga.empresa}</span>
        <div style={estilos.selos}>
          <Selo variante="primario">Home Office</Selo>
          {contratos.map((contrato) => (
            <Selo key={contrato}>{contrato}</Selo>
          ))}
        </div>
        {vaga.salario && <span style={estilos.salario}>{vaga.salario}</span>}
      </div>
    </article>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  cartao: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: espaco.md,
    padding: espaco.lg,
    backgroundColor: cores.superficie,
    border: `1px solid ${cores.borda}`,
    borderRadius: raio.md,
    boxShadow: sombra.leve,
  },
  logo: {
    width: 48,
    height: 48,
    flexShrink: 0,
    borderRadius: raio.md,
    border: `1px solid ${cores.borda}`,
    backgroundColor: cores.fundoSuave,
    color: cores.primaria,
    fontSize: fonte.tamanho.xl,
    fontWeight: fonte.peso.extra,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  meio: { flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: espaco.xs },
  titulo: {
    margin: 0,
    fontSize: fonte.tamanho.lg,
    lineHeight: 1.3,
    fontWeight: fonte.peso.negrito,
  },
  link: { color: cores.texto, textDecoration: 'none' },
  empresa: { fontSize: fonte.tamanho.sm, color: cores.textoSuave },
  selos: { display: 'flex', flexWrap: 'wrap', gap: espaco.xs, marginTop: espaco.xs },
  salario: {
    marginTop: espaco.xs,
    fontSize: fonte.tamanho.sm,
    fontWeight: fonte.peso.forte,
    color: cores.texto,
  },
} satisfies Record<string, CSSProperties>
