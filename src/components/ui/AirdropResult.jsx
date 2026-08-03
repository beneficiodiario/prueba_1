import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Badge } from './Card'
import { FiCheck, FiChevronDown } from './icons'
import { duration, ease, decorative } from '../../lib/motion'

// ════════════════════════════════════════════════════════════════
//  Resultado de un airdrop ya repartido.
//  Muestra lo que recibimos de verdad, con las capturas del panel del
//  proyecto. Es la prueba de que lo que publicamos lo usamos nosotros.
// ════════════════════════════════════════════════════════════════

const T = {
  received: { es: 'Recibido', en: 'Received' },
  proof:    { es: 'Ver capturas', en: 'View screenshots' },
  hide:     { es: 'Ocultar capturas', en: 'Hide screenshots' },
}

export function AirdropResult({ airdrop, lang = 'es' }) {
  const [open, setOpen] = useState(false)
  const [broken, setBroken] = useState({})

  if (!airdrop) return null

  const rows = airdrop.rows?.[lang] || airdrop.rows?.es || []
  const proof = (airdrop.proof || []).filter((p) => !broken[p.src])
  const amount = lang === 'en' ? `$${airdrop.totalUsd}` : `${airdrop.totalUsd} $`

  return (
    <div className="mt-5 rounded-card border border-success/25 bg-success/[0.06] p-5">
      <div className="flex items-center justify-between gap-3 mb-4">
        <Badge tone="success" icon={FiCheck}>
          {airdrop.label?.[lang] || airdrop.label?.es}
        </Badge>
        <span className="font-display font-extrabold text-xl text-success-fg tabular">
          {amount}
        </span>
      </div>

      <dl className="space-y-0 mb-3">
        {rows.map((r, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-4 py-2 border-b border-success/15 last:border-0"
          >
            <dt className="font-body text-xs text-fg-muted">{r.label}</dt>
            <dd className="font-mono text-xs font-semibold text-fg tabular text-right">{r.value}</dd>
          </div>
        ))}
      </dl>

      <p className="font-body text-[11px] leading-relaxed text-fg-subtle">
        {airdrop.note?.[lang] || airdrop.note?.es}
      </p>

      {proof.length > 0 && (
        <>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="mt-4 inline-flex items-center gap-1.5 min-h-[36px] font-display font-semibold text-xs text-success-fg hover:opacity-80 transition-opacity"
          >
            {open ? T.hide[lang] : T.proof[lang]}
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: duration.base, ease: ease.out }}
              aria-hidden="true"
            >
              <FiChevronDown size={14} />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="proof"
                initial={decorative ? { height: 0, opacity: 0 } : false}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0, transition: { duration: duration.base, ease: ease.in } }}
                transition={{ duration: duration.slow, ease: ease.out }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  {proof.map((p) => (
                    <figure
                      key={p.src}
                      className="rounded-xl overflow-hidden border border-line bg-surface"
                    >
                      <img
                        src={p.src}
                        alt={p.alt?.[lang] || p.alt?.es || ''}
                        loading="lazy"
                        className="w-full h-auto object-contain"
                        onError={() => setBroken((b) => ({ ...b, [p.src]: true }))}
                      />
                    </figure>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  )
}
