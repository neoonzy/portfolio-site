import { useState } from 'react'
import { visualProjects } from '../data/projects.js'

/*
 * Behance previews are optional: embedders sometimes block third-party
 * content, so the user must never be left with an empty grey rectangle.
 */
const behance = visualProjects.filter(item => item.kind === 'behance')
const mapeia = visualProjects.find(item => item.kind === 'mapeia')
const works = [...behance.slice(0, 4), ...(mapeia ? [mapeia] : []), ...behance.slice(4)]

function BehanceCard({ item, index, lang, c }) {
  const [loaded, setLoaded] = useState(false)
  const pt = lang === 'pt'
  return <article className="gallery-card" key={item.id}>
    <div className="gallery-heading">
      <span>{c.galleryCard} / {String(index+1).padStart(2,'0')}</span><span>BEHANCE</span>
    </div>
    <div className="behance-visual">
      {loaded
        ? <>
            <div className="behance-loaded-head">
              <span>{pt ? 'PRÉVIA EXTERNA / SE NÃO CARREGAR, USE O LINK ABAIXO' : 'EXTERNAL PREVIEW / USE THE LINK BELOW IF UNAVAILABLE'}</span>
              <button type="button" onClick={() => setLoaded(false)}>{pt ? 'FECHAR' : 'CLOSE'} ×</button>
            </div>
            <iframe title={(pt?'Prévia do trabalho visual ':'Visual work preview ')+(index+1)}
              src={'https://www.behance.net/embed/project/'+item.id+'?ilo0=1'} loading="lazy"
              allow="clipboard-write" referrerPolicy="strict-origin-when-cross-origin" />
          </>
        : <div className="behance-teaser">
            <div className="behance-teaser-top"><span>{pt ? 'ARQUIVO VISUAL' : 'VISUAL ARCHIVE'}</span><span>0{index+1} / 0{works.length}</span></div>
            <strong aria-hidden="true">{String(index+1).padStart(2,'0')}.</strong>
            <div className="behance-teaser-footer">
              <span>{pt ? 'TRABALHO NO BEHANCE' : 'WORK ON BEHANCE'}</span>
              <button type="button" onClick={() => setLoaded(true)} aria-label={pt ? 'Carregar prévia externa do trabalho '+(index+1) : 'Load external preview of work '+(index+1)}>
                {pt ? 'CARREGAR PRÉVIA' : 'LOAD PREVIEW'} ↗
              </button>
            </div>
          </div>}
    </div>
    <div className="gallery-footer">
      <span>BEHANCE · {item.id}</span>
      <a href={'https://www.behance.net/gallery/'+item.id+'/'} target="_blank" rel="noopener noreferrer">{c.galleryFallback}</a>
    </div>
  </article>
}

export default function VisualGallery({ lang, c }) {
  const [expanded, setExpanded] = useState(false)
  const shown = expanded ? works : works.slice(0, 5)
  const more = works.length - 5
  return <>
    <div className="gallery-grid" id="gallery-items">
      {shown.map((item,index)=>item.kind==='behance'
        ? <BehanceCard item={item} index={index} lang={lang} c={c} key={item.id} />
        : <a className="gallery-card gallery-mapeia" key={item.slug} href={item.url} target="_blank" rel="noopener noreferrer">
            <div className="gallery-heading"><span>{c.galleryCard} / {String(index+1).padStart(2,'0')}</span><span aria-hidden="true">↗</span></div>
            <div className="gallery-preview"><img src={item.image} alt={item.alt[lang]} loading="lazy" decoding="async" /></div>
            <div className="gallery-footer"><strong>{item.title}</strong><span>{item.type[lang]} ↗</span></div>
          </a>)}
    </div>
    {more > 0 && <div className="gallery-controls">
      <button type="button" className="gallery-load-more" aria-expanded={expanded} aria-controls="gallery-items"
        onClick={()=>setExpanded(value=>!value)}>
        {expanded ? (lang==='pt'?'MOSTRAR MENOS':'SHOW FEWER')
          : (lang==='pt'? `VER MAIS ${more} TRABALHOS` : `SHOW ${more} MORE WORKS`)}
        <span aria-hidden="true">{expanded ? '↑' : '↓'}</span>
      </button>
    </div>}
    <a className="button button-dark gallery-all" href="https://www.behance.net/lustosabr" target="_blank" rel="noopener noreferrer">{c.galleryMore}</a>
  </>
}
