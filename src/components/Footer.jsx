import { Link } from 'react-router-dom'
import { Button } from './ui/Button'
import { SiYoutube, FiAlertTriangle } from './ui/icons'
import { YOUTUBE_URL } from '../data/content'
import { LEGAL_LINKS } from '../data/legalPages'
import { useConsent } from '../lib/ConsentContext'

const YOUTUBE_HANDLE = '@beneficiodiario_com'

const T = {
  desc: {
    es: 'Portal gratuito de información sobre criptomonedas, ingresos pasivos y sitios de terceros. Sin login ni registro.',
    en: 'Free information about crypto, passive income and third-party sites. No login or registration.',
  },
  rights: { es: '© 2026 BeneficioDiario. Todos los derechos reservados.', en: '© 2026 BeneficioDiario. All rights reserved.' },
  made:   { es: 'Barcelona, España · Portal informativo gratuito', en: 'Barcelona, Spain · Free information portal' },
  privacy:{ es: 'Privacidad y cookies', en: 'Privacy & cookies' },
  notice: { es: 'Aviso de riesgo', en: 'Risk notice' },
  disclaimer: {
    es: 'BeneficioDiario comparte información sobre proyectos e inversiones con fines educativos e informativos. No somos asesores financieros y no garantizamos ganancias: toda inversión en criptomonedas conlleva riesgo y puedes perder parte o la totalidad de tu capital. Esta web contiene enlaces de afiliado y de referido por los que podemos recibir una comisión según las condiciones del proveedor. Investiga por tu cuenta (DYOR) antes de invertir.',
    en: 'BeneficioDiario shares information about projects and investments for educational and informational purposes. We are not financial advisors and we do not guarantee profits: all crypto investment involves risk and you may lose part or all of your capital. This site contains affiliate and referral links through which we may earn a commission under the provider’s terms. Do your own research (DYOR) before investing.',
  },
  cols: {
    es: { projects: 'Proyectos', content: 'Contenido', community: 'Comunidad', how: 'Cómo funciona', faq: 'Preguntas frecuentes' },
    en: { projects: 'Projects', content: 'Content', community: 'Community', how: 'How it works', faq: 'FAQ' },
  },
}

export default function Footer({ lang = 'es' }) {
  const { openPreferences } = useConsent()
  const home = lang === 'en' ? '/en' : '/'
  const c = T.cols[lang] || T.cols.es

  const columns = [
    {
      title: c.projects,
      links: [
        { label: 'KAST Card',    href: '#proyectos' },
        { label: 'VOID Network', href: '#proyectos' },
        { label: 'GRVT',         href: '#proyectos' },
        { label: 'DAC',          href: '#proyectos' },
      ],
    },
    {
      title: c.content,
      links: [
        { label: 'Blog', href: `${home}#blog` },
        { label: lang === 'en' ? 'Passive income (ES)' : 'Ingresos pasivos', href: '/ingresos-pasivos' },
        { label: lang === 'en' ? 'Crypto guide (ES)' : 'Guía de criptomonedas', href: '/criptomonedas' },
        { label: 'Airdrops', href: '/airdrops' },
        { label: lang === 'en' ? 'Glossary (ES)' : 'Glosario cripto', href: '/glosario-cripto' },
      ],
    },
    {
      title: c.community,
      links: [
        { label: 'YouTube',    href: YOUTUBE_URL, external: true },
        { label: c.faq, href: `${home}#faq` },
        { label: lang === 'en' ? 'About (ES)' : 'Sobre el portal', href: '/sobre-beneficio-diario' },
        { label: lang === 'en' ? 'Editorial policy (ES)' : 'Política editorial', href: '/politica-editorial' },
        { label: lang === 'en' ? 'Contact (ES)' : 'Contacto', href: '/contacto' },
      ],
    },
  ]

  return (
    <footer className="border-t border-line bg-bg-subtle transition-colors duration-slow">
      <div className="container-page max-w-content pt-16 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/logo-bd.png" alt="" width="32" height="32" className="w-8 h-8 object-contain" />
              <span className="font-display font-bold text-base text-fg">
                Beneficio<span className="text-brand-fg">Diario</span>
              </span>
            </div>

            <p className="font-body text-xs leading-relaxed text-fg-muted max-w-[30ch] mb-5">
              {T.desc[lang]}
            </p>

            <Button href={YOUTUBE_URL} variant="youtube" size="sm" className="w-full">
              <SiYoutube size={14} aria-hidden="true" />
              {YOUTUBE_HANDLE}
            </Button>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="font-display font-bold text-xs uppercase tracking-[0.1em] text-fg mb-4">
                {col.title}
              </h2>
              <ul className="flex flex-col gap-2.5 list-none">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href.startsWith('#') ? `${home}${link.href}` : link.href}
                      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="font-body text-xs text-fg-muted hover:text-brand-fg transition-colors duration-base"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* El aviso legal se lee: contraste real, no gris sobre gris */}
        <div className="rounded-card border border-warning/25 bg-warning/[0.06] p-4 sm:p-5 mb-6">
          <p className="flex gap-3 font-body text-[11px] leading-relaxed text-fg-muted">
            <FiAlertTriangle size={16} className="text-warning-fg shrink-0 mt-0.5" aria-hidden="true" />
            <span>{T.disclaimer[lang]}</span>
          </p>
        </div>

        <nav aria-label={lang === 'en' ? 'Legal information (Spanish)' : 'Información legal'} className="flex flex-wrap gap-x-5 gap-y-3 border-t border-line pt-6 pb-6 font-body text-xs text-fg-muted">
          {LEGAL_LINKS.map(link => <Link key={link.path} to={link.path} className="hover:text-brand-fg underline-offset-4 hover:underline">{link.label}{lang === 'en' ? ' (ES)' : ''}</Link>)}
          <button type="button" onClick={openPreferences} className="text-brand-fg underline underline-offset-4">{lang === 'en' ? 'Privacy preferences' : 'Configurar privacidad'}</button>
          <a href="mailto:info@beneficiodiario.com" className="hover:text-brand-fg">info@beneficiodiario.com</a>
          <a href="/sitemap.xml" className="hover:text-brand-fg">Sitemap</a>
        </nav>
        <div className="border-t border-line pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="font-body text-[11px] text-fg-subtle">
            {T.rights[lang]}{' · '}
            <Link to="/privacidad" className="hover:text-brand-fg transition-colors duration-base">
              {T.privacy[lang]}
            </Link>
          </p>
          <p className="font-body text-[11px] text-fg-subtle">{T.made[lang]}</p>
        </div>
      </div>
    </footer>
  )
}
