import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Button } from './ui/Button'
import { ease } from '../lib/motion'

const T = {
  title: { es: 'Tu privacidad', en: 'Your privacy' },
  text: {
    es: 'Usamos cookies propias y de terceros para analítica (Google Analytics) y para mostrar publicidad. Puedes aceptarlas todas o rechazarlas. Si rechazas, no se cargará ningún sistema de seguimiento ni anuncios.',
    en: 'We use first- and third-party cookies for analytics (Google Analytics) and to show ads. You can accept them all or reject them. If you reject, no tracking or ads will load.',
  },
  more:   { es: 'Más información', en: 'More info' },
  accept: { es: 'Aceptar', en: 'Accept' },
  reject: { es: 'Rechazar', en: 'Reject' },
  region: { es: 'Aviso de cookies', en: 'Cookie notice' },
}

export default function ConsentNotice({ lang = 'es', onAccept, onReject }) {
  const t = (k) => T[k][lang] || T[k].es

  return (
    <motion.div
      role="region"
      aria-label={t('region')}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: ease.out, delay: 0.4 }}
      className="fixed bottom-0 inset-x-0 z-toast p-3 sm:p-4 flex justify-center pointer-events-none"
    >
      <div className="pointer-events-auto w-full max-w-3xl rounded-card border border-line bg-surface shadow-e4 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <p className="font-display font-bold text-sm text-fg mb-1">{t('title')}</p>
          <p className="font-body text-xs leading-relaxed text-fg-muted">
            {t('text')}{' '}
            <Link to="/privacidad" className="text-brand-fg underline underline-offset-2">
              {t('more')}
            </Link>
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <Button variant="secondary" size="sm" onClick={onReject} className="flex-1 sm:flex-none">
            {t('reject')}
          </Button>
          <Button size="sm" onClick={onAccept} className="flex-1 sm:flex-none">
            {t('accept')}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
