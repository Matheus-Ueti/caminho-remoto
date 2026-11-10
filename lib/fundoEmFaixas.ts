// Desenha o fundo "Ribbon Field" (baseado no 21st.dev): faixas de cor inclinadas que ondulam.
// Sem a ondulação, o resultado é igual a um linear-gradient do CSS com as paradas abaixo.

const ANGULO_EM_RADIANOS = (38 * Math.PI) / 180

// Ondulação: (wave / 100) * 0.35, com wave = 14.
const INTENSIDADE_DA_ONDA = (14 / 100) * 0.35
const ONDAS_AO_LONGO_DA_FAIXA = 2.4

// Formato do banner no computador (largura ÷ altura). Abaixo disso, a tela é considerada estreita.
const PROPORCAO_MINIMA = 2.4

// Paradas de cor: a posição vai de 0 (início do degradê) a 1 (fim).
const PARADAS_DE_COR = [
  { posicao: 0.0432, cor: [255, 255, 255] }, // Branco
  { posicao: 0.3318, cor: [255, 255, 255] },
  { posicao: 0.3786, cor: [120, 184, 249] }, // Azul-céu
  { posicao: 0.5814, cor: [120, 184, 249] },
  { posicao: 0.5886, cor: [86, 103, 255] }, // Ultramarino
  { posicao: 0.7964, cor: [86, 103, 255] },
  { posicao: 0.8, cor: [77, 47, 249] }, // Íris
  { posicao: 1, cor: [77, 47, 249] },
]

// Calculamos as cores uma vez só, numa tabela, para cada quadro da animação ficar leve.
const TAMANHO_DA_TABELA = 1024
const TABELA_DE_CORES = montarTabelaDeCores()

function montarTabelaDeCores(): Uint8ClampedArray {
  const tabela = new Uint8ClampedArray(TAMANHO_DA_TABELA * 3)
  for (let indice = 0; indice < TAMANHO_DA_TABELA; indice++) {
    const cor = calcularCorNaPosicao(indice / (TAMANHO_DA_TABELA - 1))
    tabela.set(cor, indice * 3)
  }
  return tabela
}

// Igual ao CSS: entre duas paradas, a cor é misturada de forma proporcional.
function calcularCorNaPosicao(posicao: number): number[] {
  const primeira = PARADAS_DE_COR[0]
  const ultima = PARADAS_DE_COR[PARADAS_DE_COR.length - 1]
  if (posicao <= primeira.posicao) return primeira.cor
  if (posicao >= ultima.posicao) return ultima.cor

  const indiceDaProxima = PARADAS_DE_COR.findIndex((parada) => parada.posicao >= posicao)
  const anterior = PARADAS_DE_COR[indiceDaProxima - 1]
  const proxima = PARADAS_DE_COR[indiceDaProxima]
  const proporcao = (posicao - anterior.posicao) / (proxima.posicao - anterior.posicao)
  return anterior.cor.map((canal, numeroDoCanal) => {
    return canal + (proxima.cor[numeroDoCanal] - canal) * proporcao
  })
}

/**
 * Desenha um quadro do fundo no canvas.
 * `relogioDaOnda` move a ondulação: começa em 20,75 e cresce com o tempo.
 */
export function desenharFundoEmFaixas(
  contexto: CanvasRenderingContext2D,
  largura: number,
  altura: number,
  relogioDaOnda: number,
): void {
  const imagem = contexto.createImageData(largura, altura)

  // Em telas estreitas (celular), desenhamos como se a área fosse larga e mostramos só o lado
  // esquerdo, que é o claro. Assim o texto nunca fica em cima das faixas escuras.
  const larguraDeReferencia = Math.max(largura, altura * PROPORCAO_MINIMA)

  // Direção do degradê (como no CSS: 0° aponta para cima) e a direção cruzada, perpendicular a ela.
  const direcaoX = Math.sin(ANGULO_EM_RADIANOS)
  const direcaoY = -Math.cos(ANGULO_EM_RADIANOS)
  const comprimento = Math.abs(larguraDeReferencia * direcaoX) + Math.abs(altura * direcaoY)
  const comprimentoCruzado = Math.abs(larguraDeReferencia * direcaoY) + Math.abs(altura * direcaoX)

  for (let y = 0; y < altura; y++) {
    for (let x = 0; x < largura; x++) {
      const distanciaX = x + 0.5 - larguraDeReferencia / 2
      const distanciaY = y + 0.5 - altura / 2
      const posicao = 0.5 + (distanciaX * direcaoX + distanciaY * direcaoY) / comprimento
      const cruzado = 0.5 + (distanciaX * -direcaoY + distanciaY * direcaoX) / comprimentoCruzado
      const ondulacao =
        INTENSIDADE_DA_ONDA *
        Math.sin(cruzado * ONDAS_AO_LONGO_DA_FAIXA * 2 * Math.PI + relogioDaOnda)

      pintarPixel(imagem.data, (y * largura + x) * 4, posicao + ondulacao)
    }
  }
  contexto.putImageData(imagem, 0, 0)
}

function pintarPixel(pixels: Uint8ClampedArray, inicio: number, posicao: number): void {
  const posicaoLimitada = Math.min(1, Math.max(0, posicao))
  const indiceNaTabela = Math.round(posicaoLimitada * (TAMANHO_DA_TABELA - 1)) * 3
  pixels[inicio] = TABELA_DE_CORES[indiceNaTabela]
  pixels[inicio + 1] = TABELA_DE_CORES[indiceNaTabela + 1]
  pixels[inicio + 2] = TABELA_DE_CORES[indiceNaTabela + 2]
  pixels[inicio + 3] = 255
}
