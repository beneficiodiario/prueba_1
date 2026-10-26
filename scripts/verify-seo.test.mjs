import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { INDEXABLE_ROUTES } from '../src/data/routes.js'
import { LEGAL_LINKS } from '../src/data/legalPages.js'
import { absoluteUrl } from '../src/lib/structuredData.js'
import { makeSitemap } from './seo-resources.mjs'
import { CONSENT_KEY, CONSENT_MAX_AGE, CONSENT_VERSION, getConsent, setConsent } from '../src/lib/consent.js'
import { sanitizeAnalyticsEvent } from '../src/lib/metrics.js'
import { createPreviewServer } from './preview-static.mjs'

const outputPath = path => resolve('dist', path === '/' ? 'index.html' : `${path.slice(1)}.html`)
const htmlByPath = new Map(INDEXABLE_ROUTES.map(page => [page.path, readFileSync(outputPath(page.path), 'utf8')]))

test('Cada URL indexable sirve su propio contenido completo y un solo conjunto de metadatos', () => {
  const titles = new Set()
  for (const page of INDEXABLE_ROUTES) {
    const html = htmlByPath.get(page.path)
    assert.equal((html.match(/<title>/g) || []).length, 1, page.path)
    assert.equal((html.match(/<h1\b/g) || []).length, 1, page.path)
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1, page.path)
    assert.ok(html.includes(`href="${absoluteUrl(page.path)}"`), page.path)
    assert.ok(html.includes(`<html lang="${page.lang}">`), page.path)
    assert.ok(!html.includes('data-msg=') && !html.includes('data-stck='), `Error SSR: ${page.path}`)
    assert.ok(!html.includes('noindex'), page.path)
    assert.ok(!html.includes('googletagmanager.com/gtag') && !html.includes('<script async src="https://pagead2.'), page.path)
    const title = html.match(/<title>(.*?)<\/title>/)[1]
    assert.ok(!titles.has(title), `Título duplicado: ${page.path}`)
    titles.add(title)
    const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    assert.equal(jsonLd.length, 1, page.path)
    const graph = JSON.parse(jsonLd[0][1])['@graph']
    for (const node of graph) {
      if (node.datePublished) assert.match(node.datePublished, /^\d{4}-\d{2}-\d{2}$/)
    }
    for (const link of LEGAL_LINKS) assert.ok(html.includes(`href="${link.path}"`), `${page.path}: falta ${link.path}`)
  }
})

test('El sitemap solo contiene URLs existentes y traducciones reales, sin 404 ni fechas inventadas', () => {
  const xml = readFileSync('dist/sitemap.xml', 'utf8')
  assert.equal(xml, makeSitemap())
  assert.equal(xml, readFileSync('public/sitemap.xml', 'utf8'))
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1])
  assert.equal(urls.length, INDEXABLE_ROUTES.length)
  assert.equal(new Set(urls).size, urls.length)
  assert.ok(!xml.includes('/404') && !xml.includes('<priority>') && !xml.includes('<changefreq>'))
  for (const page of INDEXABLE_ROUTES) {
    assert.ok(urls.includes(absoluteUrl(page.path)))
    for (const path of Object.values(page.alternates || {})) assert.ok(htmlByPath.has(path))
    if (page.lastmod) assert.match(page.lastmod, /^\d{4}-\d{2}-\d{2}$/)
  }
})

test('La 404 tiene contenido útil, noindex y no canonical hacia la portada', () => {
  const html = readFileSync('dist/404.html', 'utf8')
  assert.ok(html.includes('noindex, follow'))
  assert.ok(!html.includes('rel="canonical"'))
  assert.ok(!html.includes('hreflang='))
  assert.ok(html.includes('Esta página se ha salido del mapa.'))
  assert.ok(html.includes('href="/ingresos-pasivos"'))
  const config = JSON.parse(readFileSync('vercel.json'))
  assert.equal(config.cleanUrls, true)
  assert.equal(config.trailingSlash, false)
  assert.ok(!config.rewrites && !config.routes, 'Un catch-all convertiría las rutas inexistentes en soft 404')
})

test('Los enlaces internos apuntan a páginas, archivos y anclas realmente existentes', () => {
  for (const [path, html] of htmlByPath) {
    for (const match of html.matchAll(/\shref="([^"<>]+)"/g)) {
      const href = match[1].replaceAll('&amp;', '&')
      if (/^(https?:|mailto:|tel:|data:)/.test(href)) continue
      const url = new URL(href, absoluteUrl(path))
      const target = htmlByPath.get(url.pathname)
      if (target) {
        if (url.hash) assert.ok(target.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${path}: ancla rota ${href}`)
      } else assert.ok(existsSync(resolve('dist', url.pathname.slice(1))), `${path}: enlace roto ${href}`)
    }
  }
})

test('El consentimiento caduca, rechaza valores antiguos y permite categorías independientes', () => {
  const savedStorage = globalThis.localStorage
  const values = new Map()
  globalThis.localStorage = { getItem: key => values.get(key) || null, setItem: (key, value) => values.set(key, value) }
  try {
    assert.equal(getConsent(), null)
    values.set(CONSENT_KEY, 'accepted')
    assert.equal(getConsent(), null)
    const saved = setConsent({ analytics: true, advertising: false })
    assert.equal(getConsent().analytics, true)
    assert.equal(getConsent().advertising, false)
    assert.equal(saved.version, CONSENT_VERSION)
    const event = sanitizeAnalyticsEvent({ type: 'pageview', url: 'https://beneficiodiario.com/contacto?email=persona@example.com#privado' })
    assert.equal(event.url, 'https://beneficiodiario.com/contacto')
    assert.equal(sanitizeAnalyticsEvent({ type: 'pageview', url: 'https://beneficiodiario.com/persona@example.com?token=privado' }).url, 'https://beneficiodiario.com/404')
    setConsent({ analytics: false, advertising: true })
    assert.equal(sanitizeAnalyticsEvent({ type: 'pageview', url: 'https://beneficiodiario.com/' }), null)
    values.set(CONSENT_KEY, JSON.stringify({ ...saved, savedAt: Date.now() - CONSENT_MAX_AGE - 1000 }))
    assert.equal(getConsent(), null)
    values.set(CONSENT_KEY, JSON.stringify({ ...saved, analytics: 'true' }))
    assert.equal(getConsent(), null)
  } finally {
    if (savedStorage === undefined) delete globalThis.localStorage
    else globalThis.localStorage = savedStorage
  }
})

test('HTTP local: páginas públicas 200, URL inexistente 404 y normalización de barra final', async () => {
  const server = createPreviewServer()
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  const base = `http://127.0.0.1:${server.address().port}`
  try {
    for (const page of INDEXABLE_ROUTES) assert.equal((await fetch(`${base}${page.path}`)).status, 200, page.path)
    for (const path of ['/no-existe', '/blog/slug-inexistente', '/en/blog/missing', '/assets/missing.js']) {
      const result = await fetch(`${base}${path}`)
      assert.equal(result.status, 404, path)
      assert.ok((await result.text()).includes('noindex, follow'))
    }
    assert.equal((await fetch(`${base}/privacidad/`, { redirect: 'manual' })).status, 308)
    assert.equal((await fetch(`${base}/privacidad.html`, { redirect: 'manual' })).status, 308)
  } finally { await new Promise(resolve => server.close(resolve)) }
})
