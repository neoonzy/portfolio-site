# ATELIER / 001 — Portfólio como espaço de exploração

## Problema que a versão anterior não resolvia

A versão FIELDWORK alterava cores, disposição e tipografia, mas continuava sendo uma landing page com blocos empilhados. O pedido desta edição foi diferente: **a própria experiência de navegar precisa ser autoral**. Não basta fazer uma landing page editorial mais bonita.

## Conceito

**ATELIER** é uma publicação/oficina espacial. O visitante entra, escolhe uma sala e manipula trabalho real. Não existe obrigação de ler uma homepage de 12 seções em uma sequência única. A interação tem função: descobrir, comparar, entender e experimentar.

### Salas (não seções da mesma página)

| Sala | Linguagem | Ação significativa |
|---|---|---|
| 00 / Entrada | Cartaz tipográfico cinético, recorte de imagens e índice de peças | Derrubar letras pelo mouse, selecionar peça em destaque, entrar no arquivo |
| 01 / Arquivo | Mesa de provas / colagem de cartazes sobre superfície azul | Selecionar e **arrastar** quatro trabalhos; ler ficha contextual e visitar o produto |
| 02 / Laboratório | Placa experimental fluorescente com Typeee original | **Jogar** um produto real dentro do portfólio |
| 03 / Caderno | Livro físico de folhas, colagens e anotações | Folhear três processos com setas e índice de páginas |
| 04 / Pessoa | Mapa gráfico entre Curimatá e Recife + fichas de experiências | Explorar a trajetória e abrir fichas profissionais |
| 05 / Contato | Cartaz laranja, tipografia direta e links legíveis | Enviar e-mail, copiar endereço e abrir portfólios |

O acervo de oito trabalhos visuais do Behance permanece na sala Arquivo como uma película horizontal de fichas tipográficas, cada uma com link externo. Não exibimos caixas vazias de iframes bloqueados nem inventamos imagens.

## Arquitetura de navegação

- Desktop: seis abas numeradas, abertas imediatamente sem scroll até uma seção distante.
- Mobile: dock inferior de quatro rotas principais, botão “+” para o mapa completo de seis salas e mapa acessível no header.
- Navegação via hash (`#arquivo`, `#caderno`, `#contato`), com compatibilidade para `#projects`, `#about`, `#notes`, `#contact` etc.
- Deep link direto a uma peça por `#work-zumbido`; estado selecionado é restaurado ao navegar pelo histórico.
- Teclado: `1` a `6` muda de sala, Esc abre o mapa, Esc novamente fecha. Atalhos ignorados durante escrita em campos de texto.
- O foco é movido para `main` após mudança de sala; o scroll volta ao topo sem animação.
- Não existe snap obrigatório da página nem sequestro do scroll. O dock funciona com safe areas.

## Direção visual

Não mais um único estilo aplicado em seis blocos. Cada sala tem um **material distinto**:
- creme tipográfico para entrada;
- azul ultramarino e papel impresso para arquivo;
- amarelo fluorescente para laboratório;
- papel rosado e folhas de processo para caderno;
- preto e diagrama linear para trajetória;
- laranja cartaz para contato.

Isso não é uma paleta aleatória: cada cor indica uma modalidade de conteúdo e cria uma mudança perceptível de contexto. Bordas retas, tipografia grotesca, IBM Plex Mono para indexação e imagens de projetos reais preservam a autoria.

## Design e engenharia

Referências de decisão (sem reproduzir seus trabalhos):
- [Taste Skill](https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill/SKILL.md), para direção própria, hierarquia e imagens de projeto.
- [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md), para affordance, foco, semântica e interação.
- [Playwright CLI](https://github.com/microsoft/playwright-cli), para snapshots e inspeção visual real.

Implementação React 18/Vite, sem bibliotecas pesadas de animação, WebGL ou dependências novas em produção. A física original do nome continua preservada. A bancada usa Pointer Events; cliques e teclado funcionam mesmo para quem não arrasta. Movimento reduzido desativa transições visuais.

## QA

```sh
npm ci
npm run build
node --test tests/glyphPhysics.test.mjs
```

No GitHub Actions, `.github/workflows/atelier-qa.yml` executa o build e o script de browser `scripts/spatial-qa.mjs`, testando oito larguras e as seis salas. Também utiliza `@playwright/cli` para gerar snapshots e capturas visuais reais. O artefato `atelier-six-room-qa` é associado ao SHA testado.

### Revisão humana obrigatória antes de produção

- [ ] Aprovar a nova metáfora das salas e as mudanças de contexto no iPhone real.
- [ ] Testar VoiceOver e TalkBack; verificar nome, dock, mapas, detalhes e botões dos projetos.
- [ ] Testar navegação por teclado e zoom de 200% em Safari/Chrome.
- [ ] Testar gesto de arrastar peças no mouse e scroll horizontal com dedo sem conflito.
- [ ] Avaliar se imagens próprias podem enriquecer os trabalhos visuais do Behance e as peças de Monan.
- [ ] Conferir versão em inglês e cores sob diferentes configurações de contraste.

## Política de publicação

Esta experiência está na branch `feat/atelier-spatial-experience`, originada da `main`, em PR próprio. Não modifica a proposta FIELDWORK (#16), que continua separada. **Não realizar merge nem deploy de produção sem aprovação.** A configuração de deploy Git automático da Vercel permanece desativada.
