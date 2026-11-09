import type { CSSProperties } from 'react'
import { CursoCard } from '@/components/curso-card'
import { VagaCard } from '@/components/vaga-card'
import { BotaoLink } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { TituloSecao } from '@/components/ui/titulos'
import { listarCursos } from '@/lib/cursos-service'
import { cores, espaco, fonte, grade } from '@/lib/theme'
import { listarVagas } from '@/lib/vagas-service'

const passos = [
  {
    numero: '1',
    titulo: 'Escolha uma vaga',
    texto: 'Veja vagas 100% remotas e o que cada uma exige.',
  },
  {
    numero: '2',
    titulo: 'Descubra o que falta',
    texto: 'Mostramos as competências que você ainda precisa comprovar.',
  },
  {
    numero: '3',
    titulo: 'Faça o curso certo',
    texto: 'Indicamos o curso que prepara para aquela vaga.',
  },
  {
    numero: '4',
    titulo: 'Candidate-se',
    texto: 'Com certificado verificado, a empresa vê que você está pronto.',
  },
]

export default async function PaginaInicial() {
  const [vagas, cursos] = await Promise.all([listarVagas(), listarCursos()])

  return (
    <main>
      <section style={estilos.hero}>
        <Container>
          <div style={estilos.heroConteudo}>
            <h1 style={estilos.heroTitulo}>Seu próximo emprego pode ser em casa.</h1>
            <p style={estilos.heroTexto}>
              Encontre vagas home office e faça o curso que prepara você para conquistá-las.
            </p>
            <div style={estilos.heroAcoes}>
              <BotaoLink href="#vagas" tamanho="grande">
                Ver vagas
              </BotaoLink>
              <BotaoLink href="#cursos" tamanho="grande" variante="contorno">
                Ver cursos
              </BotaoLink>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <section aria-labelledby="como-funciona" style={estilos.secao}>
          <h2 id="como-funciona" style={estilos.titulo}>
            Como funciona
          </h2>
          <ol style={estilos.passos}>
            {passos.map((passo) => (
              <li key={passo.numero} style={estilos.passoItem}>
                <Card>
                  <span style={estilos.numero} aria-hidden="true">
                    {passo.numero}
                  </span>
                  <strong>{passo.titulo}</strong>
                  <span style={estilos.passoTexto}>{passo.texto}</span>
                </Card>
              </li>
            ))}
          </ol>
        </section>

        <section id="vagas" aria-labelledby="titulo-vagas" style={estilos.secao}>
          <h2 id="titulo-vagas" style={estilos.titulo}>
            Vagas home office
          </h2>
          <div style={grade(280)}>
            {vagas.map((vaga) => (
              <VagaCard key={vaga.id} vaga={vaga} />
            ))}
          </div>
        </section>

        <section id="cursos" aria-labelledby="titulo-cursos" style={estilos.secao}>
          <TituloSecao>Cursos para chegar lá</TituloSecao>
          <div style={grade(280)}>
            {cursos.map((curso) => (
              <CursoCard key={curso.slug} curso={curso} />
            ))}
          </div>
        </section>
      </Container>
    </main>
  )
}

/* ===================== ESTILOS ===================== */
const estilos: Record<string, CSSProperties> = {
  hero: { backgroundColor: cores.primariaSuave, padding: `${espaco.xxl}px 0` },
  heroConteudo: { display: 'flex', flexDirection: 'column', gap: espaco.md, maxWidth: 640 },
  heroTitulo: {
    margin: 0,
    fontSize: fonte.tamanho.hero,
    lineHeight: 1.1,
    fontWeight: fonte.peso.negrito,
  },
  heroTexto: { margin: 0, fontSize: fonte.tamanho.lg, color: cores.textoSuave },
  heroAcoes: { display: 'flex', flexWrap: 'wrap', gap: espaco.sm, marginTop: espaco.sm },
  secao: { display: 'flex', flexDirection: 'column', gap: espaco.md, marginTop: espaco.xl },
  titulo: { margin: 0, fontSize: fonte.tamanho.xl, fontWeight: fonte.peso.forte },
  passos: { ...grade(220), listStyle: 'none', padding: 0, margin: 0 },
  passoItem: { display: 'flex' },
  numero: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: cores.primaria,
    color: cores.primariaTexto,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: fonte.peso.negrito,
  },
  passoTexto: { fontSize: fonte.tamanho.sm, color: cores.textoSuave },
}
