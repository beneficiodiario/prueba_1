import { createContext, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { CONSENT_KEY, getConsent, setConsent } from './consent'
import { sanitizeAnalyticsEvent } from './metrics'
import ConsentNotice from '../components/ConsentNotice'

const ConsentCtx = createContext({ preferences: null, consent: null, openPreferences: () => {} })

export function ConsentProvider({ children }) {
  const [preferences, setPreferences] = useState(getConsent)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    if (preferences?.advertising) {
      import('./partners').then(({ initAdsense }) => {
        if (getConsent()?.advertising) initAdsense()
      }).catch(() => {})
    }
  }, [preferences])
  useEffect(() => {
    const onStorage = event => {
      if (event.key !== CONSENT_KEY && event.key !== null) return
      const next = getConsent()
      if ((preferences?.analytics && !next?.analytics) || (preferences?.advertising && !next?.advertising)) window.location.reload()
      else setPreferences(next)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [preferences])

  const save = next => {
    const saved = setConsent(next)
    const revoked = (preferences?.analytics && !saved.analytics) || (preferences?.advertising && !saved.advertising)
    setPreferences(saved)
    setOpen(false)
    if (revoked) window.location.reload()
  }
  const lang = pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es'
  return <ConsentCtx.Provider value={{ preferences, consent: preferences ? (preferences.advertising ? 'accepted' : 'rejected') : null,
    openPreferences: () => setOpen(true) }}>
    {children}
    {mounted && preferences?.analytics && import.meta.env.PROD && <Analytics beforeSend={sanitizeAnalyticsEvent} debug={false} />}
    {mounted && (!preferences || open) && <ConsentNotice key={`${preferences?.savedAt || 'new'}-${open}`} lang={lang} preferences={preferences} onSave={save} expanded={open} onClose={preferences ? () => setOpen(false) : null} />}
  </ConsentCtx.Provider>
}

export const useConsent = () => useContext(ConsentCtx)
