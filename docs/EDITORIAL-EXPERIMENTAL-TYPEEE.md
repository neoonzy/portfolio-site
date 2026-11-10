# Refino da homepage — foco editorial

## Decisão de design atualizada

Após revisão visual, foram retirados o estudo de movimento geométrico, o parallax do nome e a animação de abertura em cortinas. A homepage **carrega imediatamente**, sem splash, sem overlay e sem entrada cinematográfica.

A direção continua editorial e experimental pela composição: tipografia grande, hierarquia assimétrica, bastante espaço em branco e um índice de projetos real.

## Interação útil

O índice da primeira tela mostra **Typeee, Zumbido.cc, Mapeia e Monan**, com número, categoria, resumo e link original. Passar o ponteiro, focar com teclado ou tocar em um título atualiza o projeto em destaque.

O bloco usa os dados já existentes em `src/data/projects.js`; não há métricas ou cases fictícios. Também não depende de rastrear o movimento do ponteiro nem de rolagem animada.

## Typeee

A seção Experimente permanece limitada ao Typeee e reproduz o estilo da arena Classic usando referências do repositório `neoonzy/typeee`:
- `Archivo Black` e `IBM Plex Mono`;
- papel `#F0EEE7`, arena `#171717`, verde `#008A35`, amarelo `#FFCC00`;
- HUD (tempo, WPM, precisão, combo), digitação por palavras, 30 segundos e resultado.

É uma **demonstração local**, não compartilha ranking, autenticação ou estatísticas oficiais. Nenhum código confidencial, segredo ou configuração de produção foi incorporado.

## Preservado

- Projetos na prática com a apresentação em grade;
- Caderno de processo refinado;
- Navegação rápida por `/`;
- Tradução PT/EN, contato e apresentação profissional;
- Fotografia autoral fora da homepage.

## QA pendente além do build

- [ ] Examinar visualmente em desktop/tablet/celular;
- [ ] Testar títulos por mouse, toque e foco de teclado;
- [ ] Testar alternância PT/EN, links de projetos e seleção;
- [ ] Verificar contraste e foco visível;
- [ ] Conferir digitação no Typeee com teclado físico e mobile;
- [ ] Confirmar ausência de overflow em 320/360/390px e suporte a movimento reduzido.

Não fazer merge na `main` antes da aprovação visual.
