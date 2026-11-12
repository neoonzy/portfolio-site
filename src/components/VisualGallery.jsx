import { useState } from 'react'
import { visualProjects } from '../data/projects.js'

/* Display four live previews initially instead of creating eight third-party iframes. */
const behance = visualProjects.filter(item => item.kind === 'behance')
const mapeia = visualProjects.find(item => item.kind === 'mapeia')
const works = [...behance.slice(0, 4), ...(mapeia ? [mapeia] : []), ...behance.slice(4)]

export default function VisualGallery({ lang, c }) {
  const [expanded, setExpanded] = useState(false)
  const shown = expanded ? works : works.slice(0, 5)
  const more = works.length - 5
  return <>
    <div className="gallery-grid" id="gallery-items">
      {shown.map((item,index)=>item.kind==='behance'
        ? <article className="gallery-card" key={item.id}>
            <div className="gallery-heading"><span>{c.galleryCard} / {String(index+1).padStart(2,'0')}</span><span>BEHANCE</span></div>
            <iframe title={(lang==='pt'?'Prévia do trabalho visual ':'Visual work preview ')+(index+1)}
              src={'https://www.behance.net/embed/project/'+item.id+'?ilo0=1'} loading="lazy"
              allow="clipboard-write" referrerPolicy="strict-origin-when-cross-origin" />
            <div className="gallery-footer"><span>BEHANCE · {item.id}</span>
              <a href={'https://www.behance.net/gallery/'+item.id+'/'} target="_blank" rel="noopener noreferrer">{c.galleryFallback}</a>
            </div>
          </article>
        : <a className="gallery-card gallery-mapeia" key={item.slug} href={item.url} target="_blank" rel="noopener noreferrer">
            <div className="gallery-heading"><span>{c.galleryCard} / {String(index+1).padStart(2,'0')}</span><span aria-hidden="true">↗</span></div>
            <div className="gallery-preview"><img src={item.image} alt={item.alt[lang]} loading="lazy" decoding="async" /></div>
            <div className="gallery-footer"><strong>{item.title}</strong><span>{item.type[lang]} ↗</span></div>
          </a>)}
    </div>
    {more > 0 && <div className="gallery-controls">
      <button type="button" className="gallery-load-more" aria-expanded={expanded} aria-controls="gallery-items"
        onClick={()=>setExpanded(value=>!value)}>
        {expanded
          ? (lang==='pt'?'MOSTRAR MENOS':'SHOW FEWER')
          : (lang==='pt'? `VER MAIS ${more} TRABALHOS` : `SHOW ${more} MORE WORKS`)}
        <span aria-hidden="true">{expanded ? '↑' : '↓'}</span>
      </button>
    </div>}
    <a className="button button-dark gallery-all" href="https://www.behance.net/lustosabr" target="_blank" rel="noopener noreferrer">{c.galleryMore}</a>
  </>
}
