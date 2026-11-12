# Luis Eduardo Lustosa — Portfolio

Portfolio de **Luis Eduardo Lustosa Brito**, designer, estudante de Sistemas de Informação no CIn/UFPE e entusiasta de prototipagem e fabricação digital.

## Identidade visual

Brutalismo minimalista editorial: paleta quase monocromática (off-white, grafite e cinzas), tipografia forte, grids estruturados, linhas finas e espaços amplos. Sem sombras rígidas, adesivos ou cards excessivamente coloridos. O site oferece português e inglês, com português como idioma padrão.

## Conteúdo

- **Projetos selecionados e estudos de caso:** Typeee, Zumbido, Mapeia e Monan, com páginas próprias em `/projetos/<slug>` e documentação do processo.
- **Sobre e formação:** UFPE, IFPI e interesses na interseção entre design, tecnologia e cultura maker.
- **Experiência:** Cincoders, Feira Agroecológica da Várzea, GREA3D, LASER, Monan e robótica educacional.
- **Portfólio visual:** os oito projetos do Behance, apresentados progressivamente para reduzir carregamentos externos, que já estavam no repositório [neoonzy/portfolio](https://github.com/neoonzy/portfolio), preservando as referências originais.
- **Ferramentas e contato:** competências e canais públicos verificados.

O conteúdo profissional foi conferido com o Currículo Lattes (ID 2980803847545519) e o portfólio anterior. O site antigo do CIn não estava acessível para inspeção direta, mas os embeds originais foram recuperados do código-fonte de `neoonzy/portfolio`. Os iframes dependem da disponibilidade e política de incorporação do Behance.

## Executar localmente

Requisitos: Node.js 22 (versão usada no CI) e npm.

```bash
npm ci
npm run dev
```

Para testar o código e gerar os arquivos de produção:

```bash
npm test
npm run build
npm run preview
```

O PR de revisão também executa testes de navegador em 10 larguras e publica screenshots como artefatos do GitHub Actions, sem exigir deploy na Vercel.

## Atualização

- Projetos e referências Behance: `src/data/projects.js`
- Estudos de caso PT/EN: `src/data/caseStudies.js` e `src/components/CaseStudyPage.jsx`
- Busca por seções e projetos: `src/lib/searchPortfolio.js`
- Ordem editorial da página: `src/data/chapters.js`
- Galeria progressiva: `src/components/VisualGallery.jsx`
- Textos PT/EN, experiências e habilidades: `src/App.jsx`
- Paleta e estilo: `src/styles/global.css`
- SEO e metadados: `index.html`

O portfólio não usa imagens genéricas nem currículo de terceiros. Para obter a versão formal do currículo, o link de contato direciona ao Lattes.

## Publicação

O `vercel.json` mantém os deploys Git automáticos desativados (`git.deploymentEnabled: false`). As rotas `/projetos/:slug` são reescritas para a SPA no servidor Vercel. O build principal usa recursos com caminhos absolutos (`base: '/'`) para permitir abrir diretamente os estudos de caso. Para publicar em uma pasta como `/~usuario/` do CIn, use `npm run build:cin` (base relativa); rotas internas profundas exigem configuração de fallback no servidor. Alterar a branch ou aprovar um PR não publica o site automaticamente.

## Auditoria e QA

Veja `docs/UX-REVIEW-012.md` para o escopo da revisão de interface, testes automatizados, capturas responsivas e itens que ainda dependem de validação humana ou de mídias autênticas.
