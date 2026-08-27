import Section from './Section'
import { certifications } from '../data/portfolio'

export default function Certifications() {
  return (
    <Section id="certifications" index="05" kicker="credentials" title="Certifications">
      <ul>
        {certifications.map((c) => (
          <li
            key={c.name}
            data-reveal
            className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-4 first:border-t"
          >
            <div className="min-w-0">
              <p className="font-sans text-[15px] font-medium text-bright">{c.name}</p>
              <p className="mt-0.5 font-mono text-xs text-accent2/80">{c.issuer}</p>
            </div>
            <p className="shrink-0 font-mono text-xs text-faint">{c.date}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
