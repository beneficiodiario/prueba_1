import { useEffect } from 'react'
import { SITE } from '../data/seo'
export { articleJsonLd, homeJsonLd } from './structuredData'

// ════════════════════════════════════════════════════════════════
//  SEO por página.
//  El prerender ya deja metadatos estáticos para los buscadores; esto
//  cubre la navegación dentro de la SPA y lo que se comparte en redes.
//
//  Todo lo que se toca se guarda antes y se restaura al desmontar, así
//  volver atrás no deja el <head> con datos de la página anterior.
// ════════════════════════════════════════════════════════════════

const abs = (path = '') => {
  if (!path) return SITE.url
  if (/^https?:/.test(path)) return path
  return `${SITE.url}${path.startsWith('/') ? '' : '/'}${path}`
}

/** Crea la etiqueta si no existe y devuelve cómo dejarla como estaba. */
function setTag(selector, create, attr, value) {
  const head = document.head
  let el = head.querySelector(selector)
  const existed = Boolean(el)
  const previous = existed ? el.getAttribute(attr) : null

  if (!el) {
    el = create()
    head.appendChild(el)
  }
  el.setAttribute(attr, value)

  return () => {
    if (!existed) el.remove()
    else if (previous !== null) el.setAttribute(attr, previous)
  }
}

const meta = (name, content) =>
  setTag(`meta[name="${name}"]`, () => {
    const el = document.createElement('meta')
    el.setAttribute('name', name)
    return el
  }, 'content', content)

const property = (prop, content) =>
  setTag(`meta[property="${prop}"]`, () => {
    const el = document.createElement('meta')
    el.setAttribute('property', prop)
    return el
  }, 'content', content)

const link = (rel, href, extra = {}) =>
  setTag(
    `link[rel="${rel}"]${Object.entries(extra).map(([k, v]) => `[${k}="${v}"]`).join('')}`,
    () => {
      const el = document.createElement('link')
      el.setAttribute('rel', rel)
      Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v))
      return el
    },
    'href',
    href,
  )

/**
 * Aplica los metadatos de una página.
 *
 * @param {object}   o
 * @param {string}   o.title        título completo de la pestaña
 * @param {string}   o.description  resumen, 150-160 caracteres
 * @param {string}   o.path         ruta canónica, p.ej. "/en" o "/blog/slug"
 * @param {string}  [o.image]       imagen para compartir
 * @param {string}  [o.type]        og:type ("website" | "article")
 * @param {string}  [o.lang]        "es" | "en"
 * @param {object}  [o.alternates]  { es: "/", en: "/en" }
 * @param {object}  [o.jsonLd]      datos estructurados schema.org
 * @param {boolean} [o.noindex]     excluir de los buscadores
 */
export function useSeo({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  lang = 'es',
  alternates,
  jsonLd,
  noindex = false,
  canonical = true,
}) {
  // Las dependencias se serializan: así un objeto nuevo con el mismo
  // contenido no vuelve a disparar el efecto en cada render.
  const key = JSON.stringify({ title, description, path, image, type, lang, alternates, jsonLd, noindex, canonical })

  useEffect(() => {
    const url = abs(path)
    const img = abs(image || SITE.logo)
    const undo = []

    const prevTitle = document.title
    document.title = title
    undo.push(() => { document.title = prevTitle })

    const prevLang = document.documentElement.lang
    document.documentElement.lang = lang
    undo.push(() => { document.documentElement.lang = prevLang })

    undo.push(meta('description', description))
    undo.push(meta('robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'))
    const previousCanonicals = [...document.head.querySelectorAll('link[rel=canonical]')]
    if (canonical) undo.push(link('canonical', url))
    else {
      previousCanonicals.forEach(el => el.remove())
      undo.push(() => previousCanonicals.forEach(el => document.head.appendChild(el)))
    }

    undo.push(property('og:type', type))
    undo.push(property('og:site_name', SITE.name))
    undo.push(property('og:title', title))
    undo.push(property('og:description', description))
    undo.push(property('og:url', url))
    undo.push(property('og:image', img))
    undo.push(property('og:locale', lang === 'en' ? 'en_US' : 'es_ES'))

    undo.push(meta('twitter:card', 'summary_large_image'))
    undo.push(meta('twitter:title', title))
    undo.push(meta('twitter:description', description))
    undo.push(meta('twitter:image', img))

    // hreflang: se sustituyen en bloque porque su número varía por página
    const prevAlternates = [...document.head.querySelectorAll('link[rel="alternate"][hreflang]')]
    {
      prevAlternates.forEach((el) => el.remove())
      const added = Object.entries(alternates ? { ...alternates, 'x-default': alternates.es } : {})
        .map(([hreflang, href]) => {
          const el = document.createElement('link')
          el.setAttribute('rel', 'alternate')
          el.setAttribute('hreflang', hreflang)
          el.setAttribute('href', abs(href))
          document.head.appendChild(el)
          return el
        })
      undo.push(() => {
        added.forEach((el) => el.remove())
        prevAlternates.forEach((el) => document.head.appendChild(el))
      })
    }

    {
      // El index.html ya trae datos estructurados para los buscadores.
      // Se apartan mientras esta página está montada: dos bloques a la vez
      // se contradicen y Google marca la página como duplicada.
      const previous = [...document.head.querySelectorAll('script[type="application/ld+json"]')]
      previous.forEach((el) => el.remove())

      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.seo = 'page'
      script.textContent = JSON.stringify(jsonLd)
      if (jsonLd) document.head.appendChild(script)

      undo.push(() => {
        script.remove()
        previous.forEach((el) => document.head.appendChild(el))
      })
    }

    return () => undo.reverse().forEach((fn) => fn())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
}
