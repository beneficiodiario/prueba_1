import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'motion/react'
import { useTheme } from '../lib/theme'
import ArticleContent from '../components/ArticleContent'
import { PartnerSlotSafe as PartnerSlot } from '../components/PartnerSlotSafe'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Card'
import { FiArrowLeft, FiArrowUpRight, FiClock, FiSun, FiMoon } from '../components/ui/icons'
import { blogPosts } from '../data/content'
import { useSeo } from '../lib/seo'
import { articleMeta, articlePath, DOCUMENT_PAGES } from '../data/routes'
import { articleDate } from '../lib/structuredData'
import NotFoundPage from './NotFoundPage'
import Footer from '../components/Footer'
import { trackEvent } from '../lib/metrics'
import { fadeUp, stagger, ease, revealInitial } from '../lib/motion'


const T = {
  home:       { es: 'Inicio', en: 'Home' },
  backToSite: { es: 'Volver a BeneficioDiario', en: 'Back to BeneficioDiario' },
  refText:    { es: 'Regístrate con el código de referidos', en: 'Sign up with the referral code' },
  joinText:   { es: 'Únete a través de nuestro enlace', en: 'Join through our link' },
  code:       { es: 'Código', en: 'Code' },
  notFound:   { es: 'Artículo no encontrado', en: 'Article not found' },
  backHome:   { es: 'Volver al inicio', en: 'Back to home' },
  defaultRef: { es: 'Acceder', en: 'Access' },
  toggleLang: { es: 'Read in English', en: 'Leer en español' },
  updated:    { es: 'Actualización', en: 'Update' },
  guides:     { es: 'Guías relacionadas', en: 'Related guides (Spanish)' },
  more:       { es: 'Más artículos', en: 'More articles' },
  footer: {
    es: '© 2026 BeneficioDiario · Contenido informativo, no es asesoría financiera. Incluye enlaces de afiliado. Invierte bajo tu responsabilidad (DYOR).',
    en: '© 2026 BeneficioDiario · Informational content, not financial advice. Contains affiliate links. Invest at your own risk (DYOR).',
  },
}

/** Cabecera fija del artículo, con progreso de lectura integrado. */
function ArticleHeader({ lang, homeHref, onToggleLang }) {
  const { dark, toggle } = useTheme()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  return (
    <header className="sticky top-0 z-nav backdrop-blur-xl bg-bg/85 border-b border-line">
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="absolute inset-x-0 top-0 h-[3px] origin-left bg-gradient-to-r from-brand-500 via-brand-700 to-brand-500"
      />

      <div className="container-page max-w-prose h-16 flex items-center justify-between gap-3">
        <Link to={homeHref} className="flex items-center gap-2.5 min-w-0 group">
          <img
            src="/logo-bd.png" alt="" width="32" height="32"
            className="w-8 h-8 object-contain shrink-0 transition-transform duration-slow ease-out-expo group-hover:scale-110"
          />
          <span className="font-display font-bold text-base text-fg truncate">
            Beneficio<span className="text-brand-fg">Diario</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onToggleLang}
            title={T.toggleLang[lang]}
            aria-label={T.toggleLang[lang]}
            className="min-w-[40px] min-h-[38px] px-2.5 rounded-lg bg-surface-2 border border-line font-display font-bold text-[11px] text-fg-muted hover:text-fg hover:border-brand-500/40 transition-colors duration-base"
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-label={dark
              ? (lang === 'en' ? 'Switch to light mode' : 'Cambiar a modo día')
              : (lang === 'en' ? 'Switch to dark mode' : 'Cambiar a modo noche')}
            className="w-[38px] h-[38px] rounded-lg bg-surface-2 border border-line flex items-center justify-center text-fg-muted hover:text-fg hover:border-brand-500/40 transition-colors duration-base"
          >
            {dark ? <FiSun size={15} className="text-warning-fg" /> : <FiMoon size={15} className="text-brand-fg" />}
          </button>
        </div>
      </div>
    </header>
  )
}

