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


## Edição 009 — simplificação do cabeçalho mobile

A navegação anterior repetia três elementos sem função distinta: nome no header (também no hero), botão `/atalhos` e hambúrguer. A partir desta revisão, telas até **680 px** usam um cabeçalho de **56 px**:

```text
/ ÍNDICE                         ▦   PT ↔
──────────────────────────────────────
━━━━━━━━━━────────────────────────────
```

- O nome "LUIS EDUARDO" deixa de aparecer **somente no header mobile**, continuando visível na tipografia principal do hero. Desktop e tablet permanecem inalterados.
- O **/ ÍNDICE** abre o mesmo painel editorial de navegação rápida com todas as nove seções, busca e suporte ao teclado.
- O hambúrguer fica oculto **somente até 680px**, evitando dois menus para a mesma finalidade. Na faixa tablet intermediária, os controles anteriores permanecem.
- **GRID** e **PT/EN** seguem acessíveis no mobile.
- A barra de progresso continua com **2 px** e acompanha o novo header sticky: `top:56px`; âncoras compensadas com `scroll-padding-top:66px`.
- Nenhum novo menu foi criado. A homepage mantém o hero editorial e os links navegáveis.
- Implementação em `src/styles/mobile-nav-minimal.css`; novo rótulo mobile em `QuickNavigator.jsx`.

### QA adicional
- [ ] Em 320/360/390/430/680px: / ÍNDICE, GRID e PT/EN cabem, sem overflow.
- [ ] Em 681/900/1280px: navegação existente preservada, nome visível.
- [ ] / ÍNDICE abre e fecha o diálogo, links funcionam, Escape fecha.
- [ ] Âncoras não ficam sob o header e progresso de 2px continua correto.

## Edição 010 — mesma lógica de navegação nas outras telas

A navegação foi revisada em **desktop, tablet e celular**, sem duplicar entradas para o mesmo conteúdo.

### Desktop — acima de 1120 px
- O nome permanece no cabeçalho, junto aos links diretos de seção.
- A busca rápida `/` é diferenciada da navegação principal pelo rótulo **BUSCAR/SEARCH** e permanece como recurso complementar.
- GRID e PT/EN têm altura consistente com o controle de busca.

### Tablet — de 681 a 1120 px
- Os links horizontais deixam de ocupar uma largura incerta que poderia quebrar ou apertar a navegação.
- O nome ainda aparece, acompanhado de um único botão **/ ÍNDICE ↗**, GRID e PT/EN.
- O hambúrguer foi removido em vez de coexistir com o índice.
- Os controles têm áreas acionáveis de pelo menos 44 px de altura.

### Celular — até 680 px
- O nome fica somente no hero; o cabeçalho permanece com 56px.
- O `/ ÍNDICE ↗` agora tem **fundo quase preto, texto branco, borda explícita, seta e 44px de altura**. O aspecto de botão é intencional e consistente com o sistema gráfico do site.
- GRID e PT/EN usam a mesma altura acionável e bordas finas.
- Em telas estreitas até 365px, espaçamentos internos diminuem sem reduzir a área de toque.
- O progresso de 2px continua imediatamente abaixo do cabeçalho.

### Código removido
- `menuOpen` e o listener de Escape do menu hambúrguer foram retirados de `App.jsx`.
- A navegação horizontal é estática no desktop; sua visibilidade nos breakpoints menores é controlada pelo CSS.
- O índice continua reutilizando o `QuickNavigator` com a mesma lista de nove capítulos.

### Checklist extra
- [ ] Verificar 320, 360, 390, 430, 680, 681, 768, 900, 901, 1120, 1121 e 1440px.
- [ ] Em todas as resoluções: apenas **um** controle principal para navegar por seções, sem sobreposição.
- [ ] Botão / ÍNDICE facilmente reconhecível; foco visível, hover, toque e Enter.
- [ ] Desktop: links diretos não ultrapassam as margens; BUSCAR abre o índice por busca.
- [ ] Tablet: nome, ÍNDICE, GRID e PT/EN cabem sem quebra.
- [ ] Mobile: barra de progresso, salto a seções, alternância de idiomas e GRID operacionais.
