import { Link } from 'react-router-dom'
import MonoLabel from './MonoLabel'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-4xl flex-col items-start justify-center px-5 pt-28 pb-20 sm:px-8">
      <MonoLabel>404 · route not found</MonoLabel>
      <h1 className="mt-3 font-sans text-3xl font-semibold tracking-tight text-bright sm:text-4xl">
        Nothing deployed at this path.
      </h1>
      <p className="mt-4 max-w-[52ch] font-sans text-base leading-relaxed text-text">
        No route matches the URL you requested. It may have moved, or the link was mistyped.
      </p>
      <Link to="/" className="link mt-8 font-mono text-sm">
        ← back to the pipeline
      </Link>
    </div>
  )
}
