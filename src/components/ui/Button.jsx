import { forwardRef } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { duration, ease } from '../../lib/motion'

// ════════════════════════════════════════════════════════════════
//  Botón único para toda la web.
//  Un solo CTA primario por pantalla; el resto son secundarios o
//  discretos. Altura mínima 44px en todas las variantes (táctil).
// ════════════════════════════════════════════════════════════════

const VARIANTS = {
  primary:
    'bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow ' +
    'hover:shadow-e4 hover:brightness-105',
  secondary:
    'bg-surface text-fg border border-line hover:border-brand-500/50 hover:bg-surface-2 shadow-e1',
  ghost:
    'text-fg-muted hover:text-brand-fg hover:bg-brand-500/8',
  outline:
    'border border-brand-500/40 text-brand-fg hover:bg-brand-500/10 hover:border-brand-500/70',
  youtube:
    'bg-[#ff0033] text-white shadow-e2 hover:bg-[#e6002e] hover:shadow-e3',
  danger:
    'bg-danger text-white shadow-e2 hover:brightness-110',
}

const SIZES = {
  sm: 'min-h-[40px] px-4 py-2 text-[13px] gap-1.5 rounded-xl',
  md: 'min-h-[44px] px-6 py-3 text-sm gap-2 rounded-xl',
  lg: 'min-h-[52px] px-8 py-3.5 text-[15px] gap-2 rounded-2xl',
}

const base =
  'inline-flex items-center justify-center font-display font-bold cursor-pointer ' +
  'transition-[background-color,border-color,box-shadow,filter,color] duration-base ease-out-quart ' +
  'disabled:opacity-50 disabled:pointer-events-none select-none [touch-action:manipulation]'

const gesture = {
  whileHover: { y: -2, transition: { duration: duration.base, ease: ease.out } },
  whileTap:   { scale: 0.97, y: 0, transition: { duration: duration.fast } },
}

// Se crea una sola vez: hacerlo dentro del render remontaría el enlace
// en cada actualización y perdería el foco del teclado.
const MotionLink = motion.create(Link)

/**
 * Renderiza <button>, <a> o <Link> según lo que reciba, pero con
 * la misma apariencia y el mismo gesto de pulsación.
 */
export const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', to, href, external, className = '', children, ...rest },
  ref,
) {
  const classes = `${base} ${SIZES[size]} ${VARIANTS[variant]} ${className}`

  if (to) {
    return (
      <MotionLink ref={ref} to={to} className={classes} {...gesture} {...rest}>
        {children}
      </MotionLink>
    )
  }

  if (href) {
    const isExternal = external ?? /^https?:|^mailto:/.test(href)
    return (
      <motion.a
        ref={ref}
        href={href}
        className={classes}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...gesture}
        {...rest}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button ref={ref} type="button" className={classes} {...gesture} {...rest}>
      {children}
    </motion.button>
  )
})

/**
 * Enlace de texto con flecha que se separa al pasar el ratón.
 * El gesto lo hace el hermano `.group`, así funciona también cuando
 * el enlace vive dentro de una tarjeta pulsable.
 */
export function ArrowLink({ href, to, children, className = '', tone = 'brand', ...rest }) {
  const color = tone === 'brand' ? 'text-brand-fg' : ''
  const inner = (
    <>
      {children}
      <svg
        viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true"
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
        className="transition-transform duration-base ease-out-quart group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
    </>
  )
  const classes = `group inline-flex items-center gap-1.5 font-display font-semibold text-sm ${color} ${className}`

  if (to) return <Link to={to} className={classes} {...rest}>{inner}</Link>
  return (
    <a
      href={href}
      className={classes}
      {...(/^https?:/.test(href || '') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {inner}
    </a>
  )
}
