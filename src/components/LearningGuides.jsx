import { Link } from 'react-router-dom'
import { GUIDE_PAGES } from '../data/informationPages'
import { Section, SectionHeader } from './ui/Section'

export default function LearningGuides({ lang }) {
  const en = lang === 'en'
  return <Section id="guias" tone="base" width="content" compact>
    <SectionHeader eyebrow={en ? 'Start with the basics' : 'Empieza por entenderlo'} title={en ? 'Learn before you choose' : 'Información antes de decidir'}
      subtitle={en ? 'Free Spanish guides to distinguish income, rewards and risks. No account required.' : 'Guías gratuitas para distinguir ingresos, recompensas y riesgos. Sin cuenta ni registro.'} size="display-3" />
    {/* 5 guías: dos arriba y tres abajo en escritorio; la impar ocupa la fila entera en tablet. */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
      {GUIDE_PAGES.map((page, index) => <Link key={page.path} to={page.path} className={`group rounded-card border border-line p-6 bg-surface hover:border-brand-500/50 transition-colors ${index < 2 ? 'lg:col-span-3' : 'lg:col-span-2'} ${GUIDE_PAGES.length % 2 && index === GUIDE_PAGES.length - 1 ? 'sm:col-span-2 lg:col-span-2' : ''}`}>
        <span className="font-mono text-xs text-brand-fg">0{index + 1} / {en ? 'GUIDE IN SPANISH' : 'GUÍA'}</span>
        <h3 className="font-display font-bold text-xl mt-5 mb-3">{page.label}</h3>
        <p className="font-body text-sm leading-relaxed text-fg-muted">{page.description}</p>
        <span className="inline-block font-body text-sm font-semibold text-brand-fg mt-5">{en ? 'Read guide (ES)' : 'Leer la guía'} <span aria-hidden="true">↗</span></span>
      </Link>)}
    </div>
  </Section>
}
