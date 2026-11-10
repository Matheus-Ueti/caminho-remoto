import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { BotaoCopiar } from '@/components/BotaoCopiar'
import { AreaDaPagina } from '@/components/ui/AreaDaPagina'
import { BotaoLink } from '@/components/ui/BotaoLink'
import { Cartao } from '@/components/ui/Cartao'
import { Selo } from '@/components/ui/Selo'
import { TituloPagina } from '@/components/ui/TituloPagina'
import { cores, espaco, fonte, raio } from '@/lib/tema'

export const metadata: Metadata = { title: 'Kit para Shorts' }

// Textos genéricos de EXEMPLO: sem números, sem promessa de emprego ou de ganho.
const MODELOS = [
  {
    nome: 'Título',
    texto: 'O que estudar para trabalhar de casa em [área]',
  },
  {
    nome: 'Título',
    texto: '3 coisas que vagas remotas de [área] costumam pedir',
  },
  {
    nome: 'Descrição',
    texto:
      'Neste vídeo eu mostro o que costuma aparecer nas vagas home office de [área] e um curso para estudar esses temas. Link: [seu link curto]',
  },
  {
    nome: 'Comentário fixado',
    texto: 'O curso que comentei no vídeo está aqui: [seu link curto]',
  },
  {
    nome: 'Hashtags',
    texto: '#homeoffice #trabalhoremoto #vagasremotas #qualificacao #shorts',
  },
]

export default function PaginaKitShorts() {
  return (
    <main>
      <AreaDaPagina>
        <div style={estilos.pagina}>
          <TituloPagina
            titulo="Kit para Shorts"
            descricao="Modelos de exemplo para adaptar ao seu vídeo. Troque o que está entre colchetes."
          />

          <Cartao>
            <strong>Dica sobre links</strong>
            <span style={estilos.textoSuave}>
              Links na descrição de Shorts nem sempre ficam clicáveis. Use o seu link curto (no
              formato /s/abc123) no comentário fixado, na bio do canal ou fale no vídeo.
            </span>
          </Cartao>

          {MODELOS.map((modelo) => (
            <Cartao key={modelo.texto}>
              <div style={estilos.cabecalho}>
                <strong>{modelo.nome}</strong>
                <Selo variante="aviso">Exemplo</Selo>
              </div>
              <p style={estilos.modelo}>{modelo.texto}</p>
              <div>
                <BotaoCopiar texto={modelo.texto} />
              </div>
            </Cartao>
          ))}

          <div>
            <BotaoLink href="/afiliado/painel" variante="contorno">
              Voltar ao painel
            </BotaoLink>
          </div>
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
    maxWidth: 720,
  },
  textoSuave: { fontSize: fonte.tamanho.sm, color: cores.textoSuave, lineHeight: 1.6 },
  cabecalho: { display: 'flex', alignItems: 'center', gap: espaco.sm },
  modelo: {
    margin: 0,
    padding: espaco.md,
    backgroundColor: cores.neutroSuave,
    borderRadius: raio.md,
    lineHeight: 1.6,
  },
} satisfies Record<string, CSSProperties>
