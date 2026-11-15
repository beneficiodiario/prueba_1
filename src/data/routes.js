import { SITE, PAGES, faqs } from './seo.js'
import { LEGAL_PAGES } from './legalPages.js'
import { INFORMATION_PAGES } from './informationPages.js'
import { blogPosts, projects, PROJECTS_REVIEWED_AT } from './content.js'
import { articleDate, articleJsonLd, documentJsonLd, homeJsonLd } from '../lib/structuredData.js'

export const DOCUMENT_PAGES = [...INFORMATION_PAGES, ...LEGAL_PAGES]
// La marca solo se añade si el título sigue cabiendo en el resultado de búsqueda (~60).
const withBrand = title => title.includes(SITE.name) || `${title} · ${SITE.name}`.length > 62 ? title : `${title} · ${SITE.name}`
export const documentTitle = withBrand
export const articleTitle = withBrand
export const articlePath = (post, lang) => `${lang === 'en' ? '/en' : ''}/blog/${post.slug}`
export const articleMeta = (post, lang) => ({
  title: articleTitle(post.seoTitle?.[lang] || post.title[lang]), description: post.excerpt[lang],
  path: articlePath(post, lang), image: post.extraImage || post.image, imageAlt: post.imageAlt?.[lang],
  type: 'article', lang, published: articleDate(post), modified: post.modifiedAt,
  section: post.tag?.[lang], tags: post.keywords?.[lang] || [],
  alternates: { es: articlePath(post, 'es'), en: articlePath(post, 'en') },
  jsonLd: articleJsonLd({ title: post.title[lang], description: post.excerpt[lang],
    image: post.extraImage || post.image, date: articleDate(post), modified: post.modifiedAt,
    section: post.tag?.[lang], keywords: post.keywords?.[lang], url: articlePath(post, lang), lang }),
})

export const FEATURED_PROJECTS = projects.filter(p => p.featured)

/** Metadatos de la portada: los usan el prerender y la SPA, para que digan lo mismo. */
export const homeMeta = lang => ({
  ...PAGES.home[lang], lang, alternates: { es: '/', en: '/en' }, image: SITE.ogImage,
  imageAlt: lang === 'en' ? 'TxFlow and RISEx logos, two perp DEXes covered by Beneficio Diario' : 'Logos de TxFlow y RISEx, dos perp DEX que analiza Beneficio Diario',
  jsonLd: homeJsonLd({ lang, faqs, url: PAGES.home[lang].path, projects: FEATURED_PROJECTS }),
})

// Fecha más reciente del contenido de la portada: la última noticia o revisión de proyectos.
const latestContentDate = [PROJECTS_REVIEWED_AT, ...blogPosts.map(post => post.modifiedAt || articleDate(post))].sort().at(-1)

export const INDEXABLE_ROUTES = [
  ...['es', 'en'].map(lang => ({ ...homeMeta(lang), lastmod: latestContentDate })),
  ...blogPosts.flatMap(post => ['es', 'en'].filter(lang => post.content?.[lang]).map(lang => ({
    ...articleMeta(post, lang), lastmod: post.modifiedAt || articleDate(post),
  }))),
  ...DOCUMENT_PAGES.map(page => ({ ...page, title: documentTitle(page.title),
    lang: 'es', lastmod: page.updated, jsonLd: documentJsonLd(page) })),
]

export const NOT_FOUND_META = {
  title: 'Página no encontrada (404) · Beneficio Diario',
  description: 'Esta página no existe. Vuelve a Beneficio Diario o explora nuestras guías gratuitas sobre criptomonedas, airdrops e ingresos pasivos.',
  path: '/404', lang: 'es', noindex: true, canonical: false, jsonLd: null,
}
