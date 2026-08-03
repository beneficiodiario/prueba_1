import { motion } from 'motion/react'
import { Section, SectionHeader } from './ui/Section'
import { Card } from './ui/Card'
import { Tilt3D } from './ui/motion3d'
import { FiSearch, FiBarChart2, FiZap, FiTrendingUp } from './ui/icons'
import { fadeUp, stagger, viewport, ease, revealInitial } from '../lib/motion'

// Los pasos usan iconos vectoriales, no emojis: se colorean con los
// tokens del tema y se ven igual en cualquier sistema operativo.
const STEPS = [
  {
    icon: FiSearch,
    title: { es: 'Descubre', en: 'Discover' },
    desc: {
      es: 'Analizamos el mercado y filtramos proyectos con utilidad real y potencial de rentabilidad. Solo publicamos lo que nosotros mismos usamos.',
      en: 'We analyze the market and filter projects with real utility and profitability potential. We only publish what we use ourselves.',
    },
  },
  {
    icon: FiBarChart2,
    title: { es: 'Analiza', en: 'Analyze' },
    desc: {
      es: 'Te damos toda la información: métricas, nivel de riesgo, tiempo necesario y contexto de mercado para que decidas con criterio.',
      en: 'We give you all the information: metrics, risk level, time required and market context so you can decide wisely.',
    },
  },
  {
    icon: FiZap,
    title: { es: 'Actúa', en: 'Act' },
    desc: {
      es: 'Con la guía clara, tú decides en qué participar. Cada proyecto tiene sus instrucciones paso a paso para empezar sin complicaciones.',
      en: 'With clear guidance, you decide what to join. Each project has step-by-step instructions to get started without complications.',
    },
  },
  {
    icon: FiTrendingUp,
    title: { es: 'Beneficio', en: 'Profit' },
    desc: {
      es: 'Los resultados llegan con constancia. Comparte tu experiencia con la comunidad y descubre nuevas oportunidades cada semana.',
      en: 'Results come with consistency. Share your experience with the community and discover new opportunities every week.',
    },
  },
]

const T = {
  eyebrow: { es: 'Proceso', en: 'Process' },
  title:   { es: 'Cómo funciona BeneficioDiario', en: 'How BeneficioDiario works' },
  sub: {
    es: 'Un proceso transparente para descubrir oportunidades de ingresos reales.',
    en: 'A transparent process to discover real income opportunities.',
  },
}

function Step({ step, index, lang }) {
  const Icon = step.icon
  return (
    <motion.div variants={fadeUp} className="relative h-full">
      <Tilt3D max={10} scale={1.03} className="h-full">
      <Card
        interactive
        shine
        className="group h-full p-7 bg-surface/80 backdrop-blur-sm"
      >
        {/* Número de paso, muy grande y muy tenue: da orden sin gritar */}
        <span
          aria-hidden="true"
          className="absolute top-2 right-4 font-display font-extrabold text-6xl leading-none select-none text-brand-500/[0.09] dark:text-brand-500/20 transition-colors duration-slow group-hover:text-brand-500/25"
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className="relative inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-fg mb-5 transition-transform duration-slow ease-out-expo group-hover:scale-110 group-hover:-rotate-6">
          <Icon size={22} aria-hidden="true" />
        </span>

        <h3 className="font-display text-title text-fg mb-2">{step.title[lang]}</h3>
        <p className="font-body text-sm leading-relaxed text-fg-muted">{step.desc[lang]}</p>
      </Card>
      </Tilt3D>
    </motion.div>
  )
}

export default function HowItWorks({ lang }) {
  return (
    <Section id="como-funciona" tone="subtle">
      <SectionHeader
        eyebrow={T.eyebrow[lang]}
        title={T.title[lang]}
        subtitle={T.sub[lang]}
      />

      <div className="relative">
        {/* Hilo que une los cuatro pasos: se dibuja al entrar en pantalla */}
        <motion.span
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewport}
          transition={{ duration: 1, ease: ease.out, delay: 0.2 }}
          className="hidden lg:block absolute top-[3.9rem] left-[12%] right-[12%] h-px origin-left bg-gradient-to-r from-transparent via-brand-500/35 to-transparent"
        />

        <motion.div
          variants={stagger(0.08)}
          initial={revealInitial}
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {STEPS.map((s, i) => <Step key={i} step={s} index={i} lang={lang} />)}
        </motion.div>
      </div>
    </Section>
  )
}
