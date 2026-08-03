import { Link } from 'react-router-dom'
import { Button } from './ui/Button'
import { SiYoutube, FiAlertTriangle } from './ui/icons'
import { YOUTUBE_URL } from '../data/content'

const YOUTUBE_HANDLE = '@beneficiodiario_com'

const T = {
  desc: {
    es: 'Descubrimos y compartimos proyectos rentables para generar ingresos de forma inteligente. KAST, VOID Network, GRVT, DAC y más.',
    en: 'We discover and share profitable projects to generate income intelligently. KAST, VOID Network, GRVT, DAC and more.',
  },
  rights: { es: '© 2026 BeneficioDiario. Todos los derechos reservados.', en: '© 2026 BeneficioDiario. All rights reserved.' },
  made:   { es: 'Hecho en España para inversores con criterio', en: 'Made in Spain for investors who do their homework' },
  privacy:{ es: 'Privacidad y cookies', en: 'Privacy & cookies' },
  notice: { es: 'Aviso de riesgo', en: 'Risk notice' },
  disclaimer: {
    es: 'BeneficioDiario comparte información sobre proyectos e inversiones con fines educativos e informativos. No somos asesores financieros y no garantizamos ganancias: toda inversión en criptomonedas conlleva riesgo y puedes perder parte o la totalidad de tu capital. Esta web contiene enlaces de afiliado y de referido por los que podemos recibir una comisión sin coste adicional para ti. Investiga por tu cuenta (DYOR) antes de invertir.',
    en: 'BeneficioDiario shares information about projects and investments for educational and informational purposes. We are not financial advisors and we do not guarantee profits: all crypto investment involves risk and you may lose part or all of your capital. This site contains affiliate and referral links through which we may earn a commission at no extra cost to you. Do your own research (DYOR) before investing.',
  },
  cols: {
    es: { projects: 'Proyectos', content: 'Contenido', community: 'Comunidad', how: 'Cómo funciona', faq: 'Preguntas frecuentes' },
    en: { projects: 'Projects', content: 'Content', community: 'Community', how: 'How it works', faq: 'FAQ' },
  },
}

export default function Footer({ lang }) {
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
        { label: 'Blog',      href: '#blog' },
        { label: 'Portfolio', href: '#portfolio' },
        { label: c.how,       href: '#como-funciona' },
      ],
    },
    {
      title: c.community,
      links: [
        { label: 'YouTube',    href: YOUTUBE_URL, external: true },
        { label: c.faq,        href: '#faq' },
        { label: T.notice[lang], href: '#faq' },
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
                      href={link.href}
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
