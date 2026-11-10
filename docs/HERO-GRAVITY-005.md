# Edição 005 — Letras com gravidade e colisões

## Direção

A tipografia continua sendo o principal elemento visual do hero, sem animação de abertura ou grafismos decorativos. As letras **LUIS/EDUARDO** permanecem alinhadas até receber uma interação. Ao passar e empurrar o mouse sobre elas, ou arrastar uma letra e soltar, elas se tornam corpos rígidos: caem, giram, batem nas demais letras e param na linha inferior da **área de abertura**. O índice de projetos, localizado após a capa, não faz parte da área física.

## Como interagir

- **Mouse ou caneta:** atravessar uma letra com o ponteiro a empurra; ela se desprende do título e sofre gravidade. Clicar e arrastar permite arremessar uma letra com velocidade.
- **Derrubar tudo:** libera todas as letras para a gravidade; é a alternativa para teclado e celular.
- **Reorganizar:** devolve tudo para a composição editorial inicial.
- **Celular:** arrastar pela tela continua rolando a página normalmente. Os botões de Derrubar tudo e Reorganizar permitem brincar sem cursor.
- **Movimento reduzido:** a tipografia fica estática e os controles da física desaparecem para respeitar a preferência do sistema.

## Como funciona

- `src/lib/glyphPhysics.js` implementa física 2D própria sem dependências externas: gravidade, integração de velocidade linear e angular, colisão de retângulos orientados por SAT (Separating Axis Theorem), impulsos, restituição, atrito e restrições laterais e de chão.
- Cada letra é um `<span>` real, mantendo a fonte original; um corpo rígido invisível acompanha seus limites.
- `KineticWordmark.jsx` atualiza transformações apenas com `requestAnimationFrame` e usa um passo físico fixo de 1/120 s.
- A simulação não inicia até haver interação, e para quando os corpos se estabilizam. O corpo é medido de novo quando a janela muda de tamanho, restaurando o layout corretamente.
- `ResponsiveHero.jsx` acrescenta a pista vazia e a linha de colisão antes dos blocos informativos, além dos controles acessíveis.
- `hero-gravity.css` substitui o espaço em branco passivo por uma zona física dentro da própria capa.

## Limitações

- A colisão usa a **caixa rotacionada aproximada de cada glifo**, não os contornos vetoriais exatos da fonte. Isto permite manter legibilidade e desempenho.
- A área física fica acima do índice de projetos; as letras não cobrem navegação, links e o Typeee.
- A interação do mouse não substitui mecanismos de navegação.
- Não existe som, autoplay, WebGL, bibliotecas adicionais ou efeitos de entrada.

## Testes

```bash
npm ci
node --test tests/glyphPhysics.test.mjs
npm run build
```

Cobertura automatizada:
- Letras imóveis sem interação.
- Queda, impacto e repouso no chão.
- Uma letra atingindo e ativando outra.
- Limites da área física com doze letras.
- Hit testing de corpo rotacionado.

### Revisão manual ainda necessária

- [ ] Desktop: atravessar letra com ponteiro, arrastar, soltar e bater nas letras vizinhas.
- [ ] As letras devem se acumular sobre a linha antes da apresentação dos projetos.
- [ ] Botões Derrubar tudo e Reorganizar funcionam após qualquer sequência de interações.
- [ ] Não deve ocorrer overflow horizontal em 320/360/390/768/1440 px.
- [ ] Movimentação não deve impedir links, scroll ou foco.
- [ ] Com preferência de movimento reduzido, o título deve ficar inteiramente estático.
- [ ] Typeee, prévias flutuantes, botão GRID, GRADE/ÍNDICE, idiomas e Caderno de Processo preservados.

Esta edição está em branch própria para revisão e não altera a `main`.
