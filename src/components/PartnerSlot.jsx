import { ADS_ENABLED, ADSENSE, A_ADS } from '../config'
import { adsenseEnabled } from '../lib/partners'
import { useConsent } from '../lib/ConsentContext'
import PartnerUnit from './PartnerUnit'

const SIZES = {
  banner:    { w: 728, h: 90,  label: '728 × 90' },
  inArticle: { w: 300, h: 250, label: '300 × 250' },
}

const T = {
  label: { es: 'Publicidad', en: 'Advertisement' },
  empty: { es: 'Tu anuncio aquí', en: 'Your ad here' },
}

export default function PartnerSlot({ slot = 'banner', lang = 'es', className = '' }) {
  const { consent } = useConsent()
  if (!ADS_ENABLED) return null

  const size = SIZES[slot] || SIZES.banner
  const adsenseSlot = ADSENSE?.slots?.[slot]
  const useAdsense = adsenseEnabled() && adsenseSlot
  // A-ADS no respeta el Consent Mode de Google: solo se carga si el usuario acepta.
  const aadsUnit = consent === 'accepted' && A_ADS?.[slot]

  const t = (k) => T[k][lang] || T[k].es

  return (
    <aside aria-label={t('label')} className={`flex flex-col items-center gap-1.5 ${className}`}>
      <span className="font-body text-[9px] uppercase tracking-[0.18em] text-fg-subtle">
        {t('label')}
      </span>

      {/* El alto mínimo reserva el hueco: el anuncio no empuja el texto al cargar */}
      <div
        className="relative flex items-center justify-center w-full rounded-card border border-line bg-surface-2 overflow-hidden"
        style={{ maxWidth: size.w, minHeight: size.h }}
      >
        <span className="absolute inset-0 z-0 flex items-center justify-center px-4 text-center pointer-events-none font-body text-[11px] uppercase tracking-[0.15em] text-fg-subtle">
          {t('empty')} · {size.label}
        </span>

        {useAdsense ? (
          <div className="relative z-raised w-full">
            <PartnerUnit client={ADSENSE.client} slot={adsenseSlot} />
          </div>
        ) : aadsUnit ? (
          <iframe
            title={t('label')}
            data-aa={aadsUnit}
            src={`https://acceptable.a-ads.com/${aadsUnit}/?size=Adaptive`}
            scrolling="no"
            className="relative z-raised"
            style={{ border: 0, width: '100%', height: size.h, overflow: 'hidden', margin: 'auto', background: 'transparent' }}
          />
        ) : null}
      </div>
    </aside>
  )
}
