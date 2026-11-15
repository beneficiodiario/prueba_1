import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Section, Eyebrow } from './ui/Section'
import { Card, Badge } from './ui/Card'
import { FiClock, FiArrowUpRight, FiRadio } from './ui/icons'
import { blogPosts } from '../data/content'
import { articleDate } from '../lib/structuredData'
import { fadeUp, stagger, viewport, revealInitial } from '../lib/motion'

const T = {
  eyebrow:  { es: 'Novedades', en: 'Latest' },
  newBadge: { es: 'Nuevo', en: 'New' },
  readMore: { es: 'Leer artículo', en: 'Read article' },
}

export default function Novedades({ lang }) {
  const post = blogPosts[0]
  if (!post?.content) return null

  const title   = post.title?.[lang]   || post.title?.es
  const excerpt = post.excerpt?.[lang] || post.excerpt?.es
  const tag     = post.tag?.[lang]     || post.tag?.es
  const href    = `${lang === 'en' ? '/en' : ''}/blog/${post.slug}`

  return (
    <Section id="novedades" tone="base" compact>
      <motion.div
        variants={stagger(0.08)}
        initial={revealInitial}
        whileInView="visible"
        viewport={viewport}
      >
        <motion.div variants={fadeUp} className="flex justify-center mb-5">
          <Eyebrow icon={FiRadio} className="!text-success-fg">
            <span className="live-dot w-1.5 h-1.5 rounded-full bg-success" aria-hidden="true" />
            {T.eyebrow[lang]}
          </Eyebrow>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Card interactive shine className="group">
            <Link to={href} className="block">
              <div className="relative h-56 sm:h-72 overflow-hidden bg-gradient-to-br from-emerald-800 to-success">
                <img
                  src={post.image}
                  alt={post.imageAlt?.[lang] || ''}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.05]"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <Badge tone="onImage">{tag}</Badge>
                  <Badge tone="success" className="!bg-success !text-white !border-success">
                    {T.newBadge[lang]}
                  </Badge>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-3 font-body text-[11px] text-fg-subtle">
                  <time dateTime={articleDate(post)}>{post.date}</time>
                  <span aria-hidden="true" className="w-1 h-1 rounded-full bg-fg-subtle" />
                  <span className="flex items-center gap-1">
                    <FiClock size={11} aria-hidden="true" /> {post.readTime}
                  </span>
                </div>

                <h2 className="font-display text-display-3 text-fg mb-3 transition-colors duration-base group-hover:text-success-fg text-balance">
                  {title}
                </h2>

                <p className="font-body text-lead text-fg-muted mb-5 measure">{excerpt}</p>

                <span className="inline-flex items-center gap-1.5 font-display font-semibold text-sm text-success-fg">
                  {T.readMore[lang]}
                  <FiArrowUpRight
                    size={15}
                    aria-hidden="true"
                    className="transition-transform duration-base ease-out-quart group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>
            </Link>
          </Card>
        </motion.div>
      </motion.div>
    </Section>
  )
}
