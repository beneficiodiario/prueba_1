import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiClock, FiArrowUpRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { blogPosts } from '../data/content'

const YOUTUBE_URL = 'https://www.youtube.com/@beneficiodiario_com'

const ui = {
  label:   { es: 'BLOG', en: 'BLOG' },
  title:   { es: 'Últimas noticias', en: 'Latest news' },
  sub:     { es: 'Actualizaciones, análisis y noticias sobre los proyectos que seguimos.', en: 'Updates, analysis and news about the projects we follow.' },
  readMore:{ es: 'Leer más', en: 'Read more' },
  newBadge:{ es: 'NUEVO', en: 'NEW' },
  weekly:  { es: 'Nuevo contenido cada semana.', en: 'New content every week.' },
  yt:      { es: 'Ver en YouTube', en: 'Watch on YouTube' },
  code:    { es: 'Código', en: 'Code' },
}

// ── Tarjeta principal (grande, izquierda) ──
function MainCard({ post, onClick, darkMode, lang }) {
  const [ref, vis] = useInView({ triggerOnce: true, threshold: 0.1 })
  const title   = post.title?.[lang]   || post.title
  const excerpt = post.excerpt?.[lang] || post.excerpt
  const tag     = post.tag?.[lang]     || post.tag
  const hasContent = !!post.content

  return (
    <motion.article ref={ref} initial={{ opacity: 0, x: -30 }} animate={vis ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [.23, 1, .32, 1] }}
      className={`card-shine group rounded-2xl overflow-hidden border hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#00b4d8]/10 transition-all duration-500 ${hasContent ? 'cursor-pointer' : ''} ${darkMode ? 'bg-white/5 border-white/8' : 'bg-white border-gray-100'}`}
      onClick={() => hasContent && onClick(post)}>
      {/* Imagen grande */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <img src={post.image} alt={title} loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={e => { e.target.style.display='none'; e.target.parentElement.style.background='linear-gradient(135deg,#7c3aed,#a855f7)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1 font-body text-[10px] font-bold text-[#0077b6] tracking-wider">{tag}</span>
          {hasContent && <span className="bg-[#00b4d8] rounded-lg px-2.5 py-1 font-body text-[10px] font-bold text-white">{ui.newBadge[lang]}</span>}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-body text-[11px] text-gray-400">{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-gray-400" />
          <span className="font-body text-[11px] text-gray-400 flex items-center gap-1"><FiClock size={10} /> {post.readTime}</span>
        </div>
        <h3 className={`font-display font-bold text-xl leading-snug mb-3 group-hover:text-[#00b4d8] transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
        <p className={`font-body text-sm leading-relaxed mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{excerpt}</p>
        {post.refLink && post.refCode && (
          <a href={post.refLink} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
            className="mb-3 inline-flex items-center gap-1.5 bg-[#00b4d8]/10 border border-[#00b4d8]/20 rounded-lg px-3 py-1.5 font-mono text-[11px] font-bold text-[#0077b6] hover:bg-[#00b4d8]/20 transition-colors">
            {ui.code[lang]}: {post.refCode} →
          </a>
        )}
        <div className="flex items-center gap-1 font-display font-semibold text-sm text-[#00b4d8] group-hover:gap-2.5 transition-all">
          {ui.readMore[lang]} <FiArrowUpRight size={13} />
        </div>
      </div>
    </motion.article>
  )
}

// ── Tarjeta secundaria (pequeña, lateral) ──
function SideCard({ post, i, onClick, darkMode, lang }) {
  const [ref, vis] = useInView({ triggerOnce: true, threshold: 0.1 })
  const title   = post.title?.[lang]   || post.title
  const excerpt = post.excerpt?.[lang] || post.excerpt
  const tag     = post.tag?.[lang]     || post.tag
  const hasContent = !!post.content

  return (
    <motion.article ref={ref} initial={{ opacity: 0, x: 30 }} animate={vis ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [.23, 1, .32, 1] }}
      className={`card-shine group rounded-2xl overflow-hidden border hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#00b4d8]/8 transition-all duration-400 flex gap-0 ${hasContent ? 'cursor-pointer' : ''} ${darkMode ? 'bg-white/5 border-white/8' : 'bg-white border-gray-100'}`}
      onClick={() => hasContent && onClick(post)}>
      {/* Thumbnail */}
      <div className="w-28 sm:w-32 flex-shrink-0 relative overflow-hidden">
        <img src={post.image} alt={title} loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={e => { e.target.style.display='none'; e.target.parentElement.style.background='linear-gradient(135deg,#0f3460,#00b4d8)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
      </div>
      {/* Texto */}
      <div className="p-4 flex flex-col justify-between min-w-0 flex-1">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`font-body text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-md ${darkMode ? 'bg-white/10 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>{tag}</span>
            {hasContent && <span className="bg-[#00b4d8] rounded-md px-1.5 py-0.5 font-body text-[9px] font-bold text-white">{ui.newBadge[lang]}</span>}
          </div>
          <h3 className={`font-display font-bold text-sm leading-snug mb-1.5 group-hover:text-[#00b4d8] transition-colors line-clamp-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
          <p className={`font-body text-[11px] leading-relaxed line-clamp-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{excerpt}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="font-body text-[10px] text-gray-400">{post.date}</span>
          <span className="font-body text-[10px] text-[#00b4d8] flex items-center gap-0.5">
            {ui.readMore[lang]} <FiArrowUpRight size={10} />
          </span>
        </div>
      </div>
    </motion.article>
  )
}

export default function Blog({ darkMode, lang }) {
  const [ref, vis] = useInView({ triggerOnce: true, threshold: 0.05 })
  const navigate = useNavigate()
  const openPost = (post) => navigate(`${lang === 'en' ? '/en' : ''}/blog/${post.slug}`)

  return (
    <section id="blog" className={`py-24 px-5 sm:px-8 transition-colors duration-500 ${darkMode ? 'bg-[#0a0f1e]' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} initial={{ opacity:0,y:35 }} animate={vis?{opacity:1,y:0}:{}} transition={{ duration:0.8 }} className="text-center mb-14">
          <span className="font-body text-[11px] font-bold text-[#00b4d8] tracking-[0.12em] uppercase">{ui.label[lang]}</span>
          <h2 className={`font-display font-extrabold text-[clamp(26px,3.5vw,44px)] tracking-tight mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{ui.title[lang]}</h2>
          <p className={`font-body text-sm max-w-md mx-auto mt-3 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{ui.sub[lang]}</p>
        </motion.div>

        {/* Cuadrícula 2 columnas — el primero ya se muestra destacado en Novedades */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {blogPosts.slice(1).map((post) => (
            <MainCard key={post.id} post={post} onClick={openPost} darkMode={darkMode} lang={lang} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={vis ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }} className="text-center mt-10">
          <p className={`font-body text-sm mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{ui.weekly[lang]}</p>
          <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 text-white rounded-xl px-6 py-3 font-display font-semibold text-sm hover:bg-red-700 hover:-translate-y-0.5 transition-all">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            {ui.yt[lang]}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
