import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { TituloPagina, TituloSecao } from '@/components/ui/titulos'
import { buscarResumoAfiliado } from '@/lib/aluno-service'
import { cores, espaco, fonte, grade } from '@/lib/theme'

export const metadata: Metadata = { title: 'Afiliado' }

export default async function PaginaAfiliado() {
  const resumo = await buscarResumoAfiliado()
  const conversao = ((resumo.vendas / resumo.cliques) * 100).toFixed(1).replace('.', ',')

  const numeros = [
    { rotulo: 'Cliques no seu link', valor: String(resumo.cliques) },
    { rotulo: 'Vendas', valor: String(resumo.vendas) },
    { rotulo: 'Conversão', valor: `${conversao}%` },
  ]

  return (
    <main>
      <Container>
        <div style={estilos.pagina}>
          <TituloPagina
            titulo="Programa de afiliados"
            descricao="Divulgue os cursos e acompanhe o resultado do seu link."
          />

          <Card>
            <strong>Seu link de divulgação</strong>
            <code style={estilos.link}>{resumo.link}</code>
          </Card>

          <TituloSecao>Resultados</TituloSecao>
          <div style={grade(200)}>
            {numeros.map((numero) => (
              <Card key={numero.rotulo}>
                <span style={estilos.suave}>{numero.rotulo}</span>
                <span style={estilos.valor}>{numero.valor}</span>
              </Card>
            ))}
          </div>

          <Card>
            <strong>Comissão</strong>
            <span style={estilos.suave}>
              Os percentuais de comissão ainda serão definidos. Esta tela é só uma demonstração.
            </span>
          </Card>
        </div>
      </Container>
    </main>
  )
}

/* ===================== ESTILOS ===================== */
const estilos: Record<string, CSSProperties> = {
  pagina: { display: 'flex', flexDirection: 'column', gap: espaco.lg, marginTop: espaco.xl },
  link: {
    padding: `${espaco.sm}px ${espaco.md}px`,
    backgroundColor: cores.neutroSuave,
    borderRadius: 6,
    fontSize: fonte.tamanho.sm,
    overflowWrap: 'anywhere',
  },
  suave: { fontSize: fonte.tamanho.sm, color: cores.textoSuave },
  valor: { fontSize: fonte.tamanho.xxl, fontWeight: fonte.peso.negrito },
}
