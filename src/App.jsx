import { useEffect, useState } from 'react'
import { projects, visualProjects } from './data/projects.js'

const content = {
  pt: {
    navigation: { about: 'Sobre', experience: 'Trajetória', projects: 'Projetos', gallery: 'Design', skills: 'Ferramentas', contact: 'Contato' },
    eyebrow: 'RECIFE, BRASIL  /  DESIGN + TECNOLOGIA',
    heroTop: 'OLÁ, EU SOU',
    heroName: 'LUIS EDUARDO',
    heroName2: 'LUSTOSA.',
    heroText: 'Entre o digital e o físico. Crio interfaces, experimento com fabricação digital e desenvolvo projetos que aproximam tecnologia, cultura e pessoas.',
    heroAction: 'VER PROJETOS',
    heroSecond: 'FALAR COMIGO',
    heroSticker: 'FAÇO ACONTECER ↗',
    labelAbout: '01 / QUEM SOU',
    aboutTitle: 'MÃO NA MASSA,\nIDEIAS NA RUA.',
    aboutLead: 'Designer, estudante de Sistemas de Informação na UFPE e entusiasta da cultura maker.',
    aboutText: 'Sou piauiense, moro em Recife e trabalho na interseção entre design, desenvolvimento front-end, prototipagem 3D e comunicação. Gosto de entender o problema, desenhar uma solução e colocar a mão na massa para fazê-la existir.',
    aboutText2: 'Minha trajetória passa por robótica educacional, laboratórios de fabricação digital, sistemas embarcados e projetos de impacto social. Fora das telas, me interessam fotografia, bicicletas, música, arte de rua e agroecologia.',
    aboutStamp: 'DESIGN / CÓDIGO / OFICINA',
    based: 'DE TERESINA PARA RECIFE',
    educationTitle: 'FORMAÇÃO',
    education: [
      ['2026 — ATUAL', 'Sistemas de Informação', 'Universidade Federal de Pernambuco · CIn'],
      ['2024 — 2025', 'Engenharia da Computação', 'UFPE · formação interrompida'],
      ['2021 — 2023', 'Ensino médio e formação técnica em Informática', 'Instituto Federal do Piauí · IFPI'],
    ],
    labelExperience: '02 / EXPERIÊNCIA',
    experienceTitle: 'CAMINHO\nPERCORRIDO.',
    experienceIntro: 'Projetos, extensão e trabalho em diferentes frentes criativas e técnicas.',
    experience: [
      { date: '2026', title: 'Designer · Cincoders', place: 'Fábrica de Software · UFPE', desc: 'Design de interfaces, prototipação no Figma e colaboração em soluções digitais orientadas a impacto social.', tags: ['UI/UX', 'Figma', 'Front-end'] },
      { date: 'ATUAÇÃO ATUAL', title: 'Coordenação & ASCOM', place: 'Feira Agroecológica da Várzea', desc: 'Comunicação, conteúdo visual e articulação de uma iniciativa comunitária ligada à agroecologia.', tags: ['Comunicação', 'Design', 'Agroecologia'] },
      { date: '2024 — 2026', title: 'Monitor · GREA3D', place: 'Laboratório de Experimentação em Artefatos 3D · UFPE', desc: 'Modelagem e impressão 3D, manutenção de equipamentos, fabricação digital e apoio a atividades práticas.', tags: ['Impressão 3D', 'Prototipagem', 'Fabricação digital'] },
      { date: '2025', title: 'Secretário de Comunicação e Mídias', place: 'LASER · Liga Acadêmica de Sistemas Embarcados', desc: 'Comunicação institucional, eventos e divulgação de iniciativas em sistemas embarcados.', tags: ['Sistemas embarcados', 'Comunicação'] },
      { date: '2024 — 2025', title: 'Modelagem e prototipagem 3D', place: 'Monan · UFPE', desc: 'Criação de modelos e protótipos físicos em projeto interdisciplinar de tecnologia e impacto social.', tags: ['Modelagem 3D', 'Protótipos'] },
      { date: '2021 — 2022', title: 'Monitor de robótica educacional', place: 'Projeto de Robótica como Auxílio Educacional · IFPI', desc: 'Apoio ao ensino de robótica e atividades práticas com estudantes.', tags: ['Robótica', 'Educação'] },
    ],
    labelProjects: '03 / SELEÇÃO',
    projectsTitle: 'PROJETOS\nNA PRÁTICA.',
    projectsIntro: 'Interfaces, iniciativas independentes e experiências que misturam o técnico e o criativo.',
    projectVisit: 'ABRIR PROJETO ↗',
    source: 'CÓDIGO ↗',
    labelGallery: '04 / PORTFÓLIO VISUAL',
    galleryTitle: 'DO RASCUNHO\nAO VISUAL.',
    galleryIntro: 'Trabalhos publicados no meu Behance e apresentados no portfólio que construí para o CIn. Os cards originais foram mantidos como incorporações.',
    galleryCard: 'TRABALHO VISUAL',
    galleryMore: 'VER TODOS NO BEHANCE ↗',
    galleryFallback: 'Abrir no Behance ↗',
    labelSkills: '05 / CAIXA DE FERRAMENTAS',
    skillsTitle: 'O QUE EU\nUSO E FAÇO.',
    skills: [
      { title: 'INTERFACES & WEB', items: ['Figma', 'UI/UX Design', 'React', 'JavaScript', 'HTML / CSS', 'Styled Components', 'Material UI'] },
      { title: 'OFICINA & PROTÓTIPOS', items: ['Modelagem 3D', 'Fusion 360', 'SketchUp', 'Impressão 3D', 'Corte a laser', 'Arduino', 'Raspberry Pi'] },
      { title: 'CRIAÇÃO & COMUNICAÇÃO', items: ['Identidade visual', 'Fotografia', 'Produção de conteúdo', 'Diagramação', 'Comunicação de projetos'] },
    ],
    labelContact: '06 / CONTATO',
    contactTitle: 'TEM UMA IDEIA?\nBORA FAZER.',
    contactText: 'Aberto a conversas, projetos e colaborações entre design, tecnologia, fabricação digital e iniciativas culturais.',
    emailAction: 'ME MANDA UM E-MAIL ↗',
    socialLabel: 'ME ENCONTRE POR AÍ',
    copy: 'Feito com curiosidade, código e algumas boas ideias.',
    top: 'VOLTAR AO TOPO ↑',
    cv: 'CURRÍCULO LATTES ↗',
    scroll: 'DESLIZE PARA EXPLORAR ↓',
    language: 'Mudar idioma',
    menu: 'Abrir menu',
    sourceLabel: 'Projetos do portfólio CIn',
  },
  en: {
    navigation: { about: 'About', experience: 'Journey', projects: 'Projects', gallery: 'Design', skills: 'Toolbox', contact: 'Contact' },
    eyebrow: 'RECIFE, BRAZIL  /  DESIGN + TECHNOLOGY',
    heroTop: "HEY, I'M",
    heroName: 'LUIS EDUARDO',
    heroName2: 'LUSTOSA.',
    heroText: 'Between digital and physical. I design interfaces, experiment with digital fabrication and build projects bringing technology, culture and people together.',
    heroAction: 'SEE PROJECTS',
    heroSecond: 'GET IN TOUCH',
    heroSticker: 'MAKING IT REAL ↗',
    labelAbout: '01 / ABOUT',
    aboutTitle: 'HANDS-ON,\nOUT IN THE WORLD.',
    aboutLead: 'Designer, Information Systems student at UFPE and maker culture enthusiast.',
    aboutText: 'Originally from Piauí and now based in Recife, I work across design, front-end development, 3D prototyping and communication. I love understanding a challenge, designing a solution and actually building it.',
    aboutText2: 'My background includes educational robotics, fabrication labs, embedded systems and social impact initiatives. Off-screen, I am into photography, bicycles, music, street art and agroecology.',
    aboutStamp: 'DESIGN / CODE / WORKSHOP',
    based: 'FROM TERESINA TO RECIFE',
    educationTitle: 'EDUCATION',
    education: [
      ['2026 — PRESENT', 'BSc in Information Systems', 'Federal University of Pernambuco · CIn'],
      ['2024 — 2025', 'Computer Engineering', 'UFPE · discontinued degree'],
      ['2021 — 2023', 'High school and technical training in IT', 'Federal Institute of Piauí · IFPI'],
    ],
    labelExperience: '02 / EXPERIENCE',
    experienceTitle: 'THE ROAD\nSO FAR.',
    experienceIntro: 'Creative and technical work across university outreach, teams and projects.',
    experience: [
      { date: '2026', title: 'Designer · Cincoders', place: 'Software Factory · UFPE', desc: 'Interface design, Figma prototyping and collaboration on digital products focused on social impact.', tags: ['UI/UX', 'Figma', 'Front-end'] },
      { date: 'CURRENT ROLE', title: 'Coordination & Communications', place: 'Feira Agroecológica da Várzea', desc: 'Visual communication and community coordination for a local agroecology initiative.', tags: ['Communication', 'Design', 'Agroecology'] },
      { date: '2024 — 2026', title: 'Lab Monitor · GREA3D', place: '3D Artifacts Experimentation Lab · UFPE', desc: '3D modeling and printing, equipment maintenance, digital fabrication and hands-on workshops.', tags: ['3D printing', 'Prototyping', 'Digital fabrication'] },
      { date: '2025', title: 'Communications & Media Secretary', place: 'LASER · Embedded Systems Academic League', desc: 'Institutional communication, events and outreach around embedded systems.', tags: ['Embedded systems', 'Communication'] },
      { date: '2024 — 2025', title: '3D Modeling & Prototyping', place: 'Monan · UFPE', desc: 'Development of digital models and physical prototypes in a social-impact technology initiative.', tags: ['3D modeling', 'Prototypes'] },
      { date: '2021 — 2022', title: 'Educational Robotics Monitor', place: 'Educational Robotics Project · IFPI', desc: 'Teaching support and practical robotics activities with students.', tags: ['Robotics', 'Education'] },
    ],
    labelProjects: '03 / SELECTED WORK',
    projectsTitle: 'PROJECTS\nIN ACTION.',
    projectsIntro: 'Interfaces, independent initiatives and experiments combining technical and creative practice.',
    projectVisit: 'VIEW PROJECT ↗',
    source: 'SOURCE ↗',
    labelGallery: '04 / VISUAL WORK',
    galleryTitle: 'FROM SKETCH\nTO VISUAL.',
    galleryIntro: 'Work published on my Behance and showcased on the portfolio I made for CIn. The original cards are preserved as embeds.',
    galleryCard: 'VISUAL PROJECT',
    galleryMore: 'ALL WORK ON BEHANCE ↗',
    galleryFallback: 'Open on Behance ↗',
    labelSkills: '05 / TOOLBOX',
    skillsTitle: 'TOOLS &\nPRACTICE.',
    skills: [
      { title: 'INTERFACES & WEB', items: ['Figma', 'UI/UX Design', 'React', 'JavaScript', 'HTML / CSS', 'Styled Components', 'Material UI'] },
      { title: 'MAKING & PROTOTYPES', items: ['3D modeling', 'Fusion 360', 'SketchUp', '3D printing', 'Laser cutting', 'Arduino', 'Raspberry Pi'] },
      { title: 'DESIGN & COMMUNICATION', items: ['Brand identity', 'Photography', 'Content creation', 'Editorial layout', 'Project communications'] },
    ],
    labelContact: '06 / CONTACT',
    contactTitle: 'GOT AN IDEA?\nLET’S MAKE IT.',
    contactText: 'Open to projects and collaborations across design, technology, digital fabrication and culture.',
    emailAction: 'SEND ME AN EMAIL ↗',
    socialLabel: 'FIND ME ONLINE',
    copy: 'Made with curiosity, code and a few good ideas.',
    top: 'BACK TO TOP ↑',
    cv: 'LATTES CV ↗',
    scroll: 'SCROLL TO EXPLORE ↓',
    language: 'Change language',
    menu: 'Open menu',
    sourceLabel: 'Projects from my CIn portfolio',
  },
}

