import type { CSSProperties } from 'react'
import { BannerInicial } from '@/components/BannerInicial'
import { CartaoCurso } from '@/components/CartaoCurso'
import { CartaoVaga } from '@/components/CartaoVaga'
import { ChamadaCadastro } from '@/components/ChamadaCadastro'
import { ComoFunciona } from '@/components/ComoFunciona'
import { AreaDaPagina } from '@/components/ui/AreaDaPagina'
import { buscarCursos } from '@/lib/servicoCursos'
import { buscarVagas } from '@/lib/servicoVagas'
import { LARGURA_MINIMA_DA_COLUNA, cores, criarGrade, espaco, fonte } from '@/lib/tema'

export default async function PaginaInicial() {
  const [vagas, cursos] = await Promise.all([buscarVagas(), buscarCursos()])

  return (
    <main>
      <BannerInicial />
      <AreaDaPagina>
        <div style={estilos.destaques}>
          <section id="vagas" style={estilos.coluna}>
            <h2 style={estilos.titulo}>Vagas em destaque</h2>
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
