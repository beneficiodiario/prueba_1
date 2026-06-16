import { FiX } from 'react-icons/fi'
import { ADS_ENABLED, ADSENSE, A_ADS } from '../config'
import { adsenseEnabled } from '../lib/ads'
import { useConsent } from '../lib/ConsentContext'
import AdsenseUnit from './AdsenseUnit'

export const TOP_AD_HEIGHT = 90

const LABEL = { es: 'Publicidad', en: 'Advertisement' }
const EMPTY = { es: 'Tu anuncio aquí · 728 × 90', en: 'Your ad here · 728 × 90' }

export default function TopAdBar({ darkMode = false, lang = 'es', open = true, onClose }) {
  const { consent } = useConsent()
  if (!ADS_ENABLED || !open) return null

  const adsenseSlot = ADSENSE?.slots?.banner
  const useAdsense = adsenseEnabled() && adsenseSlot
  // A-ADS no respeta el Consent Mode de Google: solo se carga si el usuario acepta.
  const showAads = consent === 'accepted' && A_ADS?.banner

  return (
    <div
      className={`fixed top-0 inset-x-0 z-[60] flex items-center justify-center border-b ${darkMode ? 'bg-[#0b1120] border-white/10' : 'bg-gray-50 border-gray-200'}`}
      style={{ height: TOP_AD_HEIGHT }}
    >
      <span className={`absolute left-3 top-1 font-body text-[8px] uppercase tracking-[0.18em] ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
        {LABEL[lang] || LABEL.es}
      </span>

      <div className="relative flex items-center justify-center w-full px-12" style={{ maxWidth: 760 }}>
        <span className={`absolute z-0 font-body text-[11px] uppercase tracking-[0.15em] pointer-events-none ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>
          {EMPTY[lang] || EMPTY.es}
        </span>
        {useAdsense ? (
          <div className="relative z-10 w-full" style={{ maxWidth: 728 }}>
            <AdsenseUnit client={ADSENSE.client} slot={adsenseSlot} />
          </div>
        ) : showAads ? (
          <iframe
            title="ad"
            data-aa={showAads}
            src={`https://acceptable.a-ads.com/${showAads}/?size=Adaptive`}
            scrolling="no"
            className="relative z-10"
            style={{ border: 0, padding: 0, width: '100%', maxWidth: 728, height: 90, overflow: 'hidden', margin: 'auto', background: 'transparent' }}
          />
        ) : null}
      </div>

      <button
        onClick={onClose}
        aria-label={lang === 'es' ? 'Cerrar anuncio' : 'Close ad'}
        className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 transition-colors ${darkMode ? 'bg-white/10 text-gray-300 hover:bg-white/20' : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'}`}
      >
        <FiX size={16} />
      </button>
    </div>
  )
}
