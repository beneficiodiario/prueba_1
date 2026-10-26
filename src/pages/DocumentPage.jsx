import { Link } from 'react-router-dom'
import { useSeo } from '../lib/seo'
import { documentJsonLd } from '../lib/structuredData'
import { DOCUMENT_PAGES, documentTitle } from '../data/routes'
import { LEGAL_LINKS } from '../data/legalPages'
import { useConsent } from '../lib/ConsentContext'
import PageHeader from '../components/PageHeader'
import Footer from '../components/Footer'

const sectionId = (section, index) => section.id || `seccion-${index + 1}`

export default function DocumentPage({ page }) {
  const { openPreferences } = useConsent()
  useSeo({ ...page, title: documentTitle(page.title), lang: 'es', jsonLd: documentJsonLd(page) })
  const related = (page.kind === 'legal' ? LEGAL_LINKS.map(link => link.path) : page.related || [])
    .filter(path => path !== page.path).map(path => DOCUMENT_PAGES.find(item => item.path === path)).filter(Boolean)
  return <div className="min-h-screen bg-bg text-fg">
    <a href="#contenido" className="skip-link">Saltar al contenido principal</a>
    <PageHeader />
    <main id="contenido" className="container-page max-w-content py-12 sm:py-20">
      <nav aria-label="Ruta de navegación" className="font-body text-xs text-fg-muted mb-8 flex gap-2 flex-wrap">
        <Link to="/" className="hover:text-brand-fg">Inicio</Link><span aria-hidden="true">/</span><span aria-current="page">{page.label}</span>
      </nav>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_16rem] gap-12 lg:gap-20 items-start">
        <article className="min-w-0 max-w-[48rem]">
          <p className="font-body text-eyebrow uppercase text-brand-fg mb-4">{page.kind === 'legal' ? 'Información legal' : page.kind === 'guide' ? 'Aprende con criterio' : 'El portal'}</p>
          <h1 className="font-display text-display-2 text-balance mb-5">{page.title}</h1>
          <p className="font-body text-xs text-fg-subtle mb-8">Equipo editorial Beneficio Diario · Actualizado el <time dateTime={page.updated}>{new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Madrid' }).format(new Date(`${page.updated}T12:00:00Z`))}</time></p>
          {page.intro && <p className="font-body text-lead text-fg-muted mb-10 leading-relaxed">{page.intro}</p>}
          {page.path === '/cookies' && <button type="button" onClick={openPreferences} className="mb-10 rounded-xl border border-brand-500/40 bg-brand-500/10 px-5 py-3 font-display font-bold text-brand-fg">Configurar privacidad</button>}
          <div className="space-y-10">
            {page.sections.map((section, index) => <section key={sectionId(section, index)} id={sectionId(section, index)} className="scroll-mt-28">
              <h2 className="font-display font-bold text-xl mb-4">{section.h}</h2>
              {section.p.map(paragraph => <p key={paragraph} className="font-serif text-[17px] leading-[1.8] text-fg-muted mb-4">{paragraph}</p>)}
              {section.links && <ul className="space-y-3 font-body text-sm mt-5">{section.links.map(link => <li key={link.href}>
                <a href={link.href} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-brand-fg underline underline-offset-4 break-words">{link.label}</a>
              </li>)}</ul>}
            </section>)}
          </div>
          {page.kind === 'guide' && <aside className="mt-12 rounded-card border border-warning/25 bg-warning/[0.06] p-5 font-body text-sm text-fg-muted leading-relaxed">
            Información general, sin rentabilidad garantizada. Consulta el <Link to="/aviso-de-riesgos" className="underline text-brand-fg">aviso de riesgos</Link> y la <Link to="/transparencia" className="underline text-brand-fg">política de afiliación</Link> antes de utilizar un tercero.
          </aside>}
        </article>
        <aside className="lg:sticky lg:top-28 border-t lg:border-t-0 lg:border-l border-line pt-7 lg:pt-0 lg:pl-7">
          <nav aria-label="Índice de esta página"><p className="font-display font-bold text-sm mb-4">En esta página</p>
            <ul className="space-y-3 font-body text-sm text-fg-muted">{page.sections.map((section, index) => <li key={index}><a href={`#${sectionId(section, index)}`} className="hover:text-brand-fg">{section.h}</a></li>)}</ul>
          </nav>
          <nav aria-label="Contenido relacionado" className="mt-9 pt-6 border-t border-line"><p className="font-display font-bold text-sm mb-4">Sigue leyendo</p>
            <ul className="space-y-3 font-body text-sm text-brand-fg">{related.map(item => <li key={item.path}><Link to={item.path} className="hover:underline">{item.label}</Link></li>)}</ul>
          </nav>
        </aside>
      </div>
    </main>
    <Footer lang="es" />
  </div>
}
