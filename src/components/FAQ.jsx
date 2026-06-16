import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiChevronDown } from 'react-icons/fi'
import { faqs } from '../data/seo'

function FaqItem({ faq, i, lang, darkMode, isOpen, onToggle }) {
  const [ref, vis] = useInView({ triggerOnce: true, threshold: 0.15 })
  const cardBg  = darkMode ? 'bg-white/5 border-white/10' : 'glass border-gray-100'
  const titleC  = darkMode ? 'text-white' : 'text-gray-900'
  const paraC   = darkMode ? 'text-gray-400' : 'text-gray-500'

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }} animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.06, ease: [.23, 1, .32, 1] }}
      className={`rounded-2xl border overflow-hidden transition-all duration-500 ${cardBg} ${isOpen ? 'border-[#00b4d8]/30 shadow-lg shadow-[#00b4d8]/5' : 'hover:border-[#00b4d8]/20'}`}>
      <button onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-5 transition-colors">
        <span className={`font-display font-bold text-base sm:text-lg ${titleC}`}>{faq.q[lang]}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [.23, 1, .32, 1] }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-[#00b4d8]/15 text-[#00b4d8]' : darkMode ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
          <FiChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [.23, 1, .32, 1] }}
            className="overflow-hidden">
            <p className={`font-body text-sm leading-relaxed px-5 sm:px-6 pb-5 ${paraC}`}>
              {faq.a[lang]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ({ darkMode, lang }) {
  const [open, setOpen] = useState(0)
  const [ref, vis] = useInView({ triggerOnce: true, threshold: 0.1 })
  const t = {
    label: { es: 'FAQ', en: 'FAQ' },
    title: { es: 'Preguntas frecuentes', en: 'Frequently asked questions' },
    sub:   { es: 'Todo lo que necesitas saber antes de empezar.', en: 'Everything you need to know before you start.' },
  }

  return (
    <section id="faq" className={`py-24 px-5 sm:px-8 relative transition-colors duration-500 ${darkMode ? 'bg-[#0a0f1e]' : 'bg-gradient-to-b from-gray-50/50 to-white'}`}>
      <div className="max-w-3xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 35 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-14">
          <span className="font-body text-[11px] font-bold text-[#00b4d8] tracking-[0.12em] uppercase">{t.label[lang]}</span>
          <h2 className={`font-display font-extrabold text-[clamp(26px,3.5vw,44px)] tracking-tight mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t.title[lang]}</h2>
          <p className={`font-body text-base max-w-lg mx-auto mt-3 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.sub[lang]}</p>
        </motion.div>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              faq={faq}
              i={i}
              lang={lang}
              darkMode={darkMode}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
