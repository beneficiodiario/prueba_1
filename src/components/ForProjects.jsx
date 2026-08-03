import { motion } from 'motion/react'
import { Section, Eyebrow } from './ui/Section'
import { Button } from './ui/Button'
import { FiArrowUpRight } from './ui/icons'
import { fadeUp, stagger, viewport, revealInitial } from '../lib/motion'

const EMAIL = 'contacto@beneficiodiario.com'

const T = {
  eyebrow: { es: 'Para proyectos', en: 'For projects' },
  title:   { es: '¿Eres un proyecto? Anúnciate aquí', en: 'Are you a project? Advertise here' },
  sub: {
    es: 'Llega a una audiencia interesada en cripto, airdrops y trading. Ofrecemos reseñas, posts patrocinados y espacios destacados en la web.',
    en: 'Reach an audience interested in crypto, airdrops and trading. We offer reviews, sponsored posts and featured spots on the site.',
  },
  btn:     { es: 'Escríbenos', en: 'Contact us' },
  subject: { es: 'Quiero anunciarme en BeneficioDiario', en: 'I want to advertise on BeneficioDiario' },
}

export default function ForProjects({ lang }) {
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(T.subject[lang])}`

  return (
    <Section id="anunciate" tone="subtle" width="prose" compact>
      <motion.div
        variants={stagger(0.07)}
        initial={revealInitial}
        whileInView="visible"
        viewport={viewport}
        className="text-center"
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>{T.eyebrow[lang]}</Eyebrow>
        </motion.div>

        <motion.h2 variants={fadeUp} className="font-display text-display-3 text-fg mt-3 text-balance">
          {T.title[lang]}
        </motion.h2>

        <motion.p variants={fadeUp} className="font-body text-sm leading-relaxed text-fg-muted mt-4 mb-8 max-w-[54ch] mx-auto">
          {T.sub[lang]}
        </motion.p>

        <motion.div variants={fadeUp}>
          <Button href={mailto} size="lg">
            {T.btn[lang]}
            <FiArrowUpRight size={16} aria-hidden="true" />
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  )
}
