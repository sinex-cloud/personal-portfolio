import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { identity, availability, links, caseStudy } from '../data/portfolio'
import { useTypewriter } from '../hooks/useTypewriter'
import { useReducedMotion } from '../hooks/useReducedMotion'
import MonoLabel from './MonoLabel'
import Panel from './Panel'

const STATUS = 'checks 7/7 passed · 0 high findings · apply awaiting approval'

export default function Hero() {
  const { out, done } = useTypewriter(STATUS, { start: true, speed: 22, delay: 700 })
  const reduced = useReducedMotion()
  const checksRef = useRef<HTMLUListElement>(null)

  // Checks tick to "pass" one by one, finishing right as the status
  // line below starts typing — the review completing, then reporting.
  useEffect(() => {
    if (reduced) return
    const t = setTimeout(() => checksRef.current?.classList.add('ticked'), 80)
    return () => clearTimeout(t)
  }, [reduced])

  return (
    <section aria-label="Introduction" className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-5 pt-36 pb-20 sm:px-8 md:pb-28 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        <MonoLabel className="!text-accent2">{identity.kicker} · {identity.location}</MonoLabel>
        <h1 className="text-gradient mt-4 font-sans text-display font-semibold">
          {identity.name}
        </h1>
        <p className="mt-6 max-w-[36rem] font-sans text-xl leading-snug font-medium text-text sm:text-2xl">
          {identity.headline}
        </p>
        <ul aria-label="Focus areas" className="mt-4 flex flex-wrap gap-2">
          {['Cloud', 'DevOps', 'Backend'].map((t) => (
            <li key={t} className="chip !py-1 !text-[11px]">
              {t}
            </li>
          ))}
        </ul>
        <p className="mt-5 flex items-center gap-2 font-mono text-sm text-dim">
          <span aria-hidden className="pulse-dot size-2 rounded-full bg-ok text-ok" />
          {availability.statement}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link to={`/work/${caseStudy.slug}`} className="btn btn-primary">
            View the pipeline →
          </Link>
          <a href={links.cv} download="Ahmed_Brini_CV.pdf" className="btn btn-ghost">
            Download CV
          </a>
        </div>
      </div>

      {/* evidence panel: the flagship's real policy checks */}
      <div className="lg:col-span-5 lg:self-center">
        <Panel
          title="policy review · terraform plan"
          titleExtra={<span aria-hidden className="live font-mono text-[10px] text-ok select-none">● live</span>}
        >
          <ul ref={checksRef} className={`hero-checks space-y-1.5 font-mono text-[13px] leading-6 ${reduced ? 'ticked' : ''}`}>
            {caseStudy.checks.map((c, i) => (
              <li key={c.id} className="flex items-baseline justify-between gap-3">
                <span className="truncate text-accent/90">{c.id}</span>
                <span aria-hidden className="mx-1 flex-1 border-b border-dashed border-line" />
                <span className="check text-ok" style={{ transitionDelay: `${i * 90}ms` }}>
                  pass
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 min-h-6 border-t border-line pt-3 font-mono text-xs text-warn/90">
            <span className={done ? '' : 'caret'}>{out}</span>
          </p>
        </Panel>
      </div>
    </section>
  )
}
