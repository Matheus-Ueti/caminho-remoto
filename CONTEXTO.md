# Contexto do projeto: Caminho Remoto

## Visão geral

O Caminho Remoto é uma plataforma brasileira que une **vagas de emprego home office** e **cursos de qualificação** para essas vagas.
Ainda é só uma ideia: não há escopo fechado, equipe nem banco de dados escolhido.

A plataforma tem duas partes:

- **Vagas home office:** candidatos se candidatam e empresas publicam vagas.
- **Cursos de qualificação, no estilo Hotmart:** preparam a pessoa para essas vagas.

O que faz disso um ecossistema é o ciclo:

1. O candidato vê uma vaga remota e descobre o que falta para ela.
2. A plataforma indica o curso certo.
3. Ao concluir, ele recebe certificado e um perfil com a qualificação verificada.
4. Ele se candidata na própria plataforma, e a empresa vê quem já fez o treinamento exigido.

## O que já está definido

| Tema            | Decisão                                                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Público         | Pessoas que procuram emprego no Brasil (primeiro emprego ou recolocação) e querem trabalhar de casa                                 |
| Aquisição       | YouTube Shorts como principal canal de tráfego                                                                                      |
| Receita         | Afiliado, no modelo Hotmart: quem divulga o curso recebe comissão e a plataforma fica com uma taxa. Percentuais ainda não definidos |
| Foco geográfico | Apenas Brasil, evoluindo por etapas                                                                                                 |
| Nome provisório | Repositório `trampo-remoto` (o repositório atual no GitHub se chama `caminho-remoto`)                                               |

## MVP

O MVP testa uma pergunta: **quem vê uma vaga remota compra o curso ligado a ela e se candidata?**

**Entra:** poucas profissões, poucos cursos, vagas curadas por nós, cadastro, pagamento, área do aluno e links de afiliado simples.

**Fica de fora:** marketplace aberto, painel completo de empresas, aplicativo móvel e verificação avançada de competências.

## Decisões em aberto

Nenhuma destas foi decidida. Não decidir sozinho: perguntar ao dono do projeto quando chegar a hora.

- [ ] Como exatamente funciona o ganho por afiliado (percentuais incluídos)
- [ ] No início, os cursos são só da plataforma ou outros produtores também podem vender
- [ ] Quais 2 ou 3 profissões entram no MVP
- [ ] Banco de dados
- [ ] Hospedagem
- [ ] Meio de pagamento
- [ ] Nome final do projeto e do repositório (`trampo-remoto` ou `caminho-remoto`)

## Estado atual do projeto técnico

Hoje existe só o **front, com tudo mockado**: sem login, pagamento, afiliados ou banco de dados.
O backend será feito depois, em outra pasta do mesmo projeto.

- **Repositório:** https://github.com/Matheus-Ueti/caminho-remoto, branch `main`.
- **Estrutura:** projeto único na raiz, no mesmo padrão do repositório `websitemundo365`: Next.js 16 (App Router), React 19 e TypeScript, com as pastas `app/`, `components/`, `data/`, `lib/`, `types/` e `public/`.
- **Dados mockados:** componentes e páginas chamam funções em `lib/`, que hoje devolvem dados de `data/`.
  Quando houver backend, só essas funções mudam.
- **Regra de estilo:** não existe CSS nem `className`. Todo estilo fica dentro do `.tsx`, em um objeto
  `estilos` no **final do arquivo**. O ESLint bloqueia `className`.
- **Ferramentas:** ESLint, Prettier e TypeScript na raiz. Comandos (sempre na raiz): `npm run dev`,
  `build`, `typecheck`, `lint` e `format`. Sem Tailwind.
- **Skills e MCP do Claude Code:** skills de React e design em `.claude/skills/`; servidores MCP
  `shadcn-ui` e `21st` no `.mcp.json`. O 21st precisa da variável `TWENTY_FIRST_API_KEY`.
  As skills de shadcn e 21st usam Tailwind e classes, então precisam de adaptação à regra de estilo.

Mais detalhes de como rodar e de como adicionar telas estão no [README](./README.md).

## Próximos passos

1. Decidir as profissões do MVP e o nome final do projeto.
2. Revisar as telas já desenhadas (home, vaga, curso, checkout, cadastro, aluno, perfil e afiliado) e ajustar com o dono do projeto.
3. Depois do front: criar o backend em outra pasta, em camadas, trocando os mocks por chamadas reais.
4. Só então decidir banco de dados, hospedagem e meio de pagamento.

## Como trabalhar neste projeto

- Responder e comentar em português do Brasil, em linguagem simples.
- Não implementar funcionalidades fora do que foi pedido; mostrar o plano antes de criar estruturas grandes.
- Não instalar bibliotecas além do necessário.
