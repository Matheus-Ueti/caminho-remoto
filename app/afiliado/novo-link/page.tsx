import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import type { CSSProperties } from 'react'
import { gerarLinkPeloFormulario } from '@/app/afiliado/acoes'
import { BotaoCopiar } from '@/components/BotaoCopiar'
import { AreaDaPagina } from '@/components/ui/AreaDaPagina'
import { Botao } from '@/components/ui/Botao'
import { BotaoLink } from '@/components/ui/BotaoLink'
import { CampoDeEscolha } from '@/components/ui/CampoDeEscolha'
import { Cartao } from '@/components/ui/Cartao'
import { TituloPagina } from '@/components/ui/TituloPagina'
import { NOMES_DAS_ORIGENS } from '@/lib/configuracaoDoAfiliado'
import { buscarAfiliadoDoNavegador, montarLinkCurto } from '@/lib/servicoAfiliados'
import { buscarCursos } from '@/lib/servicoCursos'
import { espaco } from '@/lib/tema'

export const metadata: Metadata = { title: 'Gerar link' }

type PaginaNovoLinkProps = {
  searchParams: Promise<{ codigo?: string }>
}

export default async function PaginaNovoLink({ searchParams }: PaginaNovoLinkProps) {
  const afiliado = await buscarAfiliadoDoNavegador()
  if (!afiliado) redirect('/afiliado/cadastro')

  const { codigo } = await searchParams
  const cursos = await buscarCursos()
  const opcoesDeCurso = cursos.map((curso) => ({ valor: curso.slug, texto: curso.titulo }))
  const opcoesDeOrigem = Object.entries(NOMES_DAS_ORIGENS).map(([valor, texto]) => ({
    valor,
    texto,
  }))

  return (
    <main>
      <AreaDaPagina>
        <div style={estilos.pagina}>
          <TituloPagina
            titulo="Gerar link"
            descricao="Um link para cada curso e cada lugar onde você divulga."
          />

          {codigo && (
            <Cartao>
              <strong>Seu link está pronto</strong>
              <code>{montarLinkCurto(codigo)}</code>
              <div style={estilos.botoes}>
                <BotaoCopiar texto={montarLinkCurto(codigo)} />
                <BotaoLink href="/afiliado/painel" variante="contorno">
                  Voltar ao painel
                </BotaoLink>
              </div>
            </Cartao>
          )}

          <Cartao>
            <form action={gerarLinkPeloFormulario} style={estilos.formulario}>
              <CampoDeEscolha id="curso" rotulo="Curso" opcoes={opcoesDeCurso} />
              <CampoDeEscolha id="origem" rotulo="Onde você vai divulgar" opcoes={opcoesDeOrigem} />
              <Botao tamanho="grande">Gerar link</Botao>
            </form>
          </Cartao>
        </div>
      </AreaDaPagina>
    </main>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  pagina: {
    display: 'flex',
    flexDirection: 'column',
    gap: espaco.lg,
    marginTop: espaco.xl,
    maxWidth: 560,
  },
  formulario: { display: 'flex', flexDirection: 'column', gap: espaco.md },
  botoes: { display: 'flex', flexWrap: 'wrap', gap: espaco.sm },
} satisfies Record<string, CSSProperties>
