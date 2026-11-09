import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Logo } from '@/components/Logo'
import { MenuDoUsuario } from '@/components/MenuDoUsuario'
import { AreaDaPagina } from '@/components/ui/AreaDaPagina'
import { cores, espaco, fonte } from '@/lib/tema'

const linksDoMenu = [
  { endereco: '/#vagas', texto: 'Vagas' },
  { endereco: '/#cursos', texto: 'Cursos' },
]

export function Cabecalho() {
  return (
    <header style={estilos.cabecalho}>
      <AreaDaPagina>
        <div style={estilos.linha}>
          <div style={estilos.esquerda}>
            <Logo />
            <nav aria-label="Principal" style={estilos.menu}>
              {linksDoMenu.map((linkDoMenu) => (
                <Link key={linkDoMenu.endereco} href={linkDoMenu.endereco} style={estilos.link}>
                  {linkDoMenu.texto}
                </Link>
              ))}
            </nav>
          </div>
          <MenuDoUsuario />
        </div>
      </AreaDaPagina>
    </header>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  cabecalho: { backgroundColor: cores.superficie, borderBottom: `1px solid ${cores.borda}` },
  linha: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: espaco.md,
    padding: `${espaco.md}px 0`,
  },
  esquerda: { display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: espaco.xl },
  menu: { display: 'flex', gap: espaco.lg },
  link: {
    fontSize: fonte.tamanho.md,
    fontWeight: fonte.peso.medio,
    color: cores.texto,
    textDecoration: 'none',
  },
} satisfies Record<string, CSSProperties>
