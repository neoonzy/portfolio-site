# Edição 012 — Revisão de UX e interface

## Objetivo

Implementar a auditoria anterior sem refazer a identidade visual do portfólio: preservar a tipografia forte, o desenho editorial, a grade funcional, o Typeee demonstrativo e a física das letras, mas melhorar descoberta dos projetos, navegação, legibilidade, desempenho e manutenção.

Todas as mudanças desta edição pertencem à branch `feat/ux-audit-complete-revision`. A `main` e a produção não foram alteradas. O `vercel.json` mantém `git.deploymentEnabled: false`.

## 1. Arquitetura da informação

### Ordem de leitura
Abertura → Projetos → Sobre → Trajetória → Typeee → Processo → Visual → Ferramentas → Contato.

Projetos foram antecipados para facilitar a avaliação profissional. `src/data/chapters.js` agora usa essa mesma ordem, incluindo o indicador mobile e o painel BUSCAR. Títulos e números editoriais foram ajustados entre os componentes.

### Hero: seleção de projetos
No desktop, o índice continua com seleção lateral e prévia flutuante. No mobile, tocar em um projeto abre um **resumo inline** abaixo do item com link para o estudo de caso, evitando depender de um painel distante. O botão informa `aria-expanded`; o resumo permanece no fluxo normal do documento. A seta ↗ antes decorativa foi substituída por +/−, representando expansão.

A linha final de queda das letras continua antes de Seleção de trabalhos, e os obstáculos continuam os textos Projetos/Processos e /Sobre. Em dispositivos sem ponteiro fino, o botão Reorganizar não é exibido porque não existe a mesma interação de arrasto.

## 2. Estudos de caso e contribuição profissional

Cada projeto possui rota própria `/projetos/<slug>`, com:
- descrição do problema;
- atuação específica;
- estrutura e decisões de interface/fabricação;
- entrega e próximos passos;
- link para o trabalho e código, quando disponível.

A origem dos textos é `src/data/projects.js` e `src/data/caseStudies.js`. Os textos são qualitativos; não inventam métricas, clientes, testes ou fotografias. O projeto Mapeia é identificado como protótipo conceitual e Monan informa que a documentação fotográfica ainda está sendo organizada. O destino externo de Monan agora é explicitamente **Currículo Lattes**, não “Abrir projeto”.

O `CaseStudyPage` é renderizado pela SPA e aceita abertura, retorno, histórico do navegador e mudança de idioma. Uma regra de rewrite em `vercel.json` permite acesso direto às URLs no ambiente Vercel, sem ativar deploy automático. O build Vite não adiciona novas bibliotecas de roteamento.

## 3. Busca realmente útil

`/ BUSCAR` agora pesquisa:
- as nove seções editoriais;
- nomes, categorias, descrições e tags dos projetos;
- termos como React, Zumbido, Monan e prototipagem.

O filtro é insensível a acentos e caixa. A navegação por teclado continua com /, ↑, ↓, Enter e Escape. Selecionar uma entrada atualiza a URL com âncora e direciona o foco para a região de destino, em vez de apenas rolar a página sem contexto.

A lógica pura fica em `src/lib/searchPortfolio.js` e tem testes automáticos.

## 4. Visual e Typeee

A galeria visual exibe quatro trabalhos do Behance e Mapeia inicialmente. Os quatro embeds restantes só entram no DOM ao selecionar **Ver mais trabalhos**, reduzindo carregamento de terceiros em visitas curtas. Não foram inventados thumbnails para projetos dos quais ainda não temos imagens estáticas.

A demonstração do Typeee tem botão de começar com foco real no campo de texto, aceita Enter e Espaço, e trata eventos de composição de caracteres do teclado virtual sem interpretar a composição incompleta como fim de palavra. Preserva os resultados e a contagem de tempo existentes.

## 5. Acessibilidade e legibilidade

- Resumos de projetos inline com estado de expansão acessível.
- Controle de busca com rótulos e tipos de resultados distintos.
- Foco restaurado no destino das âncoras e comportamento compatível com histórico.
- Alvos de toque aumentados nos controles de seleção, detalhes e links de projetos.
- Fontes auxiliares ampliadas seletivamente no mobile.
- Movimento reduzido respeitado; física permanece opcional e não interfere no scroll touch.
- Fontes externas solicitadas pelo HTML, com preconnect e `display=swap`, em vez de `@import` no CSS.
- As variáveis principais de paleta e tipografia passaram a ter definição única em `src/styles/global.css`.

## 6. Testes

```bash
npm ci
npm test
npm run build
```

`tests/portfolioUx.test.mjs` verifica integridade dos estudos de caso e rotas, ordem das seções, busca, disclosures, carregamento progressivo da galeria e preservação do bloqueio de deploy. Os testes de física existentes continuam sendo executados.

Um workflow adicional `.github/workflows/visual-qa.yml` monta um servidor Vite temporário **dentro do GitHub Actions** e executa `scripts/visual-qa.mjs` com Playwright, sem usar Vercel. Verifica:
- larguras 320, 360, 390, 430, 680, 681, 768, 900, 1120 e 1440;
- ausência de overflow horizontal;
- igualdade de tamanho e alinhamento de LUIS/EDUARDO no mobile;
- seleção de projeto, acesso ao estudo de caso e retorno;
- busca por tecnologia e projeto, expansão da galeria e foco no Typeee;
- capturas de tela como artefato para revisão.

### Revisão humana pendente

- [ ] Conferir os screenshots em Safari iPhone, Chrome Android e desktop, incluindo zoom a 200%.
- [ ] Testar o painel BUSCAR e a ordem de foco com VoiceOver/TalkBack.
- [ ] Revisar textos e dados pessoais que serão publicados nos estudos de caso.
- [ ] Substituir os embeds do Behance por thumbnails autênticas quando as imagens estiverem disponíveis.
- [ ] Adicionar imagens originais dos processos de Monan e Mapeia, e métricas reais apenas quando verificadas.
- [ ] Medir LCP, INP e CLS após uma publicação de prévia autorizada; não há medição de produção nesta revisão.
- [ ] Validar visualmente os breakpoints e os estados de expansão em dispositivos reais.

## Arquivos principais

- `src/App.jsx`, `src/components/ResponsiveHero.jsx`, `src/components/QuickNavigator.jsx`
- `src/components/CaseStudyPage.jsx`, `src/data/caseStudies.js`, `src/lib/searchPortfolio.js`
- `src/components/VisualGallery.jsx`, `src/components/StudioPanel.jsx`
- `src/styles/case-studies.css`, `src/styles/ux-audit.css`
- `src/styles/global.css`, `src/styles/editorial-layout.css`, `index.html`
- `vercel.json`, `tests/portfolioUx.test.mjs`, `scripts/visual-qa.mjs`

## Notas de manutenção

Esta revisão consolida a paleta e acrescenta estilos claramente delimitados, mas **não elimina todas as folhas CSS legadas**. Uma limpeza ampla e cega de componentes antigos poderia provocar regressões visuais. Recomendação: consolidar regras legadas por componente somente com screenshots comparativos e aprovação visual.

**Não efetuar merge ou deploy automaticamente.**
