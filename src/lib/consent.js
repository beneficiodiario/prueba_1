export const CONSENT_KEY = 'bd_cookie_consent'
export const CONSENT_VERSION = 2
export const CONSENT_MAX_AGE = 180 * 24 * 60 * 60 * 1000

export function getConsent() {
  try {
    const value = JSON.parse(localStorage.getItem(CONSENT_KEY))
    if (!value || value.version !== CONSENT_VERSION || typeof value.analytics !== 'boolean' ||
      typeof value.advertising !== 'boolean' || !Number.isFinite(value.savedAt) ||
      value.savedAt > Date.now() || Date.now() - value.savedAt >= CONSENT_MAX_AGE) return null
    return value
  } catch { return null }
}

export function setConsent({ analytics, advertising }) {
  const value = { version: CONSENT_VERSION, analytics: Boolean(analytics), advertising: Boolean(advertising), savedAt: Date.now() }
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify(value)) } catch { /* Permisos solo en memoria si el almacenamiento está bloqueado. */ }
  return value
}

export const consentAccepted = () => getConsent()?.advertising === true
