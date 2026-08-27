import type { ReactNode } from 'react'

export default function MonoLabel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`mono-label ${className}`}>{children}</p>
}
