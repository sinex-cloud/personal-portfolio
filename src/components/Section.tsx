import { useRef, type ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'
import MonoLabel from './MonoLabel'

interface Props {
  id: string
  index: string
  kicker: string
  title: string
  children: ReactNode
  className?: string
}

/** Section shell: mono kicker + real heading, children reveal on scroll. */
export default function Section({ id, index, kicker, title, children, className = '' }: Props) {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 md:py-28 ${className}`}
    >
      <div className="mb-10 md:mb-14">
        <MonoLabel>
          <span className="text-accent">{index}</span> <span aria-hidden>/</span> {kicker}
        </MonoLabel>
        <h2
          id={`${id}-title`}
          className="mt-2 font-sans text-3xl font-semibold tracking-tight text-bright md:text-4xl"
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}
