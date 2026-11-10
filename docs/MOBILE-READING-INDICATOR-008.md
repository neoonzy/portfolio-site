# Edição 008 — Barra mínima de progresso por seção (mobile)

## Objetivo

Após testar a versão com número, nome e botão de índice, ficou claro que a faixa ocupava espaço excessivo na tela do celular. O indicador foi reduzido para **somente uma linha de 2 px**, logo abaixo do cabeçalho já existente. Nenhuma segunda toolbar, rótulo ou botão é exibido.

## Comportamento

- Aparece apenas até **680 px** de largura, fixo abaixo do header de 68 px.
- A linha cinza ocupa a largura da tela; o segmento preto indica a leitura **dentro da seção atual** e recomeça ao entrar na próxima.
- A seção é descoberta pela ordem real de leitura em `src/data/chapters.js`: Abertura, Sobre, Trajetória, Projetos, Typeee, Processos, Design, Ferramentas e Contato.
- A leitura é medida pelas posições dos elementos no DOM, usando `requestAnimationFrame` no scroll e `ResizeObserver` para mudanças de tamanho; não adiciona listeners por item.
- O elemento visual tem `role="progressbar"`, `aria-valuenow` e nome acessível indicando o capítulo, mesmo sem texto visível.
- A barra é **apenas indicativa** e não captura toques (`pointer-events: none`). O painel `/atalhos` continua acessível pelo botão do header e pelo atalho de teclado `/`.
- A margem das âncoras no mobile usa `scroll-padding-top:78px` em vez de 122px para evitar espaço excessivo após navegação.
- Respeita movimento reduzido, PT/EN e o layout editorial preto e branco.

## Arquivos

- `src/components/MobileSectionIndicator.jsx`: atualiza a largura da única barra visível.
- `src/styles/mobile-section-indicator.css`: faixa sticky de 2px, sem fundo extra nem controles.
- `src/App.jsx`: remove a ligação de abertura do índice pela faixa.
- `src/components/QuickNavigator.jsx`: mantido como painel de atalho independente, com nove capítulos.
- `src/data/chapters.js`: fonte compartilhada da ordem de leitura.

## Validação

```bash
npm ci
node --test tests/glyphPhysics.test.mjs
npm run build
```

### QA manual pendente

- [ ] Verificar 320, 360, 390, 430 e 680 px: barra de apenas 2 px, sem áreas extras no topo.
- [ ] Rolagem e mudança de seção: progresso atualiza e reinicia em capítulos novos.
- [ ] A linha não intercepta o menu, links ou scroll.
- [ ] Âncoras e `/atalhos` continuam funcionando.
- [ ] Acima de 680 px a barra não aparece.
- [ ] Testar `prefers-reduced-motion`, PT/EN e alterações de altura com imagens.

Esta é uma branch de revisão. `main` não foi alterada.
