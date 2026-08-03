import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Section, SectionHeader } from './ui/Section'
import { Card, Badge } from './ui/Card'
import { Button } from './ui/Button'
import { SiYoutube, FiClock, FiArrowUpRight } from './ui/icons'
import { blogPosts, YOUTUBE_URL } from '../data/content'
import { fadeUp, stagger, viewport, revealInitial } from '../lib/motion'

const T = {
  eyebrow:  { es: 'Blog', en: 'Blog' },
  title:    { es: 'Últimas noticias', en: 'Latest news' },
  sub: {
    es: 'Actualizaciones, análisis y noticias sobre los proyectos que seguimos.',
    en: 'Updates, analysis and news about the projects we follow.',
  },
  readMore: { es: 'Leer más', en: 'Read more' },
  newBadge: { es: 'Nuevo', en: 'New' },
  weekly:   { es: 'Publicamos contenido nuevo cada semana.', en: 'We publish new content every week.' },
  youtube:  { es: 'Ver en YouTube', en: 'Watch on YouTube' },
  code:     { es: 'Código', en: 'Code' },
}

function PostCard({ post, lang }) {
  const title   = post.title?.[lang]   || post.title?.es
  const excerpt = post.excerpt?.[lang] || post.excerpt?.es
  const tag     = post.tag?.[lang]     || post.tag?.es
  const href    = `${lang === 'en' ? '/en' : ''}/blog/${post.slug}`
  const readable = Boolean(post.content)

  return (
    <motion.article variants={fadeUp} className="h-full">
      <Card interactive={readable} shine={readable} className="group h-full">
        <div className="flex flex-col h-full">
          <div className="relative h-52 sm:h-64 shrink-0 overflow-hidden bg-surface-2">
            <img
              src={post.image}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.06]"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement.style.background = 'linear-gradient(135deg, rgb(var(--brand-700)), rgb(var(--brand-500)))'
              }}
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <Badge tone="onImage">{tag}</Badge>
              {readable && <Badge tone="brand" className="!bg-brand-500 !text-white !border-brand-500">{T.newBadge[lang]}</Badge>}
            </div>
          </div>

          <div className="p-6 flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-3 font-body text-[11px] text-fg-subtle">
              <time>{post.date}</time>
              <span aria-hidden="true" className="w-1 h-1 rounded-full bg-fg-subtle" />
              <span className="flex items-center gap-1">
                <FiClock size={11} aria-hidden="true" /> {post.readTime}
              </span>
            </div>

            {/* Enlace extendido: el <a> real es el titular y su ::after cubre
                toda la tarjeta. Así se puede pulsar en cualquier punto sin
                anidar anclas, que es HTML inválido. */}
            <h3 className="font-display font-bold text-xl leading-snug text-fg mb-3 transition-colors duration-base group-hover:text-brand-fg text-balance">
              {readable ? (
                <Link to={href} className="after:absolute after:inset-0 after:content-['']">
                  {title}
                </Link>
              ) : title}
            </h3>

            <p className="font-body text-sm leading-relaxed text-fg-muted mb-5 flex-1">{excerpt}</p>

            {post.refLink && post.refCode && (
              <a
                href={post.refLink}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="relative z-raised mb-4 self-start inline-flex items-center gap-1.5 rounded-lg border border-brand-500/25 bg-brand-500/10 px-3 py-1.5 font-mono text-[11px] font-bold text-brand-fg hover:bg-brand-500/20 transition-colors duration-base"
              >
                {T.code[lang]}: {post.refCode}
                <FiArrowUpRight size={12} aria-hidden="true" />
              </a>
            )}

            {readable && (
              <span className="inline-flex items-center gap-1.5 font-display font-semibold text-sm text-brand-fg mt-auto">
                {T.readMore[lang]}
                <FiArrowUpRight
                  size={14}
                  aria-hidden="true"
                  className="transition-transform duration-base ease-out-quart group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            )}
          </div>
        </div>
      </Card>
    </motion.article>
  )
}

export default function Blog({ lang }) {
  // El primero ya sale destacado arriba, en Novedades.
  const posts = blogPosts.slice(1)
  if (!posts.length) return null

  return (
    <Section id="blog" tone="base">
      <SectionHeader
        eyebrow={T.eyebrow[lang]}
        title={T.title[lang]}
        subtitle={T.sub[lang]}
      />

      <motion.div
        variants={stagger(0.08)}
        initial={revealInitial}
        whileInView="visible"
        viewport={viewport}
        className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6"
      >
        {posts.map((post) => <PostCard key={post.id} post={post} lang={lang} />)}
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial={revealInitial}
        whileInView="visible"
        viewport={viewport}
        className="text-center mt-12"
      >
        <p className="font-body text-sm text-fg-subtle mb-4">{T.weekly[lang]}</p>
        <Button href={YOUTUBE_URL} variant="youtube">
          <SiYoutube size={16} aria-hidden="true" />
          {T.youtube[lang]}
        </Button>
      </motion.div>
    </Section>
  )
}
