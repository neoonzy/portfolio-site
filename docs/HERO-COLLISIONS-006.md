# Edição 006 — Colisões integradas ao layout do hero

## Mudança solicitada

A edição anterior inseriu uma faixa vazia apenas para servir como área de queda, além do botão "Derrubar tudo". Ambos foram rejeitados e retirados.

**O hero voltou ao espaçamento e à composição da edição 004**, com o nome grande, metadados, bloco "Projetos / Processos", bloco "/ Sobre", links e índice de projetos no mesmo fluxo editorial.

### Novo comportamento físico

- As letras de **LUIS/EDUARDO** começam alinhadas como texto normal.
- Esbarrar nelas com o mouse ou clicar e arrastar as transforma em corpos rígidos com gravidade, velocidade, rotação e colisões entre as letras.
- **PROJETOS / PROCESSOS** e **/ SOBRE** são obstáculos físicos fixos: cada um fornece uma caixa de colisão medida da posição real do texto na página, com pequeno padding. As letras podem bater, quicar ou ficar apoiadas sobre esses obstáculos.
- Se uma letra passar pelos obstáculos, o último limite de queda é a **borda inferior de toda a section hero**, abaixo do índice editorial. Não há um contêiner de queda adicional.
- **Não existe mais "Derrubar tudo".** Há apenas o controle discreto **"Reorganizar"** nos metadados do título, para restaurar a posição original.

### Acessibilidade e responsividade

- As letras no hero continuam sendo texto HTML real, com heading acessível.
- Focar o título e pressionar **Enter** ou **Espaço** solta uma letra por vez, como alternativa ao mouse, sem botão para liberar todas de uma vez.
- As letras soltas não bloqueiam os cliques nos links e botões sob elas (`pointer-events: none` para glifos em movimento).
- Toque no celular mantém a rolagem nativa. Não há captura de arrasto por touch na tipografia.
- Com `prefers-reduced-motion: reduce`, a tipografia fica estática, e a animação física não inicia.
- Em mudanças de largura da janela ou de PT para EN, os limites e obstáculos são novamente medidos, e a composição é restaurada para evitar colisores desatualizados.

### Implementação

- `src/lib/glyphPhysics.js`: adiciona `createStaticObstacle`; obstáculos participam das colisões SAT e impulsos, mas têm massa inversa zero, sem deslocamento ou rotação.
- `src/components/KineticWordmark.jsx`: obtém geometrias de `[data-physics-obstacle]` no DOM e calcula o chão pela borda da `.print-hero`, em relação ao cover; escuta ponteiro sobre toda a seção.
- `src/components/ResponsiveHero.jsx`: elimina o runway/toolbar, identifica os dois rótulos como obstáculos e mantém só o reset.
- `src/styles/hero-kinetic.css`: cuida da sobreposição das letras que caem, preservando o restante do layout original. A folha `hero-gravity.css` foi apagada.
- `tests/glyphPhysics.test.mjs`: acrescenta regressão para colisão com obstáculo imóvel, sem atravessá-lo até o chão final.

### Validação

```bash
npm ci
node --test tests/glyphPhysics.test.mjs
npm run build
```

#### Revisão manual ainda pendente
- [ ] Passar o mouse nas letras e observar colisões com os dois rótulos.
- [ ] Deixar uma letra cair até o final da hero section, abaixo do índice de trabalhos.
- [ ] Confirmar que os links do índice continuam clicáveis, mesmo com letras à frente.
- [ ] Experimentar segurar/soltar letras caídas no fundo, sem bloquear a navegação.
- [ ] Testar Reorganizar e Enter/Espaço no foco do título.
- [ ] Comparar layout com versão anterior, principalmente margens e espaços vazios.
- [ ] Testar PT/EN, mobile, tablet, desktop e movimento reduzido.
- [ ] Verificar ausência de overflow horizontal e regressões no Typeee.

**A branch `main` continua intacta; esta edição é um PR draft.**
