# Edição 001 — Portfólio editorial experimental

## Propósito

Uma página que se comporta como um ensaio editorial: nome em grande escala, tipografia contrastante, margens generosas, ritmo assimétrico e **espaços em branco reais**, não apenas cartões distantes uns dos outros.

A versão anterior não funcionou visualmente porque havia enfeites abstratos (estudo geométrico) e uma abertura em cortina. **Não reintroduzir esses efeitos** sem nova decisão de design.

## O que mudou

- **Capa tipográfica**: nome em Space Grotesk de grande escala + *Lustosa* em Instrument Serif itálico; identificação e metadados com IBM Plex Mono.
- **Índice vivo**: Typeee, Zumbido, Mapeia e Monan aparecem como títulos editoriais em linhas; selecionar uma linha mostra descrição e link real, sem imagem artificial.
- **Ritmo**: uma pausa com a frase *Entre a tela e o mundo*, novas margens, grandes intervalos e hierarquia entre seções.
- **Experiência**: deixa de ser uma grade de caixas e vira uma sequência de linhas de currículo, com datas, função, local, descrição e tecnologias.
- **Projetos**: preserva as imagens, textos e links já conhecidos, mas usa uma grade editorial com alternância de altura em desktop e apresentação linear no mobile.
- **Processos**: mantém os três relatos e os detalhes expansíveis, agora como fragmentos visuais mais arejados.
- **Galeria e ferramentas**: reduzem molduras e priorizam separadores sutis; sem galeria fotográfica independente.
- **Typeee**: a demo continua com a identidade própria do modo Classic (cores e tipografia do produto) e aparece depois da seleção de projetos.

## Tokens principais

| Função | Cor/tipografia |
| --- | --- |
| Papel | `#fbfbf9` |
| Superfície | `#fffefb` |
| Texto | `#1d211d` |
| Divisória | `#d4d9d0` |
| Detalhe | `#556e59` |
| Título principal | Space Grotesk |
| Editorial itálico | Instrument Serif |
| Labels | IBM Plex Mono |

O CSS principal desta iteração é `src/styles/editorial-layout.css`, carregado por último em `src/main.jsx`. Regras Typeee permanecem isoladas em `src/styles/experimental.css`; não devem ser estilizadas pelos seletores editoriais globais.

## Interatividade

- Seleção de trabalho por ponteiro, teclado e toque.
- Atalho `/` da navegação mantido.
- Mini jogo Typeee isolado, sem dados oficiais.
- Não há preloader, scroll-jacking, parallax ornamental, autocoplay ou dependência de WebGL.

## Critérios de revisão

- [ ] `npm ci && npm run build`.
- [ ] Capa em 320, 360, 390, 768, 1024 e 1440 px: nome nunca deve vazar horizontalmente.
- [ ] Navegação para projetos e Typeee por link/teclado.
- [ ] Foco em cada entrada do índice e mudança de idioma PT/EN.
- [ ] Legibilidade dos títulos longos (especialmente Mapeia, Monan, Experiência).
- [ ] Fotos dos projetos e iframes Behance não podem estourar a largura.
- [ ] Textos nas seções e contraste >= WCAG AA quando aplicável.
- [ ] Uso de teclado virtual do Typeee no celular.
- [ ] Sem animações obrigatórias; `prefers-reduced-motion` respeitado.

## Status

Preview isolada em `feat/editorial-white-space-v2`. Nenhuma alteração em `main`. Não mesclar antes da aprovação visual.
