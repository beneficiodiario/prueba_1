const KEY = 'bd_cookie_consent'

// Devuelve 'accepted', 'rejected' o null (sin decidir todavía)
export function getConsent() {
  if (typeof localStorage === 'undefined') return null
  try { return localStorage.getItem(KEY) } catch { return null }
}

export function setConsent(value) {
  try { localStorage.setItem(KEY, value) } catch {}
}

export const consentAccepted = () => getConsent() === 'accepted'

// Google Consent Mode v2: actualiza el estado de Google (GA + AdSense) según la
// decisión del usuario. Por defecto, index.html deja todo en 'denied'; aquí lo
// pasamos a 'granted' al aceptar (o lo reafirmamos en 'denied' al rechazar).
export function updateGoogleConsent(granted) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  const v = granted ? 'granted' : 'denied'
  window.gtag('consent', 'update', {
    ad_storage: v,
    ad_user_data: v,
    ad_personalization: v,
    analytics_storage: v,
  })
}
