import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiArrowUpRight, FiClock, FiSun, FiMoon } from 'react-icons/fi'
import { blogPosts } from '../data/content'
import ArticleContent from '../components/ArticleContent'
import AdSlot from '../components/AdSlot'
import { trackEvent } from '../lib/analytics'
import { getDark, setDark } from '../lib/prefs'

const SITE = 'https://beneficiodiario.com'

const L = {
  home:       { es: 'Inicio', en: 'Home' },
  backToSite: { es: 'Volver a BeneficioDiario', en: 'Back to BeneficioDiario' },
  refText:    { es: 'Regístrate con el código de referidos:', en: 'Sign up with the referral code:' },
  joinText:   { es: 'Únete a través de nuestro enlace:', en: 'Join through our link:' },
  code:       { es: 'Código', en: 'Code' },
  notFound:   { es: 'Artículo no encontrado', en: 'Article not found' },
  backHome:   { es: 'Volver al inicio', en: 'Back to home' },
  defaultRef: { es: 'Acceder', en: 'Access' },
  footer:     {
    es: '© 2026 BeneficioDiario · Contenido informativo, no es asesoría financiera. Incluye enlaces de afiliado. Invierte bajo tu responsabilidad (DYOR).',
    en: '© 2026 BeneficioDiario · Informational content, not financial advice. Contains affiliate links. Invest at your own risk (DYOR).',
  },
}

const abs = (url) => (!url ? `${SITE}/void-cover.png` : url.startsWith('http') ? url : `${SITE}${url}`)

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
  el.setAttribute('content', content)
}
function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) { el = document.createElement('link'); el.setAttribute('rel', 'canonical'); document.head.appendChild(el) }
  el.setAttribute('href', href)
}
function setAlternates(alts) {
  document.head.querySelectorAll('link[rel="alternate"]').forEach(e => e.remove())
  alts.forEach(a => {
    const l = document.createElement('link')
    l.setAttribute('rel', 'alternate'); l.setAttribute('hreflang', a.lang); l.setAttribute('href', a.href); l.setAttribute('data-dyn', '1')
    document.head.appendChild(l)
  })
}

