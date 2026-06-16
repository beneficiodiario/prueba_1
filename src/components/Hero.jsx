import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { TypeAnimation } from 'react-type-animation'
import { FiArrowDown } from 'react-icons/fi'
import { heroStats as stats } from '../data/content'

const YOUTUBE_URL = 'https://www.youtube.com/@beneficiodiario_com'

const blur = (d) => ({
  initial: { opacity: 0, y: 30, filter: 'blur(12px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1.1, ease: [.23, 1, .32, 1], delay: d },
})

function Stat({ s, lang, darkMode }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })
  return (
    <div ref={ref} className="px-5 sm:px-8 py-5 text-center">
      <div className={`font-display font-extrabold text-xl sm:text-2xl tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {s.prefix || ''}{inView ? <CountUp end={s.value} duration={2.5} separator="." /> : '0'}{s.suffix}
      </div>
      <div className={`font-body text-[10px] font-medium mt-1 uppercase tracking-[0.12em] ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>{s.label[lang]}</div>
    </div>
  )
}

function Particles({ count = 14, darkMode }) {
  const dots = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    dur: Math.random() * 15 + 12,
    delay: Math.random() * -20,
  })), [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {dots.map(d => (
        <motion.div
          key={d.id}
          className={`absolute rounded-full ${darkMode ? 'bg-[#00b4d8]' : 'bg-[#0077b6]'}`}
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, darkMode ? 0.3 : 0.15, 0], y: [0, -60, 0] }}
          transition={{ duration: d.dur, repeat: Infinity, delay: d.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export default function Hero({ lang, darkMode }) {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const h = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const t = {
    badge:    { es: 'PROYECTOS RENTABLES · 2026', en: 'PROFITABLE PROJECTS · 2026' },
    heading1: { es: 'Tu beneficio,', en: 'Your profit,' },
    seq:      { es: ['cada día', 3000, 'sin complicaciones', 2500, 'con cripto', 2500, 'con KAST', 3000, 'con VOID', 2500], en: ['every day', 3000, 'without complications', 2500, 'with crypto', 2500, 'with KAST', 3000, 'with VOID', 2500] },
    sub:      { es: 'Descubrimos, analizamos y compartimos proyectos rentables para que generes ingresos de forma inteligente. Desde KAST Card hasta DAC, pasando por VOID Network y GRVT.', en: 'We discover, analyze and share profitable projects so you can generate income intelligently. From KAST Card to DAC, through VOID Network and GRVT.' },
    cta1:     { es: 'Explorar Proyectos ↓', en: 'Explore Projects ↓' },
    cta2:     { es: 'YouTube', en: 'YouTube' },
  }

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-5">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg z-0" style={{ maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 25%, transparent 70%)' }} />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-32 -left-48 w-[600px] h-[600px] rounded-full z-0 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,180,216,0.08) 0%, transparent 70%)' }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-40 right-[-10%] w-[450px] h-[450px] rounded-full z-0 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,119,182,0.06) 0%, transparent 70%)' }}
        animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 left-[20%] w-[350px] h-[350px] rounded-full z-0 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,180,216,0.05) 0%, transparent 70%)' }}
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating particles */}
      <Particles count={25} darkMode={darkMode} />

      <div className="relative z-10 text-center max-w-[850px]" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
        {/* Logo with ring pulse */}
        <motion.div
          initial={{ opacity: 0, scale: 0.3, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [.23, 1, .32, 1] }}
          className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-6"
        >
          {/* Expanding rings */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#00b4d8]/30"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 2, delay: 0.8, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-[#00b4d8]/20"
            initial={{ scale: 1, opacity: 0.4 }}
            animate={{ scale: 2.8, opacity: 0 }}
            transition={{ duration: 2.5, delay: 1, ease: 'easeOut' }}
          />
          {/* Glow behind logo */}
          <motion.div
            className="absolute inset-[-30%] rounded-full bg-[#00b4d8]/10 blur-2xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.6, 0.2], scale: [0, 1.5, 1] }}
            transition={{ duration: 2, delay: 0.3, ease: 'easeOut' }}
          />
          <img src="/logo-bd.png" alt="BeneficioDiario" className="relative w-full h-full object-contain" />
        </motion.div>

        {/* Badge */}
        <motion.div {...blur(0.4)}>
          <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-body text-[11px] font-semibold tracking-wider ${darkMode ? 'bg-[#00b4d8]/15 border border-[#00b4d8]/25 text-[#00b4d8]' : 'bg-[#00b4d8]/8 border border-[#00b4d8]/15 text-[#0077b6]'}`}>
            <span className="w-2 h-2 rounded-full bg-[#00b4d8] pulse-dot" />
            {t.badge[lang]}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1 {...blur(0.6)} className={`font-display font-extrabold text-[clamp(34px,6vw,76px)] leading-[1.04] tracking-[-0.035em] mt-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {t.heading1[lang]}{' '}
          <span className="gradient-text">
            <TypeAnimation key={lang} sequence={t.seq[lang]} repeat={Infinity} speed={40} deletionSpeed={60} />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p {...blur(0.85)} className={`font-body text-[clamp(14px,1.8vw,18px)] leading-relaxed max-w-[560px] mx-auto mt-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {t.sub[lang]}
        </motion.p>

        {/* CTA buttons */}
        <motion.div {...blur(1.1)} className="flex gap-3 justify-center mt-9 flex-wrap">
          <a href="#proyectos" className="bg-gradient-to-br from-[#00b4d8] to-[#0077b6] text-white rounded-[14px] px-7 sm:px-9 py-3.5 font-display font-bold text-sm shadow-lg shadow-[#00b4d8]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
            {t.cta1[lang]}
          </a>
          <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
            className={`rounded-[14px] px-7 sm:px-9 py-3.5 font-display font-semibold text-sm hover:-translate-y-0.5 transition-all flex items-center gap-2 ${darkMode ? 'bg-white/10 text-white border border-white/10' : 'glass text-gray-700'}`}>
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-red-500"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            {t.cta2[lang]}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, ease: [.23, 1, .32, 1], delay: 1.4 }}
          className="mt-14 flex justify-center"
        >
          <div className={`rounded-2xl shadow-lg overflow-hidden flex flex-wrap justify-center divide-x ${darkMode ? 'bg-white/5 border border-white/10 divide-white/10' : 'glass shadow-black/[0.03] divide-[#00b4d8]/8'}`}>
            {stats.map((s, i) => <Stat key={i} s={s} lang={lang} darkMode={darkMode} />)}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-10 flex justify-center"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <FiArrowDown className={`${darkMode ? 'text-gray-600' : 'text-gray-300'}`} size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
