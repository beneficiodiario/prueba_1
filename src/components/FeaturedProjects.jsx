import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiCheck, FiArrowUpRight, FiCopy } from 'react-icons/fi'
import { projects } from '../data/content'

const row1 = projects.filter(p => p.featured && p.featuredRow === 1)
const row2 = projects.filter(p => p.featured && p.featuredRow === 2)
const row3 = projects.filter(p => p.featured && p.featuredRow === 3)

const btnLabel = {
  es: { kast: 'Acceder a KAST', void: 'Unirse a VOID Network', grvt: 'Explorar GRVT', dac: 'Entrar al Testnet de DAC', markets: 'Probar Markets', abstract: 'Entrar en Abstract' },
  en: { kast: 'Access KAST', void: 'Join VOID Network', grvt: 'Explore GRVT', dac: 'Enter DAC Testnet', markets: 'Try Markets', abstract: 'Enter Abstract' },
}

function RefBadge({ code, darkMode, lang }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <div className={`flex items-center gap-2 border border-dashed border-[#00b4d8]/30 rounded-xl px-3 py-2.5 mt-3 ${darkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
      <span className="font-body text-[10px] text-gray-400 uppercase tracking-wider">{lang === 'es' ? 'Código' : 'Code'}:</span>
      <span className="font-mono font-bold text-sm text-[#0077b6] flex-1">{code}</span>
      <button onClick={copy} className="text-gray-400 hover:text-[#00b4d8] transition-colors text-[10px] font-body">
        {copied ? (lang === 'es' ? '✓ Copiado' : '✓ Copied') : <FiCopy size={13} />}
      </button>
    </div>
  )
}

function FeaturedCard({ p, i, delay = 0, darkMode, lang }) {
  const [ref, vis] = useInView({ triggerOnce: true, threshold: 0.12 })
  const desc     = p.desc?.[lang]     || p.desc?.es     || ''
  const features = p.features?.[lang] || p.features?.es || []
  const stats    = p.stats?.[lang]    || p.stats?.es    || p.stats || {}

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 50 }} animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: delay + i * 0.15, ease: [.23, 1, .32, 1] }}
      className={`rounded-3xl overflow-hidden border shadow-xl flex flex-col transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100 shadow-black/[0.04]'}`}>
      <div className="relative h-44 sm:h-52 overflow-hidden flex-shrink-0" style={{ background: p.gradient }}>
        <img src={p.image} alt={p.title} className="w-full h-full object-cover opacity-100" onError={e => { e.target.style.display = 'none' }} />
        {p.isNew && (
          <span className="absolute top-4 right-4 z-10 bg-white rounded-full px-3 py-1 font-display font-extrabold text-[10px] tracking-widest shadow-lg" style={{ color: p.tagColor }}>
            {lang === 'es' ? 'NUEVO' : 'NEW'}
          </span>
        )}
        <div className="absolute inset-0 flex items-end p-6">
          <div>
            <span className="bg-white/20 backdrop-blur-md rounded-lg px-3 py-1 font-body text-[10px] font-bold text-white tracking-widest">{p.tag}</span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-2 tracking-tight">{p.emoji} {p.title}</h3>
          </div>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <p className={`font-body text-sm leading-relaxed mb-5 whitespace-pre-line ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{desc}</p>
        <div className="grid gap-2 mb-5">
          {features.map((f, j) => (
            <div key={j} className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: p.tagColor + '22' }}>
                <FiCheck className="text-[10px]" style={{ color: p.tagColor }} />
              </div>
              <span className={`font-body text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{f}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4 mt-auto">
          {[
            { l: 'ROI', v: stats.roi, c: '#10b981' },
            { l: lang === 'es' ? 'Riesgo' : 'Risk', v: stats.risk, c: (stats.risk === 'Alto' || stats.risk === 'High' || stats.risk === 'Medio-Alto' || stats.risk === 'Medium-High') ? '#ef4444' : (stats.risk === 'Medio' || stats.risk === 'Medium') ? '#f59e0b' : '#10b981' },
            { l: lang === 'es' ? 'Frecuencia' : 'Frequency', v: stats.time, c: '#0077b6' },
            { l: lang === 'es' ? 'Mínimo' : 'Minimum', v: stats.min, c: '#6366f1' },
          ].map((s, j) => (
            <div key={j} className={`rounded-xl p-2.5 text-center ${darkMode ? 'bg-white/8' : 'bg-gray-50'}`}>
              <div className="font-display font-extrabold text-sm" style={{ color: s.c }}>{s.v}</div>
              <div className="font-body text-[9px] font-medium text-gray-400 uppercase tracking-wider mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
        {p.refCode && <RefBadge code={p.refCode} darkMode={darkMode} lang={lang} />}
        <a href={p.link} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-white font-display font-bold text-sm transition-all hover:-translate-y-0.5 hover:opacity-90 mt-3"
          style={{ background: p.gradient }}>
          {btnLabel[lang]?.[p.id] || 'Ver proyecto'} <FiArrowUpRight />
        </a>
        {p.videoUrl ? (
          <a href={p.videoUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border border-red-200 bg-red-50 text-red-600 font-display font-semibold text-sm hover:bg-red-100 hover:-translate-y-0.5 transition-all mt-2">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            {lang === 'es' ? `Ver tutorial de ${p.title}` : `Watch ${p.title} tutorial`}
          </a>
        ) : (
          <div className={`flex items-center justify-center gap-2 w-full py-3 rounded-2xl border border-dashed font-display font-semibold text-sm mt-2 cursor-not-allowed ${darkMode ? 'border-white/10 text-gray-600' : 'border-gray-200 text-gray-300'}`}>
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current opacity-30"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            {lang === 'es' ? `Tutorial de ${p.title} — Próximamente` : `${p.title} tutorial — Coming soon`}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function FeaturedProjects({ darkMode, lang }) {
  const [ref, vis] = useInView({ triggerOnce: true, threshold: 0.08 })
  const t = {
    badge: { es: '⭐ PROYECTOS DESTACADOS', en: '⭐ FEATURED PROJECTS' },
    title: { es: 'Proyectos activos ahora mismo', en: 'Currently active projects' },
    sub:   { es: 'Solo publicamos proyectos que hemos analizado y probado. Cada uno con su guía, código de referido y datos reales.', en: 'We only publish projects we have analyzed and tested. Each one with its guide, referral code and real data.' },
    more:  { es: 'Más proyectos', en: 'More projects' },
  }
  return (
    <section id="proyectos" className={`py-24 px-5 sm:px-8 relative transition-colors duration-500 ${darkMode ? 'bg-[#080d1a]' : ''}`}>
      {!darkMode && <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/30 via-white to-indigo-50/20 z-0" />}
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div ref={ref} initial={{ opacity:0,y:35 }} animate={vis?{opacity:1,y:0}:{}} transition={{ duration:0.8 }} className="text-center mb-14">
          <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-body text-[11px] font-semibold tracking-wider ${darkMode ? 'bg-[#00b4d8]/15 border border-[#00b4d8]/25 text-[#00b4d8]' : 'bg-[#00b4d8]/8 border border-[#00b4d8]/15 text-[#0077b6]'}`}>{t.badge[lang]}</span>
          <h2 className={`font-display font-extrabold text-[clamp(28px,3.5vw,48px)] tracking-tight mt-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t.title[lang]}</h2>
          <p className={`font-body text-base max-w-xl mx-auto mt-3 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.sub[lang]}</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {row1.map((p, i) => <FeaturedCard key={p.id} p={p} i={i} delay={0} darkMode={darkMode} lang={lang} />)}
        </div>
        <div className="flex items-center gap-4 my-8">
          <div className={`flex-1 h-px ${darkMode ? 'bg-white/8' : 'bg-gray-100'}`} />
          <span className={`font-body text-[11px] font-bold tracking-[0.12em] uppercase whitespace-nowrap ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>{t.more[lang]}</span>
          <div className={`flex-1 h-px ${darkMode ? 'bg-white/8' : 'bg-gray-100'}`} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {row2.map((p, i) => <FeaturedCard key={p.id} p={p} i={i} delay={0.1} darkMode={darkMode} lang={lang} />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {row3.map((p, i) => <FeaturedCard key={p.id} p={p} i={i} delay={0.2} darkMode={darkMode} lang={lang} />)}
        </div>
      </div>
    </section>
  )
}
