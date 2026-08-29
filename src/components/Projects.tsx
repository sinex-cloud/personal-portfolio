import { Link } from 'react-router-dom'
import Section from './Section'
import Panel from './Panel'
import { projects } from '../data/portfolio'

const FLOW = ['PR', 'plan', '7 checks', 'findings', 'approval', 'apply']
const FLOW_HUE: Record<string, string> = { approval: 'text-warn', apply: 'text-ok' }
const STAT_HUES = ['text-accent', 'text-warn', 'text-violet']
const BULLET_DOTS = ['bg-accent', 'bg-accent2', 'bg-violet', 'bg-warn']

/** Stack tokens read as data, not as a footnote. */
function StackLine({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs leading-6 ${className}`}>
      {items.map((s, i) => (
        <span key={s} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden className="text-line2">·</span>}
          <span className="text-accent2/85">{s}</span>
        </span>
      ))}
    </p>
  )
}

export default function Projects() {
  const flagship = projects.find((p) => p.flagship)!
  const rest = projects.filter((p) => !p.flagship)

  return (
<<<<<<< HEAD
    <Section id="work" index="03" kicker="projects" title="Work">
=======
    <Section id="work" index="02" kicker="projects" title="Work">
>>>>>>> c56a145 (content: tailor to resume, reorder sections, contact/about fixes, cv swap)
      {/* flagship */}
      <article data-reveal aria-labelledby="flagship-title">
        <Panel title={`01 · ${flagship.origin.toLowerCase()} · flagship`} className="border-gradient border-beam">
          <h3 id="flagship-title" className="font-sans text-xl font-semibold tracking-tight text-bright sm:text-2xl">
            {flagship.name}
          </h3>
          <p className="mt-3 max-w-[68ch] font-sans text-[15px] leading-relaxed text-text sm:text-base">
            {flagship.summary}
          </p>

          {/* compact pipeline strip */}
          <p aria-label="Pipeline flow" className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-dim">
            {FLOW.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden className="text-faint">→</span>}
                <span className={FLOW_HUE[step] ?? ''}>{step}</span>
              </span>
            ))}
          </p>

          {/* stat row */}
          <dl className="mt-6 grid gap-4 border-y border-line py-5 sm:grid-cols-3">
            {flagship.stats!.map((s, si) => (
              <div key={s.label}>
                <dd className={`font-mono text-2xl font-medium ${STAT_HUES[si]}`}>{s.value}</dd>
                <dt className="mt-1 font-mono text-xs text-dim">{s.label}</dt>
              </div>
            ))}
          </dl>

          <StackLine items={flagship.stack} className="mt-5" />

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link to={`/work/${flagship.caseStudySlug}`} className="btn btn-primary text-[13px]">
              Read the case study →
            </Link>
            {flagship.repos.map((r) => (
              <a
                key={r.label}
                href={r.url}
                target="_blank"
                rel="noreferrer noopener"
                className="link font-mono text-[13px]"
              >
                {r.label} ↗
              </a>
            ))}
          </div>
        </Panel>
      </article>

      {/* remaining projects */}
      {rest.map((p, i) => (
        <article key={p.slug} data-reveal aria-label={p.name} className="mt-8 lg:max-w-[75%]">
          <Panel title={`0${i + 2} · ${p.origin.toLowerCase()}`}>
            <h3 className="font-sans text-lg font-semibold tracking-tight text-bright">{p.name}</h3>
            <ul className="mt-3 max-w-[68ch] space-y-2 font-sans text-[15px] leading-relaxed text-text">
              {p.bullets.map((b, bi) => (
                <li key={b.slice(0, 24)} className="flex gap-3">
                  <span aria-hidden className={`mt-[9px] size-1.5 shrink-0 rounded-full ${BULLET_DOTS[bi % BULLET_DOTS.length]}`} />
                  {b}
                </li>
              ))}
            </ul>
            <StackLine items={p.stack} className="mt-4" />
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {p.repos.map((r) => (
                <a
                  key={r.label}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link font-mono text-[13px]"
                >
                  {r.label} ↗
                </a>
              ))}
            </div>
          </Panel>
        </article>
      ))}
    </Section>
  )
}
