import { createContext, useCallback, useContext, useEffect, useState } from 'react'

// ════════════════════════════════════════════════════════════════
//  Tema claro / oscuro.
//  El único efecto sobre el DOM es la clase `dark` en <html>; a partir
//  de ahí manda el CSS. Ningún componente recibe ya la prop `darkMode`.
// ════════════════════════════════════════════════════════════════

const STORAGE_KEY = 'bd_dark'

const ThemeCtx = createContext({ dark: false, setDark: () => {}, toggle: () => {} })

/** Lee la preferencia guardada; si no hay ninguna, hereda la del sistema. */
export function readTheme() {
  if (typeof window === 'undefined') return false
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === '1') return true
    if (saved === '0') return false
  } catch { /* almacenamiento bloqueado */ }
  return typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyTheme(dark) {
  const root = document.documentElement
  root.classList.toggle('dark', dark)
  // Barra de direcciones del navegador móvil acorde al tema.
  root.style.colorScheme = dark ? 'dark' : 'light'
  document.querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', dark ? '#080c18' : '#ffffff')
}

export function ThemeProvider({ children }) {
  const [dark, setDarkState] = useState(readTheme)

  useEffect(() => {
    applyTheme(dark)
    try { localStorage.setItem(STORAGE_KEY, dark ? '1' : '0') } catch { /* noop */ }
  }, [dark])

  // Sincroniza entre pestañas abiertas.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) setDarkState(e.newValue === '1')
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const setDark = useCallback((v) => setDarkState(Boolean(v)), [])
  const toggle = useCallback(() => setDarkState((d) => !d), [])

  return (
    <ThemeCtx.Provider value={{ dark, setDark, toggle }}>
      {children}
    </ThemeCtx.Provider>
  )
}

export const useTheme = () => useContext(ThemeCtx)
