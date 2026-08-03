import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { useTheme } from '../lib/theme'
import { Button } from '../components/ui/Button'
import { FiArrowLeft, FiSun, FiMoon } from '../components/ui/icons'
import { PRIVACY } from '../data/legal'
import { PAGES } from '../data/seo'
import { useSeo } from '../lib/seo'
import { fadeUp, stagger, revealInitial } from '../lib/motion'

export default function PrivacyPage() {
  const { dark, toggle } = useTheme()

  // Página legal: se indexa, pero no compite por posiciones.
  useSeo({ ...PAGES.privacy.es, lang: 'es', type: 'website' })

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-bg text-fg transition-colors duration-slow">
      <header className="sticky top-0 z-nav backdrop-blur-xl bg-bg/85 border-b border-line">
        <div className="container-page max-w-prose h-16 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2.5 group min-w-0">
            <img
              src="/logo-bd.png" alt="" width="32" height="32"
              className="w-8 h-8 object-contain transition-transform duration-slow ease-out-expo group-hover:scale-110"
            />
            <span className="font-display font-bold text-base text-fg truncate">
              Beneficio<span className="text-brand-fg">Diario</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/"
              className="group inline-flex items-center gap-1.5 font-body text-[13px] font-medium text-fg-muted hover:text-brand-fg transition-colors duration-base"
            >
              <FiArrowLeft
                size={14}
                aria-hidden="true"
                className="transition-transform duration-base ease-out-quart group-hover:-translate-x-1"
              />
              Inicio
            </Link>
            <button
              type="button"
              onClick={toggle}
              aria-label={dark ? 'Cambiar a modo día' : 'Cambiar a modo noche'}
              className="w-[38px] h-[38px] rounded-lg bg-surface-2 border border-line flex items-center justify-center text-fg-muted hover:text-fg hover:border-brand-500/40 transition-colors duration-base"
            >
              {dark ? <FiSun size={15} className="text-warning-fg" /> : <FiMoon size={15} className="text-brand-fg" />}
            </button>
          </div>
        </div>
      </header>

      <motion.main
        variants={stagger(0.05)}
        initial={revealInitial}
        animate="visible"
        className="container-page max-w-prose py-14"
      >
        <motion.h1 variants={fadeUp} className="font-display text-display-2 text-fg mb-2 text-balance">
          {PRIVACY.title}
        </motion.h1>

        <motion.p variants={fadeUp} className="font-body text-xs text-fg-subtle mb-10">
          {PRIVACY.updated}
        </motion.p>

        <div className="space-y-9">
          {PRIVACY.sections.map((s, i) => (
            <motion.section key={i} variants={fadeUp}>
              <h2 className="font-display font-bold text-lg text-fg mb-3">{s.h}</h2>
              {s.p.map((para, j) => (
                <p key={j} className="font-serif text-[16px] leading-[1.75] text-fg-muted mb-3">
                  {para}
                </p>
              ))}
            </motion.section>
          ))}
        </div>

        <motion.div variants={fadeUp} className="mt-12 pt-7 border-t border-line">
          <Button to="/" variant="secondary">
            <FiArrowLeft size={15} aria-hidden="true" /> Volver a BeneficioDiario
          </Button>
        </motion.div>
      </motion.main>
    </div>
  )
}
