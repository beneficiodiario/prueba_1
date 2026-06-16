import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { FiTrendingUp, FiTrendingDown, FiRefreshCw } from 'react-icons/fi'
import { cryptoPortfolio } from '../data/content'

// Precios de respaldo (solo si falla CoinGecko). Alineados con los valores
// "actuales (mayo 2026)" del artículo top-5-criptos-2020. El ytd es orientativo.
const FALLBACK = {
  BTC: { price: 95000, ytd: -26.3 },
  ETH: { price: 1800, ytd: -33.8 },
  SOL: { price: 145, ytd: -56.8 },
  BNB: { price: 595, ytd: -11.4 },
  XRP: { price: 2.10, ytd: -44.2 },
}

function CryptoRow({ coin, data, i, darkMode, lang }) {
  const [ref, vis] = useInView({ triggerOnce: true, threshold: 0.2 })
  const price = data?.price || 0
  const ytd = data?.ytd || 0
  const roi2020 = price > 0 && coin.buyPrice2020 > 0 ? ((price - coin.buyPrice2020) / coin.buyPrice2020 * 100) : 0
  const isUp = ytd >= 0
  const rowBg = darkMode ? 'bg-white/5 border-white/8' : 'glass border-transparent'
  const nameC = darkMode ? 'text-white' : 'text-gray-900'
  const priceC = darkMode ? 'text-gray-200' : 'text-gray-800'
  const monoC = darkMode ? 'text-gray-400' : 'text-gray-500'

  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -30 }} animate={vis ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.08, ease: [.23, 1, .32, 1] }}
      className={`rounded-2xl p-4 sm:p-5 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#00b4d8]/8 transition-all duration-300 border ${rowBg}`}>
      <img src={coin.image} alt={coin.symbol} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex-shrink-0" onError={e => e.target.style.display='none'} />
      <div className="min-w-0 flex-1">
        <div className={`font-display font-bold text-sm sm:text-base ${nameC}`}>{coin.symbol}</div>
        <div className="font-body text-[11px] text-gray-400 truncate">{coin.name}</div>
      </div>
      <div className="text-right hidden sm:block">
        <div className={`font-mono font-semibold text-sm ${priceC}`}>
          ${price >= 1 ? price.toLocaleString('en', { maximumFractionDigits: 2 }) : price.toFixed(4)}
        </div>
        <div className="font-body text-[10px] text-gray-400">{lang === 'es' ? 'Precio actual' : 'Current price'}</div>
      </div>
      <div className="text-right min-w-[70px]">
        <div className={`font-mono font-bold text-sm flex items-center justify-end gap-1 ${isUp ? 'text-emerald-500' : 'text-red-400'}`}>
          {isUp ? <FiTrendingUp size={13} /> : <FiTrendingDown size={13} />}
          {isUp ? '+' : ''}{ytd.toFixed(1)}%
        </div>
        <div className="font-body text-[10px] text-gray-400">YTD 2026</div>
      </div>
      <div className="text-right min-w-[85px] hidden md:block">
        <div className="font-mono font-bold text-sm text-emerald-500">
          {vis ? <CountUp end={Math.round(roi2020)} duration={2} separator="." prefix="+" suffix="%" /> : '+0%'}
        </div>
        <div className="font-body text-[10px] text-gray-400">{lang === 'es' ? 'Desde 2020' : 'Since 2020'}</div>
      </div>
      <div className="text-right min-w-[65px] hidden lg:block">
        <div className={`font-mono text-xs ${monoC}`}>${coin.buyPrice2020 >= 1 ? coin.buyPrice2020.toLocaleString() : coin.buyPrice2020}</div>
        <div className="font-body text-[10px] text-gray-400">{lang === 'es' ? 'Compra 2020' : 'Buy 2020'}</div>
      </div>
    </motion.div>
  )
}

export default function Portfolio({ darkMode, lang }) {
  const [ref, vis] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [prices, setPrices] = useState(FALLBACK)
  const [loading, setLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(lang === 'es' ? 'Datos recientes' : 'Recent data')

  const fetchPrices = async () => {
    setLoading(true)
    try {
      const ids = 'bitcoin,ethereum,solana,binancecoin,ripple'
      const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`)
      if (res.ok) {
        const d = await res.json()
        setPrices({
          BTC: { price: d.bitcoin?.usd, ytd: FALLBACK.BTC.ytd },
          ETH: { price: d.ethereum?.usd, ytd: FALLBACK.ETH.ytd },
          SOL: { price: d.solana?.usd, ytd: FALLBACK.SOL.ytd },
          BNB: { price: d.binancecoin?.usd, ytd: FALLBACK.BNB.ytd },
          XRP: { price: d.ripple?.usd, ytd: FALLBACK.XRP.ytd },
        })
        setLastUpdate(lang === 'es' ? 'Actualizado ahora' : 'Updated now')
      }
    } catch {}
    setLoading(false)
  }

  useEffect(() => { fetchPrices() }, [])

  const t = {
    label: { es: 'PORTFOLIO CRIPTO', en: 'CRYPTO PORTFOLIO' },
    title: { es: 'Top 5 · Compradas en 2020', en: 'Top 5 · Bought in 2020' },
    sub:   { es: 'Las 5 criptomonedas con mayor capitalización en las que invertimos en 2020. Rendimiento YTD 2026 y ROI acumulado.', en: 'The 5 largest market cap cryptos we invested in 2020. YTD 2026 performance and total ROI.' },
    disc:  { es: '* YTD desde 1 enero 2026. ROI desde precio estimado en 2020. Datos orientativos, no asesoramiento financiero.', en: '* YTD from January 1, 2026. ROI from estimated 2020 price. Indicative data, not financial advice.' },
  }

  return (
    <section id="portfolio" className={`py-24 px-5 sm:px-8 transition-colors duration-500 ${darkMode ? 'bg-[#080d1a]' : 'bg-gradient-to-b from-white to-gray-50/50'}`}>
      <div className="max-w-3xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 35 }} animate={vis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-12">
          <span className="font-body text-[11px] font-bold text-[#00b4d8] tracking-[0.12em] uppercase">{t.label[lang]}</span>
          <h2 className={`font-display font-extrabold text-[clamp(26px,3.5vw,44px)] tracking-tight mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t.title[lang]}</h2>
          <p className={`font-body text-sm max-w-md mx-auto mt-3 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.sub[lang]}</p>
          <button onClick={fetchPrices} disabled={loading}
            className="mt-4 inline-flex items-center gap-1.5 font-body text-xs text-[#00b4d8] hover:text-[#0077b6] transition-colors">
            <FiRefreshCw size={12} className={loading ? 'animate-spin' : ''} /> {lastUpdate}
          </button>
        </motion.div>
        <div className="flex flex-col gap-3">
          {cryptoPortfolio.map((coin, i) => (
            <CryptoRow key={coin.symbol} coin={coin} data={prices[coin.symbol]} i={i} darkMode={darkMode} lang={lang} />
          ))}
        </div>
        <p className={`font-body text-[10px] text-center mt-6 max-w-md mx-auto ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>{t.disc[lang]}</p>
      </div>
    </section>
  )
}
