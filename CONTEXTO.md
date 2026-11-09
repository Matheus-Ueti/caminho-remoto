# Contexto do projeto: Caminho Remoto

## Visão geral

O Caminho Remoto é uma plataforma brasileira que une **vagas de emprego home office** e **cursos de qualificação** para essas vagas.
Está em fase inicial: não há escopo fechado, equipe nem banco de dados definitivo.

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
- [ ] Banco de dados definitivo (hoje a API usa o H2 em memória, só para desenvolvimento)
- [ ] Hospedagem
- [ ] Meio de pagamento
- [ ] Nome final do projeto e do repositório (`trampo-remoto` ou `caminho-remoto`)

## Estado atual do projeto técnico

O projeto tem **duas pastas**, lado a lado dentro de `ProjetoClaudio/`:

| Pasta               | O que é                                    | Repositório                                                    |
| ------------------- | ------------------------------------------ | -------------------------------------------------------------- |
| `CaminhoRemoto/`    | Front: Next.js 16, React 19 e TypeScript   | https://github.com/Matheus-Ueti/caminho-remoto (branch `main`) |
| `CaminhoRemotoAPI/` | Backend: Java 21 e Spring Boot 4.1 (Maven) | Só local por enquanto (ainda não está no GitHub)               |

**O que é de verdade e o que é mockado:**

- **Autenticação: de verdade.** Cadastro, login, sair e "quem está logado" funcionam ponta a ponta,
  do front até a API. Telas `/cadastro` e `/entrar`; o cabeçalho mostra "Olá, Nome · Sair" quando a
  pessoa está logada.
- **Todo o resto: mockado.** Vagas, cursos, área do aluno, perfil, certificados, checkout e afiliado
  ainda usam dados falsos de `data/`. A área do aluno ainda mostra a "Maria Exemplo" para qualquer pessoa.
- **Páginas ainda abertas:** `/aluno`, `/perfil` e `/afiliado` abrem mesmo sem login.

**Front (`CaminhoRemoto/`):**

- **Estrutura:** no padrão do repositório `websitemundo365`, com as pastas `app/`, `components/`,
  `data/`, `lib/`, `types/` e `public/`.
- **Dados:** componentes e páginas chamam funções em `lib/`. As de vagas, cursos e aluno devolvem
  mocks de `data/`. A de autenticação (`lib/servicoAutenticacao.ts`) chama a API.
- **Endereço da API:** variável `NEXT_PUBLIC_API_URL` no `.env.local` (modelo em `.env.example`).
- **Design:** homepage no estilo da imagem em `ProjetoClaudio/imagens/`, com azul de destaque. Cores,
  espaços e fontes ficam em `lib/tema.ts`; ícones são SVGs próprios em `components/ui/`.
- **Regra de estilo:** não existe CSS, Tailwind nem `className`. Todo estilo fica dentro do `.tsx`, em
  um objeto `estilos` no **final do arquivo**. O ESLint bloqueia `className`.
- **Comandos (na pasta do front):** `npm run dev`, `build`, `typecheck`, `lint` e `format`.
- **Skills e MCP do Claude Code:** skills de React e design em `.claude/skills/`; servidores MCP
  `shadcn-ui` e `21st` no `.mcp.json` (o 21st precisa da variável `TWENTY_FIRST_API_KEY`).

**Backend (`CaminhoRemotoAPI/`):**

- **Rotas:** `POST /auth/cadastro`, `POST /auth/login`, `POST /auth/sair` e `GET /auth/eu`.
- **Login:** senha guardada com BCrypt; JWT num cookie `httpOnly` (`SameSite=Lax`), válido por 8 horas.
- **Banco:** H2 em memória, provisório. **Os usuários somem quando a API reinicia.**
- **CORS:** só o front em `http://localhost:3000` pode chamar a API.
- **Comandos (na pasta da API):** `./mvnw spring-boot:run` (porta 8080) e `./mvnw test`.
- **Requisitos da máquina:** JDK 21 (Temurin, instalado em `C:\Program Files\Eclipse Adoptium`).
  O antivírus Avast inspeciona HTTPS, então o Maven precisa de
  `MAVEN_OPTS=-Djavax.net.ssl.trustStoreType=Windows-ROOT` para baixar as bibliotecas.

**Para rodar tudo:** em um terminal, `./mvnw spring-boot:run` na API; em outro, `npm run dev` no front.
Depois abra http://localhost:3000.

Mais detalhes nos READMEs de cada pasta.

## Próximos passos

1. Decidir as profissões do MVP, o nome final do projeto e o banco de dados definitivo.
2. Subir a API para um repositório no GitHub.
3. Proteger `/aluno`, `/perfil` e `/afiliado` para só abrirem com login, e mostrar os dados de quem está logado.
4. Trocar os outros mocks (vagas, cursos, matrículas) por rotas reais na API, uma de cada vez.
5. Decidir hospedagem e meio de pagamento.

## Como trabalhar neste projeto

- Responder e comentar em português do Brasil, em linguagem simples.
- Não implementar funcionalidades fora do que foi pedido; mostrar o plano antes de criar estruturas grandes.
- Não instalar bibliotecas além do necessário.
