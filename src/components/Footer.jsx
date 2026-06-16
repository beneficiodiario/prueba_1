const YOUTUBE_URL = 'https://www.youtube.com/@beneficiodiario_com'
const TWITTER_URL = 'https://twitter.com/BeneficioDiario'

export default function Footer({ darkMode, lang }) {
  const t = {
    projects: { es: 'Proyectos', en: 'Projects' },
    content:  { es: 'Contenido', en: 'Content' },
    community:{ es: 'Comunidad', en: 'Community' },
    desc:     { es: 'Descubrimos y compartimos proyectos rentables para generar ingresos de forma inteligente. KAST, VOID Network, GRVT, DAC y más.', en: 'We discover and share profitable projects to generate income intelligently. KAST, VOID Network, GRVT, DAC and more.' },
    rights:   { es: '© 2026 BeneficioDiario. Todos los derechos reservados.', en: '© 2026 BeneficioDiario. All rights reserved.' },
    made:     { es: 'Hecho con 💙 para inversores inteligentes', en: 'Made with 💙 for smart investors' },
    disclaimer: { es: '⚠️ Aviso: BeneficioDiario comparte información sobre proyectos e inversiones con fines educativos e informativos. No somos asesores financieros y no garantizamos ganancias: toda inversión en criptomonedas conlleva riesgo y puedes perder parte o la totalidad de tu capital. Esta web contiene enlaces de afiliado/referido por los que podemos recibir una comisión sin coste adicional para ti. Investiga por tu cuenta (DYOR) antes de invertir.', en: '⚠️ Disclaimer: BeneficioDiario shares information about projects and investments for educational and informational purposes. We are not financial advisors and we do not guarantee profits: all crypto investment involves risk and you may lose part or all of your capital. This site contains affiliate/referral links through which we may earn a commission at no extra cost to you. Do your own research (DYOR) before investing.' },
  }

  const cols = [
    { title: t.projects[lang], links: [{ l: 'KAST Card', h: '#proyectos' }, { l: 'VOID Network', h: '#proyectos' }, { l: 'GRVT', h: '#proyectos' }, { l: 'DAC', h: '#proyectos' }] },
    { title: t.content[lang],  links: [{ l: 'Blog', h: '#blog' }, { l: 'Portfolio', h: '#portfolio' }, { l: lang === 'es' ? 'Cómo funciona' : 'How it works', h: '#como-funciona' }] },
    { title: t.community[lang], links: [{ l: 'YouTube', h: YOUTUBE_URL }, { l: lang === 'es' ? 'Preguntas frecuentes' : 'FAQ', h: '#faq' }, { l: lang === 'es' ? 'Aviso de riesgos' : 'Risk disclaimer', h: '#faq' }] },
  ]

  const base = darkMode ? 'border-white/5 bg-[#080d1a]/80' : 'border-[#00b4d8]/[0.05] bg-gray-50/50'
  const titleC = darkMode ? 'text-gray-200' : 'text-gray-900'
  const linkC = darkMode ? 'text-gray-500 hover:text-[#00b4d8]' : 'text-gray-400 hover:text-[#00b4d8]'
  const descC = darkMode ? 'text-gray-500' : 'text-gray-400'
  const discC = darkMode ? 'text-gray-600' : 'text-gray-300'
  const copyC = darkMode ? 'text-gray-600' : 'text-gray-300'

  return (
    <footer className={`border-t ${base} px-5 sm:px-8 pt-14 pb-8 transition-colors duration-500`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/logo-bd.png" alt="BD" className="w-8 h-8 object-contain" />
              <span className={`font-display font-bold text-base ${titleC}`}>BeneficioDiario</span>
            </div>
            <p className={`font-body text-xs max-w-[260px] leading-relaxed mb-4 ${descC}`}>{t.desc[lang]}</p>
            {/* YouTube only */}
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 text-white rounded-lg px-4 py-2 font-body text-xs font-medium hover:bg-red-700 transition-colors w-full justify-center">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              @beneficiodiario_com
            </a>
          </div>

          {/* Columns */}
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className={`font-display font-bold text-xs mb-3 tracking-wide uppercase ${titleC}`}>{c.title}</h4>
              <div className="flex flex-col gap-2">
                {c.links.map((link) => (
                  <a key={link.l} href={link.h} target={link.h.startsWith('http') ? '_blank' : undefined}
                    rel={link.h.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`font-body text-xs transition-colors ${linkC}`}>{link.l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`border-t pt-5 ${darkMode ? 'border-white/5' : 'border-gray-100'}`}>
          <p className={`font-body text-[10px] leading-relaxed max-w-2xl mb-4 ${discC}`}>{t.disclaimer[lang]}</p>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <span className={`font-body text-[11px] ${copyC}`}>
              {t.rights[lang]} · <a href="/privacidad" className="hover:text-[#00b4d8] transition-colors">{lang === 'es' ? 'Privacidad y cookies' : 'Privacy & cookies'}</a>
            </span>
            <span className={`font-body text-[11px] ${copyC}`}>{t.made[lang]}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
