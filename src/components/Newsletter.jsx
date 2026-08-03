import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Section } from './ui/Section'
import { Button } from './ui/Button'
import { FiMail, FiCheck } from './ui/icons'
import { BEEHIIV_FORM_ID } from '../config'
import { fadeUp, stagger, viewport, duration, ease, revealInitial } from '../lib/motion'

const T = {
  eyebrow: { es: 'Newsletter', en: 'Newsletter' },
  title:   { es: 'Recibe los mejores airdrops en tu correo', en: 'Get the best airdrops in your inbox' },
  sub: {
    es: 'Cada semana te enviamos los proyectos y oportunidades que seguimos. Sin spam, cancela cuando quieras.',
    en: 'Every week we send you the projects and opportunities we follow. No spam, unsubscribe anytime.',
  },
  label:   { es: 'Tu correo electrónico', en: 'Your email address' },
  ph:      { es: 'tu@email.com', en: 'you@email.com' },
  btn:     { es: 'Suscribirme', en: 'Subscribe' },
  done:    { es: 'Casi listo: hemos abierto Beehiiv para que confirmes tu suscripción.', en: 'Almost there — we opened Beehiiv so you can confirm your subscription.' },
  invalid: { es: 'Escribe un correo válido, por ejemplo nombre@dominio.com.', en: 'Enter a valid email, for example name@domain.com.' },
}

const formUrl = (formId, email) =>
  `https://subscribe-forms.beehiiv.com/v3/forms/${formId}?email=${encodeURIComponent(email)}`

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())

export default function Newsletter({ lang }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    // Se valida al enviar, no en cada tecla: molesta menos mientras escribes.
    if (!isValidEmail(email)) {
      setError(T.invalid[lang])
      return
    }
    setError('')
    window.open(formUrl(BEEHIIV_FORM_ID, email.trim()), '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  return (
    <Section id="newsletter" tone="base" width="prose" compact>
      <motion.div
        variants={stagger(0.07)}
        initial={revealInitial}
        whileInView="visible"
        viewport={viewport}
        className="relative max-w-narrow mx-auto text-center rounded-[1.75rem] border border-brand-500/20 bg-gradient-to-b from-brand-500/[0.06] to-transparent p-8 sm:p-10 overflow-hidden"
      >
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-500/12 text-brand-fg mb-5"
        >
          <FiMail size={22} aria-hidden="true" />
        </motion.span>

        <motion.span variants={fadeUp} className="block font-body text-eyebrow uppercase text-brand-fg">
          {T.eyebrow[lang]}
        </motion.span>

        <motion.h2 variants={fadeUp} className="font-display text-display-3 text-fg mt-3 text-balance">
          {T.title[lang]}
        </motion.h2>

        <motion.p variants={fadeUp} className="font-body text-sm leading-relaxed text-fg-muted mt-4 mb-8 max-w-[46ch] mx-auto">
          {T.sub[lang]}
        </motion.p>

        <motion.div variants={fadeUp}>
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.p
                key="done"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: duration.slow, ease: ease.out }}
                role="status"
                className="flex items-center justify-center gap-2 max-w-md mx-auto rounded-xl bg-success/10 border border-success/25 px-4 py-3.5 font-body text-sm text-fg"
              >
                <FiCheck className="text-success-fg shrink-0" size={18} aria-hidden="true" />
                {T.done[lang]}
              </motion.p>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                className="max-w-md mx-auto"
              >
                <label htmlFor="newsletter-email" className="sr-only">{T.label[lang]}</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (error) setError('') }}
                    placeholder={T.ph[lang]}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? 'newsletter-error' : undefined}
                    className={`flex-1 min-h-[48px] rounded-xl px-4 font-body text-sm bg-surface text-fg placeholder:text-fg-subtle border outline-none transition-colors duration-base ${
                      error ? 'border-danger' : 'border-line focus:border-brand-500'
                    }`}
                  />
                  <Button type="submit" size="md" className="sm:min-w-[9rem]">
                    {T.btn[lang]}
                  </Button>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      key="error"
                      id="newsletter-error"
                      role="alert"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: duration.base, ease: ease.out }}
                      className="font-body text-xs text-danger-fg text-left pt-2"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </Section>
  )
}
