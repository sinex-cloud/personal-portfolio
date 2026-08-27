import Section from './Section'
import { identity, education, languages, availability } from '../data/portfolio'

/* each fact carries its own hue: identity teal, structure violet, machine blue */
const FACTS: [string, string, string, string][] = [
  ['location', identity.location, 'text-accent2', 'bg-accent2/70'],
  ['school', 'MedTech · SMU, Tunis', 'text-violet', 'bg-violet/70'],
  ['degree', education.degree, 'text-accent', 'bg-accent/70'],
  ['years', education.years, 'text-warn', 'bg-warn/70'],
  ['languages', languages.map((l) => l.name.toLowerCase()).join(' · '), 'text-accent2', 'bg-accent2/70'],
  ['availability', 'PFE · Jan – Jun 2027', 'text-ok', 'bg-ok/70'],
]

export default function About() {
  return (
    <Section id="about" index="01" kicker="profile" title="About">
      <div className="grid gap-10 lg:grid-cols-[1fr_280px] lg:gap-16">
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

        <dl data-reveal className="h-fit rounded-lg border border-line bg-surface p-5 font-mono text-[13px] leading-6">
          {FACTS.map(([k, v, hue, dot]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-line py-2 last:border-b-0">
              <dt className="flex shrink-0 items-center gap-2 text-faint">
                <span aria-hidden className={`size-1.5 rounded-[2px] ${dot}`} />
                {k}
              </dt>
              <dd className={`text-right ${hue}`}>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
