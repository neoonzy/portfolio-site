import { useEffect, useMemo, useRef, useState } from 'react'

const DURATION = 30
const WORD_SETS = {
  pt: [
    'cidade', 'ideia', 'movimento', 'projeto', 'teclado', 'cultura', 'criar', 'tempo',
    'design', 'caminho', 'oficina', 'arquivo', 'imagem', 'codigo', 'experiencia', 'rua',
    'tecnologia', 'pesquisa', 'ritmo', 'prototipo', 'inventar', 'explorar', 'construir', 'pessoas',
  ],
  en: [
    'city', 'idea', 'motion', 'project', 'keyboard', 'culture', 'create', 'time',
    'design', 'journey', 'studio', 'archive', 'image', 'code', 'experience', 'street',
    'technology', 'research', 'rhythm', 'prototype', 'invent', 'explore', 'build', 'people',
  ],
}

const copy = {
  pt: {
    heading: 'KEEP', subheading: 'TYPING', eyebrow: '01 / CLASSIC — PT-BR — 30S', run: 'SOLO RUN',
    solo: 'PARTIDA SOLO', word: 'PALAVRA', time: 'TIME LEFT', speed: 'SPEED', accuracy: 'ACCURACY',
    combo: 'COMBO', text: 'TEXTO', idle: 'O TEMPO COMEÇA NA PRIMEIRA TECLA',
    running: 'DIGITE A PALAVRA E PRESSIONE ESPAÇO', typing: 'SUA DIGITAÇÃO',
    placeholder: 'toque aqui e comece a digitar...', help: 'ERROU? USE BACKSPACE. ESPAÇO OU ENTER AVANÇA PARA A PRÓXIMA PALAVRA.',
    reset: 'REINICIAR', points: 'PTS', best: 'BEST COMBO', disclaimer: 'MINI DEMO · PARTIDA LOCAL · NÃO OFICIAL',
    finished: 'BOA PARTIDA.', result: 'TEMPO ESGOTADO / MINI DEMO', again: 'TENTAR DE NOVO', visit: 'JOGAR NO TYPEEE',
  },
  en: {
    heading: 'KEEP', subheading: 'TYPING', eyebrow: '01 / CLASSIC — EN — 30S', run: 'SOLO RUN',
    solo: 'SOLO GAME', word: 'WORD', time: 'TIME LEFT', speed: 'SPEED', accuracy: 'ACCURACY',
    combo: 'COMBO', text: 'TEXT', idle: 'TIMER STARTS ON THE FIRST KEY',
    running: 'TYPE THE WORD, THEN PRESS SPACE', typing: 'YOUR TYPING',
    placeholder: 'tap here and start typing...', help: 'BACKSPACE TO CORRECT. SPACE OR ENTER MOVES TO THE NEXT WORD.',
    reset: 'RESTART', points: 'PTS', best: 'BEST COMBO', disclaimer: 'MINI DEMO · LOCAL SESSION · UNRANKED',
    finished: 'GOOD GAME.', result: 'TIME IS UP / MINI DEMO', again: 'TRY AGAIN', visit: 'PLAY TYPEEE',
  },
}

function initialGame() {
  return { phase: 'idle', index: 0, draft: '', total: 0, correct: 0, combo: 0, bestCombo: 0, points: 0, remaining: DURATION }
}

function wordAccuracy(draft, word) {
  const characters = Array.from(draft)
  const expected = Array.from(word)
  return characters.reduce((sum, char, i) => sum + (char === expected[i] ? 1 : 0), 0)
}

