import type { CSSProperties } from 'react'
import { BotaoLink } from '@/components/ui/BotaoLink'
import { Icone } from '@/components/ui/Icone'
import { cores, espaco, fonte, raio } from '@/lib/tema'

/** Aparece no lugar da lista quando ainda não há vagas, para a seção não ficar vazia. */
export function AvisoSemVagas() {
  return (
    <div style={estilos.aviso}>
      <div style={estilos.icone}>
        <Icone nome="maleta" tamanho={32} cor={cores.primaria} />
      </div>
      <strong style={estilos.titulo}>As vagas estão sendo atualizadas</strong>
      <p style={estilos.texto}>
        Enquanto isso, veja os cursos que preparam você para trabalhar de casa.
      </p>
      <BotaoLink href="/#cursos" variante="secundario">
        Ver cursos
      </BotaoLink>
    </div>
  )
}

/* ===================== ESTILOS ===================== */
const estilos = {
  aviso: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: espaco.sm,
    padding: `${espaco.xl}px ${espaco.lg}px`,
    textAlign: 'center',
    border: `2px dashed ${cores.borda}`,
    borderRadius: raio.lg,
    backgroundColor: cores.fundoSuave,
  },
  icone: {
    width: 64,
    height: 64,
    borderRadius: raio.pilula,
    backgroundColor: cores.primariaSuave,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: { fontSize: fonte.tamanho.lg, color: cores.texto },
  texto: { margin: 0, maxWidth: 320, fontSize: fonte.tamanho.sm, color: cores.textoSuave },
} satisfies Record<string, CSSProperties>
