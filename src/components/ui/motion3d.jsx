import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll, useMotionTemplate } from 'motion/react'
import { decorative, ease, duration } from '../../lib/motion'

// ════════════════════════════════════════════════════════════════
//  Efectos 3D.
//  Todo va con transform sobre GPU: perspective, rotateX/Y y translate.
//  Nada de WebGL — un canvas 3D costaría ~150 kB y batería en móvil
//  para una web que vive del SEO y de cargar rápido.
//
//  Los valores se escriben en MotionValues, no en estado de React: el
//  puntero mueve la tarjeta sin provocar un solo re-render.
// ════════════════════════════════════════════════════════════════

const FINE_POINTER = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(pointer: fine)').matches

/**
 * Tarjeta que se inclina siguiendo al puntero.
 *
 * @param {number} [max=9]      grados máximos de giro
 * @param {number} [scale=1.02] escala al pasar por encima
 * @param {boolean} [glare]     añade un reflejo que sigue al cursor
 */
export function Tilt3D({
  children,
  max = 9,
  scale = 1.02,
  glare = true,
  className = '',
  ...rest
}) {
  const ref = useRef(null)

  // Posición del puntero normalizada a [-0.5, 0.5]
  const px = useMotionValue(0)
  const py = useMotionValue(0)

  const spring = { stiffness: 260, damping: 26, mass: 0.6 }
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring)

  // Reflejo que sigue al cursor. useMotionTemplate reconstruye el
  // gradiente en cada fotograma sin pasar por el estado de React.
  const glareX = useTransform(px, [-0.5, 0.5], [0, 100])
  const glareY = useTransform(py, [-0.5, 0.5], [0, 100])
  const glareBg = useMotionTemplate`radial-gradient(340px circle at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.14), transparent 62%)`

  // Sin ratón (móvil, tablet) o sin permiso para animar: tarjeta plana.
  if (!decorative || !FINE_POINTER()) {
    return <div className={className} {...rest}>{children}</div>
  }

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }

  const onLeave = () => { px.set(0); py.set(0) }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ perspective: 1100 }}
      className={className}
      {...rest}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale }}
        transition={{ duration: duration.slow, ease: ease.out }}
        className="relative h-full [&>*]:h-full"
      >
        {children}
        {glare && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-raised rounded-card opacity-0 transition-opacity duration-slow group-hover:opacity-100"
            style={{ background: glareBg }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

/**
 * Elemento que se deja atraer por el cursor.
 * El tirón se limita a `strength` px para que nunca salga de su hueco.
 */
export function Magnetic({ children, strength = 14, className = '', ...rest }) {
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.5 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.5 })

  if (!decorative || !FINE_POINTER()) {
    return <div className={className} {...rest}>{children}</div>
  }

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
    x.set(Math.max(-1, Math.min(1, dx)) * strength)
    y.set(Math.max(-1, Math.min(1, dy)) * strength)
  }

  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x, y }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/**
 * Revela un titular palabra a palabra, con un giro en 3D.
 * Se parte por palabras y no por letras: los lectores de pantalla
 * leerían las letras sueltas, y aquí el texto es el contenido.
 */
export function SplitText({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.045,
  as: Tag = 'span',
}) {
  const MotionTag = motion[Tag] || motion.span

  if (!decorative) {
    return <Tag className={className}>{text}</Tag>
  }

  const words = String(text).split(' ')

  return (
    <MotionTag
      className={className}
      style={{ perspective: 800 }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
          <motion.span
            className={`inline-block ${wordClassName}`}
            variants={{
              hidden:  { y: '110%', rotateX: -55, opacity: 0 },
              visible: { y: '0%', rotateX: 0, opacity: 1, transition: { duration: 0.7, ease: ease.out } },
            }}
          >
            {word}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}

/**
 * Capa que se desplaza a distinta velocidad que el scroll.
 * Solo para fondos y adornos: mover texto al leer marea.
 *
 * @param {number} [speed=0.15] fracción del scroll (negativo = al revés)
 */
export function Parallax({ children, speed = 0.15, className = '', ...rest }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`])

  if (!decorative) {
    return <div className={className} {...rest}>{children}</div>
  }

  return (
    <div ref={ref} className={className} {...rest}>
      <motion.div style={{ y, willChange: 'transform' }}>{children}</motion.div>
    </div>
  )
}

/**
 * Contador de dígitos que giran al entrar en pantalla.
 * Pensado para cifras cortas: importes, porcentajes.
 */
export function RollingNumber({ value, className = '' }) {
  const chars = String(value).split('')

  if (!decorative) return <span className={className}>{value}</span>

  return (
    <span className={`inline-flex tabular ${className}`} aria-label={String(value)}>
      {chars.map((c, i) => (
        <span key={i} className="inline-block overflow-hidden" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: ease.out, delay: i * 0.04 }}
          >
            {c}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
