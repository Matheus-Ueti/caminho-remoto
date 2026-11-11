import type { CSSProperties } from 'react'
import { BotaoLink } from '@/components/ui/BotaoLink'
import { Icone } from '@/components/ui/Icone'
import { cores, espaco, fonte, raio } from '@/lib/tema'

export function ChamadaCadastro() {
  return (
    <section style={estilos.faixa}>
      <div style={estilos.texto}>
        <h2 style={estilos.titulo}>Dê o próximo passo na sua carreira.</h2>
        <p style={estilos.subtitulo}>Crie seu perfil gratuitamente e comece agora!</p>
        <div style={estilos.botao}>
          <BotaoLink href="/cadastro" variante="branco" tamanho="grande">
            Cadastrar gratuitamente
            <Icone nome="seta" tamanho={18} />
          </BotaoLink>
        </div>
      </div>
      <svg viewBox="0 0 280 200" style={estilos.ilustracao} aria-hidden="true">
        {/* Notebook */}
        <rect x={40} y={20} width={200} height={130} rx={12} fill={cores.superficie} />
        <rect x={52} y={32} width={176} height={106} rx={6} fill={cores.primariaSuave} />
        <path d="M16 158 H264 L250 176 H30 Z" fill={cores.superficie} opacity={0.9} />
        {/* Perfil profissional: foto, nome e selo de verificado */}
        <circle cx={92} cy={70} r={16} fill={cores.primaria} />
        <circle cx={92} cy={65} r={6} fill={cores.superficie} />
        <path d="M80 82 Q92 70 104 82" fill={cores.superficie} />
        <rect x={120} y={60} width={72} height={8} rx={4} fill={cores.azulEscuro} />
        <rect x={120} y={76} width={48} height={6} rx={3} fill={cores.primaria} opacity={0.5} />
        <rect x={68} y={102} width={144} height={6} rx={3} fill={cores.primaria} opacity={0.3} />
        <rect x={68} y={116} width={100} height={6} rx={3} fill={cores.primaria} opacity={0.3} />
        <circle cx={206} cy={56} r={14} fill={cores.sucesso} />
        <path
          d="M199 56 L204 61 L213 51"
          fill="none"
          stroke={cores.superficie}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
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
    gap: espaco.xl,
    marginTop: espaco.xxl,
    padding: espaco.xl,
    borderRadius: raio.lg,
    backgroundColor: cores.azulEscuro,
    color: cores.primariaTexto,
  },
  texto: {
    flex: '1 1 280px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: espaco.sm,
    maxWidth: 440,
  },
  titulo: {
    margin: 0,
    fontSize: fonte.tamanho.xxl,
    lineHeight: 1.15,
    fontWeight: fonte.peso.extra,
    letterSpacing: fonte.espacamentoDosTitulos,
  },
  subtitulo: { margin: 0, fontSize: fonte.tamanho.lg, opacity: 0.9 },
  botao: { marginTop: espaco.md },
  ilustracao: { flex: '0 1 280px', width: '100%', maxWidth: 280, height: 'auto' },
} satisfies Record<string, CSSProperties>
