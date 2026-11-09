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
- [ ] Banco de dados definitivo (hoje a API não guarda nada; as contas ficam no Keycloak)
- [ ] Servidor de login: manter o Keycloak ou trocar pelo Spring Authorization Server (só Spring, mas sem telas prontas)
- [ ] Servidor de e-mail (necessário para "esqueci a senha" e confirmação de e-mail no Keycloak)
- [ ] Hospedagem
- [ ] Meio de pagamento
- [ ] Nome final do projeto e do repositório (`trampo-remoto` ou `caminho-remoto`)

## Estado atual do projeto técnico

O projeto tem **três pastas**, lado a lado dentro de `ProjetoClaudio/`:

| Pasta               | O que é                                    | Repositório                                          | Porta |
| ------------------- | ------------------------------------------ | ---------------------------------------------------- | ----- |
| `CaminhoRemoto/`    | Front: Next.js 16, React 19 e TypeScript   | https://github.com/Matheus-Ueti/caminho-remoto       | 3000  |
| `CaminhoRemotoAPI/` | Backend: Java 21 e Spring Boot 4.1 (Maven) | https://github.com/Matheus-Ueti/caminho-remoto-api   | 8080  |
| `keycloak/`         | Keycloak 26.8.2: servidor de login pronto  | Nenhum (baixado do site oficial; não é código nosso) | 8180  |

O código do projeto é **só Spring Boot** no backend. O Keycloak é um programa pronto que usa Quarkus
por dentro, mas nós só o configuramos, sem escrever código nele.

**O que é de verdade e o que é mockado:**

- **Autenticação: de verdade, com Keycloak.** "Cadastrar" e "Entrar" levam para as telas do Keycloak
  (em português). Depois do login, a pessoa volta para `/aluno` e o cabeçalho mostra "Olá, Nome · Sair".
  "Sair" encerra o login na API e no Keycloak. As rotas `/cadastro` e `/entrar` do site só redirecionam
  para o Keycloak.
- **Todo o resto: mockado.** Vagas, cursos, área do aluno, perfil, certificados, checkout e afiliado
  ainda usam dados falsos de `data/`. A área do aluno ainda mostra a "Maria Exemplo" para qualquer pessoa.
- **Páginas ainda abertas:** `/aluno`, `/perfil` e `/afiliado` abrem mesmo sem login.

**Front (`CaminhoRemoto/`):**

- **Estrutura:** no padrão do repositório `websitemundo365`, com as pastas `app/`, `components/`,
  `data/`, `lib/`, `types/` e `public/`.
- **Dados:** componentes e páginas chamam funções em `lib/`. As de vagas, cursos e aluno devolvem
  mocks de `data/`. A de autenticação (`lib/servicoAutenticacao.ts`) tem os endereços de entrar,
  cadastrar e sair, e pergunta à API quem está logado.
- **Endereço da API:** variável `NEXT_PUBLIC_API_URL` no `.env.local` (modelo em `.env.example`).
- **Design:** homepage no estilo da imagem em `ProjetoClaudio/imagens/`, com azul de destaque. Cores,
  espaços e fontes ficam em `lib/tema.ts`; ícones são SVGs próprios em `components/ui/`.
- **Regra de estilo:** não existe CSS, Tailwind nem `className`. Todo estilo fica dentro do `.tsx`, em
  um objeto `estilos` no **final do arquivo**. O ESLint bloqueia `className`.
- **Comandos (na pasta do front):** `npm run dev`, `build`, `typecheck`, `lint` e `format`.
- **Skills e MCP do Claude Code:** skills de React e design em `.claude/skills/`; servidores MCP
  `shadcn-ui` e `21st` no `.mcp.json` (o 21st precisa da variável `TWENTY_FIRST_API_KEY`).

**Backend (`CaminhoRemotoAPI/`):**

- **Como funciona o login:** a API faz a ponte com o Keycloak (OAuth2 Client do Spring Security).
  Ela manda a pessoa para a tela do Keycloak, recebe a resposta e guarda quem está logado numa sessão
  (cookie `JSESSIONID`, `SameSite=Lax`). Os tokens do Keycloak nunca chegam ao navegador.
- **Rotas:** `GET /oauth2/authorization/keycloak` (entrar; `?cadastro=true` para criar conta),
  `GET /auth/eu` (quem está logado) e `GET /auth/sair`.
- **Banco:** a API não guarda nada por enquanto. As contas ficam no Keycloak e **não somem** ao reiniciar.
- **CORS:** só o front em `http://localhost:3000` pode chamar a API.
- **Comandos (na pasta da API):** `./mvnw spring-boot:run` e `./mvnw test`. Os testes não precisam
  do Keycloak rodando.

**Keycloak (`keycloak/`):**

- **Console:** http://localhost:8180, usuário **`admin`**, senha **`admin`** (somente desenvolvimento).
- **Configuração:** fica no repositório da API, em `keycloak/realm-caminho-remoto.json` (realm
  `caminho-remoto`: cadastro aberto, e-mail como usuário, telas em português, PKCE obrigatório).
- **Para subir:** `CaminhoRemotoAPI\keycloak\iniciar-keycloak.cmd`.
- **Limitação:** "esqueci a senha" está desligado porque não há servidor de e-mail. A tela de login
  tem o visual padrão do Keycloak (dá para personalizar depois).

**Requisitos da máquina:** JDK 21 (Temurin, instalado em `C:\Program Files\Eclipse Adoptium`).
O antivírus Avast inspeciona HTTPS, então o Maven precisa de
`MAVEN_OPTS=-Djavax.net.ssl.trustStoreType=Windows-ROOT` para baixar as bibliotecas.

**Para rodar tudo**, cada um num terminal e nesta ordem:

1. `CaminhoRemotoAPI\keycloak\iniciar-keycloak.cmd` (Keycloak, porta 8180)
2. `./mvnw spring-boot:run` na pasta da API (porta 8080)
3. `npm run dev` na pasta do front (porta 3000)

Depois abra http://localhost:3000. A API não tem páginas: abrir a porta 8080 direto mostra 401, e isso é normal.

Mais detalhes nos READMEs de cada pasta.

## Próximos passos

1. Decidir as profissões do MVP, o nome final do projeto, o banco de dados definitivo e se o Keycloak fica.
2. Proteger `/aluno`, `/perfil` e `/afiliado` para só abrirem com login, e mostrar os dados de quem está logado.
3. Deixar a tela de login do Keycloak com o visual do site.
4. Trocar os outros mocks (vagas, cursos, matrículas) por rotas reais na API, uma de cada vez.
5. Decidir hospedagem, meio de pagamento e servidor de e-mail.

## Como trabalhar neste projeto

- Responder e comentar em português do Brasil, em linguagem simples.
- Não implementar funcionalidades fora do que foi pedido; mostrar o plano antes de criar estruturas grandes.
- Não instalar bibliotecas além do necessário.