/** Bloque de registro con código de referido. Un artículo puede tener dos (p. ej. delta neutral). */
function RefCta({ post, link, code, label, lang }) {
  return (
    <motion.aside
      initial={revealInitial ? { opacity: 0, y: 16 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: ease.out }}
      className="rounded-card border border-brand-500/25 bg-brand-500/[0.06] p-5 sm:p-6"
    >
      <p className="font-body text-xs text-fg-muted mb-3">
        {code ? T.refText[lang] : T.joinText[lang]}
      </p>

      {code && (
        <div className="flex items-center gap-2 rounded-xl border border-dashed border-brand-500/35 bg-surface px-3 py-2.5 mb-4">
          <span className="font-body text-[10px] text-fg-subtle uppercase tracking-[0.12em]">
            {T.code[lang]}
          </span>
          <code className="font-mono font-bold text-sm text-brand-fg flex-1">{code}</code>
        </div>
      )}

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={() => trackEvent('affiliate_click', { project: post.id, location: 'article_page' })}
        className="flex items-center justify-center gap-2 w-full min-h-[52px] rounded-2xl text-white font-display font-bold text-sm bg-gradient-to-br from-violet-600 to-purple-500 shadow-e2 transition-[transform,filter,box-shadow] duration-base ease-out-quart hover:-translate-y-0.5 hover:brightness-110 hover:shadow-e3"
      >
        {label?.[lang] || T.defaultRef[lang]}
        <FiArrowUpRight size={16} aria-hidden="true" />
      </a>
    </motion.aside>
  )
}

