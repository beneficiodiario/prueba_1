import { FiX } from './ui/icons'
import { ADS_ENABLED, ADSENSE, A_ADS, TOP_BAR_HEIGHT } from '../config'
import { adsenseEnabled } from '../lib/partners'
import { useConsent } from '../lib/ConsentContext'
import PartnerUnit from './PartnerUnit'

const T = {
  label: { es: 'Publicidad', en: 'Advertisement' },
  empty: { es: 'Tu anuncio aquí · 728 × 90', en: 'Your ad here · 728 × 90' },
  close: { es: 'Cerrar anuncio', en: 'Close ad' },
}

export default function TopPartnerBar({ lang = 'es', open = true, onClose }) {
  const { consent } = useConsent()
  if (!ADS_ENABLED || !open) return null

  const adsenseSlot = ADSENSE?.slots?.banner
  const useAdsense = adsenseEnabled() && adsenseSlot
  // A-ADS no respeta el Consent Mode de Google: solo se carga si el usuario acepta.
  const aadsUnit = consent === 'accepted' && A_ADS?.banner

  const t = (k) => T[k][lang] || T[k].es

  return (
    <aside
      aria-label={t('label')}
      className="fixed top-0 inset-x-0 z-overlay flex items-center justify-center border-b border-line bg-surface-sunken"
      style={{ height: TOP_BAR_HEIGHT }}
    >
      <span className="absolute left-3 top-1 font-body text-[8px] uppercase tracking-[0.18em] text-fg-subtle">
        {t('label')}
      </span>

      <div className="relative flex items-center justify-center w-full px-12" style={{ maxWidth: 760 }}>
        <span className="absolute z-0 font-body text-[11px] uppercase tracking-[0.15em] text-fg-subtle pointer-events-none">
          {t('empty')}
        </span>

        {useAdsense ? (
          <div className="relative z-raised w-full" style={{ maxWidth: 728 }}>
            <PartnerUnit client={ADSENSE.client} slot={adsenseSlot} />
          </div>
        ) : aadsUnit ? (
          <iframe
            title={t('label')}
            data-aa={aadsUnit}
            src={`https://acceptable.a-ads.com/${aadsUnit}/?size=Adaptive`}
            scrolling="no"
            className="relative z-raised"
            style={{ border: 0, width: '100%', maxWidth: 728, height: 90, overflow: 'hidden', margin: 'auto', background: 'transparent' }}
          />
        ) : null}
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label={t('close')}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 min-w-[36px] min-h-[36px] flex items-center justify-center bg-surface border border-line text-fg-muted hover:text-fg hover:bg-surface-2 transition-colors duration-base"
      >
        <FiX size={16} aria-hidden="true" />
      </button>
    </aside>
  )
}
