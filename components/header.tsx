import Link from 'next/link'
import type { CSSProperties } from 'react'
import { BotaoLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { cores, espaco, fonte } from '@/lib/theme'

const links = [
  { href: '/', rotulo: 'Vagas' },
  { href: '/#cursos', rotulo: 'Cursos' },
  { href: '/aluno', rotulo: 'Meus cursos' },
  { href: '/perfil', rotulo: 'Meu perfil' },
  { href: '/afiliado', rotulo: 'Afiliado' },
]

export function Header() {
  return (
    <header style={estilos.cabecalho}>
      <Container>
        <div style={estilos.linha}>
          <Link href="/" style={estilos.marca}>
            Caminho Remoto
          </Link>
          <nav aria-label="Principal" style={estilos.nav}>
            {links.map((link) => (
              <Link key={link.href} href={link.href} style={estilos.link}>
                {link.rotulo}
              </Link>
            ))}
          </nav>
          <BotaoLink href="/cadastro">Criar conta</BotaoLink>
        </div>
      </Container>
    </header>
  )
}

/* ===================== ESTILOS ===================== */
const estilos: Record<string, CSSProperties> = {
  cabecalho: { backgroundColor: cores.superficie, borderBottom: `1px solid ${cores.borda}` },
  linha: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: espaco.md,
    padding: `${espaco.md}px 0`,
  },
  marca: {
    fontSize: fonte.tamanho.lg,
    fontWeight: fonte.peso.negrito,
    color: cores.primaria,
    textDecoration: 'none',
  },
  nav: { display: 'flex', flexWrap: 'wrap', gap: espaco.md },
  link: {
    fontSize: fonte.tamanho.sm,
    fontWeight: fonte.peso.medio,
    color: cores.textoSuave,
    textDecoration: 'none',
  },
}
