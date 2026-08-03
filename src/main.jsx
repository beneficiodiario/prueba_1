import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import ArticlePage from './pages/ArticlePage'
import PrivacyPage from './pages/PrivacyPage'
import ScrollToTop from './components/ScrollToTop'
import { ConsentProvider } from './lib/ConsentContext'
import { ThemeProvider } from './lib/theme'
import './index.css'

// El navegador no restaura el scroll al cambiar de página: lo hacemos nosotros.
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

// El Modo de Consentimiento queda en "denegado" por defecto (ver index.html).
// GA y los anuncios solo se cargan tras aceptar el aviso (ConsentProvider).
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ConsentProvider>
          <Routes>
            <Route path="/" element={<App initialLang="es" />} />
            <Route path="/en" element={<App initialLang="en" />} />
            <Route path="/blog/:slug" element={<ArticlePage lang="es" />} />
            <Route path="/en/blog/:slug" element={<ArticlePage lang="en" />} />
            <Route path="/privacidad" element={<PrivacyPage />} />
          </Routes>
        </ConsentProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