/** Enlazado interno: guías del mismo tema y otros artículos del blog. */
function RelatedContent({ post, lang }) {
  const guides = (post.related || []).map(path => DOCUMENT_PAGES.find(page => page.path === path)).filter(Boolean)
  const others = blogPosts.filter(p => p.slug !== post.slug && p.content?.[lang]).slice(0, 3)
  if (!guides.length && !others.length) return null

  return (
    <nav aria-label={T.guides[lang]} className="mt-12 grid gap-8 sm:grid-cols-2">
      {guides.length > 0 && (
        <div>
          <h2 className="font-display font-bold text-sm uppercase tracking-[0.1em] text-fg mb-4">{T.guides[lang]}</h2>
          <ul className="space-y-4">
            {guides.map(page => (
              <li key={page.path}>
                <Link to={page.path} className="group block">
                  <span className="font-display font-semibold text-[15px] text-brand-fg group-hover:underline">{page.title}</span>
                  <span className="block font-body text-xs leading-relaxed text-fg-muted mt-1">{page.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {others.length > 0 && (
        <div>
          <h2 className="font-display font-bold text-sm uppercase tracking-[0.1em] text-fg mb-4">{T.more[lang]}</h2>
          <ul className="space-y-4">
            {others.map(p => (
              <li key={p.slug}>
                <Link to={articlePath(p, lang)} className="group block">
                  <span className="font-display font-semibold text-[15px] text-brand-fg group-hover:underline">{p.title[lang]}</span>
                  <span className="block font-body text-xs text-fg-subtle mt-1">
                    <time dateTime={articleDate(p)}>{p.date}</time> · {p.tag?.[lang]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}

export default function ArticlePage({ lang = 'es' }) {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug && p.content?.[lang])
  return post ? <PublishedArticle key={`${lang}-${slug}`} post={post} lang={lang} /> : <NotFoundPage />
}

function PublishedArticle({ post, lang }) {
  const slug = post.slug
  const navigate = useNavigate()
  const homeHref = lang === 'en' ? '/en' : '/'

  const toggleLang = () => navigate(lang === 'en' ? `/blog/${slug}` : `/en/blog/${slug}`)


  useSeo(articleMeta(post, lang))

  useEffect(() => { window.scrollTo(0, 0) }, [post])

  const modified = post.modifiedAt
    ? new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Madrid' })
      .format(new Date(`${post.modifiedAt}T12:00:00Z`))
    : null

  return (
    <div className="min-h-screen bg-bg text-fg transition-colors duration-slow">
      <ArticleHeader lang={lang} homeHref={homeHref} onToggleLang={toggleLang} />

      <motion.article
        variants={stagger(0.06)}
        initial={revealInitial}
        animate="visible"
        className="container-page max-w-prose py-10"
      >
        <motion.div variants={fadeUp}>
          <Link
            to={homeHref}
            className="group inline-flex items-center gap-1.5 mb-7 font-body text-[13px] font-medium text-brand-fg"
          >
            <FiArrowLeft
              size={14}
              aria-hidden="true"
              className="transition-transform duration-base ease-out-quart group-hover:-translate-x-1"
            />
            {T.home[lang]}
          </Link>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-4">
          <Badge tone="brand">{post.tag?.[lang] || post.tag?.es}</Badge>
          <time dateTime={articleDate(post)} className="font-body text-[11px] text-fg-subtle">{post.date}</time>
          <span aria-hidden="true" className="w-1 h-1 rounded-full bg-fg-subtle" />
          <span className="font-body text-[11px] text-fg-subtle flex items-center gap-1">
            <FiClock size={11} aria-hidden="true" /> {post.readTime}
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-display text-display-2 text-fg mb-7 text-balance"
        >
          {post.title[lang] || post.title.es}
        </motion.h1>
        <p className="font-body text-xs text-fg-muted mb-5">{lang === 'en' ? 'By Beneficio Diario editorial team. Published in its original historical context.' : 'Por el equipo editorial de Beneficio Diario. Publicado en su contexto histórico original.'} <Link to="/politica-editorial" className="text-brand-fg underline">{lang === 'en' ? 'Editorial policy (ES)' : 'Política editorial'}</Link></p>
        <aside className="font-body text-sm text-fg-muted border border-line rounded-xl p-4 mb-7">{lang === 'en' ? 'May contain referral links. Campaigns and terms can change: check official information. No returns are guaranteed.' : 'Puede contener enlaces de referido. Las campañas y condiciones pueden cambiar: consulta la información oficial. No hay rentabilidad garantizada.'} <Link to="/transparencia" className="text-brand-fg underline">{lang === 'en' ? 'Transparency (ES)' : 'Transparencia'}</Link></aside>

        {post.updateNote?.[lang] && (
          <aside role="note" className="rounded-xl border border-warning/30 bg-warning/[0.07] p-4 sm:p-5 mb-7">
            <p className="font-display font-bold text-xs uppercase tracking-[0.1em] text-warning-fg mb-2">
              {T.updated[lang]}{modified && <> · <time dateTime={post.modifiedAt}>{modified}</time></>}
            </p>
            <p className="font-body text-sm leading-relaxed text-fg-muted">{post.updateNote[lang]}</p>
          </aside>
        )}

        <motion.figure variants={fadeUp} className="rounded-card overflow-hidden border border-line mb-8 bg-surface-2">
          <img
            src={post.image}
            alt={post.imageAlt?.[lang] || ''}
            loading="eager"
            fetchpriority="high"
            className="w-full object-cover max-h-[22rem]"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              const p = e.currentTarget.parentElement
              p.style.background = 'linear-gradient(135deg, rgb(var(--brand-700)), rgb(var(--brand-500)))'
              p.style.minHeight = '10rem'
            }}
          />
        </motion.figure>

        <PartnerSlot slot="banner" lang={lang} className="mb-8" />

        <motion.div variants={fadeUp}>
          <ArticleContent content={post.content?.[lang] || post.content?.es} />
        </motion.div>

        {post.extraImage && post.extraImage !== post.image && (
          <figure className="mt-8 rounded-card overflow-hidden border border-line">
            <img src={post.extraImage} alt={post.imageAlt?.[lang] || ''} loading="lazy" className="w-full object-cover" />
          </figure>
        )}

        {(post.refLink || post.extraRefLink) && (
          <div className={`mt-10 grid gap-4 ${post.refLink && post.extraRefLink ? 'sm:grid-cols-2' : ''}`}>
            {post.refLink && <RefCta post={post} link={post.refLink} code={post.refCode} label={post.refLabel} lang={lang} />}
            {post.extraRefLink && <RefCta post={post} link={post.extraRefLink} code={post.extraRefCode} label={post.extraRefLabel} lang={lang} />}
          </div>
        )}

        <RelatedContent post={post} lang={lang} />

        <PartnerSlot slot="inArticle" lang={lang} className="mt-10" />

        <div className="mt-10 pt-7 border-t border-line">
          <Button to={homeHref} variant="secondary">
            <FiArrowLeft size={15} aria-hidden="true" /> {T.backToSite[lang]}
          </Button>
        </div>
      </motion.article>

      <Footer lang={lang} />
    </div>
  )
}
