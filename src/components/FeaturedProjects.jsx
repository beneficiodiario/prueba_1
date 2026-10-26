import { useState } from 'react'
import { motion } from 'motion/react'
import { Section, SectionHeader, Divider } from './ui/Section'
import { Card, Badge, StatBox } from './ui/Card'
import { Button } from './ui/Button'
import { Tilt3D } from './ui/motion3d'
import { AirdropResult } from './ui/AirdropResult'
import { SiYoutube, FiCheck, FiCopy, FiStar, FiArrowUpRight, FiLock } from './ui/icons'
import { projects } from '../data/content'
import { fadeUp, stagger, viewport, duration, ease, revealInitial } from '../lib/motion'

const ROWS = [1, 2, 3].map((n) => projects.filter((p) => p.featured && p.featuredRow === n))

const BTN_LABEL = {
  es: { kast: 'Acceder a KAST', void: 'Unirse a VOID Network', grvt: 'Explorar GRVT', dac: 'Entrar al testnet de DAC', markets: 'Probar Markets', abstract: 'Entrar en Abstract' },
  en: { kast: 'Access KAST', void: 'Join VOID Network', grvt: 'Explore GRVT', dac: 'Enter DAC testnet', markets: 'Try Markets', abstract: 'Enter Abstract' },
}

const T = {
  eyebrow: { es: 'Proyectos destacados', en: 'Featured projects' },
  title:   { es: 'Proyectos que seguimos', en: 'Projects we follow' },
  sub: {
    es: 'Información sobre plataformas de terceros. Comprueba la vigencia de cada campaña, sus costes y condiciones oficiales. Los enlaces pueden incluir referidos.',
    en: 'Information about third-party platforms. Check current campaign availability, costs and official terms. Links may include referrals.',
  },
  more:     { es: 'Más proyectos', en: 'More projects' },
  code:     { es: 'Código', en: 'Code' },
  copy:     { es: 'Copiar código de referido', en: 'Copy referral code' },
  copied:   { es: 'Copiado', en: 'Copied' },
  fallback: { es: 'Ver proyecto', en: 'View project' },
  tutorial: { es: 'Ver tutorial', en: 'Watch tutorial' },
  soon:     { es: 'Tutorial en preparación', en: 'Tutorial in progress' },
  riskLbl:  { es: 'Riesgo', en: 'Risk' },
  freqLbl:  { es: 'Frecuencia', en: 'Frequency' },
  minLbl:   { es: 'Mínimo', en: 'Minimum' },
}

const HIGH_RISK = ['Alto', 'High', 'Medio-Alto', 'Medium-High']
const MID_RISK  = ['Medio', 'Medium']

/** Colorea el riesgo, pero el texto siempre lo dice: el color no es el único indicador. */
const riskColor = (risk) =>
  HIGH_RISK.includes(risk) ? 'rgb(var(--danger-fg))'
  : MID_RISK.includes(risk) ? 'rgb(var(--warning-fg))'
  : 'rgb(var(--success-fg))'

/** Código de referido con copiado al portapapeles y confirmación visible. */
function RefCode({ code, lang }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* portapapeles no disponible */ }
  }

  return (
    <div className="flex items-center gap-2 rounded-xl border border-dashed border-brand-500/35 bg-surface-2 px-3 py-2.5 mt-4">
      <span className="font-body text-[10px] text-fg-subtle uppercase tracking-[0.12em]">
        {T.code[lang]}
      </span>
      <code className="font-mono font-bold text-sm text-brand-fg flex-1 truncate">{code}</code>
      <button
        type="button"
        onClick={copy}
        aria-label={T.copy[lang]}
        className="relative flex items-center gap-1 min-h-[32px] px-2 rounded-lg text-fg-subtle hover:text-brand-fg hover:bg-brand-500/10 transition-colors duration-base"
      >
        <motion.span
          key={copied ? 'ok' : 'copy'}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration.fast, ease: ease.out }}
          className="flex items-center gap-1"
        >
          {copied
            ? <><FiCheck size={13} className="text-success-fg" /><span className="text-[10px] font-body text-success-fg">{T.copied[lang]}</span></>
            : <FiCopy size={13} />}
        </motion.span>
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? T.copied[lang] : ''}
      </span>
    </div>
  )
}

