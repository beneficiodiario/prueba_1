import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const stepsData = {
  es: [
    { icon: '🔍', title: 'Descubre', desc: 'Analizamos el mercado y filtramos proyectos con utilidad real y potencial de rentabilidad. Solo publicamos lo que nosotros mismos usamos.' },
    { icon: '📊', title: 'Analiza', desc: 'Te damos toda la información: métricas, nivel de riesgo, tiempo necesario y contexto de mercado para que decidas con criterio.' },
    { icon: '🚀', title: 'Actúa', desc: 'Con la guía clara, tú decides en qué participar. Cada proyecto tiene sus instrucciones paso a paso para empezar sin complicaciones.' },
    { icon: '💰', title: 'Beneficio', desc: 'Los resultados llegan con constancia. Comparte tu experiencia con la comunidad y descubre nuevas oportunidades cada semana.' },
  ],
  en: [
    { icon: '🔍', title: 'Discover', desc: 'We analyze the market and filter projects with real utility and profitability potential. We only publish what we use ourselves.' },
    { icon: '📊', title: 'Analyze', desc: 'We give you all the information: metrics, risk level, time required and market context so you can decide wisely.' },
    { icon: '🚀', title: 'Act', desc: 'With clear guidance, you decide what to join. Each project has step-by-step instructions to get started without complications.' },
    { icon: '💰', title: 'Profit', desc: 'Results come with consistency. Share your experience with the community and discover new opportunities every week.' },
  ],
}

function Card({ step, i, darkMode }) {
  const [ref, vis] = useInView({ triggerOnce: true, threshold: 0.2 })
  const cardBg = darkMode ? 'bg-white/5 border-white/10' : 'glass border-transparent'
  const numC   = darkMode ? 'text-[#00b4d8]/30' : 'text-[#00b4d8]/10'
  const titleC = darkMode ? 'text-white' : 'text-gray-900'
  const paraC  = darkMode ? 'text-gray-400' : 'text-gray-500'

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [.23,1,.32,1], delay: i * 0.1 }}
      className={`card-shine rounded-2xl p-7 relative group hover:-translate-y-2 hover:shadow-xl hover:shadow-[#00b4d8]/10 hover:border-[#00b4d8]/20 transition-all duration-500 border ${cardBg}`}>
      {/* Número grande — más visible en dark */}
      <span className={`absolute top-3 right-4 font-display font-extrabold text-5xl leading-none select-none ${numC}`}>
        0{i+1}
      </span>
      <div className="text-3xl mb-4">{step.icon}</div>
      <h3 className={`font-display font-bold text-lg mb-2 ${titleC}`}>{step.title}</h3>
      <p className={`font-body text-sm leading-relaxed ${paraC}`}>{step.desc}</p>
    </motion.div>
  )
}

export default function HowItWorks({ darkMode, lang }) {
  const [ref, vis] = useInView({ triggerOnce: true, threshold: 0.1 })
  const steps = stepsData[lang] || stepsData.es
  const t = {
    label: { es: 'PROCESO', en: 'PROCESS' },
    title: { es: 'Cómo funciona BeneficioDiario', en: 'How BeneficioDiario works' },
    sub:   { es: 'Un proceso transparente para descubrir oportunidades de ingresos reales.', en: 'A transparent process to discover real income opportunities.' },
  }
  return (
    <section id="como-funciona" className={`py-24 px-5 sm:px-8 relative transition-colors duration-500 ${darkMode ? 'bg-[#0a0f1e]' : 'bg-gradient-to-b from-gray-50/50 to-white'}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} initial={{ opacity:0,y:35 }} animate={vis?{opacity:1,y:0}:{}} transition={{ duration:0.8 }} className="text-center mb-14">
          <span className="font-body text-[11px] font-bold text-[#00b4d8] tracking-[0.12em] uppercase">{t.label[lang]}</span>
          <h2 className={`font-display font-extrabold text-[clamp(28px,3.5vw,48px)] tracking-tight mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t.title[lang]}</h2>
          <p className={`font-body text-base max-w-lg mx-auto mt-3 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.sub[lang]}</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => <Card key={i} step={s} i={i} darkMode={darkMode} />)}
        </div>
      </div>
    </section>
  )
}
