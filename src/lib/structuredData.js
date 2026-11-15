import { SITE } from '../data/seo.js'

export const absoluteUrl = (path = '/') => new URL(path, `${SITE.url}/`).href
export const articleDate = post => {
  if (post.publishedAt) return post.publishedAt
  const months = { ene: '01', feb: '02', mar: '03', abr: '04', may: '05', jun: '06', jul: '07', ago: '08', sep: '09', oct: '10', nov: '11', dic: '12' }
  const [day, month, year] = post.date.toLowerCase().split(' ')
  if (!months[month] || !/^\d{4}$/.test(year)) throw new Error(`Fecha editorial no válida: ${post.slug}`)
  return `${year}-${months[month]}-${day.padStart(2, '0')}`
}

const publisher = {
  '@type': 'Organization', '@id': `${SITE.url}/#publisher`, name: SITE.name,
  alternateName: SITE.alternateName, url: SITE.url,
  description: 'Proyecto editorial y portal gratuito gestionado por particulares. No es una entidad financiera.',
  logo: { '@type': 'ImageObject', url: absoluteUrl(SITE.logo) },
  email: SITE.email,
  sameAs: [SITE.twitter, SITE.youtube].filter(Boolean),
}
const breadcrumb = (name, url, lang = 'es') => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: lang === 'en' ? 'Home' : 'Inicio', item: absoluteUrl(lang === 'en' ? '/en' : '/') },
    ...(url === '/' || url === '/en' ? [] : [{ '@type': 'ListItem', position: 2, name, item: absoluteUrl(url) }]),
  ],
})

const topics = lang => (SITE.topics?.[lang] || []).map(name => ({ '@type': 'Thing', name }))

/** Lo mismo que se ve en la portada: los proyectos destacados, cada uno con su ancla. */
const projectList = (projects, lang, url) => ({
  '@type': 'ItemList', name: lang === 'en' ? 'Projects we follow' : 'Proyectos que seguimos',
  itemListOrder: 'https://schema.org/ItemListUnordered',
  itemListElement: projects.map((p, i) => ({
    '@type': 'ListItem', position: i + 1, name: p.title, url: absoluteUrl(`${url}#proyecto-${p.id}`),
    description: plainText(p.desc?.[lang] || '').split('\n')[0],
  })),
})

/** Texto limpio: sin los asteriscos que remiten al glosario. */
export const plainText = text => String(text).replaceAll('*', '')

export const homeJsonLd = ({ lang, faqs, url, projects = [] }) => ({
  '@context': 'https://schema.org', '@graph': [
    publisher,
    { '@type': 'WebSite', '@id': `${SITE.url}/#website`, name: SITE.name, alternateName: SITE.alternateName,
      url: `${SITE.url}/`, inLanguage: ['es', 'en'], description: SITE.description,
      publisher: { '@id': publisher['@id'] } },
    { '@type': 'WebPage', '@id': absoluteUrl(url), name: SITE.name, url: absoluteUrl(url),
      inLanguage: lang, isPartOf: { '@id': `${SITE.url}/#website` }, isAccessibleForFree: true,
      about: topics(lang) },
    ...(projects.length ? [projectList(projects, lang, url)] : []),
    { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q[lang],
      acceptedAnswer: { '@type': 'Answer', text: f.a[lang] } })) },
    breadcrumb(SITE.name, url, lang),
  ],
})

export const articleJsonLd = ({ title, description, image, date, modified, section, keywords, url, lang }) => ({
  '@context': 'https://schema.org', '@graph': [publisher, {
    '@type': 'Article', headline: title, description, image: absoluteUrl(image || SITE.logo),
    datePublished: date, dateModified: modified || date, inLanguage: lang, isAccessibleForFree: true,
    ...(section ? { articleSection: section } : {}),
    ...(keywords?.length ? { keywords: keywords.join(', ') } : {}),
    author: { '@type': 'Organization', name: SITE.name, url: absoluteUrl('/politica-editorial') },
    publisher: { '@id': publisher['@id'] }, mainEntityOfPage: absoluteUrl(url),
    isPartOf: { '@id': `${SITE.url}/#website` },
  }, breadcrumb(title, url, lang)],
})

export const documentJsonLd = page => ({
  '@context': 'https://schema.org', '@graph': [publisher, {
    '@type': page.kind === 'about' ? 'AboutPage' : page.kind === 'contact' ? 'ContactPage' : 'WebPage',
    name: page.title, description: page.description, url: absoluteUrl(page.path), inLanguage: 'es',
    dateModified: page.updated, isAccessibleForFree: true, isPartOf: { '@id': `${SITE.url}/#website` },
    publisher: { '@id': publisher['@id'] },
    // Las guías son el pilar de cada tema: se declaran sus apartados como tal.
    ...(page.kind === 'guide' ? { about: { '@type': 'Thing', name: page.label },
      hasPart: page.sections.map(section => ({ '@type': 'WebPageElement', name: section.h })) } : {}),
  }, breadcrumb(page.label, page.path)],
})
