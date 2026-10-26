import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import SiteRoutes from './SiteRoutes'
import ScrollToTop from './components/ScrollToTop'
import { ConsentProvider } from './lib/ConsentContext'
import { ThemeProvider } from './lib/theme'
import './index.css'

// El navegador no restaura el scroll al cambiar de página: lo hacemos nosotros.
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

// Los servicios opcionales solo se cargan con consentimiento.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ConsentProvider>
          <SiteRoutes />
        </ConsentProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
