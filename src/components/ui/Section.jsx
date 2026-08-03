import { motion } from 'motion/react'
import { fadeUp, stagger, viewport, revealInitial } from '../../lib/motion'

// ════════════════════════════════════════════════════════════════
//  Envoltorio de sección + cabecera.
//  Antes cada sección repetía su propio padding, su propio ancho y su
//  propio bloque "eyebrow + h2 + párrafo". Ahora vive en un sitio.
// ════════════════════════════════════════════════════════════════

const TONES = {
  base:   'bg-bg',
  subtle: 'bg-bg-subtle',
  sunken: 'bg-surface-sunken',
}

const WIDTHS = {
  content: 'max-w-content',
  prose:   'max-w-prose',
  narrow:  'max-w-narrow',
}

// Clases completas: Tailwind necesita verlas literales para generarlas.
const HEADING_SIZES = {
  'display-1': 'text-display-1',
  'display-2': 'text-display-2',
  'display-3': 'text-display-3',
}

export function Section({
  id,
  tone = 'base',
  width = 'content',
  compact = false,
  className = '',
  containerClassName = '',
  children,
  ...rest
}) {
  return (
    <section
      id={id}
      className={`relative ${TONES[tone]} ${compact ? 'py-section-sm' : 'py-section'} transition-colors duration-slow ${className}`}
      {...rest}
    >
      <div className={`container-page ${WIDTHS[width]} relative z-raised ${containerClassName}`}>
        {children}
      </div>
    </section>
  )
}

/** Etiqueta pequeña en versalitas que abre cada sección. */
export function Eyebrow({ children, icon: Icon, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-body text-eyebrow uppercase text-brand-fg ${className}`}
    >
      {Icon && <Icon size={13} aria-hidden="true" />}
      {children}
    </span>
  )
}

/**
 * Cabecera de sección. El escalonado hace que la etiqueta, el título y
 * el subtítulo entren en cascada en vez de aparecer todos de golpe.
 */
export function SectionHeader({
  eyebrow,
  eyebrowIcon,
  title,
  subtitle,
  align = 'center',
  as: Heading = 'h2',
  size = 'display-2',
  className = '',
}) {
  const alignment = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start'

  return (
    <motion.div
      variants={stagger(0.07)}
      initial={revealInitial}
      whileInView="visible"
      viewport={viewport}
      className={`flex flex-col ${alignment} mb-12 sm:mb-14 ${className}`}
    >
      {eyebrow && (
        <motion.div variants={fadeUp}>
          <Eyebrow icon={eyebrowIcon}>{eyebrow}</Eyebrow>
        </motion.div>
      )}

      <motion.div variants={fadeUp}>
        <Heading className={`font-display ${HEADING_SIZES[size] || HEADING_SIZES['display-2']} text-fg mt-3 text-balance`}>
          {title}
        </Heading>
      </motion.div>

      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={`font-body text-lead text-fg-muted mt-4 max-w-[52ch] ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}

/** Separador con texto centrado — reemplaza el "línea + label + línea" a mano. */
export function Divider({ label, className = '' }) {
  return (
    <div className={`flex items-center gap-4 ${className}`} role="separator" aria-label={label}>
      <span className="flex-1 h-px bg-line" />
      {label && (
        <span className="font-body text-eyebrow uppercase text-fg-subtle whitespace-nowrap">
          {label}
        </span>
      )}
      <span className="flex-1 h-px bg-line" />
    </div>
  )
}
