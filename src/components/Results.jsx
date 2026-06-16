import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

const testimonialsData = {
  es: [
    { name: 'Carlos M.', role: 'Administrador de Empresas', text: 'Llevo 8 meses siguiendo los proyectos de BeneficioDiario y la selección es excelente. La transparencia es lo que más valoro: siempre explican el riesgo real, no solo los beneficios.', avatar: 'CM' },
    { name: 'Laura G.', role: 'Usuaria KAST', text: 'Empecé con KAST sin saber nada de cripto. La explicación fue tan clara que en una tarde ya tenía todo configurado. Llevo meses acumulando puntos sin hacer nada especial.', avatar: 'LG' },
    { name: 'Miguel Á.', role: 'Usuario KAST', text: 'Con KAST llevo más de €300 en cashback acumulados solo gastando en el día a día. Es de esas cosas que no cuestan nada y dan más de lo que esperas.', avatar: 'MA' },
  ],
  en: [
    { name: 'Carlos M.', role: 'Business Manager', text: "I've been following BeneficioDiario projects for 8 months and the selection is excellent. Transparency is what I value most: they always explain the real risk, not just the benefits.", avatar: 'CM' },
    { name: 'Laura G.', role: 'KAST User', text: "I started with KAST knowing nothing about crypto. The explanation was so clear that in one afternoon I had everything set up. I've been accumulating points for months without doing anything special.", avatar: 'LG' },
    { name: 'Miguel Á.', role: 'KAST User', text: "With KAST I've accumulated over €300 in cashback just by spending normally. It's one of those things that costs nothing and gives more than you expect.", avatar: 'MA' },
  ],
}

function Card({ t, i, darkMode }) {
  const [ref, vis] = useInView({ triggerOnce: true, threshold: 0.2 })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: i * 0.12, ease: [.23,1,.32,1] }}
      className={`rounded-2xl p-7 group hover:-translate-y-1 hover:shadow-xl hover:shadow-[#00b4d8]/8 transition-all duration-500 border ${darkMode ? 'bg-white/5 border-white/8' : 'glass border-transparent'}`}>
      <div className="text-sm mb-3 text-amber-400 tracking-widest">★★★★★</div>
      <p className={`font-body text-sm leading-relaxed mb-5 italic ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>"{t.text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00b4d8] to-[#0077b6] flex items-center justify-center text-white font-display font-bold text-xs">{t.avatar}</div>
        <div>
          <div className={`font-display font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t.name}</div>
          <div className="font-body text-xs text-gray-400">{t.role}</div>
        </div>
      </div>
    </motion.div>
  )
}

function Num({ value, suffix, label, darkMode }) {
  const [ref, vis] = useInView({ triggerOnce: true, threshold: 0.3 })
  return (
    <div ref={ref} className="text-center py-6 sm:py-8">
      <div className={`font-display font-extrabold text-3xl sm:text-4xl tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {vis ? <CountUp end={value} duration={2.5} separator="." /> : '0'}{suffix}
      </div>
      <div className="font-body text-xs font-medium text-gray-400 mt-1">{label}</div>
    </div>
  )
}

export default function Results({ darkMode, lang }) {
  const [ref, vis] = useInView({ triggerOnce: true, threshold: 0.1 })
  const testimonials = testimonialsData[lang] || testimonialsData.es
  const t = {
    label: { es: 'COMUNIDAD', en: 'COMMUNITY' },
    title: { es: 'Lo que dicen nuestros seguidores', en: 'What our followers say' },
    sub:   { es: 'Personas reales compartiendo su experiencia con los proyectos de BeneficioDiario.', en: 'Real people sharing their experience with BeneficioDiario projects.' },
  }
  const nums = [
    { value: 96, suffix: '%', label: lang === 'es' ? 'Satisfacción' : 'Satisfaction' },
    { value: 6,  suffix: '',  label: lang === 'es' ? 'Proyectos activos' : 'Active projects' },
    { value: 24, suffix: '/7', label: lang === 'es' ? 'Contenido y soporte' : 'Content & support' },
  ]
  return (
    <section id="resultados" className={`py-24 px-5 sm:px-8 relative overflow-hidden transition-colors duration-500 ${darkMode ? 'bg-[#0a0f1e]' : 'bg-gradient-to-b from-gray-50/50 via-cyan-50/20 to-gray-50/50'}`}>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div ref={ref} initial={{ opacity:0,y:35 }} animate={vis?{opacity:1,y:0}:{}} transition={{ duration:0.8 }} className="text-center mb-14">
          <span className="font-body text-[11px] font-bold text-[#00b4d8] tracking-[0.12em] uppercase">{t.label[lang]}</span>
          <h2 className={`font-display font-extrabold text-[clamp(26px,3.5vw,44px)] tracking-tight mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t.title[lang]}</h2>
          <p className={`font-body text-sm max-w-md mx-auto mt-3 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.sub[lang]}</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => <Card key={i} t={t} i={i} darkMode={darkMode} />)}
        </div>
        <div className="mt-14 grid grid-cols-3 gap-4">
          {nums.map((s, i) => (
            <div key={i} className={`rounded-2xl border ${darkMode ? 'bg-white/5 border-white/8' : 'glass border-transparent'}`}>
              <Num value={s.value} suffix={s.suffix} label={s.label} darkMode={darkMode} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
