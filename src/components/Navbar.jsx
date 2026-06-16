import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi'

const linksES = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#como-funciona', label: 'Proceso' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#blog', label: 'Blog' },
  { href: '#faq', label: 'FAQ' },
]
const linksEN = [
  { href: '#inicio', label: 'Home' },
  { href: '#como-funciona', label: 'How it works' },
  { href: '#proyectos', label: 'Projects' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#blog', label: 'Blog' },
  { href: '#faq', label: 'FAQ' },
]

export default function Navbar({ darkMode, setDarkMode, lang, setLang, topOffset = 0 }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const links = lang === 'es' ? linksES : linksEN

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const navBg = scrolled
    ? darkMode
      ? 'bg-[#0f172a]/90 backdrop-blur-xl border-b border-white/10 shadow-sm'
      : 'bg-white/85 backdrop-blur-xl border-b border-[#00b4d8]/10 shadow-sm'
    : 'bg-transparent'

  const toggleBtnBase = 'relative flex items-center rounded-full transition-all duration-300 cursor-pointer'

  return (
    <motion.nav
      initial={{ y: -80 }} animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      style={{ top: topOffset }}
      className={`fixed inset-x-0 z-50 transition-all duration-500 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[68px] flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2.5 shrink-0">
          <img src="/logo-bd.png" alt="BD" className="w-9 h-9 object-contain" />
          <span className={`font-display font-bold text-base sm:text-lg hidden sm:inline ${darkMode ? 'text-white' : 'bg-gradient-to-r from-gray-900 to-[#0077b6] bg-clip-text text-transparent'}`}>
            BeneficioDiario
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href}
              className={`font-body text-[13px] font-medium transition-colors tracking-wide hover:text-[#00b4d8] ${darkMode ? 'text-gray-300' : 'text-gray-400'}`}>
              {l.label}
            </a>
          ))}

          {/* ── Selector idioma: mismo estilo que dark toggle ── */}
          <button type="button" className={`${toggleBtnBase} w-[52px] h-7 p-0.5 ${lang === 'en' ? 'bg-[#00b4d8]' : darkMode ? 'bg-white/15' : 'bg-gray-200'}`}
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}>
            <span className={`absolute w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-sm transition-all duration-300 ${lang === 'en' ? 'left-[26px]' : 'left-0.5'}`}>
              {lang === 'es' ? '🇪🇸' : '🇬🇧'}
            </span>
          </button>

          {/* ── Dark mode toggle ── */}
          <button type="button" className={`${toggleBtnBase} w-[52px] h-7 p-0.5 ${darkMode ? 'bg-[#00b4d8]' : 'bg-gray-200'}`}
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? 'Modo día' : 'Modo noche'}
            title={darkMode ? 'Modo día' : 'Modo noche'}>
            <span className={`absolute w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 ${darkMode ? 'left-[26px]' : 'left-0.5'}`}>
              {darkMode ? <FiMoon size={11} className="text-[#0077b6]" /> : <FiSun size={11} className="text-amber-400" />}
            </span>
          </button>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2.5">
          <button type="button" className={`${toggleBtnBase} w-[46px] h-6 p-0.5 ${lang === 'en' ? 'bg-[#00b4d8]' : darkMode ? 'bg-white/15' : 'bg-gray-200'}`}
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}>
            <span className={`absolute w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center text-xs transition-all duration-300 ${lang === 'en' ? 'left-[24px]' : 'left-0.5'}`}>
              {lang === 'es' ? '🇪🇸' : '🇬🇧'}
            </span>
          </button>
          <button type="button" className={`${toggleBtnBase} w-[46px] h-6 p-0.5 ${darkMode ? 'bg-[#00b4d8]' : 'bg-gray-200'}`}
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? 'Modo día' : 'Modo noche'}>
            <span className={`absolute w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 ${darkMode ? 'left-[24px]' : 'left-0.5'}`}>
              {darkMode ? <FiMoon size={9} className="text-[#0077b6]" /> : <FiSun size={9} className="text-amber-400" />}
            </span>
          </button>
          <button onClick={() => setOpen(!open)} className={`p-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className={`md:hidden backdrop-blur-xl border-t overflow-hidden ${darkMode ? 'bg-[#0f172a]/95 border-white/10' : 'bg-white/95 border-[#00b4d8]/10'}`}
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className={`font-body text-sm font-medium hover:text-[#00b4d8] ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{l.label}</a>
              ))}
              <div className="flex gap-3 pt-2">
                <button onClick={() => setLang('es')}
                  className={`flex-1 py-2 rounded-xl text-sm font-display font-semibold border transition-all ${lang === 'es' ? 'border-[#00b4d8] text-[#00b4d8] bg-[#00b4d8]/10' : darkMode ? 'border-white/10 text-gray-400' : 'border-gray-200 text-gray-400'}`}>
                  🇪🇸 Español
                </button>
                <button onClick={() => setLang('en')}
                  className={`flex-1 py-2 rounded-xl text-sm font-display font-semibold border transition-all ${lang === 'en' ? 'border-[#00b4d8] text-[#00b4d8] bg-[#00b4d8]/10' : darkMode ? 'border-white/10 text-gray-400' : 'border-gray-200 text-gray-400'}`}>
                  🇬🇧 English
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
