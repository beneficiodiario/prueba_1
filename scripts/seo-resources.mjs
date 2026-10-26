import { INDEXABLE_ROUTES } from '../src/data/routes.js'
import { SITE } from '../src/data/seo.js'
import { absoluteUrl } from '../src/lib/structuredData.js'

const esc = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;')
export function makeSitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${INDEXABLE_ROUTES.map(page => `  <url><loc>${esc(absoluteUrl(page.path))}</loc>${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}${Object.entries(page.alternates ? { ...page.alternates, 'x-default': page.alternates.es } : {}).map(([lang, path]) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${esc(absoluteUrl(path))}" />`).join('')}</url>`).join('\n')}\n</urlset>\n`
}

export function makeLlms(full = false) {
  const intro = `# Beneficio Diario\n\n> ${SITE.description}\n\nNombre alternativo: BeneficioDiario. Portal gestionado por particulares desde Barcelona, España. Contacto: ${SITE.email}. No exige login ni registro propios, no gestiona fondos y no garantiza rendimientos. Los registros o pagos en terceros se rigen por sus condiciones. Puede financiarse con publicidad y referidos.\n\nEste archivo es una ayuda de navegación, no un mecanismo de posicionamiento ni una garantía de inclusión en respuestas de IA. Para vigencia, fuentes, riesgos y alcance, consulta cada página.\n\n## Contenidos públicos\n\n`
  return intro + INDEXABLE_ROUTES.filter(page => page.lang === 'es').map(page => `- [${page.title}](${absoluteUrl(page.path)}): ${page.description}${full && page.sections ? '\n' + page.sections.map(section => `\n### ${section.h}\n\n${section.p.join('\n\n')}`).join('\n') : ''}`).join('\n') + '\n'
}
