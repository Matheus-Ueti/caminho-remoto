import type { CSSProperties } from 'react'
import { BotaoLink } from '@/components/ui/BotaoLink'
import { Icone } from '@/components/ui/Icone'
import { cores, espaco, fonte, gradientes, raio } from '@/lib/tema'

export function ChamadaCadastro() {
  return (
    <section style={estilos.faixa}>
      <div style={estilos.texto}>
        <h2 style={estilos.titulo}>Dê o próximo passo na sua carreira.</h2>
        <p style={estilos.subtitulo}>Crie seu perfil gratuitamente e comece agora!</p>
      </div>
      <BotaoLink href="/cadastro" variante="branco" tamanho="grande">
        Cadastrar gratuitamente
        <Icone nome="seta" tamanho={18} />
      </BotaoLink>
      <div style={estilos.ilustracao} aria-hidden="true">
        <Icone nome="grafico" tamanho={88} cor={cores.primariaTexto} />
      </div>
    </section>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  faixa: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: espaco.lg,
    marginTop: espaco.xxl,
    padding: `${espaco.xl}px ${espaco.xl}px`,
    borderRadius: raio.xl,
    background: gradientes.escuro,
    color: cores.primariaTexto,
  },
  texto: { display: 'flex', flexDirection: 'column', gap: espaco.sm, maxWidth: 420 },
  titulo: {
    margin: 0,
    fontSize: fonte.tamanho.xxl,
    lineHeight: 1.15,
    fontWeight: fonte.peso.extra,
    letterSpacing: fonte.espacamentoDosTitulos,
  },
  subtitulo: { margin: 0, fontSize: fonte.tamanho.lg, opacity: 0.9 },
  ilustracao: { opacity: 0.9 },
} satisfies Record<string, CSSProperties>
