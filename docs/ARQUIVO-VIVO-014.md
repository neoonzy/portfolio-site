# ARQUIVO VIVO / EXPOSIÇÃO 014

## Por que esta edição existe

As edições anteriores otimizavam uma landing page tradicional, mudando cores e grid, mas não a maneira de descobrir o trabalho. A proposta desta branch **substitui a interface de página longa** por uma **exposição interativa não linear** com cinco estações independentes.

## Experiência de visita

00. **ENTRADA — a mesa de impressos:** o nome `LUIS/EDUARDO` mantém a física real; três documentos/projetos podem ser movimentados, abertos e descobertos visualmente. O visitante entra no arquivo, não apenas desce uma página.
01. **OBRAS — o inventário:** quatro trabalhos selecionáveis em uma sala escura, com peças grandes e coloridas como objetos físicos, contraste gráfico e links a estudos de caso PT/EN.
02. **OFICINA — o processo:** sequência visual em quatro etapas e demonstração funcional do Typeee; experiência de trabalho, não uma lista genérica de habilidades.
03. **ATLAS — a constelação:** quatro nós sobrepostos a um diagrama espacial, associando território, código e fabricação. Um botão abre o **caderno fotográfico**.
04. **CONTATO — o fechamento:** cena vermelha, grande convite ao contato e links funcionais.

### Caderno fotográfico autoral

Seis fotografias originais, já fornecidas pelo autor em contexto de produção, foram otimizadas em WebP e adicionadas ao repo:
- `rua-skate.webp`: rua, skate e cotidiano
- `pescador-rede.webp`: trabalho e água
- `detalhe-bolsa.webp`: corpo, objeto e detalhe
- `retrato-feira.webp`: retrato de feira
- `luz-curral.webp`: luz rural
- `pessoas-rua.webp`: encontros na rua

O caderno mostra uma imagem grande, negativos pequenos para navegar, número sequencial, legendas bilingues e setas. A galeria fecha com Esc, preserva o foco do teclado e permite avançar por seta ou toque/deslize. Fotos não foram substituídas por bancos de imagem, e não atribuímos identidade a pessoas retratadas.

## Direção gráfica

Não é um dashboard SaaS e não é um catálogo de cards. Cada sala tem material, temperatura e semântica próprias: papel de entrada, preto de projeção, azul de blueprint, verde de diagrama e coral de contato. Tipografia grande funciona como peça e sinalização. Há interações físicas e diagrama, não animações sem função.

## Usabilidade

- O visitante nunca fica preso em uma única forma de navegação: menu MAPA com cinco salas, barra de progresso inferior no mobile, rail no desktop e teclado 1 a 5.
- A tecla `/` abre a busca de estações e projetos, que aceita acentos e ignora caixa.
- Os estudos de caso continuam acessíveis por URLs `/projetos/:slug`.
- PT/EN, foco visível, navegação de teclado, reduced motion e controles de toque.
- O caderno fotográfico só carrega todas as seis thumbnails após solicitação da pessoa.
- O Typeee é funcional, mas a visita não depende dele.

## Validação

O workflow dedicado `.github/workflows/exhibition-qa.yml` roda:
- `npm ci`, `npm test` e `npm run build`;
- Playwright Chromium com 8 viewports: 320, 360, 390, 430, 680, 768, 1024 e 1440;
- navegação e busca, rota de caso, oficina/Typeee, atlas, caderno fotográfico, contato e mapa;
- screenshots e snapshots adicionais via Playwright CLI.

### Ainda necessário

- Teste humano em Safari iOS e Android Chrome, VoiceOver/TalkBack e zoom 200%.
- Refinamento da curadoria fotográfica e eventual texto autoral para cada fotografia, antes de torná-la uma exposição permanente.
- Aprovação visual do autor (esta branch é um experimento radical e não altera o site em produção).
- Medir Web Vitals apenas após uma prévia autorizada.

## Publicação

Branch: `feat/experiencia-arquivo-vivo`

**Não fazer merge sem autorização.** `main` e produção preservadas. `vercel.json` mantém `git.deploymentEnabled: false`; nenhum deploy manual foi acionado.
