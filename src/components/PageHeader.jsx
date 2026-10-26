import { Link } from 'react-router-dom'
import { useTheme } from '../lib/theme'
import { FiArrowLeft, FiSun, FiMoon } from './ui/icons'

export default function PageHeader({ lang = 'es' }) {
  const { dark, toggle } = useTheme()
  const home = lang === 'en' ? '/en' : '/'
  return <header className="sticky top-0 z-nav border-b border-line bg-bg/95 backdrop-blur-xl">
    <div className="container-page max-w-content min-h-16 flex items-center justify-between gap-3 py-3">
      <Link to={home} className="inline-flex items-center gap-2.5 font-display font-bold text-fg">
        <img src="/logo-bd.png" alt="" width="32" height="32" className="w-8 h-8 object-contain" />
        <span>Beneficio <span className="text-brand-fg">Diario</span></span>
      </Link>
      <div className="flex items-center gap-3">
        <Link to={home} className="inline-flex items-center gap-1.5 min-h-11 font-body text-sm text-fg-muted hover:text-brand-fg">
          <FiArrowLeft aria-hidden="true" /> {lang === 'en' ? 'Home' : 'Inicio'}
        </Link>
        <button type="button" onClick={toggle} className="flex items-center justify-center w-11 h-11 rounded-xl border border-line text-brand-fg"
          aria-label={lang === 'en' ? (dark ? 'Switch to light mode' : 'Switch to dark mode') : (dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro')}>
          {dark ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
        </button>
      </div>
    </div>
  </header>
}
