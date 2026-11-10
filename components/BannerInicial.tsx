import type { CSSProperties } from 'react'
import { BarraDeBusca } from '@/components/BarraDeBusca'
import { FundoAnimado } from '@/components/FundoAnimado'
import { SelosDeConfianca } from '@/components/SelosDeConfianca'
import { AreaDaPagina } from '@/components/ui/AreaDaPagina'
import { Icone } from '@/components/ui/Icone'
import { LARGURA_MINIMA_DA_COLUNA, cores, criarGrade, espaco, fonte, raio } from '@/lib/tema'

export function BannerInicial() {
  return (
    <section style={estilos.banner}>
      <FundoAnimado />
      <AreaDaPagina>
        <div style={estilos.colunas}>
          <div style={estilos.texto}>
            <h1 style={estilos.titulo}>
              Seu próximo trabalho pode estar a um <span style={estilos.destaque}>clique</span> de
              distância.
            </h1>
            <p style={estilos.subtitulo}>
              Encontre vagas remotas em todo o Brasil e se qualifique com cursos práticos para se
              destacar.
            </p>
            <BarraDeBusca />
            <SelosDeConfianca />
          </div>

          {/* MOCK: espaço reservado para a foto do banner, que ainda não temos. */}
          <div style={estilos.espacoDaFoto} aria-hidden="true">
            <Icone nome="usuario" tamanho={96} cor={cores.primariaTexto} />
          </div>
        </div>
      </AreaDaPagina>
    </section>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  // position e overflow: o fundo animado fica preso dentro do banner, atrás do conteúdo.
  banner: { position: 'relative', overflow: 'hidden', padding: `${espaco.xxl}px 0` },
  colunas: {
    ...criarGrade(LARGURA_MINIMA_DA_COLUNA),
    position: 'relative',
    gap: espaco.xl,
    alignItems: 'center',
  },
  texto: { display: 'flex', flexDirection: 'column', gap: espaco.lg },
  titulo: {
    margin: 0,
    fontSize: fonte.tamanho.hero,
    lineHeight: 1.08,
    fontWeight: fonte.peso.extra,
    letterSpacing: fonte.espacamentoDosTitulos,
    color: cores.texto,
  },
  destaque: {
    color: cores.primaria,
    textDecorationLine: 'underline',
    textDecorationThickness: 4,
    textUnderlineOffset: 10,
  },
  subtitulo: { margin: 0, fontSize: fonte.tamanho.lg, lineHeight: 1.5, color: cores.textoSuave },
  espacoDaFoto: {
    minHeight: 360,
    borderRadius: raio.xl,
    // Branco translúcido, para o espaço da foto aparecer sobre o fundo azul.
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    border: '2px dashed rgba(255, 255, 255, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
} satisfies Record<string, CSSProperties>
