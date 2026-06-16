import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiMail, FiCheck } from 'react-icons/fi'
import { BEEHIIV_FORM_ID } from '../config'

const T = {
  label: { es: 'NEWSLETTER', en: 'NEWSLETTER' },
  title: { es: 'Recibe los mejores airdrops en tu correo', en: 'Get the best airdrops in your inbox' },
  sub:   { es: 'Cada semana te enviamos los proyectos y oportunidades que seguimos. Sin spam, cancela cuando quieras.', en: 'Every week we send you the projects and opportunities we follow. No spam, unsubscribe anytime.' },
  ph:    { es: 'tu@email.com', en: 'you@email.com' },
  btn:   { es: 'Suscribirme', en: 'Subscribe' },
  done:  { es: '¡Casi! Hemos abierto Beehiiv para que confirmes tu suscripción.', en: 'Almost there! We opened Beehiiv so you can confirm your subscription.' },
}

const formUrl = (formId, email) =>
  `https://subscribe-forms.beehiiv.com/v3/forms/${formId}?email=${encodeURIComponent(email)}`

export default function Newsletter({ darkMode = false, lang = 'es' }) {
  const [ref, vis] = useInView({ triggerOnce: true, threshold: 0.2 })
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    if (!email.includes('@')) return
    window.open(formUrl(BEEHIIV_FORM_ID, email), '_blank', 'noopener')
    setSent(true)
  }

  const inputC = darkMode
    ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'

  return (
    <section id="newsletter" className={`py-20 px-5 sm:px-8 transition-colors duration-500 ${darkMode ? 'bg-[#0a0f1e]' : 'bg-white'}`}>
      <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
        className={`max-w-2xl mx-auto text-center rounded-3xl border p-8 sm:p-10 ${darkMode ? 'bg-white/5 border-white/10' : 'bg-gradient-to-b from-[#00b4d8]/[0.04] to-transparent border-[#00b4d8]/15'}`}>
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#00b4d8]/10 text-[#00b4d8] mb-4">
          <FiMail size={22} />
        </div>
        <span className="block font-body text-[11px] font-bold text-[#00b4d8] tracking-[0.12em] uppercase">{T.label[lang]}</span>
        <h2 className={`font-display font-extrabold text-[clamp(22px,3vw,34px)] tracking-tight mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{T.title[lang]}</h2>
        <p className={`font-body text-sm mt-3 mb-7 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{T.sub[lang]}</p>

        {sent ? (
          <div className={`flex items-center justify-center gap-2 max-w-md mx-auto rounded-xl px-4 py-3.5 font-body text-sm ${darkMode ? 'bg-[#00b4d8]/10 text-gray-200' : 'bg-[#00b4d8]/8 text-gray-700'}`}>
            <FiCheck className="text-[#00b4d8] shrink-0" size={18} /> {T.done[lang]}
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder={T.ph[lang]}
              className={`flex-1 rounded-xl px-4 py-3 font-body text-sm border outline-none focus:border-[#00b4d8] transition-colors ${inputC}`} />
            <button type="submit"
              className="rounded-xl px-6 py-3 font-display font-bold text-sm text-white bg-gradient-to-br from-[#00b4d8] to-[#0077b6] shadow-lg shadow-[#00b4d8]/20 hover:-translate-y-0.5 transition-all">
              {T.btn[lang]}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  )
}
