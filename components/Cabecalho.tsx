import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Logo } from '@/components/Logo'
import { AreaDaPagina } from '@/components/ui/AreaDaPagina'
import { BotaoLink } from '@/components/ui/BotaoLink'
import { Icone } from '@/components/ui/Icone'
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
          <div style={estilos.direita}>
            {/* MOCK: ainda não há login. "Entrar" leva direto à área do aluno de exemplo. */}
            <Link href="/aluno" style={estilos.link}>
              <Icone nome="usuario" tamanho={18} />
              Entrar
            </Link>
            <BotaoLink href="/cadastro">Cadastrar</BotaoLink>
          </div>
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
  direita: { display: 'flex', alignItems: 'center', gap: espaco.lg },
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    fontSize: fonte.tamanho.md,
    fontWeight: fonte.peso.medio,
    color: cores.texto,
    textDecoration: 'none',
  },
} satisfies Record<string, CSSProperties>
