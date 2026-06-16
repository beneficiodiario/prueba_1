import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiArrowUpRight } from 'react-icons/fi'

const EMAIL = 'contacto@beneficiodiario.com'

const T = {
  label: { es: 'PARA PROYECTOS', en: 'FOR PROJECTS' },
  title: { es: '¿Eres un proyecto? Anúnciate aquí', en: 'Are you a project? Advertise here' },
  sub:   { es: 'Llega a una audiencia interesada en cripto, airdrops y trading. Ofrecemos reseñas, posts patrocinados y espacios destacados en la web.', en: 'Reach an audience interested in crypto, airdrops and trading. We offer reviews, sponsored posts and featured spots on the site.' },
  btn:   { es: 'Escríbenos', en: 'Contact us' },
}

export default function Sponsors({ darkMode = false, lang = 'es' }) {
  const [ref, vis] = useInView({ triggerOnce: true, threshold: 0.2 })
  const subject = encodeURIComponent(lang === 'es' ? 'Quiero anunciarme en BeneficioDiario' : 'I want to advertise on BeneficioDiario')

  return (
    <section id="anunciate" className={`py-16 px-5 sm:px-8 transition-colors duration-500 ${darkMode ? 'bg-[#080d1a]' : 'bg-gray-50/60'}`}>
      <motion.div ref={ref} initial={{ opacity: 0, y: 25 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto text-center">
        <span className="font-body text-[11px] font-bold text-[#00b4d8] tracking-[0.12em] uppercase">{T.label[lang]}</span>
        <h2 className={`font-display font-extrabold text-[clamp(22px,3vw,32px)] tracking-tight mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{T.title[lang]}</h2>
        <p className={`font-body text-sm mt-3 mb-6 max-w-xl mx-auto leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{T.sub[lang]}</p>
        <a href={`mailto:${EMAIL}?subject=${subject}`}
          className="inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 font-display font-bold text-sm text-white bg-gradient-to-br from-[#00b4d8] to-[#0077b6] shadow-lg shadow-[#00b4d8]/20 hover:-translate-y-0.5 transition-all">
          {T.btn[lang]} <FiArrowUpRight size={15} />
        </a>
      </motion.div>
    </section>
  )
}
