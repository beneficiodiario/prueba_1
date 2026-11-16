import { motion } from 'motion/react'
import { Section, SectionHeader } from './ui/Section'
import { Card } from './ui/Card'
import { fadeUp, viewport, revealInitial } from '../lib/motion'

const T = {
  eyebrow: { es: 'Quiénes somos', en: 'Who we are' },
  title:   { es: 'Detrás de BeneficioDiario', en: 'Behind BeneficioDiario' },
  intro: {
    es: 'Somos dos amigos con muchas ganas de aprender y de emprender.',
    en: 'We are two friends with a real drive to learn and to build.',
  },
  body: {
    es: 'Compartimos lo que descubrimos, probamos y usamos. Sin humo y sin promesas de dinero fácil: solo lo que nos parece que vale la pena.',
    en: 'We share what we discover, test and use. No hype and no easy-money promises — only what we think is worth it.',
  },
}

export default function WhoWeAre({ lang }) {
  return (
    <Section id="quienes-somos" tone="base" width="prose" compact>
      <SectionHeader
        eyebrow={T.eyebrow[lang]}
        title={T.title[lang]}
        size="display-3"
      />

      <motion.div
        variants={fadeUp}
        initial={revealInitial}
        whileInView="visible"
        viewport={viewport}
        className="mx-auto max-w-[44ch]"
      >
        <Card className="p-7 sm:p-9 text-center">
          <p className="font-display text-display-3 text-balance text-fg">{T.intro[lang]}</p>
          <p className="font-body text-sm leading-relaxed text-fg-muted mt-5">{T.body[lang]}</p>
        </Card>
      </motion.div>
    </Section>
  )
}
