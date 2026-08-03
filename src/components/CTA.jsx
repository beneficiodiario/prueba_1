import { motion } from 'motion/react'
import { Section } from './ui/Section'
import { Button } from './ui/Button'
import { SiYoutube } from './ui/icons'
import { YOUTUBE_URL } from '../data/content'
import { fadeUp, scaleIn, stagger, viewport, revealInitial } from '../lib/motion'

const T = {
  title: { es: 'Únete a la comunidad', en: 'Join the community' },
  sub: {
    es: 'Compartimos proyectos rentables, análisis de mercado y oportunidades cada semana. Sin promesas mágicas: solo información honesta.',
    en: 'We share profitable projects, market analysis and opportunities every week. No magic promises — just honest information.',
  },
  youtube: { es: 'Suscribirse en YouTube', en: 'Subscribe on YouTube' },
}

export default function CTA({ lang }) {
  return (
    <Section id="cta" tone="base" width="prose" className="overflow-hidden">
      <motion.div
        variants={scaleIn}
        initial={revealInitial}
        whileInView="visible"
        viewport={viewport}
        className="relative rounded-[2rem] border border-line bg-surface shadow-e4 overflow-hidden px-6 py-14 sm:p-16 md:p-20 text-center"
      >
        {/* Fondo del panel: retícula tenue + halo de marca */}
        <div aria-hidden="true" className="absolute inset-0 grid-bg mask-b opacity-70" />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(80% 60% at 50% 0%, rgb(var(--brand-500) / 0.12), transparent 65%)' }}
        />

        <motion.div
          variants={stagger(0.08)}
          initial={revealInitial}
          whileInView="visible"
          viewport={viewport}
          className="relative z-raised"
        >
          <motion.img
            variants={fadeUp}
            src="/logo-bd.png"
            alt=""
            width="80" height="80"
            className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-7 object-contain animate-float"
          />

          <motion.h2 variants={fadeUp} className="font-display text-display-2 text-fg text-balance">
            {T.title[lang]}
            <br />
            <span className="text-gradient">BeneficioDiario</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="font-body text-lead text-fg-muted max-w-[42ch] mx-auto mt-5">
            {T.sub[lang]}
          </motion.p>

          <motion.div variants={fadeUp} className="flex justify-center mt-9">
            <Button href={YOUTUBE_URL} variant="youtube" size="lg">
              <SiYoutube size={18} aria-hidden="true" />
              {T.youtube[lang]}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </Section>
  )
}
