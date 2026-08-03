import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react'
import { useTheme } from '../lib/theme'
import { FiMenu, FiX, FiSun, FiMoon, FlagES, FlagGB } from './ui/icons'
import { ease, duration, revealInitial } from '../lib/motion'

const LINKS = {
  es: [
    { href: '#inicio', label: 'Inicio' },
    { href: '#como-funciona', label: 'Proceso' },
    { href: '#proyectos', label: 'Proyectos' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#blog', label: 'Blog' },
    { href: '#faq', label: 'FAQ' },
  ],
  en: [
    { href: '#inicio', label: 'Home' },
    { href: '#como-funciona', label: 'How it works' },
    { href: '#proyectos', label: 'Projects' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#blog', label: 'Blog' },
    { href: '#faq', label: 'FAQ' },
  ],
}

/**
 * Marca qué sección se está viendo. Un solo IntersectionObserver para
 * todas las anclas en lugar de un listener de scroll por enlace.
 */
function useActiveSection(hrefs) {
  const [active, setActive] = useState(hrefs[0])

  useEffect(() => {
    const targets = hrefs
      .map((h) => document.querySelector(h))
      .filter(Boolean)
    if (!targets.length) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [hrefs])

  return active
}

/** Interruptor de dos posiciones reutilizado por idioma y tema. */
function Toggle({ on, onChange, label, offIcon, onIcon, compact = false }) {
  const w = compact ? 'w-[46px] h-6' : 'w-[52px] h-7'
  const knob = compact ? 'w-5 h-5' : 'w-6 h-6'
  const travel = compact ? 'translate-x-[22px]' : 'translate-x-[24px]'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      title={label}
      onClick={onChange}
      className={`relative flex items-center rounded-pill p-0.5 cursor-pointer transition-colors duration-base ease-out-quart ${w} ${
        on ? 'bg-brand-500' : 'bg-line-strong'
      }`}
    >
      <span
        className={`flex items-center justify-center rounded-full bg-white shadow-e2 transition-transform duration-base ease-out-expo ${knob} ${
          on ? travel : 'translate-x-0'
        }`}
      >
        {on ? onIcon : offIcon}
      </span>
    </button>
  )
}

export default function Navbar({ lang, setLang, topOffset = 0 }) {
  const { dark, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const links = LINKS[lang] || LINKS.es
  const active = useActiveSection(links.map((l) => l.href))

  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40))

  // El menú móvil se cierra al pasar a escritorio y con la tecla Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = (e) => e.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onChange)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onChange)
    }
  }, [open])

  const isEN = lang === 'en'
  const langLabel = isEN ? 'Cambiar a español' : 'Switch to English'
  const themeLabel = dark
    ? (isEN ? 'Switch to light mode' : 'Cambiar a modo día')
    : (isEN ? 'Switch to dark mode' : 'Cambiar a modo noche')

  return (
    <motion.nav
      initial={{ y: -72 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: ease.out }}
      style={{ top: topOffset }}
      className={`fixed inset-x-0 z-nav transition-[background-color,border-color,box-shadow] duration-slow ${
        scrolled
          ? 'bg-bg/85 backdrop-blur-xl border-b border-line shadow-e1'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container-page max-w-content h-[var(--nav-h)] flex items-center justify-between gap-4">
        <a href="#inicio" className="flex items-center gap-2.5 shrink-0 group">
          <img
            src="/logo-bd.png" alt="" width="36" height="36"
            className="w-9 h-9 object-contain transition-transform duration-slow ease-out-expo group-hover:scale-110 group-hover:rotate-3"
          />
          <span className="font-display font-bold text-base sm:text-lg text-fg hidden sm:inline">
            Beneficio<span className="text-brand-fg">Diario</span>
          </span>
        </a>

        {/* Navegación de escritorio: la sección activa lleva un subrayado
            que se desliza entre enlaces con layoutId */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const isActive = active === l.href
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? 'true' : undefined}
                className={`relative px-3 py-2 font-body text-[13px] font-medium rounded-lg transition-colors duration-base ${
                  isActive ? 'text-brand-fg' : 'text-fg-muted hover:text-fg'
                }`}
              >
                {l.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2.5 -bottom-0.5 h-[2px] rounded-full bg-brand-500"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            )
          })}
        </div>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Toggle
            on={isEN}
            onChange={() => setLang(isEN ? 'es' : 'en')}
            label={langLabel}
            offIcon={<FlagES size={13} />}
            onIcon={<FlagGB size={13} />}
          />
          <Toggle
            on={dark}
            onChange={toggle}
            label={themeLabel}
            offIcon={<FiSun size={11} className="text-warning-fg" />}
            onIcon={<FiMoon size={11} className="text-brand-700" />}
          />
        </div>

        {/* Controles móviles */}
        <div className="md:hidden flex items-center gap-2">
          <Toggle
            compact
            on={isEN}
            onChange={() => setLang(isEN ? 'es' : 'en')}
            label={langLabel}
            offIcon={<FlagES size={11} />}
            onIcon={<FlagGB size={11} />}
          />
          <Toggle
            compact
            on={dark}
            onChange={toggle}
            label={themeLabel}
            offIcon={<FiSun size={9} className="text-warning-fg" />}
            onIcon={<FiMoon size={9} className="text-brand-700" />}
          />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? (isEN ? 'Close menu' : 'Cerrar menú') : (isEN ? 'Open menu' : 'Abrir menú')}
            className="p-2 -mr-2 text-fg rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'x' : 'menu'}
                initial={{ opacity: 0, rotate: open ? -90 : 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: open ? 90 : -90 }}
                transition={{ duration: duration.fast }}
              >
                {open ? <FiX size={22} /> : <FiMenu size={22} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0, transition: { duration: duration.base, ease: ease.in } }}
            transition={{ duration: duration.slow, ease: ease.out }}
            className="md:hidden overflow-hidden bg-bg/97 backdrop-blur-xl border-t border-line"
          >
            <motion.div
              initial={revealInitial}
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } } }}
              className="container-page py-5 flex flex-col gap-1"
            >
              {links.map((l) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
                  className={`font-body text-[15px] font-medium py-3 px-2 rounded-lg transition-colors ${
                    active === l.href ? 'text-brand-fg bg-brand-500/8' : 'text-fg-muted'
                  }`}
                >
                  {l.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