export default function ArticlePage({ lang = 'es' }) {
  const { slug } = useParams()
  const navigate = useNavigate()
  const post = blogPosts.find(p => p.slug === slug)
  const homeHref = lang === 'en' ? '/en' : '/'
  const [darkMode, setDarkMode] = useState(getDark())

  const toggleLang = () => navigate(lang === 'en' ? `/blog/${slug}` : `/en/blog/${slug}`)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    document.body.style.background = darkMode ? '#0a0f1e' : '#ffffff'
    setDark(darkMode)
  }, [darkMode])

  useEffect(() => {
    if (!post) return
    const esUrl = `${SITE}/blog/${post.slug}`
    const enUrl = `${SITE}/en/blog/${post.slug}`
    const url = lang === 'en' ? enUrl : esUrl
    const t = post.title[lang] || post.title.es
    const title = `${t} · BeneficioDiario`
    const desc = post.excerpt[lang] || post.excerpt.es
    const img = abs(post.extraImage || post.image)
    const prevTitle = document.title

    document.title = title
    setMeta('name', 'description', desc)
    setCanonical(url)
    setAlternates([
      { lang: 'es', href: esUrl },
      { lang: 'en', href: enUrl },
      { lang: 'x-default', href: esUrl },
    ])
    setMeta('property', 'og:title', t)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', img)
    setMeta('property', 'og:type', 'article')
    setMeta('name', 'twitter:title', t)
    setMeta('name', 'twitter:description', desc)
    setMeta('name', 'twitter:image', img)

    document.getElementById('article-jsonld')?.remove()
    const ld = document.createElement('script')
    ld.type = 'application/ld+json'
    ld.id = 'article-jsonld'
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: t,
      description: desc,
      image: img,
      datePublished: post.date,
      inLanguage: lang,
      author: { '@type': 'Organization', name: 'BeneficioDiario', url: SITE },
      publisher: { '@type': 'Organization', name: 'BeneficioDiario', logo: { '@type': 'ImageObject', url: `${SITE}/logo-bd.png` } },
      mainEntityOfPage: url,
    })
    document.head.appendChild(ld)

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', { page_title: title, page_path: (lang === 'en' ? '/en' : '') + `/blog/${post.slug}` })
    }
    window.scrollTo(0, 0)

    return () => { document.title = prevTitle; document.getElementById('article-jsonld')?.remove() }
  }, [post, lang])

  const Controls = () => (
    <div className="flex items-center gap-2 shrink-0">
      <button onClick={toggleLang} title={lang === 'es' ? 'English' : 'Español'}
        className={`px-2.5 py-1.5 rounded-lg font-display font-bold text-[11px] transition-colors ${darkMode ? 'bg-white/10 text-gray-200 hover:bg-white/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
        {lang === 'es' ? 'EN' : 'ES'}
      </button>
      <button onClick={() => setDarkMode(d => !d)} title={darkMode ? 'Modo día' : 'Modo noche'}
        className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-white/10 text-amber-300 hover:bg-white/20' : 'bg-gray-100 text-[#0077b6] hover:bg-gray-200'}`}>
        {darkMode ? <FiSun size={14} /> : <FiMoon size={14} />}
      </button>
    </div>
  )

  if (!post) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center ${darkMode ? 'bg-[#0a0f1e] text-gray-100' : 'bg-white text-gray-900'}`}>
        <h1 className="font-display font-extrabold text-2xl">{L.notFound[lang]}</h1>
        <Link to={homeHref} className="inline-flex items-center gap-2 text-[#00b4d8] font-display font-semibold">
          <FiArrowLeft size={16} /> {L.backHome[lang]}
        </Link>
      </div>
    )
  }

  const refLabel = post.refLabel?.[lang] || L.defaultRef[lang]
  const textMuted = darkMode ? 'text-gray-400' : 'text-gray-500'
  const borderC = darkMode ? 'border-white/10' : 'border-gray-100'

  return (
    <div style={{ backgroundColor: darkMode ? '#0a0f1e' : '#ffffff' }} className={`min-h-screen transition-colors duration-300 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
      <header className={`sticky top-0 z-40 backdrop-blur-xl border-b ${darkMode ? 'bg-[#0f172a]/85 border-white/10' : 'bg-white/85 border-[#00b4d8]/10'}`}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 h-[64px] flex items-center justify-between gap-3">
          <Link to={homeHref} className="flex items-center gap-2.5 min-w-0">
            <img src="/logo-bd.png" alt="BeneficioDiario" className="w-8 h-8 object-contain shrink-0" />
            <span className={`font-display font-bold text-base truncate ${darkMode ? 'text-white' : 'bg-gradient-to-r from-gray-900 to-[#0077b6] bg-clip-text text-transparent'}`}>BeneficioDiario</span>
          </Link>
          <Controls />
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-5 sm:px-8 py-10">
        <Link to={homeHref} className="inline-flex items-center gap-1.5 mb-6 font-body text-[13px] font-medium text-[#00b4d8] hover:gap-2.5 transition-all">
          <FiArrowLeft size={14} /> {L.home[lang]}
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="bg-[#00b4d8]/10 rounded-lg px-2.5 py-1 font-body text-[10px] font-bold text-[#0077b6] tracking-wider">{post.tag?.[lang] || post.tag?.es}</span>
          <span className={`font-body text-[11px] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-gray-400" />
          <span className={`font-body text-[11px] flex items-center gap-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}><FiClock size={10} /> {post.readTime}</span>
        </div>

        <h1 className={`font-display font-extrabold text-[clamp(26px,4vw,40px)] leading-tight tracking-tight mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{post.title[lang] || post.title.es}</h1>

        <div className={`rounded-2xl overflow-hidden border mb-7 ${borderC}`}>
          <img src={post.image} alt={post.title[lang] || post.title.es}
            className="w-full object-cover max-h-[360px]"
            onError={e => { e.target.style.display = 'none'; e.target.parentElement.style.background = 'linear-gradient(135deg,#0f3460,#00b4d8)'; e.target.parentElement.style.minHeight = '160px' }} />
        </div>

        <AdSlot slot="banner" darkMode={darkMode} lang={lang} className="mb-7" />

        <ArticleContent content={post.content?.[lang] || post.content?.es} darkMode={darkMode} />

        {post.extraImage && (
          <div className={`mt-7 rounded-2xl overflow-hidden border ${borderC}`}>
            <img src={post.extraImage} alt="" className="w-full object-cover" />
          </div>
        )}

        {post.refLink && (
          <div className={`mt-8 rounded-2xl p-5 border ${darkMode ? 'bg-[#00b4d8]/8 border-[#00b4d8]/20' : 'bg-[#00b4d8]/5 border-[#00b4d8]/15'}`}>
            <p className={`font-body text-xs mb-3 ${textMuted}`}>{post.refCode ? L.refText[lang] : L.joinText[lang]}</p>
            {post.refCode && (
              <div className={`flex items-center gap-2 rounded-xl px-3 py-2.5 mb-3 border border-dashed border-[#00b4d8]/30 ${darkMode ? 'bg-white/5' : 'bg-white'}`}>
                <span className="font-body text-[10px] text-gray-400 uppercase tracking-wider">{L.code[lang]}:</span>
                <span className="font-mono font-bold text-sm text-[#0077b6] flex-1">{post.refCode}</span>
              </div>
            )}
            <a href={post.refLink} target="_blank" rel="noopener noreferrer sponsored"
              onClick={() => trackEvent('affiliate_click', { project: post.id, location: 'article_page' })}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-white font-display font-bold text-sm bg-gradient-to-br from-[#7c3aed] to-[#a855f7] hover:opacity-90 hover:-translate-y-0.5 transition-all">
              {refLabel} <FiArrowUpRight size={15} />
            </a>
          </div>
        )}

        <AdSlot slot="inArticle" darkMode={darkMode} lang={lang} className="mt-8" />

        <div className={`mt-10 pt-6 border-t ${borderC}`}>
          <Link to={homeHref} className="inline-flex items-center gap-2 font-display font-semibold text-sm text-[#00b4d8]">
            <FiArrowLeft size={15} /> {L.backToSite[lang]}
          </Link>
        </div>
      </article>

      <footer className={`border-t py-8 px-5 text-center ${borderC}`}>
        <p className={`font-body text-[11px] max-w-xl mx-auto leading-relaxed ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{L.footer[lang]}</p>
      </footer>
    </div>
  )
}
