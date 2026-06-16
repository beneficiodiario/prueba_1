import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowUp } from 'react-icons/fi'

// Botón flotante para volver arriba. Aparece tras desplazar la página.
export default function BackToTop({ lang = 'es' }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => {
    // Usa Lenis si está disponible para mantener el scroll suave; si no, scroll nativo.
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.2 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          onClick={toTop}
          aria-label={lang === 'es' ? 'Volver arriba' : 'Back to top'}
          title={lang === 'es' ? 'Volver arriba' : 'Back to top'}
          className="fixed bottom-6 right-6 z-[55] w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg shadow-[#00b4d8]/30 bg-gradient-to-br from-[#00b4d8] to-[#0077b6] hover:shadow-xl hover:shadow-[#00b4d8]/40 transition-shadow"
        >
          <FiArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
