// ════════════════════════════════════════════════════════════════
//  Cuerpo de un artículo.
//  El contenido llega como texto plano con convenciones sencillas:
//   · línea que empieza por "·"  → viñeta dentro de un panel
//   · línea con "→" y "%"        → fila de tabla resultado
//   · bloque que abre con un tér-
//     mino de precio o ROI       → panel de datos etiqueta/valor
//   · pregunta corta             → subtítulo de sección
//   · el resto                   → párrafo
//  El cuerpo va en serif: se lee mejor en textos largos que la sans
//  de la interfaz, y da el aire de medio de análisis que buscamos.
// ════════════════════════════════════════════════════════════════

const DATA_BLOCK = /^(Bitcoin|Ethereum|Solana|BNB|XRP|Precio|Price|ROI|Valor|Current|Approximate)/
const QUESTION_OPENERS = ['¿', 'What', 'How', 'Why', 'When']

const isBulletBlock = (b) => b.startsWith('·') || b.includes('\n·')
const isResultTable = (b) => b.includes('→') && b.includes('%')
const isHeading = (b) =>
  QUESTION_OPENERS.some((o) => b.startsWith(o)) || (b.trimEnd().endsWith('?') && b.length < 80)

function BulletPanel({ lines }) {
  return (
    <div className="rounded-card border border-brand-500/20 bg-brand-500/[0.06] p-5">
      <ul className="space-y-2 list-none">
        {lines.map((line, j) =>
          line.startsWith('·') ? (
            <li key={j} className="flex items-start gap-2.5">
              <span aria-hidden="true" className="mt-[0.45em] w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
              <span className="font-serif text-[15px] leading-relaxed text-fg-muted">
                {line.replace(/^·\s*/, '')}
              </span>
            </li>
          ) : (
            <li key={j} className="font-display font-bold text-sm text-fg pb-1">{line}</li>
          ),
        )}
      </ul>
    </div>
  )
}

function ResultTable({ lines }) {
  return (
    <div className="rounded-card border border-line overflow-hidden">
      {lines.map((line, j) => {
        const [left, right] = line.split('→').map((s) => s.trim())
        return (
          <div
            key={j}
            className={`flex items-center justify-between gap-4 px-4 py-3 ${j % 2 === 0 ? 'bg-surface-2' : ''}`}
          >
            <span className="font-mono text-sm text-fg-muted">{left}</span>
            <span className="font-mono font-bold text-sm text-success-fg tabular">{right}</span>
          </div>
        )
      })}
    </div>
  )
}

function DataPanel({ title, rows }) {
  return (
    <div className="rounded-card border border-line bg-surface-2 p-5">
      <p className="font-display font-bold text-sm text-fg mb-3">{title}</p>
      <dl className="space-y-0">
        {rows.map((line, j) => {
          const [label, value] = line.split(':').map((s) => s?.trim())
          if (!value) {
            return <p key={j} className="font-serif text-sm text-fg-muted py-1">{line}</p>
          }
          return (
            <div key={j} className="flex justify-between items-center gap-4 py-2 border-b border-line/60 last:border-0">
              <dt className="font-body text-xs text-fg-subtle">{label}</dt>
              <dd className="font-mono text-xs font-semibold text-fg tabular">{value}</dd>
            </div>
          )
        })}
      </dl>
    </div>
  )
}

export default function ArticleContent({ content }) {
  if (!content) return null

  const blocks = content.split('\n\n').filter(Boolean)

  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        const lines = block.split('\n').filter(Boolean)

        if (isBulletBlock(block)) return <BulletPanel key={i} lines={lines} />
        if (isResultTable(block)) return <ResultTable key={i} lines={lines} />
        if (DATA_BLOCK.test(block)) {
          return <DataPanel key={i} title={lines[0]} rows={lines.slice(1)} />
        }
        if (isHeading(block)) {
          return (
            <h2 key={i} className="font-display font-bold text-xl text-fg pt-4 text-balance">
              {block}
            </h2>
          )
        }

        return (
          <p key={i} className="font-serif text-[17px] leading-[1.75] text-fg-muted">
            {block}
          </p>
        )
      })}
    </div>
  )
}
