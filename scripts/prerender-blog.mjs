// Prerenderiza páginas HTML estáticas (ES + EN) por cada artículo, la home en
// inglés, la página de privacidad y el sitemap. Se ejecuta tras `vite build`.
// Inyecta texto + meta tags para que buscadores e IAs indexen sin ejecutar JS.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { blogPosts } from '../src/data/content.js'
import { PRIVACY } from '../src/data/legal.js'
import { faqs, PAGES } from '../src/data/seo.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')
const SITE = 'https://beneficiodiario.com'
const TODAY = '2026-05-26'

const escAttr = (s = '') => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escHtml = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const absUrl = (u) => (!u ? `${SITE}/void-cover.png` : u.startsWith('http') ? u : `${SITE}${u}`)

const template = readFileSync(join(distDir, 'index.html'), 'utf8')
const stripAlternates = (html) => html.replace(/\s*<link rel="alternate" hreflang="[^"]*"[^>]*>/g, '')
const hreflangTags = (alts) => alts.map(a => `<link rel="alternate" hreflang="${a.lang}" href="${a.href}" />`).join('\n    ')

const LD_RE = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/

// El @graph del template (Org + WebSite + FAQPage + Breadcrumb) describe la HOME.
// En páginas internas dejamos solo Org + WebSite; FAQPage/Breadcrumb no aplican
// a un artículo y Google los marcaría como datos que no casan con el contenido.
function stripPageSchema(html) {
  const m = html.match(LD_RE)
  if (!m) return html
  let graph
  try { graph = JSON.parse(m[1]) } catch { return html }
  if (!Array.isArray(graph['@graph'])) return html
  graph['@graph'] = graph['@graph'].filter(n => n['@type'] !== 'FAQPage' && n['@type'] !== 'BreadcrumbList')
  return html.replace(LD_RE, `<script type="application/ld+json">${JSON.stringify(graph)}</script>`)
}

function applyHead(html, { lang, title, desc, url, img, headExtra = '', body }) {
  const out = stripAlternates(html)
    .replace('<html lang="es">', `<html lang="${lang}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escHtml(title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escAttr(desc)}" />`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escAttr(title)}" />`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escAttr(desc)}" />`)
    .replace(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${escAttr(img)}" />`)
    .replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${escAttr(title)}" />`)
    .replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${escAttr(desc)}" />`)
    .replace(/<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${escAttr(img)}" />`)
    .replace('</head>', `${headExtra}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
  return stripPageSchema(out)
}

let count = 0
for (const post of blogPosts) {
  if (!post.slug || !post.content?.es) continue
  const esUrl = `${SITE}/blog/${post.slug}`
  const enUrl = `${SITE}/en/blog/${post.slug}`
  const alts = [{ lang: 'es', href: esUrl }, { lang: 'en', href: enUrl }, { lang: 'x-default', href: esUrl }]

  for (const lang of ['es', 'en']) {
    const t = post.title[lang] || post.title.es
    const desc = post.excerpt[lang] || post.excerpt.es
    const content = post.content[lang] || post.content.es
    const img = absUrl(post.extraImage || post.image)
    const url = lang === 'en' ? enUrl : esUrl
    // Google recorta el título a unos 60 caracteres y ya añade el nombre
    // del sitio por su cuenta: el sufijo solo se pone si cabe.
    const title = t.length > 45 ? t : `${t} · BeneficioDiario`
    const paragraphs = content.split('\n\n').map(s => s.trim()).filter(Boolean)
    const refLabel = post.refLabel?.[lang] || (lang === 'en' ? 'Access' : 'Acceder')

    const jsonLd = {
      '@context': 'https://schema.org', '@type': 'Article', headline: t, description: desc,
      image: img, datePublished: post.date, inLanguage: lang,
      author: { '@type': 'Organization', name: 'BeneficioDiario', url: SITE },
      publisher: { '@type': 'Organization', name: 'BeneficioDiario', logo: { '@type': 'ImageObject', url: `${SITE}/logo-bd.png` } },
      mainEntityOfPage: url,
    }
    const headExtra = `    ${hreflangTags(alts)}\n    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
    const body =
      `<main style="max-width:720px;margin:0 auto;padding:72px 20px;font-family:system-ui,-apple-system,sans-serif;color:#1f2937">` +
      `<p><a href="${lang === 'en' ? '/en' : '/'}" style="color:#0077b6;text-decoration:none">← BeneficioDiario</a></p>` +
      `<p style="font-size:13px;color:#9ca3af">${escHtml(post.tag?.[lang] || post.tag?.es || '')} · ${escHtml(post.date)} · ${escHtml(post.readTime || '')}</p>` +
      `<h1 style="font-size:32px;line-height:1.2;font-weight:800">${escHtml(t)}</h1>` +
      `<img src="${escAttr(post.image)}" alt="${escAttr(t)}" style="max-width:100%;border-radius:12px;margin:16px 0" />` +
      paragraphs.map(p => `<p style="line-height:1.7;margin:14px 0">${escHtml(p)}</p>`).join('') +
      (post.refLink ? `<p style="margin-top:24px"><a href="${escAttr(post.refLink)}" rel="nofollow sponsored">${escHtml(refLabel)} — código ${escHtml(post.refCode || '')}</a></p>` : '') +
      `</main>`

    const html = applyHead(template, { lang, title, desc, url, img, headExtra, body })
    const outDir = lang === 'en' ? join(distDir, 'en', 'blog', post.slug) : join(distDir, 'blog', post.slug)
    mkdirSync(outDir, { recursive: true })
    writeFileSync(join(outDir, 'index.html'), html, 'utf8')
    count++
  }
}

