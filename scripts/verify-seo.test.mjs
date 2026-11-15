import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { INDEXABLE_ROUTES } from '../src/data/routes.js'
import { LEGAL_LINKS } from '../src/data/legalPages.js'
import { absoluteUrl } from '../src/lib/structuredData.js'
import { makeSitemap, makeLlms } from './seo-resources.mjs'
import { REDIRECTS } from '../src/data/redirects.js'
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

test('Títulos y descripciones caben en el resultado de búsqueda', () => {
  for (const page of INDEXABLE_ROUTES) {
    assert.ok(page.title.length <= 65, `Título largo (${page.title.length}): ${page.path}`)
    assert.ok(page.description.length >= 70 && page.description.length <= 165, `Descripción fuera de rango (${page.description.length}): ${page.path}`)
  }
})

test('Las URLs retiradas redirigen con 301 a una página indexable, igual en Vercel, Apache y local', async () => {
  const indexable = new Set(INDEXABLE_ROUTES.map(page => page.path))
  const vercel = JSON.parse(readFileSync('vercel.json')).redirects
  const htaccess = readFileSync('public/.htaccess', 'utf8')
  const sitemap = readFileSync('dist/sitemap.xml', 'utf8')
  for (const { from, to } of REDIRECTS) {
    assert.ok(!indexable.has(from), `${from} sigue publicada`)
    assert.ok(indexable.has(to), `${from} redirige a ${to}, que no es indexable`)
    assert.ok(!sitemap.includes(absoluteUrl(from)), `${from} sigue en el sitemap`)
    assert.ok(vercel.some(r => r.source === from && r.destination === to && r.permanent), `vercel.json: falta ${from}`)
    assert.ok(htaccess.includes(`RewriteRule ^${from.slice(1)}/?$ ${to} [R=301,L]`), `.htaccess: falta ${from}`)
  }
  const server = createPreviewServer()
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  const base = `http://127.0.0.1:${server.address().port}`
  try {
    for (const { from, to } of REDIRECTS) {
      const result = await fetch(`${base}${from}`, { redirect: 'manual' })
      assert.equal(result.status, 301, from)
      assert.equal(result.headers.get('location'), to, from)
    }
  } finally { await new Promise(resolve => server.close(resolve)) }
})

test('llms.txt y llms-full.txt están sincronizados y solo enlazan a URLs vivas', () => {
  const live = new Set(INDEXABLE_ROUTES.map(page => page.path))
  for (const [file, full] of [['llms.txt', false], ['llms-full.txt', true]]) {
    const text = readFileSync(`dist/${file}`, 'utf8')
    assert.equal(text, makeLlms(full), file)
    assert.equal(text, readFileSync(`public/${file}`, 'utf8'), file)
    assert.ok(text.startsWith('# Beneficio Diario\n\n> '), `${file}: falta H1 y resumen`)
    assert.ok(!/\w\*/.test(text), `${file}: quedan asteriscos de glosario`)
    for (const { from } of REDIRECTS) assert.ok(!text.includes(absoluteUrl(from)), `${file}: enlaza a la URL retirada ${from}`)
    for (const match of text.matchAll(/https:\/\/beneficiodiario\.com(\/[^\s)#]*)?/g)) {
      const path = match[1] || '/'
      assert.ok(live.has(path) || existsSync(resolve('dist', path.slice(1))), `${file}: enlace roto ${match[0]}`)
    }
  }
  const index = readFileSync('dist/llms.txt', 'utf8')
  for (const page of INDEXABLE_ROUTES.filter(page => page.lang === 'es')) assert.ok(index.includes(absoluteUrl(page.path)), `llms.txt: falta ${page.path}`)
  assert.ok(index.includes('\n## Optional\n'), 'llms.txt: falta la sección Optional')
  const full = readFileSync('dist/llms-full.txt', 'utf8')
  for (const page of INDEXABLE_ROUTES.filter(page => page.type === 'article' && page.lang === 'es')) assert.ok(full.includes(absoluteUrl(page.path)), `llms-full.txt: falta ${page.path}`)
})

test('robots.txt permite el rastreo a buscadores e IA y declara el sitemap', () => {
  const robots = readFileSync('dist/robots.txt', 'utf8')
  assert.ok(!/^Disallow:\s*\/\s*$/m.test(robots), 'Hay un Disallow: / que bloquea todo un grupo')
  assert.ok(robots.includes('Sitemap: https://beneficiodiario.com/sitemap.xml'))
  for (const bot of ['*', 'OAI-SearchBot', 'GPTBot', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended']) {
    assert.ok(robots.includes(`User-agent: ${bot}\n`), `robots.txt: falta ${bot}`)
  }
  // Cada grupo debe terminar en un Allow: un User-agent suelto al final de un grupo lo dejaría sin reglas.
  for (const group of robots.split(/\n\s*\n/).filter(block => block.includes('User-agent:'))) {
    assert.ok(/\nAllow: \/\s*$/.test(group.trimEnd() + '\n'), `Grupo sin Allow: ${group.split('\n').find(l => l.startsWith('User-agent'))}`)
  }
})

test('Las imágenes principales de los artículos tienen texto alternativo', () => {
  for (const page of INDEXABLE_ROUTES.filter(page => page.type === 'article')) {
    const hero = htmlByPath.get(page.path).match(/<img[^>]*fetchpriority="high"[^>]*>/)
    assert.ok(hero, `${page.path}: falta la imagen principal`)
    assert.match(hero[0], /alt="[^"]+"/, `${page.path}: imagen principal sin alt`)
  }
})
