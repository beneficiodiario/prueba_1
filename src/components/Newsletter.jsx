import { Section } from './ui/Section'
import { SiTelegram, SiInstagram, FiArrowUpRight } from './ui/icons'

// Esta sección sigue viviendo bajo el id "newsletter" para no romper enlaces
// antiguos, pero ya no es una newsletter: es un bloque de comunidad con
// Telegram e Instagram.
const T = {
  eyebrow: { es: 'Comunidad', en: 'Community' },
  title:   { es: 'Únete a la comunidad', en: 'Join the community' },
  sub: {
    es: 'Entra al Telegram para novedades, análisis y resolver dudas con nosotros. Y síguenos en Instagram para avisos rápidos de nuevos proyectos y airdrops.',
    en: 'Join our Telegram for updates, analysis and questions. And follow us on Instagram for quick alerts on new projects and airdrops.',
  },
}

const CHANNELS = [
  {
    key: 'telegram',
    href: 'https://t.me/BeneficioDiario',
    cta: { es: 'Unirme al Telegram', en: 'Join Telegram' },
    Icon: SiTelegram,
    bg: 'bg-[#229ED9]',
  },
  {
    key: 'instagram',
    href: 'https://www.instagram.com/beneficiodiario_com',
    cta: { es: 'Seguir en Instagram', en: 'Follow on Instagram' },
    Icon: SiInstagram,
    // Gradiente clásico de Instagram
    bg: 'bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
  },
]

export default function Newsletter({ lang }) {
  return (
    <Section id="comunidad" tone="base" width="prose" compact>
      <div className="max-w-narrow mx-auto text-center rounded-card border border-line bg-surface p-8 sm:p-10">
        <span className="font-body text-eyebrow uppercase text-brand-fg">{T.eyebrow[lang]}</span>
        <h2 className="font-display text-display-3 text-balance mt-3">{T.title[lang]}</h2>
        <p className="font-body text-sm leading-relaxed text-fg-muted mt-4 mb-7">{T.sub[lang]}</p>
        <div className="flex flex-wrap justify-center gap-3">
          {CHANNELS.map(({ key, href, cta, Icon, bg }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 min-h-[48px] rounded-2xl px-5 font-display font-bold text-sm text-white shadow-e1 hover:shadow-e2 hover:-translate-y-0.5 transition-all ${bg}`}
            >
              <Icon size={18} aria-hidden="true" />
              {cta[lang]}
              <FiArrowUpRight size={15} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </Section>
  )
}
