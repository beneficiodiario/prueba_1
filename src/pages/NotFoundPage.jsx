import { useLocation } from 'react-router-dom'
import { useSeo } from '../lib/seo'
import { NOT_FOUND_META } from '../data/routes'
import { Button } from '../components/ui/Button'
import PageHeader from '../components/PageHeader'
import Footer from '../components/Footer'

export default function NotFoundPage() {
  const { pathname } = useLocation()
  const en = pathname === '/en' || pathname.startsWith('/en/')
  useSeo({ ...NOT_FOUND_META, lang: en ? 'en' : 'es',
    title: en ? 'Page not found (404) · Beneficio Diario' : NOT_FOUND_META.title,
    description: en ? 'This page does not exist. Return to Beneficio Diario and explore our free guides.' : NOT_FOUND_META.description })
  return <div className="min-h-screen bg-bg text-fg">
    <PageHeader lang={en ? 'en' : 'es'} />
    <main className="container-page max-w-content py-16 sm:py-24 grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-center min-h-[65vh]">
      <p aria-hidden="true" className="font-display font-extrabold leading-none tracking-tighter text-[clamp(7rem,22vw,19rem)] text-brand-fg/25">404<span className="text-brand-fg">.</span></p>
      <div className="max-w-xl">
        <p className="font-body text-eyebrow uppercase text-brand-fg mb-4">{en ? 'A different route' : 'Toca cambiar de ruta'}</p>
        <h1 className="font-display text-display-2 text-balance mb-5">{en ? 'This page is off the map.' : 'Esta página se ha salido del mapa.'}</h1>
        <p className="font-body text-lead text-fg-muted leading-relaxed mb-8">{en ? 'The link may have changed or the address may be incorrect. You can keep exploring without creating an account.' : 'Puede que el enlace haya cambiado o que la dirección no sea correcta. Puedes seguir explorando el portal, sin crear una cuenta.'}</p>
        <div className="flex flex-wrap gap-3"><Button to={en ? '/en' : '/'}>{en ? 'Back to home' : 'Volver al inicio'}</Button><Button to="/ingresos-pasivos" variant="secondary">{en ? 'Explore guides (ES)' : 'Explorar las guías'}</Button></div>
        <p className="font-body text-sm text-fg-muted mt-7">{en ? 'Found a broken link?' : '¿Has encontrado un enlace roto?'} <a href="mailto:info@beneficiodiario.com" className="text-brand-fg underline underline-offset-4">{en ? 'Let us know' : 'Avísanos'}</a></p>
      </div>
    </main>
    <Footer lang={en ? 'en' : 'es'} />
  </div>
}
