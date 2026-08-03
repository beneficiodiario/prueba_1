import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import CountUp from 'react-countup'
import { Section, SectionHeader } from './ui/Section'
import { Card } from './ui/Card'
import { FiTrendingUp, FiTrendingDown, FiRefreshCw } from './ui/icons'
import { cryptoPortfolio } from '../data/content'
import { fadeLeft, stagger, viewport, revealInitial } from '../lib/motion'

// Precios de respaldo por si CoinGecko no responde. Alineados con los
// valores "actuales (mayo 2026)" del artículo top-5-criptos-2020.
const FALLBACK = {
  BTC: { price: 95000, ytd: -26.3 },
  ETH: { price: 1800,  ytd: -33.8 },
  SOL: { price: 145,   ytd: -56.8 },
  BNB: { price: 595,   ytd: -11.4 },
  XRP: { price: 2.10,  ytd: -44.2 },
}

const COINGECKO_IDS = { BTC: 'bitcoin', ETH: 'ethereum', SOL: 'solana', BNB: 'binancecoin', XRP: 'ripple' }

const T = {
  eyebrow: { es: 'Portfolio cripto', en: 'Crypto portfolio' },
  title:   { es: 'Top 5 · compradas en 2020', en: 'Top 5 · bought in 2020' },
  sub: {
    es: 'Las 5 criptomonedas con mayor capitalización en las que invertimos en 2020. Rendimiento YTD 2026 y ROI acumulado.',
    en: 'The 5 largest market cap cryptos we invested in during 2020. YTD 2026 performance and total ROI.',
  },
  disclaimer: {
    es: 'YTD desde el 1 de enero de 2026. ROI calculado sobre el precio estimado de 2020. Datos orientativos, no asesoramiento financiero.',
    en: 'YTD from January 1, 2026. ROI calculated on the estimated 2020 price. Indicative data, not financial advice.',
  },
  price:   { es: 'Precio actual', en: 'Current price' },
  since:   { es: 'Desde 2020', en: 'Since 2020' },
  bought:  { es: 'Compra 2020', en: 'Buy 2020' },
  refresh: { es: 'Actualizar precios', en: 'Refresh prices' },
  updated: { es: 'Actualizado ahora', en: 'Updated just now' },
  recent:  { es: 'Datos recientes', en: 'Recent data' },
  loading: { es: 'Actualizando…', en: 'Updating…' },
  up:      { es: 'sube', en: 'up' },
  down:    { es: 'baja', en: 'down' },
}

const fmtPrice = (n) =>
  n >= 1 ? n.toLocaleString('en-US', { maximumFractionDigits: 2 }) : n.toFixed(4)

function CoinRow({ coin, data, lang }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  const price = data?.price || 0
  const ytd   = data?.ytd || 0
  const isUp  = ytd >= 0
  const roi   = price > 0 && coin.buyPrice2020 > 0
    ? ((price - coin.buyPrice2020) / coin.buyPrice2020) * 100
    : 0

  const Trend = isUp ? FiTrendingUp : FiTrendingDown

  return (
    <motion.li ref={ref} variants={fadeLeft}>
      <Card
        interactive
        tone="glass"
        className="flex items-center gap-4 p-4 sm:p-5 !rounded-2xl"
      >
        <img
          src={coin.image}
          alt=""
          width="40" height="40"
          loading="lazy"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full shrink-0"
          onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
        />

        <div className="min-w-0 flex-1">
          <div className="font-display font-bold text-sm sm:text-base text-fg">{coin.symbol}</div>
          <div className="font-body text-[11px] text-fg-subtle truncate">{coin.name}</div>
        </div>

        <div className="text-right hidden sm:block">
          <div className="font-mono font-semibold text-sm text-fg tabular">${fmtPrice(price)}</div>
          <div className="font-body text-[10px] text-fg-subtle">{T.price[lang]}</div>
        </div>

        <div className="text-right min-w-[74px]">
          {/* El icono acompaña al signo: la variación no se comunica solo con color */}
          <div className={`font-mono font-bold text-sm flex items-center justify-end gap-1 tabular ${isUp ? 'text-success-fg' : 'text-danger-fg'}`}>
            <Trend size={13} aria-hidden="true" />
            <span>
              <span className="sr-only">{isUp ? T.up[lang] : T.down[lang]} </span>
              {isUp ? '+' : ''}{ytd.toFixed(1)}%
            </span>
          </div>
          <div className="font-body text-[10px] text-fg-subtle">YTD 2026</div>
        </div>

        <div className="text-right min-w-[88px] hidden md:block">
          <div className="font-mono font-bold text-sm text-success-fg tabular">
            {inView
              ? <CountUp end={Math.round(roi)} duration={1.8} separator="." prefix="+" suffix="%" />
              : '+0%'}
          </div>
          <div className="font-body text-[10px] text-fg-subtle">{T.since[lang]}</div>
        </div>

        <div className="text-right min-w-[68px] hidden lg:block">
          <div className="font-mono text-xs text-fg-muted tabular">
            ${coin.buyPrice2020 >= 1 ? coin.buyPrice2020.toLocaleString('en-US') : coin.buyPrice2020}
          </div>
          <div className="font-body text-[10px] text-fg-subtle">{T.bought[lang]}</div>
        </div>
      </Card>
    </motion.li>
  )
}

