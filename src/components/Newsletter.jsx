import { Link } from 'react-router-dom'
import { Section } from './ui/Section'
import { Button } from './ui/Button'
import { FiMail } from './ui/icons'
import { BEEHIIV_FORM_ID } from '../config'

export default function Newsletter({ lang }) {
  if (!BEEHIIV_FORM_ID) return null
  const en = lang === 'en'
  return <Section id="newsletter" tone="base" width="prose" compact>
    <div className="max-w-narrow mx-auto text-center rounded-card border border-line bg-surface p-8 sm:p-10">
      <FiMail size={26} aria-hidden="true" className="text-brand-fg mx-auto mb-5" />
      <h2 className="font-display text-display-3 text-balance">{en ? 'Follow the updates, if you want' : 'Sigue las novedades, si quieres'}</h2>
      <p className="font-body text-sm leading-relaxed text-fg-muted mt-4 mb-6">{en ? 'The portal is free and requires no account. Our optional newsletter is hosted on Beehiiv. Review its privacy information before subscribing.' : 'El portal es gratuito y no exige cuenta. La newsletter es opcional y se gestiona en Beehiiv. Revisa su información de privacidad antes de suscribirte.'}</p>
      <Button href={`https://subscribe-forms.beehiiv.com/v3/forms/${BEEHIIV_FORM_ID}`} variant="secondary">{en ? 'Open external newsletter' : 'Abrir newsletter externa'}</Button>
      <p className="font-body text-xs text-fg-muted mt-4"><Link to="/privacidad" className="underline underline-offset-4">{en ? 'Privacy information (ES)' : 'Información de privacidad'}</Link></p>
    </div>
  </Section>
}
