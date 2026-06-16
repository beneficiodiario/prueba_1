import { ADS_ENABLED, ADSENSE, A_ADS } from '../config'
import { adsenseEnabled } from '../lib/ads'
import { useConsent } from '../lib/ConsentContext'
import AdsenseUnit from './AdsenseUnit'

const SIZES = {
  banner:    { w: 728, h: 90,  label: '728 × 90' },
  inArticle: { w: 300, h: 250, label: '300 × 250' },
}

const LABEL = { es: 'Publicidad', en: 'Advertisement' }
const EMPTY = { es: 'Tu anuncio aquí', en: 'Your ad here' }

export default function AdSlot({ slot = 'banner', darkMode = false, lang = 'es', className = '' }) {
  const { consent } = useConsent()
  if (!ADS_ENABLED) return null

  const size = SIZES[slot] || SIZES.banner
  const adsenseSlot = ADSENSE?.slots?.[slot]
  const useAdsense = adsenseEnabled() && adsenseSlot
  // A-ADS no respeta el Consent Mode de Google: solo se carga si el usuario acepta.
  const showAads = consent === 'accepted' && A_ADS?.[slot]

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <span className={`font-body text-[9px] uppercase tracking-[0.18em] ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
        {LABEL[lang] || LABEL.es}
      </span>

      <div
        className={`relative flex items-center justify-center w-full rounded-2xl border overflow-hidden ${darkMode ? 'border-white/10 bg-white/[0.03]' : 'border-gray-200 bg-gray-50'}`}
        style={{ maxWidth: size.w, minHeight: size.h }}
      >
        {/* Texto de fondo: visible mientras el anuncio no tenga relleno */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none text-center px-4">
          <span className={`font-body text-[11px] uppercase tracking-[0.15em] ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>
            {EMPTY[lang] || EMPTY.es} · {size.label}
          </span>
        </div>

        {useAdsense ? (
          <div className="relative z-10 w-full">
            <AdsenseUnit client={ADSENSE.client} slot={adsenseSlot} />
          </div>
        ) : showAads ? (
          <iframe
            title="ad"
            data-aa={showAads}
            src={`https://acceptable.a-ads.com/${showAads}/?size=Adaptive`}
            scrolling="no"
            className="relative z-10"
            style={{ border: 0, padding: 0, width: '100%', height: size.h, overflow: 'hidden', margin: 'auto', background: 'transparent' }}
          />
        ) : null}
      </div>
    </div>
  )
}
