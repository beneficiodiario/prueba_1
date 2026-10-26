import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../dist/', import.meta.url))
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' }

export function createPreviewServer() {
  return createServer(async (request, response) => {
    try {
      const url = new URL(request.url, 'http://localhost')
      const pathname = decodeURIComponent(url.pathname)
      if (pathname !== '/' && (pathname.endsWith('/') || pathname.endsWith('.html') && pathname !== '/404.html')) {
        response.writeHead(308, { Location: pathname.replace(/(?:\/|\.html)$/, '') + url.search })
        response.end()
        return
      }
      const relative = pathname === '/' ? 'index.html' : pathname.slice(1)
      let file = resolve(root, relative)
      if (!file.startsWith(resolve(root) + sep)) throw new Error('Invalid path')
      let status = 200
      try { if (!(await stat(file)).isFile()) throw new Error('Not a file') }
      catch {
        file = resolve(root, `${relative}.html`)
        try { if (!(await stat(file)).isFile()) throw new Error('Not a file') }
        catch { file = resolve(root, '404.html'); status = 404 }
      }
      const content = await readFile(file)
      response.writeHead(status, { 'Content-Type': types[extname(file)] || 'application/octet-stream',
        'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-cache', ...(status === 404 ? { 'X-Robots-Tag': 'noindex, follow' } : {}) })
      response.end(request.method === 'HEAD' ? undefined : content)
    } catch {
      response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' })
      response.end('Bad request')
    }
  })
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.argv[2] || 4173)
  createPreviewServer().listen(port, '127.0.0.1', () => console.log(`Vista estática: http://127.0.0.1:${port}`))
}
