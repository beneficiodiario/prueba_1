import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReducedMotion } from 'motion/react'
import Lenis from 'lenis'
import { useSeo, homeJsonLd } from './lib/seo'
import { PAGES, faqs } from './data/seo'
import { TOP_BAR_HEIGHT } from './config'
import { SafeBoundary } from './components/SafeBoundary'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Novedades from './components/Novedades'
import Marquee from './components/Marquee'
import HowItWorks from './components/HowItWorks'
import FeaturedProjects from './components/FeaturedProjects'
import AllProjects from './components/AllProjects'
import Portfolio from './components/Portfolio'
import Results from './components/Results'
import Blog from './components/Blog'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Newsletter from './components/Newsletter'
import ForProjects from './components/ForProjects'
import WhoWeAre from './components/WhoWeAre'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'

// Aparte del arranque: si un bloqueador impide traer este módulo, se
// pierde la barra de patrocinadores pero la web sigue funcionando.
const TopPartnerBar = lazy(() => import('./components/TopPartnerBar'))

const SKIP = { es: 'Saltar al contenido principal', en: 'Skip to main content' }

/**
 * Scroll suave con Lenis. Se desmonta limpiamente y no arranca si el
 * sistema pide menos movimiento.
 */
function useLenis(enabled) {
  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    window.__lenis = lenis

    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    })

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      delete window.__lenis
    }
  }, [enabled])
}

/**
 * Halo que persigue al puntero. Escribe directamente sobre el estilo del
 * nodo dentro del rAF: no provoca ni un solo re-render de React.
 */
function useCursorGlow(enabled) {
  const ref = useRef(null)

  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    if (!el) return

    // Solo en punteros finos: en táctil no hay cursor que seguir.
    if (!window.matchMedia('(pointer: fine)').matches) return

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const pos = { ...target }
    let raf

    const onMove = (e) => { target.x = e.clientX; target.y = e.clientY }
    window.addEventListener('pointermove', onMove, { passive: true })

    const lerp = (a, b, t) => a + (b - a) * t
    const tick = () => {
      pos.x = lerp(pos.x, target.x, 0.12)
      pos.y = lerp(pos.y, target.y, 0.12)
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  return ref
}

export default function App({ initialLang = 'es' }) {
  const navigate = useNavigate()
  const reduced = useReducedMotion()
  const [topAdOpen, setTopAdOpen] = useState(true)

  const lang = initialLang
  const setLang = (l) => navigate(l === 'en' ? '/en' : '/')

  const page = PAGES.home[lang] || PAGES.home.es
  useSeo({
    ...page,
    lang,
    image: '/void-cover.png',
    alternates: { es: '/', en: '/en' },
    jsonLd: homeJsonLd({ lang, faqs, url: page.path }),
  })

  useLenis(!reduced)
  const cursorRef = useCursorGlow(!reduced)

  const props = { lang }

  return (
    <div
      className="relative min-h-screen overflow-x-hidden bg-bg text-fg transition-colors duration-slow"
      style={{ paddingTop: topAdOpen ? TOP_BAR_HEIGHT : 0 }}
    >
      <a href="#contenido" className="skip-link">{SKIP[lang] || SKIP.es}</a>

      <SafeBoundary name="barra de patrocinadores">
        <Suspense fallback={null}>
          <TopPartnerBar lang={lang} open={topAdOpen} onClose={() => setTopAdOpen(false)} />
        </Suspense>
      </SafeBoundary>
      <ScrollProgress />
      <div className="noise-overlay" aria-hidden="true" />
      <div ref={cursorRef} className="cursor-glow hidden lg:block" aria-hidden="true" />

      <Navbar lang={lang} setLang={setLang} topOffset={topAdOpen ? TOP_BAR_HEIGHT : 0} />

      <main id="contenido">
        <Hero {...props} />
        <Novedades {...props} />
        <Marquee />
        <HowItWorks {...props} />
        <FeaturedProjects {...props} />
        <AllProjects {...props} />
        <Portfolio {...props} />
        <Results {...props} />
        <Blog {...props} />
        <FAQ {...props} />
        <CTA {...props} />
        <Newsletter {...props} />
        <ForProjects {...props} />
        <WhoWeAre {...props} />
      </main>

      <Footer {...props} />
      <BackToTop lang={lang} />
    </div>
  )
}
