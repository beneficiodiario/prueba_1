import { motion, useScroll, useSpring } from 'motion/react'

/**
 * Barra de progreso de lectura, fijada arriba del todo.
 * scaleX sobre el eje X: no toca el diseño ni provoca reflow.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 h-[3px] z-overlay origin-left bg-gradient-to-r from-brand-500 via-brand-700 to-brand-500"
    />
  )
}