export default function Portfolio({ lang }) {
  const [prices, setPrices] = useState(FALLBACK)
  const [loading, setLoading] = useState(false)
  const [fresh, setFresh] = useState(false)

  const fetchPrices = useCallback(async (signal) => {
    setLoading(true)
    try {
      const ids = Object.values(COINGECKO_IDS).join(',')
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`,
        { signal },
      )
      if (!res.ok) throw new Error(String(res.status))
      const data = await res.json()

      setPrices((prev) =>
        Object.fromEntries(
          Object.entries(COINGECKO_IDS).map(([sym, id]) => [
            sym,
            { price: data[id]?.usd ?? prev[sym].price, ytd: FALLBACK[sym].ytd },
          ]),
        ),
      )
      setFresh(true)
    } catch {
      // Se mantienen los precios de respaldo; no hay nada que avisar.
    } finally {
      if (!signal?.aborted) setLoading(false)
    }
  }, [])

  useEffect(() => {
    const ctrl = new AbortController()
    fetchPrices(ctrl.signal)
    return () => ctrl.abort()
  }, [fetchPrices])

  const status = loading ? T.loading[lang] : fresh ? T.updated[lang] : T.recent[lang]

  return (
    <Section id="portfolio" tone="base" width="prose">
      <SectionHeader
        eyebrow={T.eyebrow[lang]}
        title={T.title[lang]}
        subtitle={T.sub[lang]}
        className="!mb-8"
      />

      <div className="flex justify-center mb-10">
        <button
          type="button"
          onClick={() => fetchPrices()}
          disabled={loading}
          className="inline-flex items-center gap-2 min-h-[40px] px-4 rounded-pill border border-line bg-surface font-body text-xs text-fg-muted hover:text-brand-fg hover:border-brand-500/40 transition-colors duration-base disabled:opacity-60"
        >
          <FiRefreshCw size={13} className={loading ? 'animate-spin' : ''} aria-hidden="true" />
          <span>{T.refresh[lang]}</span>
          <span className="text-fg-subtle">·</span>
          <span aria-live="polite">{status}</span>
        </button>
      </div>

      <motion.ul
        variants={stagger(0.06)}
        initial={revealInitial}
        whileInView="visible"
        viewport={viewport}
        className="flex flex-col gap-3 list-none"
      >
        {cryptoPortfolio.map((coin) => (
          <CoinRow key={coin.symbol} coin={coin} data={prices[coin.symbol]} lang={lang} />
        ))}
      </motion.ul>

      <p className="font-body text-[11px] leading-relaxed text-center text-fg-subtle mt-8 max-w-[46ch] mx-auto">
        {T.disclaimer[lang]}
      </p>
    </Section>
  )
}
