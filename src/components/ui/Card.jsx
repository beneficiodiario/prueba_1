// ════════════════════════════════════════════════════════════════
//  Tarjeta base. Toda superficie elevada de la web pasa por aquí,
//  así la elevación, el radio y el borde son iguales en todas partes.
// ════════════════════════════════════════════════════════════════

const TONES = {
  solid: 'bg-surface border-line shadow-e2',
  glass: 'glass',
  flat:  'bg-surface-2 border-line',
  muted: 'bg-surface-sunken border-line/60',
}

export function Card({
  as: Tag = 'div',
  tone = 'solid',
  interactive = false,
  shine = false,
  className = '',
  children,
  ...rest
}) {
  return (
    <Tag
      className={[
        'relative rounded-card border overflow-hidden',
        TONES[tone],
        shine ? 'shine' : '',
        interactive
          ? 'transition-[transform,box-shadow,border-color] duration-slow ease-out-quart ' +
            'hover:-translate-y-1 hover:shadow-e4 hover:border-brand-500/35'
          : '',
        className,
      ].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Etiqueta pequeña de categoría o estado. */
export function Badge({ tone = 'brand', icon: Icon, className = '', children, style }) {
  const tones = {
    brand:   'bg-brand-500/12 text-brand-fg border-brand-500/25',
    success: 'bg-success/12 text-success-fg border-success/25',
    warning: 'bg-warning/14 text-warning-fg border-warning/30',
    danger:  'bg-danger/12 text-danger-fg border-danger/25',
    neutral: 'bg-surface-2 text-fg-muted border-line',
    onImage: 'bg-black/45 text-white border-white/25 backdrop-blur-md',
  }
  return (
    <span
      style={style}
      className={`inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-[0.1em] ${tones[tone]} ${className}`}
    >
      {Icon && <Icon size={11} aria-hidden="true" />}
      {children}
    </span>
  )
}

/** Casilla de dato: etiqueta arriba, valor grande abajo. */
export function StatBox({ label, value, tone, className = '' }) {
  return (
    <div className={`rounded-xl bg-surface-2 border border-line/70 px-2.5 py-2.5 text-center ${className}`}>
      <div
        className="font-display font-extrabold text-sm tabular"
        style={tone ? { color: tone } : undefined}
      >
        {value}
      </div>
      <div className="font-body text-[9px] font-semibold text-fg-subtle uppercase tracking-[0.1em] mt-0.5">
        {label}
      </div>
    </div>
  )
}

