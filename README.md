# Caminho Remoto

Plataforma brasileira que une **vagas de emprego home office** e **cursos de qualificação** para essas vagas.

**Fase atual: só o front, tudo mockado** (dados falsos, sem login, pagamento, afiliados ou banco de dados).
O backend será feito depois, em outra pasta dentro deste mesmo projeto.

Contexto completo do produto: [CONTEXTO.md](./CONTEXTO.md).

## Stack

Next.js 16 (App Router), React 19 e TypeScript. A estrutura segue a do repositório `websitemundo365`.

## Estrutura

```
app/          Rotas e layout (App Router)
components/   Componentes de tela (um arquivo por componente, nome em kebab-case)
data/         Dados falsos (mocks)
hooks/        Hooks do React (criar a pasta quando houver o primeiro)
lib/          Funções de apoio e serviços que entregam dados às telas
types/        Tipos do TypeScript compartilhados
public/       Arquivos estáticos (ícones, imagens)
```

O alias `@/` aponta para a raiz. Exemplo: `import { listarVagas } from '@/lib/vagas-service'`.

## Como rodar

Requer Node 20 ou mais novo.

```bash
npm install        # instala tudo (uma vez)
npm run dev        # sobe o site em http://localhost:3000
```

| Comando             | O que faz                            |
| ------------------- | ------------------------------------ |
| `npm run build`     | gera a versão final                  |
| `npm run typecheck` | confere os tipos do TypeScript       |
| `npm run lint`      | procura problemas no código (ESLint) |
| `npm run format`    | formata o código (Prettier)          |

## Telas (todas com dados mockados)

| Rota               | Tela                                                        |
| ------------------ | ----------------------------------------------------------- |
| `/`                | Home: como funciona, vagas e cursos                         |
| `/vagas/[id]`      | Vaga: requisitos, o que falta comprovar e curso recomendado |
| `/cursos/[slug]`   | Página do curso, no estilo de página de venda               |
| `/checkout/[slug]` | Compra (demonstração, nada é cobrado)                       |
| `/cadastro`        | Criar conta                                                 |
| `/aluno`           | Meus cursos e progresso                                     |
| `/perfil`          | Perfil com certificados e competências verificadas          |
| `/afiliado`        | Link e resultados de afiliado (sem percentuais)             |

## Design

Os "tokens" de design (cores, espaços, bordas, fontes) ficam em `lib/theme.ts`. Os blocos básicos
(botão, cartão, selo, barra de progresso, campo) ficam em `components/ui/`, com variantes explícitas
(ex.: `variante="contorno"`). Como não há CSS, não existe hover nem modo escuro por enquanto.

## Regra de estilo

**Não existe CSS nem `className`, e não usamos Tailwind.** Todo estilo fica dentro do `.tsx`, em um objeto
chamado `estilos` no **final do arquivo**, e é usado com `style={estilos.nome}`. O ESLint bloqueia `className`.

## Como os dados mockados funcionam

Componentes e páginas **nunca** importam os mocks direto. Eles chamam uma função de `lib/`
(ex.: `listarVagas()` em `lib/vagas-service.ts`), que hoje devolve os dados de `data/`.

Quando o backend existir, só o corpo da função em `lib/` muda (trocando o mock por um `fetch`).
As telas continuam iguais.

## Como adicionar uma nova tela com dados

1. **Tipo:** crie o formato do dado em `types/`.
2. **Mock:** crie os dados falsos em `data/`.
3. **Serviço:** crie a função em `lib/` devolvendo o mock.
4. **Componente:** crie o componente em `components/`, chamando o serviço, com os estilos no final do arquivo.
5. **Rota:** crie a pasta e o `page.tsx` em `app/` (ex.: `app/vagas/page.tsx`) usando o componente.

## Skills e MCP

Em `.claude/skills/` há skills para o Claude Code (React, design, componentes), e o `.mcp.json` configura os
servidores MCP `shadcn-ui` e `21st`. O 21st precisa da variável de ambiente `TWENTY_FIRST_API_KEY`.
Nota: as skills de shadcn e 21st usam Tailwind/classes; precisam ser adaptadas à regra de estilo acima.
