import { useEffect, useState } from 'react'

const language = {
  pt: {
    eyebrow: 'TYPEEE.QUEST / MINI DESAFIO',
    title: 'Uma frase. Um teclado. Valendo.',
    instructions: 'Experimente um pedacinho do Typeee aqui mesmo. Sem conta, sem cronômetro obrigatório.',
    sentences: ['ideias boas viram coisas reais.', 'a cidade também é um laboratório.', 'tudo começa com uma pergunta.'],
    input: 'Digite o texto acima',
    placeholder: 'Comece a digitar…',
    accuracy: 'PRECISÃO',
    progress: 'PROGRESSO',
    restart: 'REINICIAR',
    next: 'OUTRA FRASE',
    done: 'Boa! Desafio concluído.',
    error: 'Algumas letras estão diferentes. Você pode corrigir.',
    link: 'JOGAR NO TYPEEE',
    foot: 'UMA AMOSTRA DO PROJETO / TYPEEE',
  },
  en: {
    eyebrow: 'TYPEEE.QUEST / MINI CHALLENGE',
    title: 'One sentence. One keyboard. Go.',
    instructions: 'Try a little piece of Typeee right here. No account, no countdown required.',
    sentences: ['good ideas become real things.', 'the city is also a workshop.', 'everything starts with a question.'],
    input: 'Type the sentence above',
    placeholder: 'Start typing…',
    accuracy: 'ACCURACY',
    progress: 'PROGRESS',
    restart: 'RESTART',
    next: 'NEW SENTENCE',
    done: 'Nice! Challenge completed.',
    error: 'A few characters differ. You can correct them.',
    link: 'PLAY TYPEEE',
    foot: 'A SMALL TASTE OF THE PROJECT / TYPEEE',
  },
}

export default function StudioPanel({ lang }) {
  const [round, setRound] = useState(0)
  const [typed, setTyped] = useState('')
  const c = language[lang] || language.pt
  const target = Array.from(c.sentences[round])
  const entered = Array.from(typed)
  const correct = entered.reduce((count, letter, i) => count + (letter === target[i] ? 1 : 0), 0)
  const accuracy = entered.length ? Math.round(correct / entered.length * 100) : 100
  const progress = Math.round(entered.length / target.length * 100)
  const complete = typed === c.sentences[round]
  const hasMistakes = correct !== entered.length

  useEffect(() => { setTyped(''); setRound(0) }, [lang])

  return (
    <div className="studio-typeee" aria-label={lang === 'pt' ? 'Mini desafio de digitação Typeee' : 'Typeee mini typing challenge'}>
      <div className="studio-typeee-bar"><span>{c.eyebrow}</span><span className="studio-typeee-dot">● LIVE</span></div>
      <div className="studio-typeee-body">
        <div className="studio-typeee-heading">
          <strong>{c.title}</strong>
          <p>{c.instructions}</p>
        </div>
        <div className="studio-typeee-console">
          <div className="studio-typeee-top"><span>INPUT / 0{round + 1}</span><span>{target.length} CHAR.</span></div>
          <p className="studio-typeee-target" aria-label={c.sentences[round]}>
            {target.map((letter, i) => <span key={i} aria-hidden="true"
              className={i < entered.length ? (letter === entered[i] ? 'is-correct' : 'is-error') : ''}>{letter}</span>)}
          </p>
          <label htmlFor="studio-typeee-input">{c.input}</label>
          <input id="studio-typeee-input" value={typed} type="text" maxLength={target.length}
            autoComplete="off" autoCapitalize="off" spellCheck={false} autoCorrect="off"
            placeholder={c.placeholder} onChange={(event) => setTyped(event.target.value)} />
          <div className="studio-typeee-progress" role="progressbar" aria-label={c.progress}
            aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <span style={{ width: progress + '%' }} />
          </div>
          <div className="studio-typeee-meta">
            <span>{c.accuracy} <b>{accuracy}%</b></span><span>{c.progress} <b>{progress}%</b></span>
          </div>
          <div className="studio-typeee-actions">
            <button type="button" onClick={() => setTyped('')}>{c.restart} ↺</button>
            <button type="button" onClick={() => { setRound(i => (i + 1) % c.sentences.length); setTyped('') }}>{c.next} ↗</button>
          </div>
          <p className="studio-typeee-feedback" role="status">
            {complete ? c.done : hasMistakes ? c.error : '\u00a0'}
          </p>
        </div>
        <div className="studio-typeee-bottom"><span>{c.foot}</span>
          <a href="https://typeee.quest" target="_blank" rel="noopener noreferrer">{c.link} ↗</a>
        </div>
      </div>
    </div>
  )
}
