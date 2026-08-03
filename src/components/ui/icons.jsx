// ════════════════════════════════════════════════════════════════
//  Iconos de marca y de producto.
//  Antes el SVG de YouTube estaba copiado literalmente en 6 archivos y
//  los pasos del proceso usaban emojis (🔍 📊 🚀 💰), que dependen de la
//  fuente del sistema y no se pueden colorear con tokens.
//  Las marcas vienen de Simple Icons; la interfaz, de Feather.
// ════════════════════════════════════════════════════════════════

export { SiYoutube, SiTelegram, SiX } from 'react-icons/si'

export {
  FiSearch,        // Descubre
  FiBarChart2,     // Analiza
  FiZap,           // Actúa
  FiTrendingUp,    // Beneficio / subida
  FiTrendingDown,  // Bajada
  FiStar,          // Destacado
  FiLock,          // Próximamente
  FiRadio,         // Novedades / en directo
  FiAlertTriangle, // Aviso de riesgo
  FiCheck,
  FiCopy,
  FiClock,
  FiMail,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiArrowUp,
  FiArrowLeft,
  FiArrowDown,
  FiArrowUpRight,
  FiChevronDown,
  FiRefreshCw,
} from 'react-icons/fi'

/** Bandera de España como SVG: los emojis 🇪🇸/🇬🇧 no se pintan en Windows. */
export function FlagES({ size = 16, className = '' }) {
  return (
    <svg viewBox="0 0 24 16" width={size} height={size * (2 / 3)} className={className} aria-hidden="true">
      <rect width="24" height="16" fill="#c60b1e" />
      <rect y="4" width="24" height="8" fill="#ffc400" />
    </svg>
  )
}

/** Bandera del Reino Unido, simplificada a la escala en que se usa (16px). */
export function FlagGB({ size = 16, className = '' }) {
  return (
    <svg viewBox="0 0 24 16" width={size} height={size * (2 / 3)} className={className} aria-hidden="true">
      <rect width="24" height="16" fill="#012169" />
      <path d="M0 0l24 16M24 0L0 16" stroke="#fff" strokeWidth="3.2" />
      <path d="M0 0l24 16M24 0L0 16" stroke="#c8102e" strokeWidth="1.8" />
      <path d="M12 0v16M0 8h24" stroke="#fff" strokeWidth="5.3" />
      <path d="M12 0v16M0 8h24" stroke="#c8102e" strokeWidth="3.2" />
    </svg>
  )
}
