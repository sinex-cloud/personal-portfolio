import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(cb: () => void) {
  const mql = window.matchMedia(QUERY)
  mql.addEventListener('change', cb)
  return () => mql.removeEventListener('change', cb)
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches
}

/** True when the OS asks for reduced motion; all decorative animation must bail. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
