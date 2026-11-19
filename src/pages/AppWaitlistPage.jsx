import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { useSeo } from '../lib/seo'
import { Section, SectionHeader, Eyebrow } from '../components/ui/Section'
import { Card, Badge } from '../components/ui/Card'
import {
  SiTelegram, SiInstagram, SiYoutube,
  FiCheck, FiArrowUpRight, FiStar, FiAlertTriangle,
  FiSmartphone, FiBell, FiDollarSign, FiPieChart, FiLock,
} from '../components/ui/icons'
import PageHeader from '../components/PageHeader'
import Footer from '../components/Footer'
import { fadeUp, stagger, viewport, revealInitial } from '../lib/motion'

// ════════════════════════════════════════════════════════════════
//  Landing de la app móvil.
//  La app se está construyendo; esta página capta emails para la
//  waitlist (los 500 primeros tienen 1 año gratis) y explica qué
//  cubrirá la app desde el primer día frente a lo que vendrá luego.
// ════════════════════════════════════════════════════════════════

const T = {
  es: {
    pageTitle: 'App BeneficioDiario · Controla tus finanzas en una sola pantalla',
    pageDesc: 'Lista de espera para la app móvil de BeneficioDiario. Banco, broker, cripto y efectivo en un mismo sitio. Los 500 primeros tienen 1 año gratis.',

    heroEyebrow: 'App móvil · próximamente',
    heroTitle: 'Todas tus finanzas en una sola app',
    heroSub: 'Tu banco, tus brokers, tus criptos y tu efectivo en un mismo sitio. Precios en vivo, resumen de patrimonio y noticias. Los 500 primeros tienen 1 año gratis.',
    heroBadge: 'Próximamente en Google Play',

    emailLabel: 'Tu email',
    emailPlaceholder: 'tu@email.com',
    waitlistCta: 'Apuntarme a la waitlist',
    thanks: '¡Listo! Estás en la waitlist. Te avisaremos antes del lanzamiento.',
    privacyNote: 'Usaremos tu email solo para avisarte del lanzamiento. Nada de spam.',
    orEmailDirect: 'O escríbenos directamente a',

    featuresEyebrow: 'Funciones',
    featuresTitle: 'Qué podrás hacer',
    featuresSub: 'Pensada para quien tiene dinero repartido entre varios sitios y quiere ver el total de un vistazo.',
    f1Title: 'Todo tu patrimonio, en un solo sitio',
    f1Body: 'Banco, broker, cripto y efectivo. Divides por cuenta, cartera o exchange para ver exactamente dónde tienes cada euro.',
    f2Title: 'Precios en vivo, siempre',
    f2Body: 'Cripto y acciones se actualizan solas. Ves el valor real de tu cartera en euros al instante.',
    f3Title: 'Gastos, ingresos y resumen',
    f3Body: 'Control financiero mes a mes. Categorías, gráficos y balance real al final del mes.',
    f4Title: 'Ranking y meses gratis',
    f4Body: 'Gana puntos por uso diario y por invitar amigos. Canjéalos por meses gratis de suscripción.',
    f5Title: 'Noticias y alertas',
    f5Body: 'Lo mismo que publicamos en la web — airdrops, nuevos proyectos, noticias cripto — en tu bolsillo.',
    f6Title: 'Proyectos de BeneficioDiario',
    f6Body: 'Acceso directo a los proyectos analizados en la web, con sus códigos de referido a mano.',

    integrationsEyebrow: 'Compatibilidades',
    integrationsTitle: '¿Dónde tienes tu dinero?',
    integrationsSub: 'Elige de una lista los sitios donde tienes efectivo, inversiones o cripto. Al principio introduces los saldos a mano y los precios de cripto y acciones se actualizan solos.',
    bancos: 'Bancos y cuentas',
    brokers: 'Brokers y plataformas de inversión',
    exchanges: 'Exchanges cripto',
    wallets: 'Wallets y custodios',
    otros: 'Otros',
    integrationsNote: 'La sincronización automática con bancos (Open Banking / PSD2) está en el roadmap pero requiere licencias y pruebas largas. En las primeras versiones vas a introducir los saldos a mano, pero se actualizan solos para cripto y acciones.',

    waitlistEyebrow: 'Waitlist',
    waitlistTitle: 'Los 500 primeros tienen 1 año gratis',
    waitlistSub: 'Después, 1,50 € al mes o 12 € al año. Como un café. Y puedes ganar meses extra en el ranking.',

    faqEyebrow: 'Dudas rápidas',
    faqTitle: 'Antes de apuntarte',
    faqs: [
      { q: '¿Cuándo sale la app?', a: 'Estamos construyéndola ahora mismo. Si todo va bien, primer lanzamiento en Google Play en Q1 2027. iOS más adelante.' },
      { q: '¿Qué pasa si soy de los 500 primeros?', a: '1 año gratis sin tarjeta. Al terminar ese año, decides tú si sigues (1,50 €/mes o 12 €/año) o te das de baja sin coste.' },
      { q: '¿Es seguro meter ahí mi dinero?', a: 'La app no mueve ni gestiona tu dinero. Solo te ayuda a visualizar lo que ya tienes en tus bancos y plataformas. Tus datos quedan cifrados en tu dispositivo y en nuestro backend; nunca pedimos tus claves bancarias ni semillas de wallet.' },
      { q: '¿Se conecta automáticamente con mi banco?', a: 'En la primera versión no: introduces los saldos a mano. Los precios de cripto y acciones sí se actualizan solos. La conexión automática con bancos la activaremos cuando tengamos la licencia PSD2 lista, más adelante.' },
      { q: '¿Tengo que crear otra cuenta si ya uso la web?', a: 'Sí, por ahora son cuentas separadas. Las unificaremos más adelante con el mismo login.' },
    ],

    communityEyebrow: 'Mientras esperas',
    communityTitle: 'Únete a la comunidad',
    communitySub: 'Te vamos contando el desarrollo por dentro — decisiones de diseño, qué entra en cada versión, cuándo abrimos la waitlist a más plazas.',
  },
  en: {
    pageTitle: 'BeneficioDiario App · All your finances in one place',
    pageDesc: 'Waitlist for the BeneficioDiario mobile app. Bank, broker, crypto and cash in a single app. First 500 users get 1 year free.',

    heroEyebrow: 'Mobile app · coming soon',
    heroTitle: 'All your finances in one app',
    heroSub: 'Your bank, your brokers, your crypto and your cash — all in one place. Live prices, net-worth summary and news. First 500 users get 1 year free.',
    heroBadge: 'Coming soon to Google Play',

    emailLabel: 'Your email',
    emailPlaceholder: 'your@email.com',
    waitlistCta: 'Join the waitlist',
    thanks: "You're in! We'll email you before launch.",
    privacyNote: "We'll use your email only to notify you of launch. No spam.",
    orEmailDirect: 'Or email us directly at',

    featuresEyebrow: 'Features',
    featuresTitle: 'What you will be able to do',
    featuresSub: 'Built for people with money spread across several places who want to see the whole picture at a glance.',
    f1Title: 'All your net worth in one place',
    f1Body: 'Bank, broker, crypto and cash. Split by account, wallet or exchange so you know exactly where every euro is.',
    f2Title: 'Live prices, always',
    f2Body: 'Crypto and stocks update automatically. See the real value of your portfolio in euros right away.',
    f3Title: 'Income, spending and monthly summary',
    f3Body: 'Finance control month by month. Categories, charts and a real balance at the end of each month.',
    f4Title: 'Ranking & free months',
    f4Body: 'Earn points for daily use and referrals. Redeem them for free months of subscription.',
    f5Title: 'News & alerts',
    f5Body: 'The same things we publish on the website — airdrops, new projects, crypto news — in your pocket.',
    f6Title: 'BeneficioDiario projects',
    f6Body: 'Direct access to the projects we analyze on the site, with their referral codes handy.',

    integrationsEyebrow: 'Compatibility',
    integrationsTitle: 'Where do you keep your money?',
    integrationsSub: 'Pick the places where you have cash, investments or crypto. At the start you enter balances manually; crypto and stock prices update automatically.',
    bancos: 'Banks & accounts',
    brokers: 'Brokers & investment platforms',
    exchanges: 'Crypto exchanges',
    wallets: 'Wallets & custody',
    otros: 'Other',
    integrationsNote: 'Automatic bank sync (Open Banking / PSD2) is on the roadmap but needs licenses and lengthy testing. In the first versions you add balances manually, while crypto and stock prices update themselves.',

    waitlistEyebrow: 'Waitlist',
    waitlistTitle: 'First 500 users get 1 year free',
    waitlistSub: 'After that, €1.50/month or €12/year. Like a coffee. And you can earn extra months in the ranking.',

    faqEyebrow: 'Quick answers',
    faqTitle: 'Before you join',
    faqs: [
      { q: 'When does the app launch?', a: 'We are building it right now. If all goes well, first release on Google Play in Q1 2027. iOS later.' },
      { q: 'What do the first 500 users get?', a: '1 year free, no card required. When the year ends, you choose to stay (€1.50/month or €12/year) or leave at no cost.' },
      { q: 'Is it safe to put my money there?', a: 'The app does not move or manage your money. It only helps you see what you already have across your banks and platforms. Data is encrypted on device and in our backend; we never ask for bank passwords or wallet seeds.' },
      { q: 'Does it sync automatically with my bank?', a: 'Not in the first version: you enter balances by hand. Crypto and stock prices do update automatically. Automatic bank sync will come later, once our PSD2 license is ready.' },
      { q: 'Do I need a new account if I already use the website?', a: 'For now, yes — accounts are separate. We will unify them later with a single login.' },
    ],

    communityEyebrow: 'While you wait',
    communityTitle: 'Join the community',
    communitySub: 'We share the build process — design decisions, what ships in each version, when we open more waitlist spots.',
  },
}