export default function StudioPanel({ lang }) {
  const c = copy[lang] || copy.pt
  const words = WORD_SETS[lang] || WORD_SETS.pt
  const [game, setGame] = useState(initialGame)
  const startedAt = useRef(null)
  const inputRef = useRef(null)
  const composing = useRef(false)
  const gameRef = useRef(game)
  gameRef.current = game

  useEffect(() => { startedAt.current = null; setGame(initialGame()) }, [lang])

  useEffect(() => {
    if (game.phase !== 'running') return
    const interval = window.setInterval(() => {
      const remaining = Math.max(0, DURATION - (Date.now() - startedAt.current) / 1000)
      setGame(previous => previous.phase !== 'running' ? previous : ({
        ...previous,
        remaining,
        phase: remaining === 0 ? 'finished' : previous.phase,
      }))
    }, 120)
    return () => window.clearInterval(interval)
  }, [game.phase])

  const activeWord = words[game.index % words.length]
  const liveCorrect = wordAccuracy(game.draft, activeWord)
  const elapsed = game.phase === 'idle' ? 0 : Math.max(.001, DURATION - game.remaining)
  const wpm = Math.max(0, Math.round((game.correct + liveCorrect) / 5 / (elapsed / 60))) || 0
  const accuracy = game.total + game.draft.length
    ? Math.round((game.correct + liveCorrect) / (game.total + game.draft.length) * 100)
    : 100
  const visibleWords = useMemo(() => Array.from({ length: 14 }, (_, n) => words[(game.index + n) % words.length]), [words, game.index])

  const restart = () => {
    startedAt.current = null
    setGame(initialGame())
    if (document.activeElement === inputRef.current) inputRef.current?.focus()
  }

  const completeWord = raw => {
    if (gameRef.current.phase === 'finished') return
    const typedWord = raw.trim().split(/\\s+/)[0]
    if (!typedWord) return
    const current = gameRef.current
    const word = words[current.index % words.length]
    const correct = wordAccuracy(typedWord, word)
    const matched = typedWord === word
    setGame(previous => ({
      ...previous,
      phase: previous.phase === 'idle' ? 'running' : previous.phase,
      draft: '',
      index: previous.index + 1,
      total: previous.total + Array.from(typedWord).length,
      correct: previous.correct + correct,
      combo: matched ? previous.combo + 1 : 0,
      bestCombo: Math.max(previous.bestCombo, matched ? previous.combo + 1 : 0),
      points: previous.points + (matched ? word.length * 10 : correct * 3),
    }))
  }
  const onChange = event => {
    if (gameRef.current.phase === 'finished') return
    const raw = event.target.value
    if (gameRef.current.phase === 'idle' && raw.length > 0 && !startedAt.current) startedAt.current = Date.now()
    if (!composing.current && /\\s/.test(raw)) completeWord(raw)
    else setGame(previous => ({
      ...previous,
      phase: previous.phase === 'idle' && raw.length ? 'running' : previous.phase,
      draft: raw,
    }))
  }
  const onKeyDown = event => {
    if (event.key === 'Enter' && !event.isComposing && !composing.current) {
      event.preventDefault()
      completeWord(event.currentTarget.value)
    }
  }

  return (
    <div className="typeee-embed" aria-label={lang === 'pt' ? 'Demonstração do modo Classic do Typeee' : 'Typeee Classic mode demo'}>
      <div className="typeee-embed-top">
        <a className="typeee-brand" href="https://typeee.quest" target="_blank" rel="noopener noreferrer" aria-label="Abrir Typeee">typeee<span>/</span></a>
        <span>EST. 2026 — THE TYPING CLUB</span>
        <span className="typeee-embed-demo">DEMO / 001</span>
      </div>
      <div className="typeee-breadcrumb"><span>{c.eyebrow}</span><span>{c.run}</span></div>
      <div className="typeee-arena">
        {game.phase === 'finished' ? (
          <div className="typeee-embed-result" role="status">
            <span className="typeee-caption">{c.result}</span>
            <h3>{c.finished}<span>/</span></h3>
            <div className="typeee-result-metrics">
              <div><span>WPM</span><strong>{wpm}</strong></div>
              <div><span>ACC.</span><strong>{accuracy}%</strong></div>
              <div><span>{c.best}</span><strong>{game.bestCombo}×</strong></div>
            </div>
            <button type="button" className="typeee-result-restart" onClick={restart}>{c.again} <span aria-hidden="true">↗</span></button>
          </div>
        ) : (
          <>
            <div className="typeee-arena-header">
              <h3>{c.heading}<span>{c.subheading}<i>.</i></span></h3>
              <span>{c.solo}<br/>{c.word} {String(game.index + 1).padStart(3,'0')}</span>
            </div>
            <div className="typeee-hud" aria-label={lang === 'pt' ? 'Estatísticas da partida' : 'Game stats'}>
              <div><span>{c.time}</span><strong>{String(Math.ceil(game.remaining)).padStart(2,'0')}<small>S</small></strong></div>
              <div><span>{c.speed}</span><strong>{wpm}<small>WPM</small></strong></div>
              <div><span>{c.accuracy}</span><strong>{accuracy}<small>%</small></strong></div>
              <div><span>{c.combo}</span><strong>{game.combo}<small>X</small></strong></div>
            </div>
            <div className="typeee-meter" role="progressbar" aria-label={c.time} aria-valuemin={0} aria-valuemax={DURATION} aria-valuenow={Math.round(DURATION - game.remaining)}>
              <span style={{ width: ((DURATION - game.remaining) / DURATION * 100) + '%' }} />
            </div>
            <div className="typeee-typing">
              <div className="typeee-caption"><span>{c.text} / {String(game.index + 1).padStart(3,'0')}</span><span>{game.phase === 'idle' ? c.idle : c.running}</span></div>
              <div className="typeee-words" aria-label={visibleWords.join(' ')}>
                {visibleWords.map((word,n) => (
                  <span key={game.index + '-' + n} className={'typeee-word' + (n === 0 ? ' is-active' : '')} aria-hidden="true">
                    {Array.from(word).map((char,i) => (
                      <span key={i} className={n !== 0 || game.draft[i] === undefined ? '' : game.draft[i] === char ? 'is-correct' : 'is-incorrect'}>{char}</span>
                    ))}
                    {n === 0 && game.draft.length > word.length && <span className="is-incorrect">{game.draft.slice(word.length)}</span>}
                  </span>
                ))}
              </div>
              <div className="typeee-input-heading">
                <label htmlFor="typeee-preview-input" className="typeee-typing-label">{c.typing}</label>
                {game.phase === 'idle' && <button type="button" className="typeee-start" onClick={() => inputRef.current?.focus()}>{lang === 'pt' ? 'COMEÇAR DESAFIO ↗' : 'START CHALLENGE ↗'}</button>}
              </div>
              <input id="typeee-preview-input" ref={inputRef} type="text" value={game.draft}
                autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck={false}
                onChange={onChange} onKeyDown={onKeyDown}
                onCompositionStart={() => { composing.current = true }}
                onCompositionEnd={event => { composing.current = false; onChange(event) }}
                inputMode="text" enterKeyHint="next"
                className="typeee-input" placeholder={c.placeholder}
                aria-describedby="typeee-preview-help"
                onPaste={e => e.preventDefault()} onDrop={e => e.preventDefault()} />
              <p id="typeee-preview-help" className="typeee-help">{c.help}</p>
            </div>
            <div className="typeee-arena-footer">
              <div><span>{c.points} / {game.points}</span><span>{c.best} / {game.bestCombo}</span></div>
              <button type="button" onClick={restart}>↻ {c.reset}</button>
            </div>
          </>
        )}
      </div>
      <div className="typeee-embed-bottom">
        <span>{c.disclaimer}</span>
        <a href="https://typeee.quest" target="_blank" rel="noopener noreferrer">{c.visit} ↗</a>
      </div>
    </div>
  )
}
