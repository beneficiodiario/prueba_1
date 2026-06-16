import { marqueeItems } from '../data/content'
export default function Marquee({ darkMode }) {
  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems]
  return (
    <div className={`py-4 overflow-hidden border-y transition-colors duration-500 ${darkMode ? 'bg-[#0d1220] border-white/5' : 'bg-gray-50/80 border-[#00b4d8]/[0.04]'}`}>
      <div className="flex gap-10 animate-marquee w-max">
        {items.map((t, i) => (
          <span key={i} className={`font-display font-bold text-xs tracking-[0.1em] flex items-center gap-3 whitespace-nowrap ${darkMode ? 'text-gray-500' : 'text-gray-300'}`}>
            <span className="w-1 h-1 rounded-full bg-[#00b4d8] opacity-50" />{t}
          </span>
        ))}
      </div>
    </div>
  )
}
