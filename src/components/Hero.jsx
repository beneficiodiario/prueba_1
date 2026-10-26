import { useMemo, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, useInView } from 'motion/react'
import CountUp from 'react-countup'
import { TypeAnimation } from 'react-type-animation'
import { Button } from './ui/Button'
import { Badge } from './ui/Card'
import { SplitText, Magnetic, Tilt3D } from './ui/motion3d'
import { SiYoutube, FiArrowDown } from './ui/icons'
import { heroStats as stats, YOUTUBE_URL } from '../data/content'
import { blurUp, stagger, ease, duration, revealInitial } from '../lib/motion'

const T = {
  badge:  { es: 'Proyectos analizados · 2026', en: 'Analyzed projects · 2026' },
  lead:   { es: 'Beneficio Diario', en: 'Beneficio Diario' },
  seq:    {
    es: ['cada día', 3000, 'sin complicaciones', 2500, 'con cripto', 2500, 'con KAST', 3000, 'con VOID', 2500],
    en: ['every day', 3000, 'without the noise', 2500, 'with crypto', 2500, 'with KAST', 3000, 'with VOID', 2500],
  },
  sub: {
    es: 'Tu portal gratuito sobre criptomonedas, ingresos pasivos, airdrops y cashback. Información, riesgos y enlaces a sitios de terceros. Sin login, sin registro y sin ganancias garantizadas.',
    en: 'Your free portal about crypto, passive income, airdrops and cashback. Information, risks and links to third-party sites. No login, no registration and no guaranteed returns.',
  },
  cta1:   { es: 'Explorar proyectos', en: 'Explore projects' },
  cta2:   { es: 'Ver en YouTube', en: 'Watch on YouTube' },
  scroll: { es: 'Desplázate para ver más', en: 'Scroll for more' },
}

/** Una cifra del panel de estadísticas. Cuenta al entrar en pantalla. */
function Stat({ stat, lang }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })

  return (
    <div ref={ref} className="px-5 sm:px-7 py-4 text-center">
      <div className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-fg tabular">
        {stat.prefix || ''}
        {inView ? <CountUp end={stat.value} duration={2} separator="." /> : '0'}
        {stat.suffix}
      </div>
      <div className="font-body text-[10px] font-semibold mt-1 uppercase tracking-[0.12em] text-fg-subtle">
        {stat.label[lang]}
      </div>
    </div>
  )
}

/**
 * Partículas de fondo. Se generan una vez y se mueven con transform,
 * así el navegador no recalcula el diseño en cada fotograma.
 */
