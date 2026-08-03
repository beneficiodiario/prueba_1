import { motion } from 'motion/react'
import { Section, SectionHeader } from './ui/Section'
import { Card } from './ui/Card'
import { fadeUp, stagger, viewport, revealInitial } from '../lib/motion'

const T = {
  eyebrow: { es: 'Quiénes somos', en: 'Who we are' },
  title:   { es: 'Detrás de BeneficioDiario', en: 'Behind BeneficioDiario' },
  sub: {
    es: 'Compartimos lo que descubrimos, probamos y usamos. Sin humo y sin promesas de dinero fácil: solo lo que nos parece que vale la pena.',
    en: 'We share what we discover, test and use. No hype and no easy-money promises — only what we think is worth it.',
  },
}

const TEAM = [
  {
    name: 'Sergio Olmo',
    role: { es: 'Cofundador', en: 'Co-founder' },
    bio:  { es: 'Proveedor oficial de servicios HBAR en WhataLab.', en: 'Official HBAR services provider at WhataLab.' },
    photo: '/sergio.png',
  },
  {
    name: 'Javier Rodríguez',
    role: { es: 'Cofundador', en: 'Co-founder' },
    bio:  { es: 'Administrador de la comunidad española de Abstract.', en: 'Admin of the Spanish Abstract community.' },
    photo: '/javier.png',
  },
]

const initialsOf = (name) =>
  name.split(' ').map((s) => s[0]).join('').slice(0, 2).toUpperCase()

function Member({ m, lang }) {
  return (
    <motion.figure variants={fadeUp}>
      <Card interactive className="group h-full p-7 sm:p-8 flex flex-col items-center text-center">
        <div
          onContextMenu={(e) => e.preventDefault()}
          className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden mb-6 bg-gradient-to-br from-brand-500 to-brand-700 ring-4 ring-surface shadow-glow transition-transform duration-slow ease-out-expo group-hover:scale-[1.04]"
        >
          {/* Iniciales de reserva: quedan detrás y solo se ven si la foto falla */}
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center font-display font-extrabold text-white text-4xl tracking-tight"
          >
            {initialsOf(m.name)}
          </span>
          <img
            src={m.photo}
            alt={m.name}
            width="144" height="144"
            loading="lazy"
            draggable={false}
            className="relative w-full h-full object-cover select-none pointer-events-none"
            style={{ objectPosition: '50% 25%' }}
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </div>

        <figcaption className="flex flex-col items-center">
          <span className="font-display font-extrabold text-xl text-fg">{m.name}</span>
          <span className="font-body text-eyebrow uppercase text-brand-fg mt-1.5">{m.role[lang]}</span>
          <p className="font-body text-sm leading-relaxed text-fg-muted mt-3 max-w-[28ch]">{m.bio[lang]}</p>
        </figcaption>
      </Card>
    </motion.figure>
  )
}

export default function WhoWeAre({ lang }) {
  return (
    <Section id="quienes-somos" tone="base" width="prose" compact>
      <SectionHeader
        eyebrow={T.eyebrow[lang]}
        title={T.title[lang]}
        subtitle={T.sub[lang]}
        size="display-3"
      />

      <motion.div
        variants={stagger(0.1)}
        initial={revealInitial}
        whileInView="visible"
        viewport={viewport}
        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
      >
        {TEAM.map((m) => <Member key={m.name} m={m} lang={lang} />)}
      </motion.div>
    </Section>
  )
}
