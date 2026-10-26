import { ADSENSE } from '../config'
import { consentAccepted } from './consent'

export const adsenseEnabled = () => typeof ADSENSE?.client === 'string' && ADSENSE.client.startsWith('ca-pub-')

// Carga el script de Google AdSense una sola vez (solo si está configurado)
export function initAdsense() {
  if (!consentAccepted() || !Object.values(ADSENSE.slots).some(Boolean) || !adsenseEnabled() || typeof document === 'undefined' || window.__adsenseLoaded) return
  window.__adsenseLoaded = true
  // Si el script ya está en el HTML (verificación de AdSense), no lo duplicamos
  if (document.querySelector('script[src*="adsbygoogle.js"]')) return
  const s = document.createElement('script')
  s.async = true
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE.client}`
  s.crossOrigin = 'anonymous'
  document.head.appendChild(s)
}
