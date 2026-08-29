import Section from './Section'
import { identity, education, languages, availability } from '../data/portfolio'

/* a restrained dot per row for identity, no per-row text colour */
const FACTS: [string, string, string][] = [
  ['location', identity.location, 'bg-accent2/70'],
  ['school', 'MedTech · SMU, Tunis', 'bg-accent2/70'],
  ['degree', education.degree, 'bg-accent2/70'],
  ['years', education.years, 'bg-accent2/70'],
  ['languages', languages.map((l) => l.name.toLowerCase()).join(' · '), 'bg-accent2/70'],
  ['availability', 'PFE · Jan – Jun 2027', 'bg-ok/70'],
]

export default function About() {
  return (
    <Section id="about" index="01" kicker="profile" title="About">
      <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-16">
        <div className="max-w-[68ch] space-y-5 font-sans text-base leading-[1.65] text-text sm:text-lg">
          {identity.about.map((p) => (
            <p key={p.slice(0, 24)} data-reveal>
              {p}
            </p>
          ))}
          <p data-reveal>
            {availability.statement} {availability.detail}
          </p>
        </div>

        <dl data-reveal className="h-fit rounded-lg border border-line bg-surface p-5 font-mono text-[13px]">
          {FACTS.map(([k, v, dot]) => (
            <div key={k} className="border-b border-line py-2.5 last:border-b-0">
              <dt className="flex items-center gap-2 text-faint">
                <span aria-hidden className={`size-1.5 shrink-0 rounded-[2px] ${dot}`} />
                {k}
              </dt>
              <dd className="mt-1 pl-3.5 leading-5 text-text">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