// Home en inglés (/en)
{
  const url = `${SITE}/en`
  // Mismos textos que la SPA: buscador y usuario deben leer lo mismo.
  const { title, description: desc } = PAGES.home.en
  const alts = [{ lang: 'es', href: `${SITE}/` }, { lang: 'en', href: url }, { lang: 'x-default', href: `${SITE}/` }]
  const body =
    `<main style="max-width:760px;margin:0 auto;padding:72px 20px;font-family:system-ui,-apple-system,sans-serif;color:#1f2937">` +
    `<h1 style="font-size:34px;font-weight:800">Your profit, every day</h1>` +
    `<p style="line-height:1.7">BeneficioDiario discovers, analyzes and shares real crypto projects to help you generate income intelligently. Not financial advice — affiliate links included. Do your own research (DYOR).</p>` +
    `<h2 style="font-size:20px;font-weight:700;margin-top:24px">Featured projects</h2>` +
    `<ul style="line-height:1.8">` +
    `<li><strong>KAST Card</strong>: crypto Visa card with 4% cashback. Low risk.</li>` +
    `<li><strong>VOID Network</strong>: early-stage project, free, 2 clicks a day to accumulate tokens.</li>` +
    `<li><strong>GRVT</strong>: decentralized trading exchange with yield. Medium risk.</li>` +
    `<li><strong>DAChain (DAC)</strong>: quantum-resistant Layer 1 blockchain, active testnet. Medium-high risk.</li>` +
    `</ul></main>`
  const html = applyHead(template, { lang: 'en', title, desc, url, img: `${SITE}/void-cover.png`, headExtra: `    ${hreflangTags(alts)}`, body })
  mkdirSync(join(distDir, 'en'), { recursive: true })
  writeFileSync(join(distDir, 'en', 'index.html'), html, 'utf8')
}

// Página de privacidad (ES)
{
  const url = `${SITE}/privacidad`
  const { title, description: desc } = PAGES.privacy.es
  const body =
    `<main style="max-width:720px;margin:0 auto;padding:72px 20px;font-family:system-ui,-apple-system,sans-serif;color:#1f2937">` +
    `<p><a href="/" style="color:#0077b6;text-decoration:none">← BeneficioDiario</a></p>` +
    `<h1 style="font-size:30px;font-weight:800">${escHtml(PRIVACY.title)}</h1>` +
    `<p style="color:#9ca3af;font-size:13px">${escHtml(PRIVACY.updated)}</p>` +
    PRIVACY.sections.map(s =>
      `<h2 style="font-size:18px;font-weight:700;margin-top:24px">${escHtml(s.h)}</h2>` +
      s.p.map(p => `<p style="line-height:1.7;margin:10px 0">${escHtml(p)}</p>`).join('')
    ).join('') + `</main>`
  const html = applyHead(template, { lang: 'es', title, desc, url, img: `${SITE}/void-cover.png`, headExtra: '', body })
  mkdirSync(join(distDir, 'privacidad'), { recursive: true })
  writeFileSync(join(distDir, 'privacidad', 'index.html'), html, 'utf8')
}

// Sitemap (ES + EN + privacidad)
const arts = blogPosts.filter(p => p.slug && p.content?.es)
const urls = [
  `  <url><loc>${SITE}/</loc><lastmod>${TODAY}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>`,
  `  <url><loc>${SITE}/en</loc><lastmod>${TODAY}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>`,
  ...arts.map(p => `  <url><loc>${SITE}/blog/${p.slug}</loc><lastmod>${TODAY}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`),
  ...arts.map(p => `  <url><loc>${SITE}/en/blog/${p.slug}</loc><lastmod>${TODAY}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`),
  `  <url><loc>${SITE}/privacidad</loc><lastmod>${TODAY}</lastmod><changefreq>yearly</changefreq><priority>0.3</priority></url>`,
]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
writeFileSync(join(distDir, 'sitemap.xml'), sitemap, 'utf8')

// Home ES: regeneramos el FAQPage del JSON-LD desde seo.js (fuente única) para
// que el structured data coincida siempre con el FAQ visible de la web.
{
  const homePath = join(distDir, 'index.html')
  let homeHtml = readFileSync(homePath, 'utf8')
  const m = homeHtml.match(LD_RE)
  if (m) {
    const graph = JSON.parse(m[1])
    const faqNode = Array.isArray(graph['@graph']) && graph['@graph'].find(n => n['@type'] === 'FAQPage')
    if (faqNode) {
      faqNode.mainEntity = faqs.map(f => ({
        '@type': 'Question',
        name: f.q.es,
        acceptedAnswer: { '@type': 'Answer', text: f.a.es },
      }))
      homeHtml = homeHtml.replace(LD_RE, `<script type="application/ld+json">${JSON.stringify(graph)}</script>`)
      writeFileSync(homePath, homeHtml, 'utf8')
    }
  }
}

console.log(`✓ Prerenderizados ${count} páginas de artículo (ES+EN) + home EN + privacidad + sitemap (${urls.length} URLs) + FAQ JSON-LD sincronizado`)
