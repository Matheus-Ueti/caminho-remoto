import type { CSSProperties } from 'react'
import { BannerInicial } from '@/components/BannerInicial'
import { CartaoCurso } from '@/components/CartaoCurso'
import { CartaoVaga } from '@/components/CartaoVaga'
import { ComoFunciona } from '@/components/ComoFunciona'
import { AreaDaPagina } from '@/components/ui/AreaDaPagina'
import { TituloSecao } from '@/components/ui/TituloSecao'
import { buscarCursos } from '@/lib/servicoCursos'
import { buscarVagas } from '@/lib/servicoVagas'
import { LARGURA_MINIMA_DO_CARTAO, criarGrade, espaco } from '@/lib/tema'

export default async function PaginaInicial() {
  const [vagas, cursos] = await Promise.all([buscarVagas(), buscarCursos()])

  return (
    <main>
      <BannerInicial />
      <AreaDaPagina>
        <ComoFunciona />

        <section id="vagas" style={estilos.secao}>
          <TituloSecao>Vagas home office</TituloSecao>
          <div style={estilos.grade}>
            {vagas.map((vaga) => (
              <CartaoVaga key={vaga.id} vaga={vaga} />
            ))}
          </div>
        </section>

        <section id="cursos" style={estilos.secao}>
          <TituloSecao>Cursos para chegar lá</TituloSecao>
          <div style={estilos.grade}>
            {cursos.map((curso) => (
              <CartaoCurso key={curso.slug} curso={curso} />
            ))}
          </div>
        </section>
      </AreaDaPagina>
    </main>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  secao: { display: 'flex', flexDirection: 'column', gap: espaco.md, marginTop: espaco.xl },
  grade: criarGrade(LARGURA_MINIMA_DO_CARTAO),
} satisfies Record<string, CSSProperties>
