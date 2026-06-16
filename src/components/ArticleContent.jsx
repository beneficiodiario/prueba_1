// Renderiza el cuerpo de un artículo con formato visual (párrafos, listas, tablas, datos)
export default function ArticleContent({ content, darkMode }) {
  if (!content) return null
  const paraC = darkMode ? 'text-gray-300' : 'text-gray-600'
  const headC = darkMode ? 'text-white' : 'text-gray-900'
  const boxC  = darkMode ? 'bg-[#00b4d8]/8 border-[#00b4d8]/20' : 'bg-[#00b4d8]/5 border-[#00b4d8]/15'
  const numBoxC = darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100'

  const blocks = content.split('\n\n').filter(Boolean)

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        // Bloque de puntos con ·
        if (block.includes('\n·') || block.startsWith('·')) {
          const lines = block.split('\n').filter(Boolean)
          return (
            <div key={i} className={`rounded-2xl p-4 border ${boxC}`}>
              {lines.map((line, j) => (
                <div key={j} className="flex items-start gap-2.5 py-1">
                  {line.startsWith('·') ? (
                    <>
                      <span className="text-[#00b4d8] font-bold mt-0.5 flex-shrink-0">→</span>
                      <p className={`font-body text-sm leading-relaxed ${paraC}`}>{line.replace(/^·\s*/, '')}</p>
                    </>
                  ) : (
                    <p className={`font-body text-sm font-semibold leading-relaxed ${headC}`}>{line}</p>
                  )}
                </div>
              ))}
            </div>
          )
        }

        // Tabla de resultados (líneas con →)
        if (block.includes('→') && block.includes('%')) {
          const lines = block.split('\n').filter(Boolean)
          return (
            <div key={i} className={`rounded-2xl border overflow-hidden ${darkMode ? 'border-white/10' : 'border-gray-100'}`}>
              {lines.map((line, j) => {
                const [left, right] = line.split('→').map(s => s.trim())
                return (
                  <div key={j} className={`flex items-center justify-between px-4 py-2.5 ${j % 2 === 0 ? (darkMode ? 'bg-white/3' : 'bg-gray-50/60') : ''}`}>
                    <span className={`font-mono text-sm ${paraC}`}>{left}</span>
                    <span className="font-mono font-bold text-sm text-emerald-500">{right}</span>
                  </div>
                )
              })}
            </div>
          )
        }

        // Datos de cripto (precio / ROI) — líneas con ":"
        if (block.match(/^(Bitcoin|Ethereum|Solana|BNB|XRP|Precio|Price|ROI|Valor|Current|Approximate)/)) {
          const lines = block.split('\n').filter(Boolean)
          const title = lines[0]
          const rest = lines.slice(1)
          return (
            <div key={i} className={`rounded-2xl p-4 border ${numBoxC}`}>
              <p className={`font-display font-bold text-sm mb-2 ${headC}`}>{title}</p>
              {rest.map((line, j) => {
                const [label, value] = line.split(':').map(s => s?.trim())
                return value ? (
                  <div key={j} className="flex justify-between items-center py-1 border-b border-[#00b4d8]/10 last:border-0">
                    <span className={`font-body text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{label}</span>
                    <span className={`font-mono text-xs font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{value}</span>
                  </div>
                ) : (
                  <p key={j} className={`font-body text-xs ${paraC}`}>{line}</p>
                )
              })}
            </div>
          )
        }

        // Título de sección (¿...? o termina en ?)
        if (block.startsWith('¿') || block.startsWith('What') || block.startsWith('How') || (block.trim().endsWith('?') && block.length < 80)) {
          return <p key={i} className={`font-display font-bold text-base pt-2 ${headC}`}>{block}</p>
        }

        // Resumen / tabla final
        if (block.startsWith('·') || (block.includes('·') && block.split('\n').every(l => l.startsWith('·') || l === ''))) {
          return (
            <div key={i} className={`rounded-2xl p-4 border ${boxC}`}>
              {block.split('\n').filter(Boolean).map((line, j) => (
                <div key={j} className="flex items-start gap-2 py-0.5">
                  <span className="text-[#00b4d8] flex-shrink-0">•</span>
                  <p className={`font-body text-sm ${paraC}`}>{line.replace(/^·\s*/, '')}</p>
                </div>
              ))}
            </div>
          )
        }

        // Párrafo normal
        return <p key={i} className={`font-body text-sm leading-relaxed ${paraC}`}>{block}</p>
      })}
    </div>
  )
}
