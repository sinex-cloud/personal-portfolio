import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import ContactTerminal from './components/ContactTerminal'
import Footer from './components/Footer'

const CaseStudy = lazy(() => import('./components/CaseStudy'))
const NotFound = lazy(() => import('./components/NotFound'))

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Certifications />
      <ContactTerminal />
    </>
  )
}

export default function App() {
  return (
    <div id="top" className="relative min-h-screen">
      <a
        href="#main"
        className="sr-only z-50 rounded bg-accent px-4 py-2 font-mono text-sm text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      {/* atmosphere: drifting colour fields, blueprint grid, a scheduled
          sweep across the plane, and grain to keep the gradients honest */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="aurora -top-[22vh] left-[8vw] h-[62vh] w-[58vw]"
          style={{
            background: 'radial-gradient(circle, rgb(56 189 248 / 0.16), transparent 66%)',
            animation: 'drift-a 26s ease-in-out infinite',
          }}
        />
        <div
          className="aurora top-[10vh] -right-[14vw] h-[54vh] w-[46vw]"
          style={{
            background: 'radial-gradient(circle, rgb(167 139 250 / 0.13), transparent 66%)',
            animation: 'drift-b 34s ease-in-out infinite',
          }}
        />
        <div
          className="aurora bottom-[-18vh] -left-[10vw] h-[56vh] w-[52vw]"
          style={{
            background: 'radial-gradient(circle, rgb(45 212 191 / 0.11), transparent 66%)',
            animation: 'drift-a 42s ease-in-out infinite reverse',
          }}
        />
        <div className="bg-grid absolute inset-0" />
        <div className="sweep" />
        <div className="grain" />
      </div>

      <Header />

      <main id="main">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
