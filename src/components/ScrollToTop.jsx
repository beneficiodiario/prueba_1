import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Resetea el scroll al cambiar de ruta (sin esto, react-router mantiene
// la posición de la página anterior y los artículos parecen abrirse "abajo").
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
