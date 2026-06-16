import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import HowItWorks from './components/HowItWorks'
import FeaturedProjects from './components/FeaturedProjects'
import AllProjects from './components/AllProjects'
import Portfolio from './components/Portfolio'
import Results from './components/Results'
import Blog from './components/Blog'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import TopAdBar, { TOP_AD_HEIGHT } from './components/TopAdBar'
import Newsletter from './components/Newsletter'
import Sponsors from './components/Sponsors'
import Novedades from './components/Novedades'
import WhoWeAre from './components/WhoWeAre'
import { getDark, setDark } from './lib/prefs'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function App({ initialLang = 'es' }) {
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(getDark())
  const lang = initialLang
  const setLang = (l) => navigate(l === 'en' ? '/en' : '/')
  const [topAdOpen, setTopAdOpen] = useState(true)

  // Cursor suave con requestAnimationFrame
  const cursorRef = useRef(null)
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const pos   = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })

  useEffect(() => {
    if (prefersReducedMotion()) return
    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove, { passive: true })

    let raf
    const lerp = (a, b, t) => a + (b - a) * t
    const animate = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.12)
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.12)
      if (cursorRef.current) {
        cursorRef.current.style.left = pos.current.x + 'px'
        cursorRef.current.style.top  = pos.current.y + 'px'
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
    window.__lenis = lenis
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => { lenis.destroy(); delete window.__lenis }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    document.body.style.background = darkMode ? '#0a0f1e' : '#ffffff'
    setDark(darkMode)
  }, [darkMode])

  const props = { darkMode, lang }

  return (
    <div className={`relative min-h-screen overflow-x-hidden transition-colors duration-500 ${darkMode ? 'bg-[#0a0f1e] text-gray-100' : 'bg-white text-gray-900'}`}
      style={{ paddingTop: topAdOpen ? TOP_AD_HEIGHT : 0, backgroundColor: darkMode ? '#0a0f1e' : '#ffffff' }}>
      <TopAdBar darkMode={darkMode} lang={lang} open={topAdOpen} onClose={() => setTopAdOpen(false)} />
      <ScrollProgress />
      <div className="noise-overlay" />
      {/* Cursor glow mejorado */}
      <div ref={cursorRef} className="cursor-glow hidden lg:block" style={{ left: window.innerWidth/2, top: window.innerHeight/2 }} />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} lang={lang} setLang={setLang} topOffset={topAdOpen ? TOP_AD_HEIGHT : 0} />
      <Hero {...props} />
      <Novedades {...props} />
      <Marquee {...props} />
      <HowItWorks {...props} />
      <FeaturedProjects {...props} />
      <AllProjects {...props} />
      <Portfolio {...props} />
      <Results {...props} />
      <Blog {...props} />
      <FAQ {...props} />
      <CTA {...props} />
      <Newsletter {...props} />
      <Sponsors {...props} />
      <WhoWeAre {...props} />
      <Footer {...props} />
      <BackToTop lang={lang} />
    </div>
  )
}
