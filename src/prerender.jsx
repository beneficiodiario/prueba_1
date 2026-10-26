import { renderToPipeableStream } from 'react-dom/server'
import { PassThrough } from 'node:stream'
import { StaticRouter } from 'react-router-dom'
import SiteRoutes from './SiteRoutes'
import { ThemeProvider } from './lib/theme'
import { ConsentProvider } from './lib/ConsentContext'

export function renderPage(path) {
  return new Promise((resolve, reject) => {
    const output = new PassThrough()
    const chunks = []
    output.on('data', chunk => chunks.push(chunk))
    output.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    output.on('error', reject)
    const stream = renderToPipeableStream(
      <ThemeProvider><StaticRouter location={path}><ConsentProvider><SiteRoutes /></ConsentProvider></StaticRouter></ThemeProvider>,
      { onAllReady() { stream.pipe(output) }, onShellError: reject, onError: reject },
    )
  })
}
