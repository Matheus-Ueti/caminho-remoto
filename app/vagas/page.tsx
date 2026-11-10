import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { AvisoSemVagas } from '@/components/AvisoSemVagas'
import { BarraDeBusca } from '@/components/BarraDeBusca'
import { CartaoVaga } from '@/components/CartaoVaga'
import { AreaDaPagina } from '@/components/ui/AreaDaPagina'
import { BotaoLink } from '@/components/ui/BotaoLink'
import { TituloPagina } from '@/components/ui/TituloPagina'
import { buscarVagas } from '@/lib/servicoVagas'
import { LARGURA_MINIMA_DA_COLUNA, cores, criarGrade, espaco, fonte } from '@/lib/tema'

export const metadata: Metadata = { title: 'Vagas home office' }

const VAGAS_POR_PAGINA = 20

type PaginaVagasProps = {
  searchParams: Promise<{ busca?: string; pagina?: string }>
}

// Mantém a busca ao trocar de página.
function montarEnderecoDaPagina(pagina: number, busca?: string): string {
  const parametros = new URLSearchParams({ pagina: String(pagina) })
  if (busca) parametros.set('busca', busca)
  return `/vagas?${parametros}`
}

export default async function PaginaVagas({ searchParams }: PaginaVagasProps) {
  const { busca, pagina } = await searchParams
  const vagas = await buscarVagas(busca)

  const totalDePaginas = Math.max(1, Math.ceil(vagas.length / VAGAS_POR_PAGINA))
  const paginaAtual = Math.min(Math.max(1, Number(pagina) || 1), totalDePaginas)
  const inicio = (paginaAtual - 1) * VAGAS_POR_PAGINA
  const vagasDaPagina = vagas.slice(inicio, inicio + VAGAS_POR_PAGINA)

  const temBusca = Boolean(busca)
  const naoAchouNada = temBusca && vagas.length === 0
  const resumo = temBusca
    ? `${vagas.length} vagas encontradas para "${busca}"`
    : `${vagas.length} vagas remotas`

  return (
    <main>
      <AreaDaPagina>
        <div style={estilos.pagina}>
          <TituloPagina titulo="Vagas home office" descricao={resumo} />
          <BarraDeBusca valorInicial={busca} />

          {!temBusca && vagas.length === 0 && <AvisoSemVagas />}
          {naoAchouNada && (
            <p style={estilos.textoSuave}>
              Nenhuma vaga com esse texto no título. Tente outra palavra, como
              &quot;atendimento&quot; ou &quot;suporte&quot;.
            </p>
          )}

          <div style={estilos.grade}>
            {vagasDaPagina.map((vaga) => (
              <CartaoVaga key={vaga.id} vaga={vaga} />
            ))}
          </div>

          {totalDePaginas > 1 && (
            <nav aria-label="Páginas de vagas" style={estilos.paginacao}>
              {paginaAtual > 1 && (
                <BotaoLink
                  href={montarEnderecoDaPagina(paginaAtual - 1, busca)}
                  variante="contorno"
                >
                  Anterior
                </BotaoLink>
              )}
              <span style={estilos.textoSuave}>
                Página {paginaAtual} de {totalDePaginas}
              </span>
              {paginaAtual < totalDePaginas && (
                <BotaoLink
                  href={montarEnderecoDaPagina(paginaAtual + 1, busca)}
                  variante="contorno"
                >
                  Próxima
                </BotaoLink>
              )}
            </nav>
          )}
        </div>
      </AreaDaPagina>
    </main>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  pagina: { display: 'flex', flexDirection: 'column', gap: espaco.lg, marginTop: espaco.xl },
  grade: criarGrade(LARGURA_MINIMA_DA_COLUNA),
  textoSuave: { margin: 0, fontSize: fonte.tamanho.sm, color: cores.textoSuave },
  paginacao: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: espaco.md,
    marginTop: espaco.md,
  },
} satisfies Record<string, CSSProperties>
