import { useEffect, useRef, useState } from 'react'

const photographs = [
  { path:'/photography/rua-skate.webp', pt:'RUA / SKATE', en:'STREET / SKATE', altPt:'Pessoas na rua em uma cena urbana com skate', altEn:'People in an urban street scene with a skateboard', color:'#e5d5ab', width:850, height:1062 },
  { path:'/photography/pescador-rede.webp', pt:'ÁGUA / TRABALHO', en:'WATER / WORK', altPt:'Pessoa lançando uma rede de pesca junto à água', altEn:'Person casting a fishing net by the water', color:'#cad9cf', width:760, height:950 },
  { path:'/photography/detalhe-bolsa.webp', pt:'CORPO / OBJETO', en:'BODY / OBJECT', altPt:'Fotografia em preto e branco de detalhes de roupas e bolsa', altEn:'Black and white photograph of clothing and a bag', color:'#bebeba', width:760, height:951 },
  { path:'/photography/retrato-feira.webp', pt:'FEIRA / RETRATO', en:'MARKET / PORTRAIT', altPt:'Retrato fotográfico em preto e branco de uma pessoa sorrindo', altEn:'Black and white portrait of a smiling person', color:'#bdbdb8', width:850, height:680 },
  { path:'/photography/luz-curral.webp', pt:'LUZ / INTERIOR', en:'LIGHT / INTERIOR', altPt:'Cena rural iluminada por luz quente e baixa', altEn:'Rural scene in warm low light', color:'#d7b39c', width:850, height:567 },
  { path:'/photography/pessoas-rua.webp', pt:'ENCONTROS / RUA', en:'STREET / ENCOUNTERS', altPt:'Grupo de pessoas em uma cena de rua em preto e branco', altEn:'Group of people in a black and white street scene', color:'#cacac5', width:850, height:478 },
]

export default function PhotographicContactSheet({ lang, onClose }) {
  const [selected,setSelected]=useState(0)
  const pt=lang==='pt'
  const active=photographs[selected]
  const initialTouch=useRef(null)
  const change=delta=>setSelected(current=>(current+delta+photographs.length)%photographs.length)

  useEffect(()=>{
    const onKey=event=>{
      if(event.key==='ArrowLeft'){event.preventDefault();change(-1)}
      if(event.key==='ArrowRight'){event.preventDefault();change(1)}
    }
    document.addEventListener('keydown',onKey)
    return()=>document.removeEventListener('keydown',onKey)
  },[])

  return <section className="ex-photo-wall" role="dialog" aria-modal="true"
    aria-label={pt?'Arquivo de fotografia autoral':'Original photography archive'}>
    <div className="ex-photo-top">
      <div><span>LE° / 2026</span><strong>{pt?'CADERNO FOTOGRÁFICO':'PHOTO NOTEBOOK'}</strong></div>
      <span className="ex-photo-count">{String(selected+1).padStart(2,'0')} / 06</span>
      <button type="button" onClick={onClose} aria-label={pt?'Fechar caderno fotográfico':'Close photo notebook'}>{pt?'FECHAR':'CLOSE'} <span aria-hidden="true">×</span></button>
    </div>
    <div className="ex-photo-stage">
      <div className="ex-photo-aside">
        <span>{pt?'REGISTROS AUTORAIS':'ORIGINAL RECORDS'}</span>
        <h2>{pt?'O QUE\nFICA\nNA RUA.':'WHAT\nSTAYS\nOUTSIDE.'}</h2>
        <p>{pt?'Fotografar é prestar atenção. Um recorte de pessoas, lugares, trabalho, movimento e pequenos encontros.':'Photography is paying attention. Fragments of people, places, work, movement and chance encounters.'}</p>
        <div className="ex-photo-controls">
          <button type="button" onClick={()=>change(-1)} aria-label={pt?'Fotografia anterior':'Previous photograph'}>←</button>
          <button type="button" onClick={()=>change(1)} aria-label={pt?'Próxima fotografia':'Next photograph'}>→</button>
        </div>
      </div>
      <figure className="ex-photo-feature" onTouchStart={event=>{initialTouch.current=event.touches[0]?.clientX??null}}
        onTouchEnd={event=>{
          if(initialTouch.current===null)return
          const dx=(event.changedTouches[0]?.clientX??initialTouch.current)-initialTouch.current
          if(Math.abs(dx)>50)change(dx>0?-1:1)
          initialTouch.current=null
        }}>
        <div className="ex-photo-mat" style={{background:active.color}}>
          <img src={active.path} alt={pt?active.altPt:active.altEn}
            width={active.width} height={active.height} decoding="async" fetchPriority="high"/>
        </div>
        <figcaption><span>{pt?'FOTOGRAFIA / ORIGINAL':'PHOTOGRAPH / ORIGINAL'}</span><strong>{pt?active.pt:active.en}</strong><span>{String(selected+1).padStart(2,'0')} / 06</span></figcaption>
      </figure>
    </div>
    <div className="ex-photo-strip" role="group" aria-label={pt?'Escolher fotografia':'Choose a photograph'}>
      {photographs.map((photo,i)=><button type="button" className={i===selected?'active':''} key={photo.path}
        onClick={()=>setSelected(i)} aria-pressed={selected===i}
        aria-label={`${String(i+1).padStart(2,'0')} / ${pt?photo.pt:photo.en}`}>
        <img src={photo.path} alt="" width={photo.width} height={photo.height} loading="lazy" decoding="async" />
        <span>{String(i+1).padStart(2,'0')}</span>
      </button>)}
    </div>
    <div className="ex-photo-bottom"><span>{pt?'RECIFE / PI / BRASIL — ARQUIVO EM CONSTRUÇÃO':'RECIFE / PI / BRAZIL — AN OPEN ARCHIVE'}</span><span>{pt?'← → PARA NAVEGAR':'← → TO NAVIGATE'}</span></div>
  </section>
}
