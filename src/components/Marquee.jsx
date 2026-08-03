import { marqueeItems } from '../data/content'

// Se triplica la lista para que el bucle de -33.3333% empalme sin salto.
const ITEMS = [...marqueeItems, ...marqueeItems, ...marqueeItems]

/**
 * Cinta de titulares inclinada en el eje X.
 * La perspectiva la hace parecer una cinta física alejándose, y el
 * degradado de los bordes remata la ilusión sin recortes bruscos.
 */
export default function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-line bg-surface-sunken transition-colors duration-slow"
      style={{ perspective: '340px' }}
    >
      <div
        className="py-5 mask-edges"
        style={{ transform: 'rotateX(14deg)', transformStyle: 'preserve-3d' }}
      >
        {/* La animación se pausa al pasar el ratón: si algo interesa, se lee */}
        <div className="flex gap-10 w-max animate-marquee hover:[animation-play-state:paused]">
          {ITEMS.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-3 whitespace-nowrap font-display font-bold text-xs tracking-[0.1em] text-fg-subtle"
            >
              <span className="w-1 h-1 rounded-full bg-brand-500/70" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Sombra inferior: asienta la cinta sobre la sección siguiente */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-6"
        style={{ background: 'linear-gradient(to top, rgb(var(--bg) / 0.55), transparent)' }}
      />
    </div>
  )
}
