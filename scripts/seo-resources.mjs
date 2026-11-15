import { INDEXABLE_ROUTES, DOCUMENT_PAGES, FEATURED_PROJECTS, articlePath } from '../src/data/routes.js'
import { SITE, faqs } from '../src/data/seo.js'
import { blogPosts, PROJECTS_REVIEWED_AT } from '../src/data/content.js'
import { absoluteUrl, articleDate, plainText } from '../src/lib/structuredData.js'

const esc = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;')
const sameHost = image => image && image.startsWith('/')

export function makeSitemap() {
  const url = page => {
    const alternates = Object.entries(page.alternates ? { ...page.alternates, 'x-default': page.alternates.es } : {})
      .map(([lang, path]) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${esc(absoluteUrl(path))}" />`).join('')
    // Solo imágenes propias: las de bancos externos no aportan al índice de imágenes del dominio.
    const image = page.type === 'article' && sameHost(page.image)
      ? `<image:image><image:loc>${esc(absoluteUrl(page.image))}</image:loc></image:image>` : ''
    return `  <url><loc>${esc(absoluteUrl(page.path))}</loc>${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}${alternates}${image}</url>`
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${INDEXABLE_ROUTES.map(url).join('\n')}\n</urlset>\n`
}

// ════════════════════════════════════════════════════════════════
//  llms.txt (https://llmstxt.org): índice en Markdown para modelos de
//  lenguaje. llms-full.txt añade el texto íntegro de cada página para
//  que un asistente pueda responder sin rastrear el sitio entero.
//  Todo sale del mismo inventario que el sitemap y el prerender.
// ════════════════════════════════════════════════════════════════

// Corta solo en "punto + espacio + mayúscula": así "Onchain.cc" o "300.000" no parten la frase.
const firstSentences = (text, n = 2) =>
  plainText(text).split('\n')[0].split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ¿¡])/).slice(0, n).join(' ').trim()
const guides = DOCUMENT_PAGES.filter(page => page.kind === 'guide')
const portal = DOCUMENT_PAGES.filter(page => ['about', 'editorial', 'contact'].includes(page.kind) || page.path === '/transparencia')
const legal = DOCUMENT_PAGES.filter(page => page.kind === 'legal' && page.path !== '/transparencia')
const readable = lang => blogPosts.filter(post => post.content?.[lang])
const STATUS = {
  es: { published: 'publicado', reviewed: 'revisado', archive: 'archivo histórico: la campaña descrita ya no está activa' },
  en: { published: 'published', reviewed: 'reviewed', archive: 'archive: the campaign described is no longer active' },
}
const postStatus = (post, lang = 'es') => [
  `${STATUS[lang].published} ${articleDate(post)}`,
  post.modifiedAt && `${STATUS[lang].reviewed} ${post.modifiedAt}`,
  post.updateNote && STATUS[lang].archive,
].filter(Boolean).join(', ')

const intro = full => `# ${SITE.name}

> ${SITE.description}

${SITE.name} (también escrito ${SITE.alternateName}) es un portal editorial gratuito gestionado por particulares desde Barcelona, España. Publica en español y mantiene la portada y las noticias también en inglés. Contacto: ${SITE.email}.

- No es una entidad financiera ni un asesor: no gestiona fondos, no abre cuentas y no pide registro.
- No garantiza rendimientos. Puntos, testnets y campañas no equivalen a dinero; un airdrop puede no llegar a producirse.
- Se financia con publicidad y enlaces de referido, identificados en la web. Ese incentivo puede influir en la selección de proyectos.
- Las cifras y campañas tienen fecha. Al citar, indica la fecha del artículo o de la revisión de proyectos (${PROJECTS_REVIEWED_AT}).
- Temas: ${SITE.topics.es.join(', ')}.

${full
    ? `Este archivo contiene el texto completo de las páginas públicas en español. Índice resumido: ${absoluteUrl('/llms.txt')}`
    : `Texto completo de todas las páginas en un solo archivo: ${absoluteUrl('/llms-full.txt')}`}
`

const projectLine = p => {
  const s = p.stats?.es || {}
  return `- [${p.title}](${absoluteUrl(`/#proyecto-${p.id}`)}): ${p.tag}. ${firstSentences(p.desc.es)} Riesgo: ${s.risk}. Mínimo orientativo: ${s.min}.`
}
const pageLine = page => `- [${page.title}](${absoluteUrl(page.path)}): ${page.description}`
const postLine = (post, lang = 'es') => `- [${post.title[lang]}](${absoluteUrl(articlePath(post, lang))}) (${postStatus(post, lang)}): ${post.excerpt[lang]}`

export function makeLlms(full = false) {
  if (full) return makeLlmsFull()
  return `${intro(false)}
## Proyectos que seguimos (revisado ${PROJECTS_REVIEWED_AT})

${FEATURED_PROJECTS.map(projectLine).join('\n')}

## Guías por tema

${guides.map(pageLine).join('\n')}

## Noticias y análisis

${readable('es').map(post => postLine(post)).join('\n')}

## English

- [${SITE.name} (English home)](${absoluteUrl('/en')}): ${INDEXABLE_ROUTES.find(page => page.path === '/en').description}
${readable('en').map(post => postLine(post, 'en')).join('\n')}

## Sobre el portal

${portal.map(pageLine).join('\n')}

## Optional

${legal.map(pageLine).join('\n')}
- [Sitemap XML](${absoluteUrl('/sitemap.xml')}): inventario de URLs indexables con fechas y versiones de idioma.
`
}

const section = (title, body) => `\n## ${title}\n\n${body.trim()}\n`
const documentText = page => [
  `### ${page.title}`,
  `URL: ${absoluteUrl(page.path)} · Actualizado: ${page.updated}`,
  page.intro,
  ...page.sections.map(s => `#### ${s.h}\n\n${s.p.join('\n\n')}${s.links ? `\n\n${s.links.map(l => `- ${l.label}: ${l.href.startsWith('/') ? absoluteUrl(l.href) : l.href}`).join('\n')}` : ''}`),
].filter(Boolean).join('\n\n')

const projectText = p => {
  const s = p.stats.es
  return [
    `### ${p.title}`,
    `Ficha: ${absoluteUrl(`/#proyecto-${p.id}`)} · Categoría: ${p.tag}`,
    plainText(p.desc.es),
    p.features.es.map(f => `- ${plainText(f)}`).join('\n'),
    `Rentabilidad: ${s.roi} · Riesgo: ${s.risk} · Frecuencia: ${s.time} · Mínimo orientativo: ${s.min}`,
    ...(p.airdrop ? [`Resultado del airdrop (${p.airdrop.label.es}):\n${p.airdrop.rows.es.map(r => `- ${r.label}: ${r.value}`).join('\n')}\n${p.airdrop.note.es}`] : []),
    `Web oficial (enlace de referido${p.refCode ? `, código ${p.refCode}` : ''}): ${p.link}`,
  ].join('\n\n')
}

const postText = post => [
  `### ${post.title.es}`,
  `URL: ${absoluteUrl(articlePath(post, 'es'))} · English: ${absoluteUrl(articlePath(post, 'en'))}`,
  `Etiqueta: ${post.tag.es} · ${postStatus(post)}`,
  ...(post.updateNote ? [`Nota de actualización: ${post.updateNote.es}`] : []),
  plainText(post.content.es),
  ...(post.refLink ? [`Enlace de referido: ${post.refLink}${post.refCode ? ` (código ${post.refCode})` : ''}`] : []),
  ...(post.extraRefLink ? [`Enlace de referido: ${post.extraRefLink}${post.extraRefCode ? ` (código ${post.extraRefCode})` : ''}`] : []),
].join('\n\n')

function makeLlmsFull() {
  return intro(true)
    + section(`Proyectos que seguimos (revisado ${PROJECTS_REVIEWED_AT})`, FEATURED_PROJECTS.map(projectText).join('\n\n'))
    + section('Preguntas frecuentes', faqs.map(f => `### ${f.q.es}\n\n${f.a.es}`).join('\n\n'))
    + section('Guías por tema', guides.map(documentText).join('\n\n'))
    + section('Noticias y análisis', readable('es').map(postText).join('\n\n'))
    + section('Sobre el portal, transparencia e información legal', [...portal, ...legal].map(documentText).join('\n\n'))
}
