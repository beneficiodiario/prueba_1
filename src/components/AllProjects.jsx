import { motion } from 'motion/react'
import { Section, SectionHeader } from './ui/Section'
import { Card, Badge } from './ui/Card'
import { ArrowLink } from './ui/Button'
import { FiLock } from './ui/icons'
import { projects } from '../data/content'
import { fadeUp, stagger, viewport, revealInitial } from '../lib/motion'

const OTHERS = projects.filter((p) => !p.featured)

const T = {
  eyebrow: { es: 'Más oportunidades', en: 'More opportunities' },
  title:   { es: 'Otros proyectos activos', en: 'Other active projects' },
  sub: {
    es: 'Proyectos que seguimos de cerca y que todavía están tomando forma.',
    en: 'Projects we follow closely that are still taking shape.',
  },
  view:  { es: 'Ver proyecto', en: 'View project' },
  soon:  { es: 'Próximamente', en: 'Coming soon' },
  risk:  { es: 'Riesgo', en: 'Risk' },
  min:   { es: 'Mín.', en: 'Min.' },
}

function ProjectCard({ p, lang }) {
  const desc  = p.desc?.[lang]  || p.desc?.es  || ''
  const stats = p.stats?.[lang] || p.stats?.es || p.stats || {}
  const soon  = p.comingSoon

  return (
    <motion.article variants={fadeUp} className="h-full">
      <Card
        interactive={!soon}
        shine={!soon}
        tone={soon ? 'muted' : 'solid'}
        className={`group h-full flex flex-col ${soon ? 'opacity-80' : ''}`}
      >
        <div className="relative h-36 shrink-0 overflow-hidden" style={{ background: p.gradient }}>
          <img
            src={p.image}
            alt=""
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out-expo ${
              soon ? 'opacity-15 grayscale' : 'opacity-35 group-hover:scale-105'
            }`}
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {soon && (
            <span className="absolute inset-0 flex items-center justify-center">
              <Badge tone="onImage" icon={FiLock}>{T.soon[lang]}</Badge>
            </span>
          )}

          <div className="absolute inset-x-0 bottom-0 p-5">
            <span className="font-body text-[10px] font-bold text-white/75 tracking-[0.14em] uppercase">
              {p.tag}
            </span>
            <h3 className="font-display font-bold text-xl text-white mt-0.5">{p.title}</h3>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <p className="font-body text-xs leading-relaxed text-fg-muted line-clamp-3 mb-4">{desc}</p>

          <div className="flex flex-wrap gap-2 mb-5">
            {[
              { l: 'ROI', v: stats.roi },
              { l: T.risk[lang], v: stats.risk },
              { l: T.min[lang], v: stats.min },
            ].filter((s) => s.v).map((s, j) => (
              <span key={j} className="rounded-lg bg-surface-2 border border-line/70 px-2.5 py-1.5 font-body text-[10px] text-fg-subtle">
                <strong className="font-semibold text-fg tabular">{s.v}</strong> {s.l}
              </span>
            ))}
          </div>

          <div className="mt-auto">
            {soon ? (
              <span className="inline-flex items-center gap-1.5 font-display font-semibold text-sm text-fg-subtle">
                <FiLock size={13} aria-hidden="true" /> {T.soon[lang]}
              </span>
            ) : (
              <ArrowLink
                href={p.link}
                rel="noopener noreferrer sponsored"
                tone=""
                style={{ color: p.tagColor }}
              >
                {T.view[lang]}
              </ArrowLink>
            )}
          </div>
        </div>
      </Card>
    </motion.article>
  )
}

export default function AllProjects({ lang }) {
  if (!OTHERS.length) return null

  return (
    <Section tone="subtle" compact>
      <SectionHeader
        eyebrow={T.eyebrow[lang]}
        title={T.title[lang]}
        subtitle={T.sub[lang]}
        size="display-3"
      />

      {/* En tablet van de dos en dos: tres columnas a 640px aprietan demasiado */}
      <motion.div
        variants={stagger(0.07)}
        initial={revealInitial}
        whileInView="visible"
        viewport={viewport}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {OTHERS.map((p) => <ProjectCard key={p.id} p={p} lang={lang} />)}
      </motion.div>
    </Section>
  )
}
