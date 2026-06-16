import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { YOUTUBE_URL } from '../data/content'

export default function CTA({ darkMode, lang = 'es' }) {
  const [ref, vis] = useInView({ triggerOnce: true, threshold: 0.2 })

  const t = {
    title1:  { es: 'Únete a la comunidad', en: 'Join the community' },
    sub:     { es: 'Compartimos proyectos rentables, análisis de mercado y oportunidades cada semana. Suscríbete para estar al día — sin promesas mágicas, solo información honesta.', en: 'We share profitable projects, market analysis and opportunities every week. Subscribe to stay updated — no magic promises, just honest information.' },
    youtube: { es: 'Suscribirse en YouTube', en: 'Subscribe on YouTube' },
  }

  const sectionBg = darkMode ? 'bg-[#080d1a]' : ''
  const cardBg = darkMode
    ? 'bg-white/5 border-white/10'
    : 'bg-white border-gray-100 shadow-black/[0.04]'
  const titleC = darkMode ? 'text-white' : 'text-gray-900'
  const subC = darkMode ? 'text-gray-400' : 'text-gray-500'

  return (
    <section id="cta" className={`py-24 px-5 sm:px-8 relative transition-colors duration-500 ${sectionBg}`}>
      {!darkMode && <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/30 via-white to-indigo-50/20 z-0" />}
      <div className="max-w-[880px] mx-auto relative z-10">
        <motion.div ref={ref} initial={{ opacity: 0, scale: 0.95 }} animate={vis ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [.23, 1, .32, 1] }}
          className={`relative rounded-3xl overflow-hidden border shadow-xl p-12 sm:p-16 md:p-20 text-center transition-all duration-500 ${cardBg}`}
        >
          <div className="relative z-10">
            <img src="/logo-bd.png" alt="BeneficioDiario" className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 object-contain" />
            <h2 className={`font-display font-extrabold text-[clamp(24px,3.5vw,42px)] leading-tight tracking-tight ${titleC}`}>
              {t.title1[lang]}
              <br />
              <span className="gradient-text">BeneficioDiario</span>
            </h2>
            <p className={`font-body text-sm sm:text-base max-w-md mx-auto mt-4 leading-relaxed ${subC}`}>
              {t.sub[lang]}
            </p>
            <div className="flex justify-center mt-8">
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-red-600 text-white rounded-xl px-5 py-2.5 font-display font-bold text-xs shadow-md shadow-red-600/15 hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                {t.youtube[lang]}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