function Particles({ count = 18 }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: (i * 37.5) % 100,
        y: (i * 61.8) % 100,
        size: 1 + ((i * 7) % 3),
        dur: 14 + ((i * 5) % 12),
        delay: -((i * 3.3) % 20),
      })),
    [count],
  )

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-brand-500"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.28, 0], y: [0, -70, 0] }}
          transition={{ duration: d.dur, repeat: Infinity, delay: d.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

/** Halos de color que respiran detrás del contenido. */
function Orbs() {
  const orbs = [
    { c: 'top-[-18%] left-[-15%] w-[38rem] h-[38rem]', a: { x: [0, 34, 0], y: [0, -22, 0], scale: [1, 1.09, 1] }, d: 16, o: 0.1 },
    { c: 'top-[22%] right-[-12%] w-[30rem] h-[30rem]', a: { x: [0, -26, 0], y: [0, 30, 0], scale: [1, 1.12, 1] }, d: 19, o: 0.075 },
    { c: 'bottom-[6%] left-[18%] w-[24rem] h-[24rem]', a: { x: [0, 40, 0], y: [0, -28, 0] }, d: 22, o: 0.06 },
  ]
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${o.c}`}
          style={{ background: `radial-gradient(circle, rgb(var(--brand-500) / ${o.o}) 0%, transparent 70%)` }}
          animate={o.a}
          transition={{ duration: o.d, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export default function Hero({ lang }) {
  const reduced = useReducedMotion()
  const sectionRef = useRef(null)

  // Paralaje ligado al scroll de la propia sección. useScroll evita el
  // listener manual de scroll que forzaba un re-render por fotograma.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 110])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, reduced ? 1 : 0.25])

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-[92svh] flex items-center justify-center overflow-hidden px-5 pt-28 pb-20"
    >
      <div aria-hidden="true" className="absolute inset-0 grid-bg mask-radial" />
      {!reduced && <Orbs />}
      {!reduced && <Particles />}

      <motion.div style={{ y, opacity }} className="relative z-raised text-center max-w-[54rem]">
        <motion.div variants={stagger(0.09, 0.1)} initial={revealInitial} animate="visible">
          {/* Logotipo con anillos que se expanden una sola vez al cargar */}
          <motion.div
            variants={{
              hidden:  { opacity: 0, scale: 0.6, filter: 'blur(14px)' },
              visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.85, ease: ease.out } },
            }}
            className="relative mx-auto w-[4.5rem] h-[4.5rem] sm:w-24 sm:h-24 mb-7"
          >
            {!reduced && [0, 1].map((i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-brand-500/30"
                initial={{ scale: 1, opacity: 0.55 }}
                animate={{ scale: 2.2 + i * 0.6, opacity: 0 }}
                transition={{ duration: 2 + i * 0.5, delay: 0.7 + i * 0.2, ease: 'easeOut' }}
              />
            ))}
            <span
              aria-hidden="true"
              className="absolute inset-[-28%] rounded-full bg-brand-500/12 blur-2xl"
            />
            <img
              src="/logo-bd.png"
              alt=""
              width="96" height="96"
              className="relative w-full h-full object-contain"
            />
          </motion.div>

          <motion.div variants={blurUp}>
            <Badge tone="brand" className="!text-[11px]">
              <span className="live-dot w-1.5 h-1.5 rounded-full bg-brand-500" aria-hidden="true" />
              {T.badge[lang]}
            </Badge>
          </motion.div>

          {/* El titular entra palabra a palabra girando sobre su eje X */}
          <motion.h1
            variants={blurUp}
            className="font-display text-display-1 text-fg mt-6 text-balance"
          >
            <SplitText text={T.lead[lang]} className="block" />{' '}
            <span className="text-gradient">
              <TypeAnimation
                key={lang}
                sequence={T.seq[lang]}
                repeat={Infinity}
                speed={40}
                deletionSpeed={60}
                cursor
                aria-hidden="true"
              />
            </span>
            {/* El texto que se teclea no es legible para un lector de pantalla */}
            <span className="sr-only">{lang === 'es' ? 'cada día' : 'every day'}</span>
          </motion.h1>

          <motion.p
            variants={blurUp}
            className="font-body text-lead text-fg-muted max-w-[38rem] mx-auto mt-6"
          >
            {T.sub[lang]}
          </motion.p>

          <motion.div variants={blurUp} className="flex gap-3 justify-center mt-10 flex-wrap">
            {/* El CTA principal se deja atraer por el cursor */}
            <Magnetic strength={10}>
              <Button href="#proyectos" size="lg">
                {T.cta1[lang]}
                <FiArrowDown size={16} aria-hidden="true" />
              </Button>
            </Magnetic>
            <Button href={YOUTUBE_URL} variant="secondary" size="lg">
              <SiYoutube size={17} className="text-[#ff0033]" aria-hidden="true" />
              {T.cta2[lang]}
            </Button>
          </motion.div>

          <motion.div variants={blurUp} className="mt-14 flex justify-center">
            <Tilt3D max={6} scale={1.01} className="rounded-card">
              <div className="glass rounded-card shadow-e3 overflow-hidden flex flex-wrap justify-center divide-x divide-line">
                {stats.map((s, i) => <Stat key={i} stat={s} lang={lang} />)}
              </div>
            </Tilt3D>
          </motion.div>
        </motion.div>

        <motion.a
          href="#novedades"
          aria-label={T.scroll[lang]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: duration.slow }}
          className="mt-12 inline-flex flex-col items-center gap-2 text-fg-subtle hover:text-brand-fg transition-colors duration-base"
        >
          <span className="font-body text-[10px] uppercase tracking-[0.16em]">{T.scroll[lang]}</span>
          <motion.span
            animate={reduced ? {} : { y: [0, 7, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FiArrowDown size={18} aria-hidden="true" />
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  )
}
