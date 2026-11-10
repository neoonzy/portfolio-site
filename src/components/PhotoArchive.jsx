import { useEffect, useRef, useState } from 'react'

const photos = [
  {
    slug: 'rua-skate',
    src: '/photography/rua-skate.webp',
    width: 850,
    height: 1062,
    title: { pt: 'Pequenas velocidades', en: 'Small velocities' },
    alt: { pt: 'Criança próxima a um skate e pessoa mais velha em uma rua iluminada pelo sol.', en: 'A child near a skateboard and an older person on a sunlit street.' },
    number: '01',
  },
  {
    slug: 'luz-curral',
    src: '/photography/luz-curral.webp',
    width: 850,
    height: 567,
    title: { pt: 'Luz suspensa', en: 'Suspended light' },
    alt: { pt: 'Pessoa de costas entre animais, banhada por uma luz intensa e alaranjada.', en: 'A person seen from behind among animals in intense warm light.' },
    number: '02',
  },
  {
    slug: 'pescador-rede',
    src: '/photography/pescador-rede.webp',
    width: 760,
    height: 950,
    title: { pt: 'O instante da rede', en: 'Casting the net' },
    alt: { pt: 'Homem lançando uma rede na água, com construções e um ônibus ao fundo.', en: 'A man casting a net into the water, with buildings and a bus in the background.' },
    number: '03',
  },
  {
    slug: 'detalhe-bolsa',
    src: '/photography/detalhe-bolsa.webp',
    width: 760,
    height: 951,
    title: { pt: 'Fragmentos', en: 'Fragments' },
    alt: { pt: 'Fotografia em preto e branco com o detalhe de uma bolsa presa à alça de uma pessoa.', en: 'Black-and-white photograph focusing on a small bag clipped to a shoulder strap.' },
    number: '04',
  },
  {
    slug: 'retrato-feira',
    src: '/photography/retrato-feira.webp',
    width: 850,
    height: 680,
    title: { pt: 'Um sorriso', en: 'A smile' },
    alt: { pt: 'Retrato em preto e branco de uma pessoa idosa sorrindo.', en: 'Black-and-white portrait of an older person smiling.' },
    number: '05',
  },
  {
    slug: 'pessoas-rua',
    src: '/photography/pessoas-rua.webp',
    width: 850,
    height: 478,
    title: { pt: 'A rua conversa', en: 'Street conversations' },
    alt: { pt: 'Cena urbana em preto e branco com pessoas conversando e caminhando.', en: 'Black-and-white street scene of people talking and walking.' },
    number: '06',
  },
]

const captions = {
  pt: {
    label: '04 / FOTOGRAFIA AUTORAL',
    title: 'O QUE EU VEJO\nPELO CAMINHO.',
    description: 'A fotografia é uma maneira de prestar atenção. Pessoas, movimentos, luzes e pequenos acontecimentos da rua também atravessam meu trabalho.',
    category: 'REGISTROS / ENSAIO VISUAL',
    open: 'AMPLIAR FOTOGRAFIA',
    close: 'FECHAR FOTOGRAFIA',
    previous: 'FOTOGRAFIA ANTERIOR',
    next: 'PRÓXIMA FOTOGRAFIA',
    counter: 'IMAGEM',
    footer: 'SEIS REGISTROS / FOTOGRAFIAS FORNECIDAS PARA ESTE PORTFÓLIO',
  },
  en: {
    label: '04 / PERSONAL PHOTOGRAPHY',
    title: 'WHAT I NOTICE\nALONG THE WAY.',
    description: 'Photography is a way of paying attention. People, movement, light and small moments in the street also shape the way I work.',
    category: 'OBSERVATIONS / VISUAL ESSAY',
    open: 'EXPAND PHOTOGRAPH',
    close: 'CLOSE PHOTOGRAPH',
    previous: 'PREVIOUS PHOTOGRAPH',
    next: 'NEXT PHOTOGRAPH',
    counter: 'IMAGE',
    footer: 'SIX FRAMES / PHOTOGRAPHS PROVIDED FOR THIS PORTFOLIO',
  },
}

export default function PhotoArchive({ lang }) {
  const c = captions[lang] || captions.pt
  const [selected, setSelected] = useState(null)
  const dialog = useRef(null)
  const lastTrigger = useRef(null)

  const openPhoto = (index, trigger) => {
    setSelected(index)
    lastTrigger.current = trigger
    if (!dialog.current?.open) dialog.current?.showModal()
  }

  const closePhoto = () => dialog.current?.close()

  useEffect(() => {
    if (selected === null || !dialog.current?.open) return undefined

    const keydown = (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        setSelected((prev) => (prev + 1) % photos.length)
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setSelected((prev) => (prev + photos.length - 1) % photos.length)
      }
    }
    window.addEventListener('keydown', keydown)
    return () => window.removeEventListener('keydown', keydown)
  }, [selected])

  return (
    <section className="section photography-section" id="photography" aria-labelledby="photography-title">
      <div className="shell">
        <div className="photography-heading">
          <span className="eyebrow">{c.label}</span>
          <div>
            <h2 className="section-title" id="photography-title">{c.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h2>
            <p className="section-intro">{c.description}</p>
          </div>
          <span className="photography-heading-index">01 — 06 / 2026</span>
        </div>

        <div className="photo-archive-grid">
          {photos.map((photo, index) => (
            <figure className={'photo-tile photo-tile-' + (index + 1)} key={photo.slug}>
              <button type="button" className="photo-open" onClick={(event) => openPhoto(index, event.currentTarget)} aria-label={c.open + ': ' + photo.title[lang]}>
                <img src={photo.src} width={photo.width} height={photo.height} loading="lazy" decoding="async" alt={photo.alt[lang]} />
                <span aria-hidden="true" className="photo-expand">↗</span>
              </button>
              <figcaption><span>{photo.number} / {photo.title[lang]}</span><span>↗</span></figcaption>
            </figure>
          ))}
        </div>
        <div className="photo-archive-footer"><span>{c.footer}</span><span>{c.category}</span></div>
      </div>

      <dialog
        className="photo-lightbox"
        ref={dialog}
        aria-label={selected === null ? c.category : photos[selected].title[lang]}
        onClose={() => {
          setSelected(null)
          lastTrigger.current?.focus()
        }}
        onClick={(event) => { if (event.target === dialog.current) closePhoto() }}
      >
        {selected !== null && (
          <div className="photo-lightbox-inner">
            <div className="photo-lightbox-top">
              <span>{c.category}</span>
              <button type="button" onClick={closePhoto} aria-label={c.close}>{c.close} ✕</button>
            </div>
            <div className="photo-lightbox-image">
              <img
                key={photos[selected].slug}
                src={photos[selected].src}
                width={photos[selected].width}
                height={photos[selected].height}
                alt={photos[selected].alt[lang]}
              />
            </div>
            <div className="photo-lightbox-footer">
              <button type="button" onClick={() => setSelected((selected + photos.length - 1) % photos.length)} aria-label={c.previous}>← <span>{c.previous}</span></button>
              <span>{c.counter} {photos[selected].number} / 06 — {photos[selected].title[lang]}</span>
              <button type="button" onClick={() => setSelected((selected + 1) % photos.length)} aria-label={c.next}><span>{c.next}</span> →</button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}
