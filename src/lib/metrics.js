import { track } from '@vercel/analytics'
import { getConsent } from './consent.js'
import { INDEXABLE_ROUTES } from '../data/routes.js'

const publicPaths = new Set(INDEXABLE_ROUTES.map(page => page.path))

export function sanitizeAnalyticsEvent(event) {
  if (!getConsent()?.analytics) return null
  try {
    const url = new URL(event.url)
    if (!publicPaths.has(url.pathname)) url.pathname = '/404'
    url.search = ''
    url.hash = ''
    return { ...event, url: url.href }
  } catch { return null }
}

// Solo propiedades editoriales conocidas; nunca texto, URLs ni datos del visitante.
export function trackEvent(name, params = {}) {
  if (!import.meta.env.PROD || !getConsent()?.analytics) return
  if (!['affiliate_click', 'project_click', 'referral_copy'].includes(name)) return
  const safe = {}
  for (const key of ['project', 'location']) {
    if (typeof params[key] === 'string' && /^[a-z0-9_-]{1,50}$/i.test(params[key])) safe[key] = params[key]
  }
  track(name, safe)
}