const INTEGRATIONS = {
  bancos: [
    'Santander', 'BBVA', 'CaixaBank', 'Sabadell', 'ING', 'Openbank',
    'EVO', 'Unicaja', 'Revolut', 'N26', 'Bizum', 'PayPal',
  ],
  brokers: [
    'eToro', 'MyInvestor', 'Interactive Brokers', 'DEGIRO', 'XTB',
    'Trade Republic', 'Freedom24', 'Scalable Capital', 'IG', 'Plus500',
  ],
  exchanges: [
    'Binance', 'Coinbase', 'Kraken', 'KuCoin', 'OKX', 'Bybit',
    'Bitget', 'Bitpanda', 'Crypto.com', 'MEXC',
  ],
  wallets: [
    'MetaMask', 'Rabby', 'Trust Wallet', 'Ledger', 'Trezor',
    'Phantom', 'Rainbow', 'Coinbase Wallet',
  ],
  otros: [
    'Efectivo', 'Cuentas de ahorro', 'Nóminas', 'Préstamos', 'Hipotecas', 'Inmuebles',
  ],
}

const SOCIALS = [
  { href: 'https://t.me/beneficiodiario', label: 'Telegram', Icon: SiTelegram, bg: 'bg-[#229ED9]' },
  { href: 'https://www.instagram.com/beneficiodiario_com', label: 'Instagram', Icon: SiInstagram, bg: 'bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]' },
  { href: 'https://www.youtube.com/@beneficiodiario_com', label: 'YouTube', Icon: SiYoutube, bg: 'bg-[#ff0033]' },
]

