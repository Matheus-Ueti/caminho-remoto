import Link from 'next/link'
import type { CSSProperties } from 'react'
import { AreaDaPagina } from '@/components/ui/AreaDaPagina'
import { BotaoLink } from '@/components/ui/BotaoLink'
import { cores, espaco, fonte } from '@/lib/tema'

const linksDoMenu = [
  { endereco: '/', texto: 'Vagas' },
  { endereco: '/#cursos', texto: 'Cursos' },
  { endereco: '/aluno', texto: 'Meus cursos' },
  { endereco: '/perfil', texto: 'Meu perfil' },
  { endereco: '/afiliado', texto: 'Afiliado' },
]

export function Cabecalho() {
  return (
    <header style={estilos.cabecalho}>
      <AreaDaPagina>
        <div style={estilos.linha}>
          <Link href="/" style={estilos.marca}>
            Caminho Remoto
          </Link>
          <nav aria-label="Principal" style={estilos.menu}>
            {linksDoMenu.map((linkDoMenu) => (
              <Link key={linkDoMenu.endereco} href={linkDoMenu.endereco} style={estilos.linkDoMenu}>
                {linkDoMenu.texto}
              </Link>
            ))}
          </nav>
          <BotaoLink href="/cadastro">Criar conta</BotaoLink>
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
  marca: {
    fontSize: fonte.tamanho.lg,
    fontWeight: fonte.peso.negrito,
    color: cores.primaria,
    textDecoration: 'none',
  },
  menu: { display: 'flex', flexWrap: 'wrap', gap: espaco.md },
  linkDoMenu: {
    fontSize: fonte.tamanho.sm,
    fontWeight: fonte.peso.medio,
    color: cores.textoSuave,
    textDecoration: 'none',
  },
} satisfies Record<string, CSSProperties>