const ids = ['about', 'experience', 'projects', 'gallery', 'skills', 'contact']
const links = [
  { name: 'GITHUB', href: 'https://github.com/neoonzy' },
  { name: 'BEHANCE', href: 'https://www.behance.net/lustosabr' },
  { name: 'INSTAGRAM', href: 'https://www.instagram.com/neoonzy/' },
  { name: 'LATTES', href: 'http://lattes.cnpq.br/2980803847545519' },
]
const email = 'luiseduardolustosab@gmail.com'
const br = (value) => value.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)

function SectionHeading({ label, title, intro }) {
  return <div className="section-heading">
    <span className="eyebrow">{label}</span>
    <h2 className="section-title">{br(title)}</h2>
    {intro && <p className="section-intro">{intro}</p>}
  </div>
}

export default function App() {
  const [lang, setLang] = useState(() => window.localStorage.getItem('luis-portfolio-language') === 'en' ? 'en' : 'pt')
  const [menuOpen, setMenuOpen] = useState(false)
  const c = content[lang]

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    document.title = lang === 'pt' ? 'Luis Eduardo Lustosa — Design, Tecnologia & Fabricação Digital' : 'Luis Eduardo Lustosa — Design, Technology & Digital Fabrication'
    window.localStorage.setItem('luis-portfolio-language', lang)
  }, [lang])

  useEffect(() => {
    const onKeyDown = (event) => { if (event.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return <>
    <a className="skip-link" href="#main">{lang === 'pt' ? 'Pular para o conteúdo' : 'Skip to content'}</a>
    <header className="header">
      <div className="shell header-inner">
        <a href="#top" className="wordmark" onClick={() => setMenuOpen(false)} aria-label="Luis Eduardo Lustosa, início">LE<span className="mark-dot">.</span> <span className="wordmark-caption">LUSTOSA / PORTFOLIO</span></a>
        <nav className={menuOpen ? 'navigation is-open' : 'navigation'} id="main-navigation" aria-label={lang === 'pt' ? 'Navegação principal' : 'Main navigation'}>
          {ids.map(id => <a key={id} href={'#' + id} onClick={() => setMenuOpen(false)}>{c.navigation[id]}</a>)}
        </nav>
        <div className="header-actions">
          <button type="button" className="lang-button" aria-label={c.language} onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}>{lang.toUpperCase()} <span aria-hidden="true">↔</span></button>
          <button type="button" className="menu-button" aria-label={c.menu} aria-controls="main-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '✕' : '☰'}</button>
        </div>
      </div>
    </header>

    <main id="main">
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <div className="hero-label"><span className="status-dot" />{c.eyebrow}</div>
            <div className="hero-title-wrap">
              <p className="hero-kicker">{c.heroTop}</p>
              <h1 id="hero-title" className="hero-title"><span>{c.heroName}</span><span>{c.heroName2}</span></h1>
            </div>
            <p className="hero-description">{c.heroText}</p>
            <div className="actions">
              <a className="button button-dark" href="#projects">{c.heroAction}<span aria-hidden="true">↗</span></a>
              <a className="button button-light" href={'mailto:' + email}>{c.heroSecond}<span aria-hidden="true">↗</span></a>
            </div>
            <a className="scroll-link" href="#about">{c.scroll}</a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-frame">
              <div className="art-top"><span>PORTFOLIO / 2026</span><span>PIAUÍ → RECIFE</span></div>
              <div className="art-big">LE<span>/26</span></div>
              <div className="art-grid">
                <div className="art-cell"><span>01</span><span>DESIGN</span></div>
                <div className="art-cell"><span>02</span><span>TECNOLOGIA</span></div>
                <div className="art-cell"><span>03</span><span>FABRICAÇÃO</span></div>
              </div>
              <div className="art-bottom"><span>FAZER · TESTAR · REFAZER</span><span>↗</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="shell">
          <SectionHeading label={c.labelAbout} title={c.aboutTitle} />
          <div className="about-layout">
            <div className="about-highlight">
              <span className="about-index">{c.labelAbout}</span>
              <p>{c.aboutLead}</p>
              <span className="location-tag">↗ {c.based}</span>
            </div>
            <div className="about-copy">
              <p>{c.aboutText}</p>
              <p>{c.aboutText2}</p>
              <div className="about-stamp">{c.aboutStamp}</div>
            </div>
          </div>
          <div className="education">
            <h3>{c.educationTitle}</h3>
            <div className="education-list">{c.education.map(item => <div className="education-item" key={item[0]}><span>{item[0]}</span><strong>{item[1]}</strong><span>{item[2]}</span></div>)}</div>
          </div>
        </div>
      </section>

      <section className="section experience-section" id="experience">
        <div className="shell">
          <SectionHeading label={c.labelExperience} title={c.experienceTitle} intro={c.experienceIntro} />
          <div className="experience-grid">{c.experience.map((item, i) => <article className="experience-card" key={item.title}>
            <div className="card-index"><span>0{i + 1}</span><span>{item.date}</span></div>
            <h3>{item.title}</h3><p className="experience-place">{item.place}</p><p className="experience-desc">{item.desc}</p>
            <div className="tags">{item.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
          </article>)}</div>
        </div>
      </section>

      <section className="section projects-section" id="projects">
        <div className="shell">
          <SectionHeading label={c.labelProjects} title={c.projectsTitle} intro={c.projectsIntro} />
          <div className="project-grid">{projects.map((project, i) => <article className="project-card" key={project.slug}>
            <div className="project-visual" aria-hidden="true"><div className="project-visual-top"><span>WORK / 0{i + 1}</span><span>↗</span></div><div className="project-monogram">{project.symbol}</div><div className="visual-bottom">{project.category[lang]}</div></div>
            <div className="project-body">
              <div className="project-meta"><span>{project.category[lang]}</span><span>0{i + 1} / 0{projects.length}</span></div>
              <h3>{project.title}</h3>
              <p>{project.description[lang]}</p>
              <div className="tags">{project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
              <div className="project-links">
                <a href={project.url} target="_blank" rel="noreferrer">{c.projectVisit}</a>
                {project.repo && <a href={project.repo} target="_blank" rel="noreferrer">{c.source}</a>}
              </div>
            </div>
          </article>)}</div>
        </div>
      </section>

      <section className="section gallery-section" id="gallery">
        <div className="shell">
          <SectionHeading label={c.labelGallery} title={c.galleryTitle} intro={c.galleryIntro} />
          <div className="gallery-grid">{visualProjects.map((item, i) => <article className="gallery-card" key={item.id}>
            <div className="gallery-heading"><span>{c.galleryCard} / {String(i + 1).padStart(2, '0')}</span><span aria-hidden="true">↗</span></div>
            <iframe title={c.galleryCard + ' ' + (i + 1)} src={'https://www.behance.net/embed/project/' + item.id + '?ilo0=1'} loading="lazy" allowFullScreen allow="clipboard-write" referrerPolicy="strict-origin-when-cross-origin" />
            <div className="gallery-footer"><span>BEHANCE · {item.id}</span><a href={'https://www.behance.net/gallery/' + item.id + '/'} target="_blank" rel="noreferrer">{c.galleryFallback}</a></div>
          </article>)}</div>
          <a className="button button-dark gallery-all" href="https://www.behance.net/lustosabr" target="_blank" rel="noreferrer">{c.galleryMore}</a>
        </div>
      </section>

      <section className="section skills-section" id="skills">
        <div className="shell">
          <SectionHeading label={c.labelSkills} title={c.skillsTitle} />
          <div className="skills-grid">{c.skills.map((group, i) => <article className="skill-panel" key={group.title}>
            <div className="skill-title"><span>0{i + 1} / 03</span><h3>{group.title}</h3></div>
            <div className="skill-tags">{group.items.map(item => <span key={item}>{item}</span>)}</div>
          </article>)}</div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="shell contact-grid">
          <div>
            <span className="eyebrow">{c.labelContact}</span>
            <h2 className="section-title contact-title">{br(c.contactTitle)}</h2>
            <p className="contact-description">{c.contactText}</p>
            <a className="button button-green" href={'mailto:' + email}>{c.emailAction}</a>
            <p className="contact-email">{email}</p>
          </div>
          <div className="contact-right">
            <div className="contact-mark" aria-hidden="true">LE<span>.</span></div>
            <h3>{c.socialLabel}</h3>
            {links.map(link => <a key={link.name} href={link.href} target="_blank" rel="noreferrer">{link.name}<span aria-hidden="true">↗</span></a>)}
          </div>
        </div>
      </section>
    </main>

    <footer className="footer">
      <div className="shell footer-inner">
        <span>© {new Date().getFullYear()} LUIS EDUARDO LUSTOSA</span>
        <span>{c.copy}</span>
        <a href="#top">{c.top}</a>
      </div>
    </footer>
  </>
}
