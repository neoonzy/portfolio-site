# Refinamento editorial experimental — Hero + Typeee

## Intenção

Experimentar a sensibilidade de microinteração de [rauno.me](https://rauno.me/) sem copiar o layout: hierarquia tipográfica limpa, movimento intencional, reação ao ponteiro, alternância explícita de estados, e detalhes discretos.

O objetivo continua profissional: visitantes devem identificar rapidamente a pessoa, o trabalho, os projetos e o contato.

## Alterações realizadas

- `ResponsiveHero`: abertura com duas cortinas breves, tipografia com entrada sequenciada, parallax suave do nome e diagrama que reage à posição do ponteiro. Os três botões **Observar / Desenhar / Construir** alteram forma, texto e composição, também por teclado e toque.
- O efeito de abertura é decorativo, `pointer-events:none`, marcado `aria-hidden` e omitido quando `prefers-reduced-motion:reduce`.
- `StudioPanel`: a única demo é o Typeee Classic. Não é um iframe nem uma partida conectada ao ranking; é uma amostra local independente de 30 segundos, com avanço por espaço, timer após primeira tecla, WPM, precisão, combo, pontos, reinício e resultado.
- `experimental.css`: regras com prefixo `typeee-` para não contaminar o restante do portfólio; conserva a apresentação de projetos em grade e o caderno editorial.

## Fonte da identidade do Typeee

A interface do Typeee foi reconstruída a partir dos arquivos **atuais** do próprio projeto (`neoonzy/typeee`, ramo `main`) — `design.md`, `src/App.tsx` e `src/styles.css`. O recorte replica a linguagem da arena Classic:

- fundo papel `#F0EEE7`;
- arena `#171717`;
- ação/entrada `#008A35`;
- destaque, acerto e marcador `#FFCC00`;
- erro `#F4A49B` com sublinhado;
- `Archivo Black` para títulos/métricas e `IBM Plex Mono` para UI e digitação;
- HUD de quatro métricas e palavra atual sublinhada.

A demo **não** executa o motor completo nem reproduz o ranking, login ou XP do site original. Seus dados não são enviados ou salvos.

## Como validar

```bash
npm ci
npm run build
npm run dev
```

- [ ] Abrir a homepage: texto emerge sem travar teclado ou clique.
- [ ] Mover o ponteiro e alternar os 3 botões no estudo geométrico.
- [ ] Com `prefers-reduced-motion`, evitar as cortinas, parallax e movimento.
- [ ] Conferir nome, botões, menus, busca por `/` e links em PT/EN.
- [ ] Comparar visual da demo com a arena Classic do Typeee real.
- [ ] Digitar palavras, pressionar espaço, corrigir com Backspace e acompanhar HUD.
- [ ] Aguardar 30 segundos após a primeira tecla e usar o botão de reiniciar.
- [ ] Em iPhone/Android, verificar teclado virtual, viewport e visibilidade do input.
- [ ] Revisar no desktop, tablet e larguras 320/360/390/768/1440.
- [ ] Verificar contraste, foco visível, hover e estabilidade dos elementos ao digitar.

## O que não foi alterado

Fotografia autoral permanece fora do portfólio; o grid de projetos, o caderno de processo, Behance, currículo e contato continuam presentes. Nenhum arquivo do projeto privado Typeee foi copiado para o portfólio: a reconstrução usa a identidade visual e um motor local simplificado.

Esta branch é experimental e **não** altera `main`.
