import Section from './Section'
import Panel from './Panel'
import { skills } from '../data/portfolio'

/* one restrained hue per group, borrowed from the site's existing palette */
const HUES = ['!border-accent2/30 text-accent2', '!border-accent/30 text-accent']

export default function Skills() {
  return (
    <Section id="stack" index="04" kicker="technical skills" title="Stack">
      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((group, i) => {
          const [border, dot] = HUES[i % HUES.length].split(' ')
          return (
            <div key={group.label} data-reveal>
              <Panel
                title={group.label.toLowerCase()}
                titleExtra={<span className="font-mono text-[11px] text-faint">{group.items.length} tools</span>}
                className={`h-full ${border}`}
              >
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="chip">
                      <span aria-hidden className={`size-1.5 rounded-full ${dot.replace('text-', 'bg-')}/70`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </Panel>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