function FeaturedCard({ p, lang }) {
  const desc     = p.desc?.[lang]     || p.desc?.es     || ''
  const features = p.features?.[lang] || p.features?.es || []
  const stats    = p.stats?.[lang]    || p.stats?.es    || p.stats || {}

  return (
    <motion.article variants={fadeUp} className="h-full">
      <Tilt3D max={7} scale={1.015} className="h-full">
      <Card interactive className="group h-full flex flex-col">
        {/* Cabecera con imagen: la foto se acerca despacio al pasar el ratón */}
        <div className="relative h-44 sm:h-52 shrink-0 overflow-hidden" style={{ background: p.gradient }}>
          <img
            src={p.image}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.06]"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

          {p.isNew && (
            <span className="absolute top-4 right-4 z-raised rounded-pill bg-white px-3 py-1 font-display font-extrabold text-[10px] tracking-[0.12em]"
              style={{ color: p.tagColor }}>
              {lang === 'es' ? 'NUEVO' : 'NEW'}
            </span>
          )}

          <div className="absolute inset-x-0 bottom-0 p-6">
            <Badge tone="onImage">{p.tag}</Badge>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-2 tracking-tight">
              {p.title}
            </h3>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <p className="font-body text-sm leading-relaxed text-fg-muted whitespace-pre-line mb-5">
            {desc}
          </p>

          <ul className="grid gap-2.5 mb-5">
            {features.map((f, j) => (
              <li key={j} className="flex items-start gap-2.5">
                <span
                  className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: `${p.tagColor}22` }}
                  aria-hidden="true"
                >
                  <FiCheck size={10} style={{ color: p.tagColor }} />
                </span>
                <span className="font-body text-xs leading-relaxed text-fg-muted">{f}</span>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-4 gap-2 mb-4 mt-auto">
            <StatBox label="ROI"           value={stats.roi}  tone="rgb(var(--success-fg))" />
            <StatBox label={T.riskLbl[lang]} value={stats.risk} tone={riskColor(stats.risk)} />
            <StatBox label={T.freqLbl[lang]} value={stats.time} tone="rgb(var(--brand-fg))" />
            <StatBox label={T.minLbl[lang]}  value={stats.min}  tone="rgb(var(--info-fg))" />
          </div>

          {p.airdrop && <AirdropResult airdrop={p.airdrop} lang={lang} />}

          {p.refCode && <RefCode code={p.refCode} lang={lang} />}

          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer sponsored"
            style={{ background: p.gradient }}
            className="mt-4 flex items-center justify-center gap-2 w-full min-h-[52px] rounded-2xl text-white font-display font-bold text-sm shadow-e2 transition-[transform,filter,box-shadow] duration-base ease-out-quart hover:-translate-y-0.5 hover:brightness-110 hover:shadow-e3 active:translate-y-0"
          >
            {BTN_LABEL[lang]?.[p.id] || T.fallback[lang]}
            <FiArrowUpRight size={16} aria-hidden="true" />
          </a>

          {p.videoUrl ? (
            <a
              href={p.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 w-full min-h-[48px] rounded-2xl border border-danger/25 bg-danger/8 text-danger-fg font-display font-semibold text-sm transition-[transform,background-color] duration-base hover:bg-danger/15 hover:-translate-y-0.5"
            >
              <SiYoutube size={15} aria-hidden="true" />
              {T.tutorial[lang]} · {p.title}
            </a>
          ) : (
            <p className="mt-2 flex items-center justify-center gap-2 w-full min-h-[48px] rounded-2xl border border-dashed border-line font-display font-semibold text-sm text-fg-subtle">
              <FiLock size={14} aria-hidden="true" />
              {T.soon[lang]} · {p.title}
            </p>
          )}
        </div>
      </Card>
      </Tilt3D>
    </motion.article>
  )
}

/** Una fila de proyectos destacados, escalonada al entrar. */
function Row({ items, lang, className = '' }) {
  if (!items.length) return null
  return (
    <motion.div
      variants={stagger(0.1)}
      initial={revealInitial}
      whileInView="visible"
      viewport={viewport}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 ${className}`}
    >
      {items.map((p) => <FeaturedCard key={p.id} p={p} lang={lang} />)}
    </motion.div>
  )
}

export default function FeaturedProjects({ lang }) {
  return (
    <Section id="proyectos" tone="base" className="overflow-hidden">
      {/* Halo tenue detrás de la sección para separarla de la anterior */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(60% 100% at 50% 0%, rgb(var(--brand-500) / 0.07), transparent 70%)' }}
      />

      <SectionHeader
        eyebrow={T.eyebrow[lang]}
        eyebrowIcon={FiStar}
        title={T.title[lang]}
        subtitle={T.sub[lang]}
      />

      <Row items={ROWS[0]} lang={lang} />
      <Divider label={T.more[lang]} className="my-9" />
      <Row items={ROWS[1]} lang={lang} className="mb-5 sm:mb-6" />
      <Row items={ROWS[2]} lang={lang} />
    </Section>
  )
}
