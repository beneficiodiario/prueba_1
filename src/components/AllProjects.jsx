import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiArrowUpRight, FiLock } from 'react-icons/fi'
import { projects } from '../data/content'

const others = projects.filter(p => !p.featured)

function ProjCard({ p, i, darkMode, lang }) {
  const [ref, vis] = useInView({ triggerOnce: true, threshold: 0.15 })
  const desc  = p.desc?.[lang]  || p.desc?.es  || ''
  const stats = p.stats?.[lang] || p.stats?.es  || p.stats || {}
  const soon  = p.comingSoon

  const cardBg = darkMode
    ? soon ? 'bg-white/3 border-white/5' : 'bg-white/5 border-white/8'
    : soon ? 'bg-gray-50/80 border-gray-100' : 'glass border-transparent'

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [.23, 1, .32, 1] }}
      className={`card-shine rounded-2xl overflow-hidden transition-all duration-500 border flex flex-col ${cardBg} ${!soon ? 'hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#00b4d8]/10' : 'opacity-75'}`}>

      {/* Header */}
      <div className="h-36 relative overflow-hidden flex-shrink-0" style={{ background: p.gradient }}>
        <img src={p.image} alt={p.title} className={`w-full h-full object-cover ${soon ? 'opacity-15 grayscale' : 'opacity-30'}`} />
        {soon && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`font-display font-bold text-xs tracking-widest px-3 py-1.5 rounded-full border ${darkMode ? 'bg-white/10 border-white/20 text-white/60' : 'bg-white/30 border-white/40 text-white'}`}>
              {lang === 'es' ? '🔒 PRÓXIMAMENTE' : '🔒 COMING SOON'}
            </span>
          </div>
        )}
        <div className="absolute inset-0 flex items-end p-5">
          <div>
            <span className="text-[10px] font-bold text-white/70 tracking-widest">{p.tag}</span>
            <h3 className="font-display font-bold text-xl text-white mt-0.5">{p.emoji} {p.title}</h3>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <p className={`font-body text-xs leading-relaxed mb-4 line-clamp-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{desc}</p>
        <div className="flex gap-2 mb-4">
          {[
            { l: 'ROI', v: stats.roi },
            { l: lang === 'es' ? 'Riesgo' : 'Risk', v: stats.risk },
            { l: lang === 'es' ? 'Mín.' : 'Min.', v: stats.min },
          ].map((s, j) => (
            <span key={j} className={`rounded-lg px-2.5 py-1.5 font-body text-[10px] ${darkMode ? 'bg-white/10 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
              <strong className={darkMode ? 'text-gray-200' : 'text-gray-700'}>{s.v}</strong> {s.l}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          {soon ? (
            <div className={`flex items-center gap-1.5 font-display font-semibold text-sm cursor-not-allowed ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>
              <FiLock size={13} />
              {lang === 'es' ? 'Próximamente' : 'Coming soon'}
            </div>
          ) : (
            <a href={p.link} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-display font-semibold text-sm hover:gap-3 transition-all" style={{ color: p.tagColor }}>
              {lang === 'es' ? 'Ver proyecto' : 'View project'} <FiArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function AllProjects({ darkMode, lang }) {
  const [ref, vis] = useInView({ triggerOnce: true, threshold: 0.1 })
  const t = {
    label: { es: 'MÁS OPORTUNIDADES', en: 'MORE OPPORTUNITIES' },
    title: { es: 'Otros proyectos activos', en: 'Other active projects' },
  }
  return (
    <section className={`py-20 px-5 sm:px-8 transition-colors duration-500 ${darkMode ? 'bg-[#080d1a]' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} initial={{ opacity:0,y:30 }} animate={vis?{opacity:1,y:0}:{}} transition={{ duration:0.8 }} className="text-center mb-12">
          <span className="font-body text-[11px] font-bold text-[#00b4d8] tracking-[0.12em] uppercase">{t.label[lang]}</span>
          <h2 className={`font-display font-extrabold text-[clamp(26px,3vw,42px)] tracking-tight mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t.title[lang]}</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {others.map((p, i) => <ProjCard key={p.id} p={p} i={i} darkMode={darkMode} lang={lang} />)}
        </div>
      </div>
    </section>
  )
}
