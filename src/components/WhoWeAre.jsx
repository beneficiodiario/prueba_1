import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const T = {
  label: { es: 'QUIÉNES SOMOS',                 en: 'WHO WE ARE' },
  title: { es: 'Detrás de BeneficioDiario',      en: 'Behind BeneficioDiario' },
  sub:   { es: 'Compartimos lo que descubrimos, probamos y usamos. Sin humo y sin promesas de dinero fácil — solo lo que nos parece que vale la pena.',
            en: 'We share what we discover, test and use. No hype and no easy-money promises — only what we think is worth it.' },
}

const team = [
  {
    name: 'Sergio Olmo',
    role: { es: 'Cofundador', en: 'Co-founder' },
    bio:  { es: 'Proveedor oficial de servicios HBAR en WhatALab.', en: 'Official Services Provider HBAR at WhatALab.' },
    photo: '/sergio.png',
  },
  {
    name: 'Javier Rodríguez',
    role: { es: 'Cofundador',          en: 'Co-founder' },
    bio:  { es: 'Administrador de la comunidad española de Abstract.',
            en: 'Admin of the Spanish community of Abstract.' },
    photo: '/javier.png',
  },
]

const initialsOf = (name) => name.split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase()

function Member({ m, darkMode, lang, i }) {
  const [ref, vis] = useInView({ triggerOnce: true, threshold: 0.2 })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.1 }}
      className={`flex flex-col items-center text-center rounded-3xl border p-6 sm:p-8 ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100 shadow-lg shadow-black/[0.03]'}`}>
      <div onContextMenu={e => e.preventDefault()}
        className={`relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden bg-gradient-to-br from-[#00b4d8] to-[#0077b6] mb-5 shadow-xl shadow-[#00b4d8]/30 ${darkMode ? 'ring-2 ring-white/10' : 'ring-4 ring-white'}`}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-display font-extrabold text-white text-4xl tracking-tight">{initialsOf(m.name)}</span>
        </div>
        <img src={m.photo} alt={m.name} loading="lazy" draggable={false}
          className="relative w-full h-full object-cover select-none"
          style={{ objectPosition: '50% 25%', pointerEvents: 'none', WebkitUserDrag: 'none' }}
          onError={e => { e.target.style.display = 'none' }} />
      </div>
      <h3 className={`font-display font-extrabold text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>{m.name}</h3>
      <span className="font-body text-[11px] font-bold text-[#00b4d8] tracking-[0.12em] uppercase mt-1">{m.role[lang]}</span>
      <p className={`font-body text-sm leading-relaxed mt-3 max-w-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{m.bio[lang]}</p>
    </motion.div>
  )
}

export default function WhoWeAre({ darkMode = false, lang = 'es' }) {
  const [ref, vis] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <section id="quienes-somos" className={`py-20 px-5 sm:px-8 transition-colors duration-500 ${darkMode ? 'bg-[#0a0f1e]' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-12">
          <span className="font-body text-[11px] font-bold text-[#00b4d8] tracking-[0.12em] uppercase">{T.label[lang]}</span>
          <h2 className={`font-display font-extrabold text-[clamp(24px,3vw,36px)] tracking-tight mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{T.title[lang]}</h2>
          <p className={`font-body text-sm max-w-xl mx-auto mt-3 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{T.sub[lang]}</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {team.map((m, i) => <Member key={m.name} m={m} i={i} darkMode={darkMode} lang={lang} />)}
        </div>
      </div>
    </section>
  )
}
