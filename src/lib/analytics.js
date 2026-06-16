import { GA_MEASUREMENT_ID } from '../config'

const isConfigured = () =>
  typeof GA_MEASUREMENT_ID === 'string' && GA_MEASUREMENT_ID.startsWith('G-')

export function initAnalytics() {
  if (!isConfigured() || typeof document === 'undefined' || window.__gaLoaded) return
  window.__gaLoaded = true

  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(s)

  window.dataLayer = window.dataLayer || []
  if (typeof window.gtag !== 'function') { window.gtag = function () { window.dataLayer.push(arguments) } }
  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID)
}

export function trackEvent(name, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  }
}
