# Edição 002 — Grotesca / preto e branco

## Direção visual

Referência fornecida pelo usuário: capa de um portfólio de design com grandes letras sans-serif, uma grade rígida, metadados em escala pequena, muito espaço vazio e arte gráfica de alto contraste. A referência foi usada como linguagem visual, sem replicar marca, texto ou o layout exato.

A revisão anterior usava Instrument Serif de maneira muito marcada. Nesta versão a fonte serifada foi **removida**. As tipografias principais são Space Grotesk e IBM Plex Mono; Archivo Black permanece restrita à demonstração do Typeee, cuja identidade é separada.

## Implementado

- Hero com linha de metadados finos, identificação **LUIS / EDUARDO**, nome completo e informações profissionais em escala menor.
- Composição inferior da capa com datas, apresentação curta, links e uma textura de linhas preta e branca estática (sem tela de abertura, movimento abstrato ou fotografia).
- Índice de projetos interativo com os projetos reais da base de dados; seleção por foco, mouse ou toque. Cada seleção revela descrição e link correspondente.
- Página quase monocromática: papel `#f8f8f7`, preto `#181818`, cinzas neutros e divisórias finas.
- Seções com mais espaço em branco, tipografia sem serifa, sequência aberta para experiência profissional, projetos em grade, caderno de processo, trabalhos visuais e ferramentas.
- Interlúdio tipográfico **Entre a tela e o mundo** sem itálico serifado.
- Demo Typeee inalterada visualmente e funcionalmente, com identidade do jogo preservada dentro de `.typeee-embed`.

## Restrições preservadas

- Não adicionar fotografia na homepage ou seção exclusiva de fotografia.
- Não reintroduzir motion study, preloader, animação de cortina ou parallax de ponteiro.
- Manter grade de projetos real, caderno de processo, PT/EN, navegação por teclado e `/`.
- Branch principal `main` não será alterada sem revisão.

## Arquivos

- `src/components/ResponsiveHero.jsx` — composição de capa e índice.
- `src/styles/editorial-layout.css` — sistema completo desta edição, carregado por último.
- `src/components/StudioPanel.jsx` — Typeee Classic; não alterado nesta edição.

## Verificação

```bash
npm ci
npm run build
npm run dev
```

### Revisão manual ainda necessária

- [ ] Layout em 320/360/390/768/1024/1440 px, principalmente quebra do título e barra superior.
- [ ] Foco nos itens do índice, links externos, navegação `/` e idioma PT/EN.
- [ ] Typeee no iPhone/Android, inclusive teclado virtual.
- [ ] Contraste, labels, leitura e ausência de overflow horizontal.
- [ ] Conferir em navegador real se a textura de linhas não produz moiré excessivo.
- [ ] `prefers-reduced-motion` sem efeitos forçados.

Versão de avaliação, não publicação em produção.
