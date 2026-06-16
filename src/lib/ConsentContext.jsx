import { createContext, useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import CookieConsent from '../components/CookieConsent'
import { initAnalytics } from './analytics'
import { initAdsense } from './ads'
import { getConsent, setConsent, updateGoogleConsent } from './consent'
import { getDark } from './prefs'

const ConsentCtx = createContext({ consent: null, accept: () => {}, reject: () => {} })

// Carga GA + AdSense y concede el consentimiento de Google. Idempotente:
// initAnalytics/initAdsense se autoprotegen contra dobles cargas.
function enableTracking() {
  updateGoogleConsent(true)
  initAnalytics()
  initAdsense()
}

export function ConsentProvider({ children }) {
  const [consent, setState] = useState(() => getConsent())

  // Si el usuario ya aceptó en una visita anterior, reactivamos todo al montar.
  useEffect(() => {
    if (getConsent() === 'accepted') enableTracking()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const accept = () => {
    setConsent('accepted'); setState('accepted')
    enableTracking()
  }
  const reject = () => {
    setConsent('rejected'); setState('rejected')
    updateGoogleConsent(false)
  }

  return (
    <ConsentCtx.Provider value={{ consent, accept, reject }}>
      {children}
      <ConsentBanner consent={consent} onAccept={accept} onReject={reject} />
    </ConsentCtx.Provider>
  )
}

function ConsentBanner({ consent, onAccept, onReject }) {
  const { pathname } = useLocation()
  if (consent) return null
  const lang = pathname.startsWith('/en') ? 'en' : 'es'
  return <CookieConsent lang={lang} darkMode={getDark()} onAccept={onAccept} onReject={onReject} />
}

export const useConsent = () => useContext(ConsentCtx)
