import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderPage } from '../.prerender/prerender.js'
import { SITE } from '../src/data/seo.js'
import { INDEXABLE_ROUTES, NOT_FOUND_META } from '../src/data/routes.js'
import { absoluteUrl } from '../src/lib/structuredData.js'
import { makeSitemap, makeLlms } from './seo-resources.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const esc = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const template = readFileSync(resolve(dist, 'index.html'), 'utf8')
  .replace(/\s*<title>[\s\S]*?<\/title>/g, '')
  .replace(/\s*<meta\s+(?:name="(?:description|robots|googlebot|twitter:[^"]+)"|property="(?:og:|article:)[^"]+")[^>]*>/g, '')
  .replace(/\s*<link rel="(?:canonical|alternate)"[^>]*>/g, '')
  .replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '')

for (const page of [...INDEXABLE_ROUTES, NOT_FOUND_META]) {
  const image = absoluteUrl(page.image || SITE.logo)
  const robots = page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  const head = [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    ...(page.canonical === false ? [] : [`<link rel="canonical" href="${esc(absoluteUrl(page.path))}" />`]),
    `<meta property="og:type" content="${page.type || 'website'}" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:url" content="${esc(absoluteUrl(page.path))}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:image:alt" content="${esc(SITE.name)}" />`,
    `<meta property="og:locale" content="${page.lang === 'en' ? 'en_US' : 'es_ES'}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
    ...Object.entries(page.alternates ? { ...page.alternates, 'x-default': page.alternates.es } : {}).map(([lang, path]) => `<link rel="alternate" hreflang="${lang}" href="${esc(absoluteUrl(path))}" />`),
    ...(page.jsonLd ? [`<script type="application/ld+json">${JSON.stringify(page.jsonLd).replaceAll('<', '\\u003c')}</script>`] : []),
  ].join('\n    ')
  const body = await renderPage(page.path)
  const html = template.replace(/<html lang="[^"]+">/, `<html lang="${page.lang}">`)
    .replace('</head>', `${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
  const output = resolve(dist, page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, html)
}

// Las fuentes públicas y el artefacto de despliegue proceden del mismo inventario.
for (const directory of ['public', 'dist']) {
  writeFileSync(resolve(root, directory, 'sitemap.xml'), makeSitemap())
  writeFileSync(resolve(root, directory, 'llms.txt'), makeLlms())
  writeFileSync(resolve(root, directory, 'llms-full.txt'), makeLlms(true))
}
console.log(`✓ ${INDEXABLE_ROUTES.length} páginas con HTML completo + 404 personalizada, sitemap y recursos de descubrimiento sincronizados`)
