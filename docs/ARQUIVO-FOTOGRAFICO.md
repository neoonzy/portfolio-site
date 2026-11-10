# Arquivo fotográfico autoral — segunda iteração

## Escopo desta branch

Branch `feat/arquivo-fotografico-autoral` derivada de `feat/oficina-editorial-interativa`.
A `main` e a branch de origem são preservadas. Esta mudança é independente e deve ser revisada antes de qualquer merge.

### Implementado

- A abertura passa a usar uma das seis fotografias fornecidas, com legenda editorial e chamadas para projetos e laboratório.
- O laboratório interativo já existente passa para um bloco próprio abaixo da abertura.
- Nova seção de fotografia com composição assimétrica responsiva e tratamento de folha de contato.
- Visualização em tela cheia com `<dialog>`, botões anterior/próximo, atalhos de setas e `Escape`.
- Legendas e textos alternativos em português e inglês, sem inventar cidade, data ou circunstâncias não documentadas.
- Seis versões WebP otimizadas, com dimensões de 760–850 px e sem dados EXIF desnecessários.
- Respeito a `prefers-reduced-motion`, foco visível e imagens carregadas sob demanda (exceto hero).
- Seções renumeradas para manter a sequência editorial.

### Fotografia / caminho no repositório

| Arquivo | Papel |
| --- | --- |
| `public/photography/luz-curral.webp` | Abertura e arquivo |
| `public/photography/rua-skate.webp` | Destaque do ensaio |
| `public/photography/pescador-rede.webp` | Registro documental |
| `public/photography/detalhe-bolsa.webp` | Respiro gráfico |
| `public/photography/retrato-feira.webp` | Retrato em preto e branco |
| `public/photography/pessoas-rua.webp` | Cena coletiva |

As imagens foram recebidas como uploads nesta conversa e derivadas localmente para publicação web. **Nenhuma fotografia foi criada por IA** nem editada para alterar seu conteúdo. Os originais permanecem com o autor/fornecedor, não são adicionados ao repositório.

## Revisão pré-publicação

As fotografias mostram pessoas identificáveis, incluindo uma criança. Antes de mesclar para produção, confirmar os direitos de uso, as autorizações pertinentes e as condições de exposição pública no portfólio — sobretudo para pessoas em destaque. Esta branch vive em um repositório público e seus arquivos podem ser acessados diretamente, mesmo sem merge.

Também revisar:
- [ ] Copyright, créditos e autorizações de uso.
- [ ] Conteúdo e legendas da galeria, nomes e locais apenas se verificados.
- [ ] Visual no celular (360 / 390 / 430 px) e desktop (1024 / 1440 px).
- [ ] Navegação por teclado no diálogo: abrir, `Escape`, ←, →, fechar e retorno do foco.
- [ ] PT/EN, menu mobile, zoom de 200% e movimento reduzido.
- [ ] Build com `npm ci && npm run build`.
- [ ] Performance, contraste e enquadramento das imagens na versão de prévia.

## Arquivos adicionados/alterados

- `src/components/PhotoArchive.jsx` — galeria e visualização ampliada.
- `src/styles/photography.css` — layout, responsividade e lightbox.
- `src/App.jsx` — hero fotográfico, laboratório em seção própria e navegação.
- `src/main.jsx` — import do CSS.
- `src/components/FieldNotes.jsx` — sequência de seção.

## Próximo material

Quando houver fotos de bancada, eletrônica, fabricação digital ou protótipos físicos, criar sequências próprias dentro de estudos de caso. Evitar apresentar uma fotografia de rua como documentação de um projeto técnico quando ela não é.

## Como validar

```bash
npm ci
npm run build
npm run dev
```
