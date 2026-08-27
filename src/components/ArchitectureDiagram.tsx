import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { caseStudy } from '../data/portfolio'

/**
 * The request path, drawn as a vertical pipeline. Nodes reveal in
 * sequence (via useReveal's stagger) so the path "draws itself" once
 * when scrolled into view; reduced-motion users see it complete.
 */
export default function ArchitectureDiagram() {
  const ref = useRef<HTMLOListElement>(null)
  const flowRef = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  useReveal(ref)

  // Light travels down the spine once, in step with the node reveal above.
  useEffect(() => {
    const el = ref.current
    const flow = flowRef.current
    if (!el || !flow || reduced) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        flow.classList.add('flow-in')
        io.disconnect()
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced])

  return (
    <div className="relative ml-2 sm:ml-3">
      <span ref={flowRef} aria-hidden className="pipeline-flow" />
      <ol
        ref={ref}
        aria-label="Pipeline architecture, from pull request to gated apply"
        className="space-y-0 border-l border-line2"
      >
        {caseStudy.pipeline.map((node, i) => (
          <li key={node.step} data-reveal className="relative pb-8 pl-8 last:pb-0">
            <span
              aria-hidden
              className={`absolute top-0.5 -left-[13px] flex size-6 items-center justify-center rounded-full border bg-bg font-mono text-[10px] ${
                i === caseStudy.pipeline.length - 1
                  ? 'border-ok/60 text-ok'
                  : i === caseStudy.pipeline.length - 2
                    ? 'border-warn/60 text-warn'
                    : 'border-accent/50 text-accent'
              }`}
            >
              {i + 1}
            </span>
            <h3 className="font-mono text-sm font-medium text-bright">{node.step}</h3>
            <p className="mt-1 max-w-[58ch] font-sans text-sm leading-relaxed text-dim">{node.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
