import Section from './Section'
import { experience } from '../data/portfolio'

export default function Experience() {
  return (
    <Section id="experience" index="04" kicker="internships" title="Experience">
      <ol className="relative ml-2 space-y-12 border-l border-line pl-8 sm:ml-3">
        {experience.map((job) => (
          <li key={job.hash} data-reveal className="relative">
            {/* timeline node */}
            <span
              aria-hidden
              className="absolute top-1.5 -left-[37px] size-2.5 rounded-full border-2 border-accent2/60 bg-bg sm:-left-[41px]"
            />
            <p className="font-mono text-xs text-faint">
              <span className="text-accent">{job.hash}</span> · <span className="text-accent2/80">{job.branch}</span>
            </p>
            <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-sans text-lg font-semibold text-bright">
                {job.role} <span className="font-normal text-dim">· {job.company}, {job.location}</span>
              </h3>
              <p className="font-mono text-xs text-dim">{job.period}</p>
            </div>
            <ul className="mt-3 max-w-[68ch] space-y-2 font-sans text-[15px] leading-relaxed text-text">
              {job.bullets.map((b) => (
                <li key={b.slice(0, 24)} className="flex gap-3">
                  <span aria-hidden className="mt-[9px] size-1 shrink-0 rounded-full bg-accent2/70" />
                  {b}
                </li>
              ))}
            </ul>
            <ul className="mt-4 flex flex-wrap gap-2">
              {job.tags.map((t) => (
                <li key={t} className="chip !py-0.5 !text-[11px]">
                  {t}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  )
}
