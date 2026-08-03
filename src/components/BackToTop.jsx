import { useState } from 'react'
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'motion/react'
import { FiArrowUp } from './ui/icons'
import { duration, ease } from '../lib/motion'

const LABEL = { es: 'Volver arriba', en: 'Back to top' }

/** Botón flotante para volver al inicio de la página. */
export default function BackToTop({ lang = 'es' }) {
  const [show, setShow] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > 700))

  const toTop = () => {
    // Con Lenis activo hay que pedírselo a él; si no, scroll nativo.
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.1 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const label = LABEL[lang] || LABEL.es

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="back-to-top"
          type="button"
          onClick={toTop}
          aria-label={label}
          title={label}
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 16, transition: { duration: duration.fast } }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: duration.base, ease: ease.out }}
          className="fixed bottom-6 right-6 z-overlay w-12 h-12 rounded-full flex items-center justify-center text-white bg-gradient-to-br from-brand-500 to-brand-700 shadow-glow hover:shadow-e4 transition-shadow duration-base"
        >
          <FiArrowUp size={20} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
