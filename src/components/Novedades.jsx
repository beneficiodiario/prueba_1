import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { FiClock, FiArrowUpRight } from 'react-icons/fi'
import { blogPosts } from '../data/content'
import { ABSTRACT_COMMUNITY } from '../config'

const T = {
  label:    { es: '📢 NOVEDADES',  en: '📢 NEWS' },
  newBadge: { es: 'NUEVO',         en: 'NEW' },
  readMore: { es: 'Leer artículo', en: 'Read article' },
}

export default function Novedades({ darkMode = false, lang = 'es' }) {
  const [ref, vis] = useInView({ triggerOnce: true, threshold: 0.15 })
  const post = blogPosts[0]
  if (!post || !post.content) return null

  const title   = post.title?.[lang]   || post.title?.es
  const excerpt = post.excerpt?.[lang] || post.excerpt?.es
  const tag     = post.tag?.[lang]     || post.tag?.es
  const href    = `${lang === 'en' ? '/en' : ''}/blog/${post.slug}`

  return (
    <section id="novedades" className={`py-12 px-5 sm:px-8 transition-colors duration-500 ${darkMode ? 'bg-[#0a0f1e]' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto">
        <span className="block text-center font-body text-[11px] font-bold text-[#22c55e] tracking-[0.12em] uppercase mb-4">{T.label[lang]}</span>
        <motion.div ref={ref} initial={{ opacity: 0, y: 25 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <Link to={href}
            className={`card-shine group block rounded-2xl overflow-hidden border hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#22c55e]/10 transition-all duration-500 ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100 shadow-lg shadow-black/[0.03]'}`}>
            <div className="relative h-56 sm:h-64 overflow-hidden" style={{ background: 'linear-gradient(135deg,#047857,#22c55e)' }}>
              <img src={post.image} alt={title} loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={e => { e.target.style.display = 'none' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1 font-body text-[10px] font-bold text-emerald-700 tracking-wider">{tag}</span>
                <span className="bg-[#22c55e] rounded-lg px-2.5 py-1 font-body text-[10px] font-bold text-white">{T.newBadge[lang]}</span>
              </div>
            </div>
            <div className="p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-body text-[11px] text-gray-400">{post.date}</span>
                <span className="w-1 h-1 rounded-full bg-gray-400" />
                <span className="font-body text-[11px] text-gray-400 flex items-center gap-1"><FiClock size={10} /> {post.readTime}</span>
              </div>
              <h2 className={`font-display font-extrabold text-[clamp(20px,2.5vw,28px)] leading-snug mb-3 group-hover:text-[#22c55e] transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
              <p className={`font-body text-sm leading-relaxed mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{excerpt}</p>
              <div className="inline-flex items-center gap-1 font-display font-semibold text-sm text-[#22c55e] group-hover:gap-2.5 transition-all">
                {T.readMore[lang]} <FiArrowUpRight size={14} />
              </div>
            </div>
          </Link>
        </motion.div>

        {(ABSTRACT_COMMUNITY?.telegram || ABSTRACT_COMMUNITY?.x || ABSTRACT_COMMUNITY?.youtube) && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className={`font-body text-[12px] mr-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              {lang === 'es' ? 'Únete a la comunidad:' : 'Join the community:'}
            </span>
            {ABSTRACT_COMMUNITY.telegram && (
              <a href={ABSTRACT_COMMUNITY.telegram} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#229ED9] text-white rounded-xl px-3.5 py-2 font-display font-semibold text-[12px] hover:-translate-y-0.5 transition-all">
                Telegram <FiArrowUpRight size={12} />
              </a>
            )}
            {ABSTRACT_COMMUNITY.x && (
              <a href={ABSTRACT_COMMUNITY.x} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-black text-white rounded-xl px-3.5 py-2 font-display font-semibold text-[12px] hover:-translate-y-0.5 transition-all">
                X <FiArrowUpRight size={12} />
              </a>
            )}
            {ABSTRACT_COMMUNITY.youtube && (
              <a href={ABSTRACT_COMMUNITY.youtube} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-red-600 text-white rounded-xl px-3.5 py-2 font-display font-semibold text-[12px] hover:-translate-y-0.5 transition-all">
                YouTube <FiArrowUpRight size={12} />
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
