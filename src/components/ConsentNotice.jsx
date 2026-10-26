import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ConsentNotice({ lang, preferences, onSave, expanded, onClose }) {
  const en = lang === 'en'
  const [details, setDetails] = useState(expanded)
  const [analytics, setAnalytics] = useState(preferences?.analytics || false)
  const [advertising, setAdvertising] = useState(preferences?.advertising || false)
  const panel = useRef(null)
  useEffect(() => {
    if (!expanded) return
    const previous = document.activeElement
    panel.current?.focus()
    return () => { if (previous?.isConnected) previous.focus() }
  }, [expanded])
  const buttonClass = 'min-h-11 px-4 py-2 rounded-xl border border-line bg-surface-2 text-fg font-display font-bold text-sm hover:border-brand-500/50'
  return <section ref={panel} tabIndex={-1} aria-labelledby="privacy-title" aria-label={en ? 'Privacy preferences' : 'Preferencias de privacidad'}
    onKeyDown={event => { if (event.key === 'Escape') onClose?.() }}
    className="fixed z-toast bottom-3 left-3 right-3 sm:left-auto sm:right-5 sm:bottom-5 sm:w-[min(38rem,calc(100vw-2.5rem))] max-h-[85vh] overflow-y-auto rounded-card border border-line bg-surface shadow-e4 p-5 sm:p-6">
    <div className="flex justify-between items-start gap-4"><h2 id="privacy-title" className="font-display font-bold text-lg">{en ? 'You choose your privacy' : 'Tu privacidad, tú decides'}</h2>
      {onClose && <button type="button" onClick={onClose} className="min-h-11 px-2 text-fg-muted" aria-label={en ? 'Close preferences' : 'Cerrar preferencias'}>✕</button>}
    </div>
    <p className="font-body text-sm leading-relaxed text-fg-muted mt-3">{en ? 'This free portal requires no account. Optional analytics (Vercel) and third-party ads stay off until you choose. Rejecting does not limit access.' : 'Este portal gratuito no exige cuenta. La analítica opcional de Vercel y los anuncios de terceros están desactivados hasta que elijas. Rechazar no limita el acceso.'}</p>
    <Link to="/cookies" className="inline-block text-sm text-brand-fg underline underline-offset-4 mt-3">{en ? 'Cookies and providers (ES)' : 'Cookies y proveedores'}</Link>
    {details && <fieldset className="mt-5 space-y-4 border-t border-line pt-4">
      <legend className="sr-only">{en ? 'Optional categories' : 'Categorías opcionales'}</legend>
      <label className="flex items-start gap-3 cursor-pointer font-body text-sm"><input className="mt-1 w-5 h-5 accent-cyan-600" type="checkbox" checked={analytics} onChange={event => setAnalytics(event.target.checked)} /><span><strong className="block">{en ? 'Analytics' : 'Analítica'}</strong><span className="text-fg-muted">{en ? 'Vercel browsing statistics, without third-party cookies.' : 'Estadísticas de navegación de Vercel, sin cookies de terceros.'}</span></span></label>
      <label className="flex items-start gap-3 cursor-pointer font-body text-sm"><input className="mt-1 w-5 h-5 accent-cyan-600" type="checkbox" checked={advertising} onChange={event => setAdvertising(event.target.checked)} /><span><strong className="block">{en ? 'Advertising' : 'Publicidad'}</strong><span className="text-fg-muted">{en ? 'Optional third-party advertising resources.' : 'Recursos publicitarios opcionales de terceros.'}</span></span></label>
      <p className="font-body text-xs text-fg-muted">{en ? 'Necessary: your privacy choice and display preferences.' : 'Necesario: recordar tu decisión y tus preferencias visuales.'}</p>
    </fieldset>}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-5">
      <button type="button" className={buttonClass} onClick={() => onSave({ analytics: false, advertising: false })}>{en ? 'Reject optional' : 'Rechazar opcionales'}</button>
      <button type="button" className={buttonClass} onClick={() => details ? onSave({ analytics, advertising }) : setDetails(true)}>{details ? (en ? 'Save selection' : 'Guardar selección') : (en ? 'Configure' : 'Configurar')}</button>
      <button type="button" className={buttonClass} onClick={() => onSave({ analytics: true, advertising: true })}>{en ? 'Accept all' : 'Aceptar todo'}</button>
    </div>
  </section>
}
