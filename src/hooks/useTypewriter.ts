import { useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

interface Options {
  /** gate, typing starts only once this flips true */
  start?: boolean
  /** ms per character */
  speed?: number
  /** ms before the first character */
  delay?: number
}

/**
 * Terminal-style typing effect. Respects prefers-reduced-motion by
 * rendering the full text instantly. Safe under StrictMode remounts:
 * the effect is fully restartable (no one-shot guard).
 */
export function useTypewriter(text: string, { start = true, speed = 34, delay = 0 }: Options = {}) {
  const reduced = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return

    if (reduced) {
      setCount(text.length)
      return
    }

    let i = 0
    let interval: ReturnType<typeof setInterval> | undefined
    const kickoff = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setCount((c) => Math.max(c, i))
        if (i >= text.length && interval) clearInterval(interval)
      }, speed)
    }, delay)

    return () => {
      clearTimeout(kickoff)
      if (interval) clearInterval(interval)
    }
  }, [start, text, speed, delay, reduced])

  return { out: text.slice(0, count), done: count >= text.length }
}
