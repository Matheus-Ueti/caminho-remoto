import type { CSSProperties } from 'react'
import { AvisoSemVagas } from '@/components/AvisoSemVagas'
import { BannerInicial } from '@/components/BannerInicial'
import { CartaoCurso } from '@/components/CartaoCurso'
import { CartaoVaga } from '@/components/CartaoVaga'
import { ChamadaCadastro } from '@/components/ChamadaCadastro'
import { ComoFunciona } from '@/components/ComoFunciona'
import { DicasEmVideo } from '@/components/DicasEmVideo'
import { AreaDaPagina } from '@/components/ui/AreaDaPagina'
import { buscarCursos } from '@/lib/servicoCursos'
import { buscarVagas } from '@/lib/servicoVagas'
import { buscarVideos } from '@/lib/servicoVideos'
import { LARGURA_MINIMA_DA_COLUNA, cores, criarGrade, espaco, fonte } from '@/lib/tema'

const MAXIMO_VAGAS_NA_HOME = 6

export default async function PaginaInicial() {
  const [todasAsVagas, cursos, videos] = await Promise.all([
    buscarVagas(),
    buscarCursos(),
    buscarVideos(),
  ])
  const vagas = todasAsVagas.slice(0, MAXIMO_VAGAS_NA_HOME)

  return (
    <main>
      <BannerInicial />
      <AreaDaPagina>
        <div style={estilos.destaques}>
          <section id="vagas" style={estilos.coluna}>
            <h2 style={estilos.titulo}>Vagas em destaque</h2>
            {vagas.length === 0 && <AvisoSemVagas />}
            {vagas.map((vaga) => (
              <CartaoVaga key={vaga.id} vaga={vaga} />
            ))}
          </section>

          <section id="cursos" style={estilos.coluna}>
            <h2 style={estilos.titulo}>Cursos recomendados</h2>
            {cursos.map((curso) => (
              <CartaoCurso key={curso.slug} curso={curso} />
            ))}
          </section>
        </div>

        <DicasEmVideo videos={videos} />
        <ComoFunciona />
        <ChamadaCadastro />
      </AreaDaPagina>
    </main>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  destaques: {
    ...criarGrade(LARGURA_MINIMA_DA_COLUNA),
    gap: espaco.xl,
    alignItems: 'start',
    marginTop: espaco.xl,
  },
  coluna: { display: 'flex', flexDirection: 'column', gap: espaco.md },
  titulo: {
    margin: 0,
    fontSize: fonte.tamanho.xl,
    fontWeight: fonte.peso.extra,
    letterSpacing: fonte.espacamentoDosTitulos,
    color: cores.texto,
  },
} satisfies Record<string, CSSProperties>
