import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Logo } from '@/components/Logo'
import { AreaDaPagina } from '@/components/ui/AreaDaPagina'
import { Icone } from '@/components/ui/Icone'
import type { NomeDoIcone } from '@/components/ui/Icone'
import { cores, espaco, fonte } from '@/lib/tema'

const linksQueExistem = [
  { endereco: '/vagas', texto: 'Vagas' },
  { endereco: '/#cursos', texto: 'Cursos' },
]

// MOCK: estas páginas ainda não existem, então aparecem só como texto.
const paginasFuturas = ['Sobre', 'Perguntas Frequentes', 'Contato']

// MOCK: ainda não há perfis nas redes sociais, então os ícones não são links.
const redesSociais: NomeDoIcone[] = ['youtube', 'instagram', 'linkedin', 'discord']

const ANO_ATUAL = new Date().getFullYear()

export function Rodape() {
  return (
    <footer style={estilos.rodape}>
      <AreaDaPagina>
        <div style={estilos.linhaDeCima}>
          <Logo />
          <nav aria-label="Rodapé" style={estilos.links}>
            {linksQueExistem.map((linkDoRodape) => (
              <Link key={linkDoRodape.texto} href={linkDoRodape.endereco} style={estilos.link}>
                {linkDoRodape.texto}
              </Link>
            ))}
            {paginasFuturas.map((pagina) => (
              <span key={pagina} style={estilos.link}>
                {pagina}
              </span>
            ))}
          </nav>
          <div style={estilos.redes}>
            {redesSociais.map((rede) => (
              <Icone key={rede} nome={rede} tamanho={22} cor={cores.texto} />
            ))}
          </div>
        </div>
        <div style={estilos.linhaDeBaixo}>
          <span>© {ANO_ATUAL} Caminho Remoto. Todos os direitos reservados.</span>
          <span style={estilos.frase}>Conectando talentos ao trabalho remoto.</span>
        </div>
      </AreaDaPagina>
    </footer>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  rodape: { borderTop: `1px solid ${cores.borda}`, marginTop: espaco.xxl },
  linhaDeCima: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: espaco.lg,
    padding: `${espaco.lg}px 0`,
  },
  links: { display: 'flex', flexWrap: 'wrap', gap: espaco.lg },
  link: { fontSize: fonte.tamanho.sm, color: cores.texto, textDecoration: 'none' },
  redes: { display: 'flex', gap: espaco.md },
  linhaDeBaixo: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: espaco.sm,
    padding: `${espaco.md}px 0 ${espaco.lg}px`,
    borderTop: `1px solid ${cores.borda}`,
    fontSize: fonte.tamanho.xs,
    color: cores.textoSuave,
  },
  frase: { fontStyle: 'italic' },
} satisfies Record<string, CSSProperties>
