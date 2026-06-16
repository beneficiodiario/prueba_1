import { motion, useScroll, useSpring } from 'framer-motion'

// Barra de progreso de lectura fijada arriba (encima del navbar).
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-gradient-to-r from-[#00b4d8] via-[#0077b6] to-[#00b4d8]"
    />
  )
}