function WaitlistForm({ t, lang }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    setError('')
    const trimmed = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError(lang === 'en' ? 'Please enter a valid email.' : 'Introduce un email válido.')
      return
    }
    // Minimum viable: open an email draft to info@beneficiodiario.com
    // with the user's email prefilled. A proper form endpoint goes here
    // (Beehiiv / Supabase / Formspree) once configured.
    const subject = encodeURIComponent(lang === 'en' ? 'App waitlist' : 'Waitlist App BeneficioDiario')
    const body = encodeURIComponent(
      (lang === 'en'
        ? 'Hi! I want to join the waitlist for the BeneficioDiario app.\n\nMy email: '
        : '¡Hola! Quiero apuntarme a la waitlist de la app BeneficioDiario.\n\nMi email: '
      ) + trimmed
    )
    window.location.href = `mailto:info@beneficiodiario.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-success/25 bg-success/8 p-5 text-left">
        <p className="font-body text-sm text-success-fg">
          <FiCheck size={16} className="inline mr-2" aria-hidden="true" />
          {t.thanks}
        </p>
        <p className="font-body text-xs text-fg-muted mt-3">
          {t.orEmailDirect} <a href="mailto:info@beneficiodiario.com" className="underline text-brand-fg">info@beneficiodiario.com</a>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3" noValidate>
      <label className="sr-only" htmlFor="waitlist-email">{t.emailLabel}</label>
      <input
        id="waitlist-email"
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        placeholder={t.emailPlaceholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 min-h-[52px] rounded-2xl border border-line bg-surface px-4 font-body text-sm text-fg placeholder:text-fg-subtle focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/25 transition-colors"
        aria-label={t.emailLabel}
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 min-h-[52px] px-6 rounded-2xl font-display font-bold text-sm text-white bg-gradient-to-br from-brand-500 to-brand-700 shadow-e2 hover:shadow-e3 hover:-translate-y-0.5 transition-all"
      >
        {t.waitlistCta}
        <FiArrowUpRight size={15} aria-hidden="true" />
      </button>
      {error && <p className="sm:col-span-2 font-body text-xs text-danger-fg -mt-1">{error}</p>}
    </form>
  )
}

function FeatureCard({ Icon, title, body }) {
  return (
    <motion.div variants={fadeUp}>
      <Card className="h-full p-6 sm:p-7">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-brand-500/12 text-brand-fg mb-4">
          <Icon size={20} aria-hidden="true" />
        </div>
        <h3 className="font-display font-extrabold text-base text-fg mb-2">{title}</h3>
        <p className="font-body text-sm leading-relaxed text-fg-muted">{body}</p>
      </Card>
    </motion.div>
  )
}

export default function AppWaitlistPage({ lang = 'es' }) {
  const t = T[lang] || T.es
  useSeo({
    title: t.pageTitle,
    description: t.pageDesc,
    path: lang === 'en' ? '/en/app' : '/app',
    lang,
    alternates: { es: '/app', en: '/en/app' },
  })

  const FEATURES = [
    { Icon: FiPieChart,    title: t.f1Title, body: t.f1Body },
    { Icon: FiDollarSign,  title: t.f2Title, body: t.f2Body },
    { Icon: FiSmartphone,  title: t.f3Title, body: t.f3Body },
    { Icon: FiStar,        title: t.f4Title, body: t.f4Body },
    { Icon: FiBell,        title: t.f5Title, body: t.f5Body },
    { Icon: FiArrowUpRight,title: t.f6Title, body: t.f6Body },
  ]

  return (
    <div className="min-h-screen bg-bg text-fg">
      <a href="#waitlist" className="skip-link">
        {lang === 'en' ? 'Skip to waitlist' : 'Ir a la waitlist'}
      </a>

      <PageHeader lang={lang} />

      <main>
        {/* HERO */}
        <Section id="hero" tone="base" width="content" className="overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[520px] pointer-events-none"
            style={{ background: 'radial-gradient(60% 100% at 50% 0%, rgb(var(--brand-500) / 0.08), transparent 70%)' }}
          />
          <div className="relative text-center max-w-[52rem] mx-auto py-8 sm:py-14">
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="flex justify-center mb-5"
            >
              <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-body text-eyebrow uppercase text-brand-fg border border-brand-500/25 bg-brand-500/8">
                <FiSmartphone size={13} aria-hidden="true" />
                {t.heroEyebrow}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display font-extrabold text-display-2 text-balance tracking-tight"
            >
              {t.heroTitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
              className="font-body text-lead text-fg-muted mt-5 mx-auto max-w-[36rem]"
            >
              {t.heroSub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8 mx-auto max-w-[32rem]"
              id="waitlist"
            >
              <WaitlistForm t={t} lang={lang} />
              <p className="font-body text-xs text-fg-subtle mt-3">
                <FiLock size={11} className="inline mr-1" aria-hidden="true" />
                {t.privacyNote}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-7 flex justify-center"
            >
              <Badge tone="brand">{t.heroBadge}</Badge>
            </motion.div>
          </div>
        </Section>

        {/* FEATURES */}
        <Section id="features" tone="subtle" width="content">
          <SectionHeader
            eyebrow={t.featuresEyebrow}
            eyebrowIcon={FiStar}
            title={t.featuresTitle}
            subtitle={t.featuresSub}
          />
          <motion.div
            variants={stagger(0.08)}
            initial={revealInitial}
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {FEATURES.map((f) => (
              <FeatureCard key={f.title} Icon={f.Icon} title={f.title} body={f.body} />
            ))}
          </motion.div>
        </Section>

        {/* INTEGRATIONS */}
        <Section id="integrations" tone="base" width="content">
          <SectionHeader
            eyebrow={t.integrationsEyebrow}
            title={t.integrationsTitle}
            subtitle={t.integrationsSub}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {[
              { title: t.bancos,    items: INTEGRATIONS.bancos },
              { title: t.brokers,   items: INTEGRATIONS.brokers },
              { title: t.exchanges, items: INTEGRATIONS.exchanges },
              { title: t.wallets,   items: INTEGRATIONS.wallets },
              { title: t.otros,     items: INTEGRATIONS.otros },
            ].map((group) => (
              <Card key={group.title} className="p-6 sm:p-7">
                <h3 className="font-display font-extrabold text-sm uppercase tracking-[0.1em] text-brand-fg mb-4">
                  {group.title}
                </h3>
                <ul className="flex flex-wrap gap-2 list-none">
                  {group.items.map((item) => (
                    <li key={item}>
                      <span className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface-2 px-3 py-1.5 font-body text-xs text-fg-muted">
                        <FiCheck size={12} className="text-success-fg" aria-hidden="true" />
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="rounded-card border border-warning/25 bg-warning/[0.06] p-4 sm:p-5 mt-7">
            <p className="flex gap-3 font-body text-xs leading-relaxed text-fg-muted">
              <FiAlertTriangle size={16} className="text-warning-fg shrink-0 mt-0.5" aria-hidden="true" />
              <span>{t.integrationsNote}</span>
            </p>
          </div>
        </Section>

        {/* WAITLIST CTA */}
        <Section id="waitlist-cta" tone="subtle" width="prose" compact>
          <div className="text-center max-w-[40rem] mx-auto rounded-card border border-brand-500/25 bg-gradient-to-br from-brand-500/8 via-transparent to-brand-700/8 p-8 sm:p-12">
            <Eyebrow>{t.waitlistEyebrow}</Eyebrow>
            <h2 className="font-display text-display-3 text-balance mt-3">{t.waitlistTitle}</h2>
            <p className="font-body text-sm leading-relaxed text-fg-muted mt-4 mb-7">{t.waitlistSub}</p>
            <WaitlistForm t={t} lang={lang} />
          </div>
        </Section>

        {/* FAQ */}
        <Section id="faq" tone="base" width="prose" compact>
          <SectionHeader
            eyebrow={t.faqEyebrow}
            title={t.faqTitle}
            size="display-3"
          />
          <div className="mx-auto max-w-[44rem] grid gap-4">
            {t.faqs.map(({ q, a }) => (
              <Card key={q} className="p-5 sm:p-6">
                <h3 className="font-display font-extrabold text-sm sm:text-base text-fg mb-2">{q}</h3>
                <p className="font-body text-sm leading-relaxed text-fg-muted">{a}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* COMMUNITY */}
        <Section id="community" tone="subtle" width="prose" compact>
          <SectionHeader
            eyebrow={t.communityEyebrow}
            title={t.communityTitle}
            subtitle={t.communitySub}
            size="display-3"
          />
          <div className="flex flex-wrap justify-center gap-3">
            {SOCIALS.map(({ href, label, Icon, bg }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 min-h-[48px] rounded-2xl px-5 font-display font-bold text-sm text-white shadow-e1 hover:shadow-e2 hover:-translate-y-0.5 transition-all ${bg}`}
              >
                <Icon size={16} aria-hidden="true" />
                {label}
                <FiArrowUpRight size={14} aria-hidden="true" />
              </a>
            ))}
          </div>

          <p className="text-center font-body text-xs text-fg-subtle mt-10">
            <Link to={lang === 'en' ? '/en' : '/'} className="underline underline-offset-4 hover:text-brand-fg">
              {lang === 'en' ? '← Back to BeneficioDiario' : '← Volver a BeneficioDiario'}
            </Link>
          </p>
        </Section>
      </main>

      <Footer lang={lang} />
    </div>
  )
}
