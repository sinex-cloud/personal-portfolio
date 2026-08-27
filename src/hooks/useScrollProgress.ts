import { useEffect, useState } from 'react'

/** Vertical scroll progress as 0-100, rAF-throttled. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const max = scrollHeight - clientHeight
      setProgress(max > 0 ? (scrollTop / max) * 100 : 0)
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return progress
}
