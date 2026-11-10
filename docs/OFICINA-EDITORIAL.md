# Portfólio — oficina editorial (refino após revisão)

## Direção aprovada

Estética editorial + oficina criativa; apresentação profissional em primeiro lugar, com interações leves e úteis. O site continua em português e inglês.

## Decisões desta revisão

- Hero sem fotografia: cartaz tipográfico interativo com os estados **Observar / Desenhar / Construir**.
- Seção **Experimente** limitada ao Typeee, com frases alternáveis, feedback de erros, precisão e progresso.
- Retorno ao grid regular de 2 colunas em **Projetos na prática** (1 no mobile), mantendo informações e links.
- Sem aba de fotografia autoral: a ideia fica reservada para futuros trabalhos, como fotozines.
- **Caderno de processo** permanece, com texto mais conciso, identificação dos projetos, proporções consistentes e blocos expansíveis de bastidores.
- Atalho acessível **/** abre uma navegação rápida pesquisável. Também há botão visível no cabeçalho; Enter abre a primeira correspondência e Escape fecha.
- Sem dependências ou bibliotecas de animação adicionais.
- O conteúdo principal, links do Behance, currículo e contato permanecem.

## Principais arquivos

- `src/components/HeroPlayground.jsx` — cartaz interativo sem fotografias.
- `src/components/StudioPanel.jsx` — desafio do Typeee.
- `src/components/QuickNavigator.jsx` — atalhos e busca por seções.
- `src/components/FieldNotes.jsx` — caderno de processo.
- `src/styles/studio.css` — layout, interações e responsividade.
- `src/App.jsx` — integrações e navegação bilíngue.

## Executar / validar

```bash
npm ci
npm run build
npm run dev
```

Checklist de revisão antes de mesclar:

- [ ] Build Vite aprovado na integração contínua.
- [ ] Layout em 360, 768 e 1440 px sem overflow.
- [ ] Traduzir e mudar frases no Typeee; testar erro, acerto, progresso, reinício e nova frase.
- [ ] Troca de estados no cartaz com teclado, mouse e toque.
- [ ] Navegação por /, botão do header, Enter, Escape e links de seção.
- [ ] Abrir/fechar bastidores em cada nota.
- [ ] Conferir `prefers-reduced-motion`, contraste e foco visível.
- [ ] Conferir os links públicos e a visualização em aparelhos reais.

## Próximos conteúdos

Estudos de caso mais completos dependem de material real: problema, decisões, protótipos e resultados observáveis. A galeria de fotografia autoral foi deliberadamente retirada desta versão. As fotos enviadas podem inspirar fotozines futuros, mas não integram a interface atual.

**Atenção:** a exclusão de imagens na versão atual não apaga commits antigos publicados no histórico do GitHub.

Essa versão é experimental e não altera a branch `main`.
