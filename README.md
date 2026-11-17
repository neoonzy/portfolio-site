# Luis Eduardo Lustosa — ARQUIVO VIVO

Portfólio experimental de Luis Eduardo Lustosa: interfaces, programação, fabricação digital, fotografia e cultura da rua. Uma **exposição interativa** em vez de uma página com seções em sequência.

## Experiência 014 — cinco estações

| Estação | Experiência |
| --- | --- |
| 00 / ENTRADA | Nome cinético, três impressos/projetos arrastáveis e convite a entrar |
| 01 / OBRAS | Inventário artístico com quatro trabalhos, projetos interativos e estudos de caso |
| 02 / OFICINA | Processo em quatro etapas, com demonstração jogável do Typeee |
| 03 / ATLAS | Constelação interativa, interesses cruzados e um caderno de seis fotos originais |
| 04 / CONTATO | Encerramento gráfico, e-mail real, GitHub, Behance e currículo acadêmico |

Em mobile há navegação persistente entre as cinco estações. No desktop, um rail lateral e atalhos de teclado **1–5**; `/` abre uma busca por projetos e estações. O menu MAPA permite escolher qualquer destino. Movimento/arrasto são recursos opcionais, não obstáculos à navegação.

As seis fotografias originais estão em `public/photography/`; os screenshots de trabalho em `public/projects/`. Não se usam fotos de banco de imagens ou conquistas inventadas.

Os estudos de caso têm endereços próprios `/projetos/:slug` e versão PT/EN.

## Desenvolver e testar

Recomendado Node.js 22.

```bash
npm ci
npm run dev
npm test
npm run build
npm run preview
```

A versão principal de Vite usa `base: '/'` para suportar URLs profundas em Vercel. Existe `npm run build:cin` para exportar assets relativos em subdiretório, com as restrições próprias do servidor.

No GitHub Actions, `.github/workflows/exhibition-qa.yml` testa as oito larguras 320, 360, 390, 430, 680, 768, 1024 e 1440 e percorre estações, casos, Typeee, navegação e caderno fotográfico com Playwright Chromium. Usa também a ferramenta **Playwright CLI** para screenshots e snapshots. Capturas ficam nos artefatos do workflow.

## Código principal

- `src/ExhibitionApp.jsx`: estações e interações da experiência
- `src/styles/exhibition.css`: cenografia, responsividade e estados visuais
- `src/components/PhotographicContactSheet.jsx`: fotografia autoral, negativos e controles
- `src/components/KineticWordmark.jsx`: física tipográfica existente
- `src/components/StudioPanel.jsx`: demonstração Typeee
- `src/components/CaseStudyPage.jsx`: estudos de caso
- `src/data/projects.js` / `caseStudies.js`: informações verificadas de trabalhos
- `src/lib/searchPortfolio.js`: busca
- `scripts/exhibition-qa.mjs`: testes no navegador

A concepção e as justificativas estão em [docs/ARQUIVO-VIVO-014.md](docs/ARQUIVO-VIVO-014.md) e as regras de manutenção em [AGENTS.md](AGENTS.md).

## Segurança editorial e publicação

Esta versão está somente na branch `feat/experiencia-arquivo-vivo`, baseada na branch de revisão UX. A `main` não foi alterada. **Deploy Git automático continua desativado na Vercel**, em `vercel.json` com `git.deploymentEnabled: false`. Não integrar a `main` nem publicar manualmente sem aprovação explícita do autor.

## Histórico

- Edição 012: melhorias de acessibilidade, estudos de caso e busca
- Edição 013 / FIELDWORK: estudo editorial anterior, substituído nesta branch por uma experiência espacial
- Edição 014 / ARQUIVO VIVO: redesenho estrutural e artístico, sujeito à avaliação humana em dispositivos reais
