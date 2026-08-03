import { createContext, useContext, useState, useEffect, lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { SafeBoundary } from '../components/SafeBoundary'
import { getConsent, setConsent, updateGoogleConsent } from './consent'

// El aviso se carga aparte y aislado: si un bloqueador impide traer el
// módulo, se pierde el aviso pero la web entera sigue funcionando.
const ConsentNotice = lazy(() => import('../components/ConsentNotice'))

const ConsentCtx = createContext({ consent: null, accept: () => {}, reject: () => {} })

/**
 * Carga analítica y publicidad y concede el consentimiento de Google.
 * Los módulos se traen bajo demanda: no entran en el arranque, así que
 * tampoco pueden romperlo si el navegador decide no descargarlos.
 */
async function enableTracking() {
  updateGoogleConsent(true)
  try {
    const [{ initAnalytics }, { initAdsense }] = await Promise.all([
      import('./metrics'),
      import('./partners'),
    ])
    initAnalytics()
    initAdsense()
  } catch {
    // Bloqueado o sin red: no hay analítica ni anuncios, y ya está.
  }
}

export function ConsentProvider({ children }) {
  const [consent, setState] = useState(() => getConsent())

  // Si el usuario ya aceptó en una visita anterior, reactivamos al montar.
  useEffect(() => {
    if (getConsent() === 'accepted') enableTracking()
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
      <SafeBoundary name="aviso de cookies">
        <Suspense fallback={null}>
          <ConsentBanner consent={consent} onAccept={accept} onReject={reject} />
        </Suspense>
      </SafeBoundary>
    </ConsentCtx.Provider>
  )
}

function ConsentBanner({ consent, onAccept, onReject }) {
  const { pathname } = useLocation()
  if (consent) return null
  const lang = pathname.startsWith('/en') ? 'en' : 'es'
  return <ConsentNotice lang={lang} onAccept={onAccept} onReject={onReject} />
}

export const useConsent = () => useContext(ConsentCtx)
