import Section from './Section'
import { skills } from '../data/portfolio'

export default function Skills() {
  return (
    <Section id="stack" index="02" kicker="technical skills" title="Stack">
      <div className="space-y-6">
        {skills.map((group) => (
          <div
            key={group.label}
            data-reveal
            className="grid gap-2 border-b border-line pb-6 last:border-b-0 md:grid-cols-[220px_1fr] md:gap-6"
          >
            <h3 className={`mono-label pt-1.5 ${group.muted ? '' : 'text-accent2'}`}>{group.label}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className={`chip ${group.muted ? 'chip-muted' : ''}`}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
