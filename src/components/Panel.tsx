import type { PointerEvent, ReactNode } from 'react'

interface Props {
  title?: string
  titleExtra?: ReactNode
  children: ReactNode
  className?: string
}

/** Track the cursor inside the panel so the glow can follow it. */
function trackPointer(e: PointerEvent<HTMLDivElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--px', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--py', `${e.clientY - r.top}px`)
}

/** Bordered surface with an optional mono title bar. */
export default function Panel({ title, titleExtra, children, className = '' }: Props) {
  return (
    <div
      onPointerMove={trackPointer}
      className={`panel-glow relative overflow-hidden rounded-lg border border-line bg-surface ${className}`}
    >
      {title && (
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
          <span className="mono-label truncate">{title}</span>
          {titleExtra}
        </div>
      )}
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  )
}
