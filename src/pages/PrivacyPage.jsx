import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { PRIVACY } from '../data/legal'

const SITE = 'https://beneficiodiario.com'

export default function PrivacyPage() {
  useEffect(() => {
    const prev = document.title
    document.title = `${PRIVACY.title} · BeneficioDiario`
    let c = document.head.querySelector('link[rel="canonical"]')
    const prevHref = c ? c.getAttribute('href') : null
    if (!c) { c = document.createElement('link'); c.setAttribute('rel', 'canonical'); document.head.appendChild(c) }
    c.setAttribute('href', `${SITE}/privacidad`)
    window.scrollTo(0, 0)
    return () => { document.title = prev; if (prevHref) c.setAttribute('href', prevHref) }
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 h-[64px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/logo-bd.png" alt="BeneficioDiario" className="w-8 h-8 object-contain" />
            <span className="font-display font-bold text-base bg-gradient-to-r from-gray-900 to-[#0077b6] bg-clip-text text-transparent">BeneficioDiario</span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-1.5 font-body text-[13px] font-medium text-gray-500 hover:text-[#00b4d8] transition-colors">
            <FiArrowLeft size={14} /> Inicio
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
        <h1 className="font-display font-extrabold text-[clamp(26px,4vw,38px)] tracking-tight mb-1">{PRIVACY.title}</h1>
        <p className="font-body text-xs text-gray-400 mb-8">{PRIVACY.updated}</p>

        <div className="space-y-7">
          {PRIVACY.sections.map((s, i) => (
            <section key={i}>
              <h2 className="font-display font-bold text-lg mb-2">{s.h}</h2>
              {s.p.map((para, j) => (
                <p key={j} className="font-body text-sm leading-relaxed text-gray-600 mb-2">{para}</p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100">
          <Link to="/" className="inline-flex items-center gap-2 font-display font-semibold text-sm text-[#00b4d8]">
            <FiArrowLeft size={15} /> Volver a BeneficioDiario
          </Link>
        </div>
      </main>
    </div>
  )
}
