# Edição 004 — Tipografia cinética e prévias com peso

## Por que esta versão existe

A direção aprovada é editorial, quase monocromática, com letra grotesca gigante e bastante espaço vazio. A arte de linhas e o carimbo com mola da edição anterior não funcionaram visualmente. **Foram removidos da página e dos componentes e estilos utilizados.**

O princípio desta edição é simples: a própria informação interage, sem adicionar uma ilustração ornamental.

## O que mudou

### 1. O nome ganha comportamento físico

Arquivo: `src/components/KineticWordmark.jsx`.

- `LUIS/EDUARDO` mantém a composição gráfica de letras grandes.
- Cada glifo é animado individualmente por uma mola amortecida; a aproximação do mouse produz repulsão e uma rotação sutil.
- É possível arrastar uma letra no desktop e soltá-la para que volte ao lugar. O movimento é **limitado** para não romper a composição.
- `requestAnimationFrame` atualiza os estilos sem renderizar React a cada evento; a animação para assim que estabiliza.
- O `<h1>` conserva um rótulo acessível com o nome completo exibido.
- Dispositivos touch recebem a versão estática. Quando `prefers-reduced-motion: reduce` está ativo, o efeito para e qualquer deslocamento retorna imediatamente a zero.

### 2. Prévia física dos projetos

Arquivo: `src/components/FloatingProjectPreview.jsx`.

- As prévias no índice da capa e nos títulos dos projetos permanecem acima da página via `createPortal(document.body)`.
- Além da inércia existente, o cartão inclina conforme sua velocidade horizontal e retorna à posição vertical.
- Não recebe eventos de mouse (`pointer-events:none`), preservando os links.
- Para teclado, a prévia aparece imóvel próxima do item em foco.
- Para movimento reduzido, não há inércia nem inclinação.
- Em telas touch sem hover, não mostra preview flutuante.
- Monan continua com fallback tipográfico porque não há imagem própria.

### 3. Silêncio visual

- Removidos o grafismo listrado, a legenda gráfica e o componente `MagneticStamp`.
- A área abaixo do nome agora tem dois blocos textuais e uma terceira coluna intencionalmente vazia em desktop.
- Espaçamento horizontal e vertical foi mantido generoso.
- Nenhuma animação de entrada, parallax de toda a página ou cursor falso.
- Botão GRID, mudança de visualização GRADE/ÍNDICE, Typeee e Caderno de Processo permanecem.

## Arquivos

- `src/components/KineticWordmark.jsx`: letras manipuláveis.
- `src/components/ResponsiveHero.jsx`: capa sem arte ou carimbo.
- `src/components/FloatingProjectPreview.jsx`: inércia e inclinação física.
- `src/styles/hero-kinetic.css`: composição e responsividade.
- `src/styles/editorial-layout.css` e `src/styles/interactive-edition.css`: limpeza de estilos obsoletos.

## Validar antes do merge

```bash
npm ci
npm run build
npm run dev
```

- [ ] Nome permanece legível e não quebra em 320, 360, 390, 768 e 1440 px.
- [ ] Mouse próximo às letras provoca repulsão discreta; arrastar e soltar retorna suavemente.
- [ ] Ao passar o mouse em um projeto, a prévia aparece na frente de todos os elementos, com inércia e tilt.
- [ ] Testar limites esquerdo e direito do viewport e retorno da inclinação ao parar.
- [ ] Foco por teclado nos projetos não exige movimento nem intercepta o Enter.
- [ ] Verificar `prefers-reduced-motion:reduce`.
- [ ] No celular, o título é estático, sem seleção acidental ou bloqueio de scroll.
- [ ] Os modos GRADE/ÍNDICE e o botão GRID ao lado do PT/EN permanecem operantes.
- [ ] Typeee mantém sua aparência original e continua funcional.
- [ ] Inspecionar a página em navegadores reais.

Esta é uma branch de revisão, baseada na edição 003. `main` continua intocada.
