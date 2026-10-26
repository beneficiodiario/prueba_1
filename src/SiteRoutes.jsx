import { Routes, Route } from 'react-router-dom'
import App from './App'
import ArticlePage from './pages/ArticlePage'
import DocumentPage from './pages/DocumentPage'
import NotFoundPage from './pages/NotFoundPage'
import { DOCUMENT_PAGES } from './data/routes'

export default function SiteRoutes() {
  return <Routes>
    <Route path="/" element={<App initialLang="es" />} />
    <Route path="/en" element={<App initialLang="en" />} />
    <Route path="/blog/:slug" element={<ArticlePage lang="es" />} />
    <Route path="/en/blog/:slug" element={<ArticlePage lang="en" />} />
    {DOCUMENT_PAGES.map(page => <Route key={page.path} path={page.path} element={<DocumentPage page={page} />} />)}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
}
