import { useEffect, type RefObject } from 'react'
import { useReducedMotion } from './useReducedMotion'

/**
 * Scroll-triggered reveal for everything inside `ref` marked with
 * [data-reveal]. CSS-only enhancement: elements start visible; this hook
 * hides them after mount and un-hides with a stagger when the container
 * enters the viewport. No-JS and reduced-motion users see static content.
 */
export function useReveal<T extends HTMLElement>(ref: RefObject<T | null>) {
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    const targets = Array.from(el.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!targets.length) return

    targets.forEach((t, i) => {
      t.classList.add('reveal')
      t.style.transitionDelay = `${Math.min(i * 60, 480)}ms`
    })

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        targets.forEach((t) => t.classList.add('reveal-in'))
        io.disconnect()
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      targets.forEach((t) => {
        t.classList.remove('reveal', 'reveal-in')
        t.style.transitionDelay = ''
      })
    }
  }, [ref, reduced])
}
