import { useId, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Section, SectionHeader } from './ui/Section'
import { FiChevronDown } from './ui/icons'
import { faqs } from '../data/seo'
import { fadeUp, stagger, viewport, duration, ease, revealInitial } from '../lib/motion'

const T = {
  eyebrow: { es: 'Preguntas frecuentes', en: 'FAQ' },
  title:   { es: 'Todo lo que sueles preguntarnos', en: 'Everything you usually ask us' },
  sub: {
    es: 'Lo que conviene saber antes de empezar con cualquiera de los proyectos.',
    en: 'What you should know before starting with any of the projects.',
  },
}

function FaqItem({ faq, lang, isOpen, onToggle }) {
  const id = useId()
  const panelId = `${id}-panel`
  const buttonId = `${id}-button`

  return (
    <motion.div
      variants={fadeUp}
      className={`rounded-card border overflow-hidden transition-[border-color,box-shadow,background-color] duration-slow ${
        isOpen
          ? 'border-brand-500/35 bg-surface shadow-e2'
          : 'border-line bg-surface/70 hover:border-brand-500/25'
      }`}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-5 min-h-[64px] cursor-pointer"
        >
          <span className="font-display font-bold text-base sm:text-[17px] text-fg text-balance">
            {faq.q[lang]}
          </span>
          <motion.span
            aria-hidden="true"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: duration.base, ease: ease.out }}
            className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-base ${
              isOpen ? 'bg-brand-500/15 text-brand-fg' : 'bg-surface-2 text-fg-subtle'
            }`}
          >
            <FiChevronDown size={18} />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: { height: { duration: duration.slow, ease: ease.out }, opacity: { duration: duration.base, delay: 0.08 } } }}
            exit={{ height: 0, opacity: 0, transition: { height: { duration: duration.base, ease: ease.in }, opacity: { duration: 0.12 } } }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm leading-relaxed text-fg-muted px-5 sm:px-6 pb-5">
              {faq.a[lang]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ({ lang }) {
  const [open, setOpen] = useState(0)

  return (
    <Section id="faq" tone="subtle" width="narrow">
      <SectionHeader
        eyebrow={T.eyebrow[lang]}
        title={T.title[lang]}
        subtitle={T.sub[lang]}
      />

      <motion.div
        variants={stagger(0.05)}
        initial={revealInitial}
        whileInView="visible"
        viewport={viewport}
        className="flex flex-col gap-3"
      >
        {faqs.map((faq, i) => (
          <FaqItem
            key={i}
            faq={faq}
            lang={lang}
            isOpen={open === i}
            onToggle={() => setOpen(open === i ? -1 : i)}
          />
        ))}
      </motion.div>
    </Section>
  )
}
