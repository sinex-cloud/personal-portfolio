import { useState } from 'react'
import { sections, links, availability } from '../data/portfolio'
import { useScrollProgress } from '../hooks/useScrollProgress'

export default function Header() {
  const [open, setOpen] = useState(false)
  const progress = useScrollProgress()

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <a href="/#top" className="shrink-0 font-sans text-sm font-semibold tracking-tight text-bright">
            ahmed brini
          </a>
          <span className="hidden items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-dim sm:inline-flex">
            <span aria-hidden className="size-1.5 rounded-full bg-ok" />
            {availability.pill}
          </span>
        </div>

        {/* desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-5 md:flex lg:gap-7">
          {sections.map((s) => (
            <a key={s.id} href={`/#${s.id}`} className="text-sm text-dim transition-colors hover:text-bright">
              {s.label}
            </a>
          ))}
          <a href={links.cv} download="Ahmed_Brini_CV.pdf" className="btn btn-ghost px-3 py-1.5 text-xs">
            CV ↓
          </a>
        </nav>

        {/* mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="rounded p-2 font-mono text-sm text-dim hover:text-bright md:hidden"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* mobile nav */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-line bg-bg/95 px-5 py-4 backdrop-blur md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`/#${s.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded px-2 py-2.5 text-sm text-dim hover:bg-surface hover:text-bright"
                >
                  {s.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a href={links.cv} download="Ahmed_Brini_CV.pdf" className="btn btn-ghost w-full justify-center text-xs">
                Download CV
              </a>
            </li>
          </ul>
        </nav>
      )}

      {/* pipeline progress: how far down the page, styled like a run in flight */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-line2/40">
        <div
          className="h-full bg-gradient-to-r from-accent to-accent2 transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </header>
  )
}
