import { useEffect, useRef, useState, type ReactNode, type FormEvent } from 'react'
import Section from './Section'
import Panel from './Panel'
import { identity, availability, links, skills, projects, experience, certifications } from '../data/portfolio'

interface Entry {
  id: number
  node: ReactNode
}

const HELP: [string, string][] = [
  ['help', 'you are here'],
  ['whoami', 'identity check'],
  ['stack', 'technical skills'],
  ['projects', 'what I have built'],
  ['experience', 'internships'],
  ['certs', 'certifications'],
  ['cv', 'open the CV (new tab)'],
  ['github / linkedin / email', 'reach out'],
  ['sudo hire-me', 'try it'],
  ['clear', 'wipe the screen'],
]

let entryId = 0
const mk = (node: ReactNode): Entry => ({ id: entryId++, node })

/* the greeting survives `clear`; a fresh one is minted on every wipe */
const welcome = (): Entry =>
  mk(
    <p className="text-dim">
      connected. this console is real. type <span className="text-accent">help</span> to explore.
    </p>,
  )

function run(raw: string): ReactNode | 'clear' {
  const input = raw.trim()
  const [cmd, ...rest] = input.split(/\s+/)
  const arg = rest.join(' ')

  switch (cmd) {
    case '':
      return null
    case 'help':
      return (
        <dl>
          {HELP.map(([c, d]) => (
            <div key={c} className="flex flex-wrap gap-x-3">
              <dt className="w-56 shrink-0 text-accent">{c}</dt>
              <dd className="text-dim"># {d}</dd>
            </div>
          ))}
        </dl>
      )
    case 'whoami':
      return (
        <p>
          {identity.name} · {identity.role} · <span className="text-accent">{identity.kicker}</span> ·{' '}
          {identity.location}
        </p>
      )
    case 'stack':
      return (
        <dl className="space-y-1">
          {skills.map((g) => (
            <div key={g.label} className="flex flex-wrap gap-x-3">
              <dt className={`w-56 shrink-0 ${g.muted ? 'text-faint' : 'text-accent'}`}>{g.label.toLowerCase()}</dt>
              <dd className="text-dim">{g.items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      )
    case 'projects':
      return (
        <ul className="space-y-2">
          {projects.map((p) => (
            <li key={p.slug}>
              <span className="text-bright">{p.name}</span>{' '}
              <span className="text-faint">({p.origin.toLowerCase()})</span>
              <br />
              <span className="text-dim">{p.summary}</span>
            </li>
          ))}
        </ul>
      )
    case 'experience':
      return (
        <ul className="space-y-1">
          {experience.map((j) => (
            <li key={j.hash}>
              <span className="text-accent">{j.hash}</span>{' '}
              <span className="text-bright">{j.role}</span>{' '}
              <span className="text-dim">
                · {j.company} · {j.period}
              </span>
            </li>
          ))}
        </ul>
      )
    case 'certs':
    case 'certifications':
      return (
        <ul className="space-y-1">
          {certifications.map((c) => (
            <li key={c.name}>
              <span className="text-bright">{c.name}</span>{' '}
              <span className="text-dim">· {c.issuer}, {c.date}</span>
            </li>
          ))}
        </ul>
      )
    case 'cv':
      window.open(links.cv, '_blank', 'noopener')
      return <p className="text-ok">opening cv.pdf in a new tab…</p>
    case 'github':
      window.open(links.github, '_blank', 'noopener')
      return <p className="text-ok">opening github.com/sinex-cloud…</p>
    case 'linkedin':
      window.open(links.linkedin, '_blank', 'noopener')
      return <p className="text-ok">opening linkedin.com/in/ahmedbrini…</p>
    case 'email':
      window.open(links.mailto, '_self')
      return <p className="text-ok">launching mail client → {identity.email}</p>
    case 'sudo':
      if (arg === 'hire-me' || arg === 'hire me')
        return (
          <p>
            <span className="text-dim">[sudo] password for recruiter: ********</span>
            <br />
            <span className="text-ok">Access granted.</span> {availability.statement}{' '}
            {availability.detail}{' '}
            <a className="link" href={links.mailto}>
              {identity.email}
            </a>
          </p>
        )
      return <p className="text-high">{arg || 'user'}: not in the sudoers file. This incident will be reported.</p>
    case 'echo':
      return <p>{arg}</p>
    case 'date':
      return <p>{new Date().toString()}</p>
    case 'clear':
      return 'clear'
    case 'exit':
      return <p className="text-dim">there is no escape. (try `help`)</p>
    default:
      return (
        <p className="text-high">
          command not found: {cmd} <span className="text-dim">· try `help`</span>
        </p>
      )
  }
}

const SUGGESTIONS = ['help', 'stack', 'sudo hire-me', 'cv']

export default function ContactTerminal() {
  const [entries, setEntries] = useState<Entry[]>(() => [welcome()])
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [entries])

  const exec = (raw: string) => {
    const echoed = mk(
      <p>
        <span className="text-ok">$</span> <span className="text-bright">{raw}</span>
      </p>,
    )
    const result = run(raw)
    if (result === 'clear') {
      setEntries([welcome()])
      return
    }
    setEntries((prev) => [...prev, echoed, ...(result ? [mk(<div>{result}</div>)] : [])])
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!value.trim()) return
    exec(value)
    setHistory((h) => [...h, value])
    setHistIdx(-1)
    setValue('')
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1)
      if (history[idx] !== undefined) {
        setHistIdx(idx)
        setValue(history[idx])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histIdx === -1) return
      const idx = histIdx + 1
      if (idx >= history.length) {
        setHistIdx(-1)
        setValue('')
      } else {
        setHistIdx(idx)
        setValue(history[idx])
      }
    }
  }

  return (
    <Section id="contact" index="06" kicker="get in touch" title="Contact">
      <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-12">
        {/* direct channels: no interaction required */}
        <div data-reveal className="min-w-0">
          <p className="max-w-[48ch] font-sans text-base leading-relaxed text-text sm:text-lg">
            {availability.statement} {availability.detail} The fastest route is email, or ask the
            console, it answers.
          </p>
          <dl className="mt-8 space-y-3 font-mono text-sm">
            {(
              [
                ['email', identity.email, links.mailto, false, 'link-teal', 'text-accent2/70'],
                ['linkedin', '/in/ahmedbrini', links.linkedin, true, 'link', 'text-accent/70'],
                ['github', '/sinex-cloud', links.github, true, 'link-violet', 'text-violet/70'],
                ['cv', 'cv.pdf ↗', links.cv, true, 'link-warn', 'text-warn/70'],
              ] as const
            ).map(([label, text, href, external, hue, labelHue]) => (
              <div key={label} className="flex items-baseline gap-4">
                <dt className={`w-20 shrink-0 ${labelHue}`}>{label}</dt>
                <dd className="min-w-0">
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                    className={`break-all ${hue}`}
                  >
                    {text}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* the console */}
        <div data-reveal className="min-w-0">
          <Panel
            title="console · interactive"
            titleExtra={<span aria-hidden className="font-mono text-[10px] text-ok select-none">● live</span>}
          >
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <div onClick={() => inputRef.current?.focus()} className="cursor-text font-mono">
              <div
                ref={scrollRef}
                role="log"
                aria-live="polite"
                className="h-64 space-y-2 overflow-y-auto pr-1 text-[13px] leading-6 sm:h-72 sm:text-sm"
              >
                {entries.map((e) => (
                  <div key={e.id}>{e.node}</div>
                ))}
              </div>

              <form onSubmit={onSubmit} className="mt-3 flex items-center gap-2 border-t border-line pt-3">
                <label htmlFor="term-input" className="shrink-0 text-sm select-none">
                  <span className="text-ok">$</span>
                  <span className="sr-only">Console command input</span>
                </label>
                <input
                  ref={inputRef}
                  id="term-input"
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKeyDown}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  enterKeyHint="send"
                  placeholder="type a command, try `help`"
                  className="w-full bg-transparent text-sm text-bright placeholder-faint outline-none"
                />
              </form>
            </div>
          </Panel>

          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Suggested commands">
            {SUGGESTIONS.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => {
                    exec(s)
                    inputRef.current?.focus()
                  }}
                  className="chip cursor-pointer"
                >
                  $ {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
