import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Icone } from '@/components/ui/Icone'
import { cores, fonte } from '@/lib/tema'

export function Logo() {
  return (
    <Link href="/" style={estilos.logo} aria-label="Caminho Remoto, página inicial">
      <Icone nome="logo" tamanho={40} cor={cores.primaria} />
      <span style={estilos.nome}>
        Caminho
        <br />
        Remoto
      </span>
    </Link>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  logo: { display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' },
  nome: {
    fontSize: fonte.tamanho.lg,
    fontWeight: fonte.peso.negrito,
    lineHeight: 1.05,
    color: cores.texto,
  },
} satisfies Record<string, CSSProperties>
