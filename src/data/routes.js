import { SITE, PAGES, faqs } from './seo.js'
import { LEGAL_PAGES } from './legalPages.js'
import { INFORMATION_PAGES } from './informationPages.js'
import { blogPosts } from './content.js'
import { articleDate, articleJsonLd, documentJsonLd, homeJsonLd } from '../lib/structuredData.js'

export const DOCUMENT_PAGES = [...INFORMATION_PAGES, ...LEGAL_PAGES]
export const documentTitle = title => title.includes(SITE.name) ? title : `${title} · ${SITE.name}`
export const articleTitle = title => title.length > 45 ? title : `${title} · ${SITE.name}`
export const articlePath = (post, lang) => `${lang === 'en' ? '/en' : ''}/blog/${post.slug}`
export const articleMeta = (post, lang) => ({
  title: articleTitle(post.title[lang]), description: post.excerpt[lang],
  path: articlePath(post, lang), image: post.extraImage || post.image, type: 'article', lang,
  alternates: { es: articlePath(post, 'es'), en: articlePath(post, 'en') },
  jsonLd: articleJsonLd({ title: post.title[lang], description: post.excerpt[lang],
    image: post.extraImage || post.image, date: articleDate(post), url: articlePath(post, lang), lang }),
})

export const INDEXABLE_ROUTES = [
  ...['es', 'en'].map(lang => ({ ...PAGES.home[lang], lang,
    alternates: { es: '/', en: '/en' }, image: SITE.logo,
    jsonLd: homeJsonLd({ lang, faqs, url: PAGES.home[lang].path }),
  })),
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
