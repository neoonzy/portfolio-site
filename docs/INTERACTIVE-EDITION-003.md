# Edição 003 — Interatividade contextual

## O que foi pedido
- Prévia dinâmica de projetos, **acima dos demais componentes**, acompanhando o mouse sem ficar cortada por elementos com `overflow` ou stacking contexts;
- Botão **GRID ON/OFF** ao lado de PT/EN para visualizar as colunas do próprio site;
- Alternância da seção de projetos entre **GRADE** e **ÍNDICE**;
- Detalhes físicos inesperados e discretos, como um carimbo que pode ser arrastado e volta ao lugar com uma mola.

## Implementação

### 1. Prévia dos projetos — FloatingProjectPreview.jsx
- Usa `createPortal(..., document.body)`, com `position:fixed` e `z-index:2147483000`, fora de containers com `overflow:hidden`.
- Não captura cliques ou toque (`pointer-events:none`).
- Em mouse/trackpad, o preview nasce ao passar sobre os nomes de projetos no índice da capa ou na seção de projetos. Segue o ponteiro com uma mola amortecida e respeita os limites da janela.
- Em foco por teclado, aparece junto ao item com posicionamento calculado para caber na tela.
- Em dispositivos touch sem hover, fica desativado para não atrapalhar links e navegação. As imagens e informações dos projetos continuam disponíveis normalmente.
- Usa imagens existentes de Typeee, Zumbido e Mapeia. Monan não tem imagem, portanto mostra tipografia de fallback, sem criar uma imagem falsa.
- `prefers-reduced-motion` desativa o movimento elástico e posiciona a prévia imediatamente.
- Fecha ao perder hover/foco ou quando a página rola.

### 2. Grade do site — LayoutGridOverlay.jsx
- Botão `GRID OFF/ON` ao lado de PT/EN, com `aria-pressed` e estado visual.
- Alternativa por tecla `G`, exceto quando o usuário está editando texto ou com uma caixa de diálogo aberta.
- Sobreposição fixa com 12 colunas, margens alinhadas ao container editorial e legenda.
- `pointer-events:none`: nada impede o visitante de clicar ou arrastar no site por baixo.

### 3. Modos de visualização de projetos
- Botões explícitos `▦ GRADE` e `≡ ÍNDICE` com `aria-pressed`.
- Grade original preservada por padrão.
- Índice mostra os projetos como linhas editoriais, com metadados, textos e links.
- Títulos permanecem links reais; a prévia flutuante aparece no hover/foco.

### 4. Carimbo com física — MagneticStamp.jsx
- Elemento pequeno na arte gráfica já existente da capa, sem alterar a composição.
- `pointer capture` para arrastar com mouse, caneta ou toque; deslocamento limitado.
- Soltar retorna à posição original por uma integração simples de mola com velocidade e amortecimento.
- Acessível pelo teclado: setas movem, Shift + setas move mais, Home ou Escape recoloca.
- Não depende de bibliotecas 3D ou animação pesada; desativa a mola quando a pessoa pede movimento reduzido.

## O que não mudou
- Identidade P&B / tipografia grotesca / espaços vazios.
- Experiência Typeee e seus tokens de cor e tipografia (apenas a própria demo).
- Sem splash, parallax global, animação obrigatória, modal de onboarding ou fotografia na capa.
- A branch principal `main` permanece intacta.

## Verificação

```bash
npm ci
npm run build
npm run dev
```

### Conferência manual (antes de merge)
- [ ] Hover na capa e nos títulos dos projetos, inclusive perto das bordas do viewport;
- [ ] Preview acima de imagens, cabeçalho e conteúdo, sem interceptar cliques;
- [ ] Foco por teclado e link direto dos projetos;
- [ ] Exibição GRIDE/ÍNDICE em 360px, tablet e desktop;
- [ ] Botão GRID e tecla `G`, também com menu aberto e enquanto digita no Typeee;
- [ ] Toque no iPhone, sem popover fantasma;
- [ ] Carimbo arrastável, retorno por mola, setas e Home;
- [ ] `prefers-reduced-motion` e foco visível;
- [ ] Typeee, links de e-mail, navegação e versão EN preservados.

A versão é para avaliação, sem merge na `main`.
