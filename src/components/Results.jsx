import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import CountUp from 'react-countup'
import { Section, SectionHeader } from './ui/Section'
import { Card } from './ui/Card'
import { FiStar } from './ui/icons'
import { fadeUp, scaleIn, stagger, viewport, revealInitial } from '../lib/motion'

const TESTIMONIALS = {
  es: [
    { name: 'Carlos M.', role: 'Administrador de empresas', avatar: 'CM', text: 'Llevo 8 meses siguiendo los proyectos de BeneficioDiario y la selección es excelente. La transparencia es lo que más valoro: siempre explican el riesgo real, no solo los beneficios.' },
    { name: 'Laura G.', role: 'Usuaria de KAST', avatar: 'LG', text: 'Empecé con KAST sin saber nada de cripto. La explicación fue tan clara que en una tarde ya tenía todo configurado. Llevo meses acumulando puntos sin hacer nada especial.' },
    { name: 'Miguel Á.', role: 'Usuario de KAST', avatar: 'MA', text: 'Con KAST llevo más de 300 € en cashback acumulados solo gastando en el día a día. Es de esas cosas que no cuestan nada y dan más de lo que esperas.' },
  ],
  en: [
    { name: 'Carlos M.', role: 'Business manager', avatar: 'CM', text: "I've been following BeneficioDiario projects for 8 months and the selection is excellent. Transparency is what I value most: they always explain the real risk, not just the benefits." },
    { name: 'Laura G.', role: 'KAST user', avatar: 'LG', text: "I started with KAST knowing nothing about crypto. The explanation was so clear that in one afternoon I had everything set up. I've been accumulating points for months without doing anything special." },
    { name: 'Miguel Á.', role: 'KAST user', avatar: 'MA', text: "With KAST I've accumulated over €300 in cashback just by spending normally. It's one of those things that costs nothing and gives more than you expect." },
  ],
}

const T = {
  eyebrow: { es: 'Comunidad', en: 'Community' },
  title:   { es: 'Lo que dicen nuestros seguidores', en: 'What our followers say' },
  sub: {
    es: 'Personas reales compartiendo su experiencia con los proyectos de BeneficioDiario.',
    en: 'Real people sharing their experience with BeneficioDiario projects.',
  },
  rating:  { es: '5 de 5 estrellas', en: '5 out of 5 stars' },
  stats: {
    es: [
      { value: 96, suffix: '%',  label: 'Satisfacción' },
      { value: 6,  suffix: '',   label: 'Proyectos activos' },
      { value: 24, suffix: '/7', label: 'Contenido y soporte' },
    ],
    en: [
      { value: 96, suffix: '%',  label: 'Satisfaction' },
      { value: 6,  suffix: '',   label: 'Active projects' },
      { value: 24, suffix: '/7', label: 'Content & support' },
    ],
  },
}

function Stars({ label }) {
  return (
    <div className="flex gap-0.5 mb-4 text-warning-fg" role="img" aria-label={label}>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          initial={revealInitial ? { opacity: 0, scale: 0.4 } : false}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewport}
          transition={{ delay: 0.15 + i * 0.05, duration: 0.3 }}
        >
          <FiStar size={14} fill="currentColor" aria-hidden="true" />
        </motion.span>
      ))}
    </div>
  )
}

function Testimonial({ t, lang }) {
  return (
    <motion.figure variants={fadeUp} className="h-full">
      <Card interactive tone="glass" className="h-full p-7 flex flex-col">
        <Stars label={T.rating[lang]} />
        <blockquote className="font-body text-sm leading-relaxed text-fg-muted mb-6 flex-1">
          {t.text}
        </blockquote>
        <figcaption className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-display font-bold text-xs shrink-0"
          >
            {t.avatar}
          </span>
          <span>
            <span className="block font-display font-bold text-sm text-fg">{t.name}</span>
            <span className="block font-body text-xs text-fg-subtle">{t.role}</span>
          </span>
        </figcaption>
      </Card>
    </motion.figure>
  )
}

function BigNumber({ stat }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <motion.div variants={scaleIn}>
      <Card tone="glass" className="py-7 sm:py-9 text-center">
        <div ref={ref} className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-fg tabular">
          {inView ? <CountUp end={stat.value} duration={2} separator="." /> : '0'}
          {stat.suffix}
        </div>
        <div className="font-body text-xs font-medium text-fg-subtle mt-1.5">{stat.label}</div>
      </Card>
    </motion.div>
  )
}

export default function Results({ lang }) {
  const testimonials = TESTIMONIALS[lang] || TESTIMONIALS.es
  const numbers = T.stats[lang] || T.stats.es

  return (
    <Section id="resultados" tone="subtle" className="overflow-hidden">
      <SectionHeader
        eyebrow={T.eyebrow[lang]}
        title={T.title[lang]}
        subtitle={T.sub[lang]}
      />

      <motion.div
        variants={stagger(0.09)}
        initial={revealInitial}
        whileInView="visible"
        viewport={viewport}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {testimonials.map((t, i) => <Testimonial key={i} t={t} lang={lang} />)}
      </motion.div>

      <motion.div
        variants={stagger(0.08, 0.1)}
        initial={revealInitial}
        whileInView="visible"
        viewport={viewport}
        className="mt-14 grid grid-cols-3 gap-3 sm:gap-4"
      >
        {numbers.map((s, i) => <BigNumber key={i} stat={s} />)}
      </motion.div>
    </Section>
  )
}
