# Edição 008 — Indicador editorial de seção no mobile

## Objetivo

Em smartphones, os blocos do portfólio se tornam colunas longas. Um leitor que percorre vários cartões pode perder a referência da seção em que se encontra. Esta edição insere uma **faixa de leitura minimalista**, com número de capítulo, nome da seção e uma linha de progresso, logo abaixo do header fixo.

## Interface

Exemplo:

```text
LUIS EDUARDO                    PT  ☰
04 / 09   PROJETOS         ÍNDICE ↗
━━━━━━━━━━━━───────────────
```

- Exibido somente em telas até **680 px**.
- Linha de progresso de **2 px**, representando o avanço **dentro da seção atual**, e não o percentual do site inteiro.
- Uso de Space Grotesk/IBM Plex Mono, quase branco, preto e divisórias finas como no restante da página.
- A faixa inteira é um botão acessível; tocar abre o diálogo **/atalhos** existente (sem criar um segundo menu).
- Respeita `prefers-reduced-motion`; nenhuma animação de abertura.
- Não interfere com os controles do header.

## Como é calculado

`MobileSectionIndicator.jsx` lê o posicionamento real das seções no DOM.

1. Mantém a ordem de leitura centralizada em `src/data/chapters.js`: Abertura, Sobre, Trajetória, Projetos, Typeee, Processos, Design, Ferramentas e Contato.
2. No scroll, utiliza `requestAnimationFrame` para limitar medidas. A seção atual é a última cujo topo passou a área de leitura abaixo das barras fixas.
3. Usa a altura e a posição da própria seção para calcular uma porcentagem de 0 a 100.
4. A porcentagem é arredondada para evitar renders desnecessários.
5. `ResizeObserver` acompanha mudanças de altura quando fontes, imagens e blocos carregam; resize e mudança de breakpoint também recalculam.
6. A passagem pelo interlúdio tipográfico é considerada continuação de Sobre até o próximo capítulo, Trajetória. Não cria uma seção falsa.

## Navegação consistente

O componente `QuickNavigator.jsx` agora recebe `ref` e expõe `open()` com `useImperativeHandle`, para que o indicador mobile abra o mesmo diálogo acionado pelo botão /ATALHOS do header.

A lista de destinos do diálogo passou a importar a mesma `chapters`, resolvendo discrepâncias pré-existentes (antes faltavam **Início** e **Ferramentas**, e a ordem não correspondia à página). O título do índice mostra 09 entradas automaticamente. O atalho `/`, a busca, ↑↓, Enter, Esc e as âncoras continuam funcionando.

No mobile, `scroll-padding-top: 122px` protege os títulos ao navegar por âncoras, evitando escondê-los atrás das duas barras.

## Arquivos

- `src/data/chapters.js`: fonte única de ordem, labels PT/EN e títulos compactos.
- `src/components/MobileSectionIndicator.jsx`: leitura da posição e componente acessível.
- `src/components/QuickNavigator.jsx`: abertura por ref e lista real de capítulos.
- `src/App.jsx`: integração sem duplicar navegação.
- `src/styles/mobile-section-indicator.css`: visual e responsividade.
- `src/main.jsx`: import dos estilos na posição final.

## Validação

```bash
npm ci
node --test tests/glyphPhysics.test.mjs
npm run build
```

### QA manual pendente

- [ ] iPhone/Android, 320, 360, 390 e 430 px: legibilidade, toque e rolagem.
- [ ] Troca precisa de seção no ponto de entrada e progresso de cada capítulo.
- [ ] Conteúdo maior que uma tela, carregamento de imagens e Typeee sem saltos da barra.
- [ ] Tocando em ÍNDICE, abrir /atalhos e navegar a todas as nove seções.
- [ ] O nome da seção muda corretamente ao alternar PT/EN.
- [ ] Ninguém recebe dois indicadores simultâneos; o menu do header não é coberto.
- [ ] Desktop e tablet acima de 680px não exibem a faixa e não mudam de layout.
- [ ] Testar links com `#`, botão voltar ao topo, teclado, reduzido movimento.

**Branch apenas para revisão, sem merge na `main`.**
