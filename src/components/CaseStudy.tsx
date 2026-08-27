import { useEffect, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import MonoLabel from './MonoLabel'
import Panel from './Panel'
import SeverityChip from './SeverityChip'
import ArchitectureDiagram from './ArchitectureDiagram'
import { useReveal } from '../hooks/useReveal'
import { caseStudy, projects } from '../data/portfolio'

function Block({ index, kicker, title, children }: { index: string; kicker: string; title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  return (
    <section ref={ref} aria-label={title} className="border-t border-line py-14 md:py-16">
      <MonoLabel>
        <span className="text-accent">{index}</span> <span aria-hidden>/</span> {kicker}
      </MonoLabel>
      <h2 className="mt-2 mb-8 font-sans text-2xl font-semibold tracking-tight text-bright md:text-3xl">{title}</h2>
      {children}
    </section>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const flagship = projects.find((p) => p.flagship)!

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (slug !== caseStudy.slug) return <Navigate to="/" replace />

  return (
    <article className="mx-auto w-full max-w-4xl px-5 pt-28 pb-20 sm:px-8">
      {/* header */}
      <Link to="/#work" className="link font-mono text-sm">
        ← work
      </Link>
      <MonoLabel className="mt-8">{caseStudy.kicker}</MonoLabel>
      <h1 className="mt-3 font-sans text-3xl font-semibold tracking-tight text-bright sm:text-4xl md:text-5xl">
        {caseStudy.title}
      </h1>
      <p className="mt-6 max-w-[68ch] font-sans text-base leading-[1.65] text-text sm:text-lg">{caseStudy.summary}</p>

      <dl className="mt-10 mb-14 grid gap-4 border-y border-line py-6 sm:grid-cols-3">
        {flagship.stats!.map((s, si) => (
          <div key={s.label}>
            <dd className={`font-mono text-2xl font-medium ${['text-accent', 'text-warn', 'text-violet'][si]}`}>{s.value}</dd>
            <dt className="mt-1 font-mono text-xs text-dim">{s.label}</dt>
          </div>
        ))}
      </dl>

      <Block index="01" kicker="context" title="The problem">
        <div className="max-w-[68ch] space-y-5 font-sans text-[15px] leading-[1.7] text-text sm:text-base">
          {caseStudy.problem.map((p) => (
            <p key={p.slice(0, 24)} data-reveal>
              {p}
            </p>
          ))}
        </div>
      </Block>

      <Block index="02" kicker="architecture" title="From pull request to gated apply">
        <ArchitectureDiagram />
      </Block>

      <Block index="03" kicker="policy as code" title="The seven checks">
        <p data-reveal className="mb-8 max-w-[68ch] font-sans text-[15px] leading-relaxed text-text sm:text-base">
          Each check is deterministic Python over the Terraform JSON plan; no model in the loop,
          no judgment calls. A high-severity finding fails the review.
        </p>
        <ul>
          {caseStudy.checks.map((c) => (
            <li
              key={c.id}
              data-reveal
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line py-4 first:border-t"
            >
              <div className="min-w-0 max-w-[52ch]">
                <p className="font-mono text-sm font-medium text-bright">{c.id}</p>
                <p className="mt-1 font-sans text-sm leading-relaxed text-dim">{c.desc}</p>
              </div>
              <SeverityChip level={c.severity} />
            </li>
          ))}
        </ul>
      </Block>

      <Block index="04" kicker="control" title="The approval gate">
        <div className="grid gap-4 sm:grid-cols-2">
          {caseStudy.gate.stages.map((s, si) => (
            <div key={s.name} data-reveal>
              <Panel title={s.name} className={si === 0 ? '!border-accent/30' : '!border-warn/30'}>
                <p className="font-sans text-sm leading-relaxed text-text">{s.detail}</p>
              </Panel>
            </div>
          ))}
        </div>
        <blockquote
          data-reveal
          className="mt-8 border-l-2 border-accent pl-5 font-sans text-lg font-medium text-bright sm:text-xl"
        >
          “{caseStudy.gate.quote}”
        </blockquote>
      </Block>

      <Block index="05" kicker="security" title="Security decisions">
        <ul className="grid gap-4 md:grid-cols-3">
          {caseStudy.security.map((s) => (
            <li key={s.title} data-reveal className="rounded-lg border border-line bg-surface p-5">
              <h3 className="font-mono text-sm font-medium text-accent2">{s.title}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-dim">{s.detail}</p>
            </li>
          ))}
        </ul>
      </Block>

      <Block index="06" kicker="foundation" title="One YAML, two modules">
        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,380px)] lg:gap-10">
          <p data-reveal className="max-w-[60ch] font-sans text-[15px] leading-[1.7] text-text sm:text-base">
            {caseStudy.modules.intro}
          </p>
          <div data-reveal>
            <Panel title="foundation-config / foundation.yaml">
              <pre className="overflow-x-auto font-mono text-xs leading-6 text-accent2/90">
                <code>{caseStudy.modules.excerpt}</code>
              </pre>
            </Panel>
          </div>
        </div>
      </Block>

      <Block index="07" kicker="stack" title="Built with">
        <ul data-reveal className="flex flex-wrap gap-2">
          {flagship.stack.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          {flagship.repos.map((r) => (
            <a
              key={r.label}
              href={r.url}
              target="_blank"
              rel="noreferrer noopener"
              className="link font-mono text-sm"
            >
              github.com/sinex-cloud/{r.label} ↗
            </a>
          ))}
        </div>
      </Block>
    </article>
  )
}
export { CaseStudy }
