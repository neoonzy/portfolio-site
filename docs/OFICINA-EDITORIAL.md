# Oficina editorial — primeira iteração

## Direção aprovada

- Editorial experimental + oficina criativa, com interações de laboratório pontuais.
- Público equilibrado entre oportunidades profissionais e visitantes interessados em design/tecnologia.
- Presença pessoal sem transformar o portfólio em diário íntimo.
- Interatividade moderada; navegação direta continua sendo o caminho principal.
- Português e inglês preservados; prioridade ao mobile e a movimento opcional.

## O que entrou nesta branch

1. `StudioPanel` na primeira dobra com três experiências acessíveis:
   - Editorial: recortes dos projetos Zumbido e Mapeia com imagens já existentes.
   - Código: um desafio de digitação local e simplificado, ligado ao Typeee.
   - Oficina: estudo geométrico ilustrativo com três vistas; **não** representa um protótipo real.
2. Novo ritmo visual, microinterações, movimento de entrada discreto e hierarquia mais editorial para o primeiro projeto.
3. `FieldNotes`: três fichas de processo baseadas em trabalhos já presentes no portfólio.
4. Navegação e conteúdo bilíngue; CSS próprio com respeito a `prefers-reduced-motion`.
5. Workflow de validação de build nesta branch e em PRs para `main`.

## Como executar

```bash
npm ci
npm run dev
npm run build
```

## Estrutura

- `src/components/StudioPanel.jsx` — painel e suas três experiências.
- `src/components/FieldNotes.jsx` — fichas editoriais de processo.
- `src/styles/studio.css` — estilos e adaptações responsivas.
- `src/App.jsx` — montagem e navegação.
- `src/data/projects.js` — conteúdo e links existentes, ainda sem mudança.

## Materiais para a próxima fase

**Não foram acrescentadas fotografias artificiais ou tomadas de bancos de imagem.**
As capturas atuais continuam como material temporário do projeto.

Enviar, quando possível:

- 3–6 fotografias autorais (preferência por fotos de bancada, protótipos, rua, equipamentos e processo).
- 2–4 imagens de processo por projeto selecionado (rascunho, tela, etapa, resultado).
- Para o Monan: fotos do protótipo e, opcionalmente, modelo `.glb` ou `.gltf` otimizado.
- Um retrato opcional, sem obrigação de expor a vida pessoal.
- Crédito/autoria e autorização de uso caso alguma imagem tenha terceiros.

Recomendação: fornecer arquivos com nomes descritivos, idealmente JPEG/WebP/AVIF para fotografia, e uma legenda contextual. Publicar as versões comprimidas; manter originais fora do repositório se forem muito grandes.

## Validação manual antes de mesclar

- [ ] `npm run build` sem erros.
- [ ] Navegação e menu em 360 px, 768 px e desktop.
- [ ] Troca PT/EN e textos longos sem overflow.
- [ ] Painel de três modos com mouse, toque e teclado.
- [ ] Digitação: entrada, erro, progresso, reinício e frase concluída.
- [ ] Modo reduzido de movimento e estados `:focus-visible`.
- [ ] Links externos e e-mail.
- [ ] Performance e experiência visual em aparelho real.

## Próxima etapa

Criar estudos de caso por projeto com problema, decisões, processo e resultado **a partir de evidências e material fornecidos**, sem inventar métricas. Substituir o wireframe ilustrativo por modelo real apenas quando houver material adequado. Avaliar uma galeria própria de fotografia para substituir parte dos embeds do Behance, evitando alterar o acervo sem revisão.

Esta primeira entrega não foi publicada em produção e não altera `main`.
