# Edição 007 — A grade deve corresponder ao projeto

## Feedback incorporado

Esta revisão corrige três problemas apontados na edição anterior:

1. O GRID ON/OFF desenhava uma grade de 12 colunas que não correspondia às larguras e aos posicionamentos reais das seções.
2. As letras do nome podiam cair até o final de toda a section hero, passando pela área "Seleção de trabalhos"; o limite correto é **imediatamente antes do índice**.
3. O painel **/ATALHOS** não usava a linguagem gráfica do site.

## Sistema real de layout

A grade agora é um contrato de CSS compartilhado entre componentes e sobreposição:

- Desktop: **12 colunas**; largura `min(calc(100% - 76px), 1460px)`; gutter `clamp(7px, 1.15vw, 16px)`.
- Tablet (até 900 px): **6 colunas**; largura `min(calc(100% - 50px), 1460px)`; gutter `clamp(8px, 1.4vw, 13px)`.
- Mobile (até 680 px): **4 colunas**; largura `min(calc(100% - 32px), 1460px)`; gutter `8px`.

O arquivo `src/styles/layout-grid-system.css` define `--site-columns` e `--site-gutter` utilizados **tanto pelo overlay quanto pelas grids do conteúdo**. As famílias de estrutura mapeadas explicitamente incluem:

- linha de metadados da capa e legenda do nome;
- textos "Projetos/Processos" e "/Sobre";
- índice de trabalhos e preview de projeto;
- cabeçalhos de todas as seções, sobre, formação, experiência;
- projetos em grade (6+6 colunas), Caderno de Processo (4+4+4), galeria (6+6), ferramentas (4+4+4);
- demo Typeee com divisão 5+7, e contato com divisão 6+6.

No tablet e mobile, os `grid-column` também são recalculados. O GRID visível é atualizado para apresentar 12/06/04 colunas conforme a viewport. Não é mais uma grade fictícia sobre layouts independentes. O overlay permanece sem captar cliques.

### Nota sobre alinhamento

Títulos tipográficos gigantes, linhas de texto, tamanhos de fontes e recuos internos seguem sua métrica ótica e não coincidem com todas as linhas-guia; o alinhamento prometido é o das **áreas de layout e suas bordas**, como num grid editorial, não o de cada glifo.

## Física das letras

No `KineticWordmark.jsx`, o chão da simulação agora é:

```js
const indexRect = workIndex.getBoundingClientRect()
floor = Math.max(80, indexRect.top - coverRect.top - 3)
```

Ou seja, a colisão das letras termina **antes do índice "SELEÇÃO DE TRABALHOS"**. Permanecem as colisões com os dois rótulos fixos (Projetos/Processos e /Sobre) e com outras letras, além do botão discreto **Reorganizar**. Não existe "Derrubar tudo".

## /ATALHOS — mesmo sistema gráfico

O painel foi reconstruído como um índice de páginas:

- grande título sem serifa, preto sobre papel quase branco;
- linhas finas, metadados IBM Plex Mono, numeração de seções;
- campo de busca integrado à composição (sem caixa genérica);
- lista de itens em formato tipográfico, com seleção marcada pelo fundo cinza neutro;
- navegação por **/**, **↑↓**, **Enter**, **ESC** e fechamento ao clicar fora;
- foco visível e layout compacto no celular;
- botão no header com as mesmas proporções dos controles GRID e PT/EN.

Nenhuma fonte serifada ou cor fora da identidade foi adicionada.

## Arquivos alterados

- `src/components/KineticWordmark.jsx`
- `src/components/LayoutGridOverlay.jsx`
- `src/components/QuickNavigator.jsx`
- `src/styles/layout-grid-system.css` (novo)
- `src/styles/editorial-shortcuts.css` (novo)
- `src/main.jsx` (novos imports finais)
- `.github/workflows/portfolio-check.yml`

## Revisão final

```bash
npm ci
node --test tests/glyphPhysics.test.mjs
npm run build
```

- [ ] Desktop 1440/1280: ligar GRID e conferir margens e divisões de capa, índice, projetos, processo, experiência.
- [ ] Tablet 768: verificar overlay de 6 colunas e fluxo de leitura.
- [ ] Mobile 390/360/320: overlay de 4 colunas, sem estouro da página.
- [ ] Soltar letras contra Projetos/Processos, /Sobre e chão **antes** de Seleção de Trabalhos.
- [ ] Abrir /ATALHOS por botão e tecla /, buscar e selecionar por ↑↓ + Enter, fechar por ESC.
- [ ] Foco por teclado, PT/EN, redução de movimento, Typeee e visualizações GRADE/ÍNDICE preservadas.

Alterações isoladas na branch experimental; não foi feito merge na `main`.
