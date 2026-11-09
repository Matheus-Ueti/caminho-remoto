import type { CSSProperties } from 'react'
import { AreaDaPagina } from '@/components/ui/AreaDaPagina'
import { BotaoLink } from '@/components/ui/BotaoLink'
import { cores, espaco, fonte } from '@/lib/tema'

export function BannerInicial() {
  return (
    <section style={estilos.banner}>
      <AreaDaPagina>
        <div style={estilos.conteudo}>
          <h1 style={estilos.titulo}>Seu próximo emprego pode ser em casa.</h1>
          <p style={estilos.texto}>
            Encontre vagas home office e faça o curso que prepara você para conquistá-las.
          </p>
          <div style={estilos.botoes}>
            <BotaoLink href="#vagas" tamanho="grande">
              Ver vagas
            </BotaoLink>
            <BotaoLink href="#cursos" tamanho="grande" variante="contorno">
              Ver cursos
            </BotaoLink>
          </div>
        </div>
      </AreaDaPagina>
    </section>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  banner: { backgroundColor: cores.primariaSuave, padding: `${espaco.xxl}px 0` },
  conteudo: { display: 'flex', flexDirection: 'column', gap: espaco.md, maxWidth: 640 },
  titulo: {
    margin: 0,
    fontSize: fonte.tamanho.hero,
    lineHeight: 1.1,
    fontWeight: fonte.peso.negrito,
  },
  texto: { margin: 0, fontSize: fonte.tamanho.lg, color: cores.textoSuave },
  botoes: { display: 'flex', flexWrap: 'wrap', gap: espaco.sm, marginTop: espaco.sm },
} satisfies Record<string, CSSProperties>
