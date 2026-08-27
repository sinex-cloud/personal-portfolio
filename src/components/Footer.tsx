import { identity } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-6 font-mono text-xs text-faint sm:px-8">
        <p>
          © {new Date().getFullYear()} {identity.name} · Tunis
        </p>
        <p className="hidden sm:block">react + vite · self-hosted fonts · no trackers</p>
        <a href="#top" className="link">
          back to top ↑
        </a>
      </div>
    </footer>
  )
}
