// ════════════════════════════════════════════════════════════════
//  Vocabulario de movimiento — un solo ritmo para toda la web.
//  Reglas que seguimos:
//   · entrada con ease-out, salida ~65% más corta que la entrada
//   · micro-interacciones 150-250ms, revelados 300-550ms
//   · escalonado de 40-100ms por elemento, nunca cadenas largas
//   · solo transform, opacity y filter (nunca width/height/top/left)
// ════════════════════════════════════════════════════════════════

export const ease = {
  out:   [0.16, 1, 0.3, 1],   // expo.out — entradas
  quart: [0.25, 1, 0.5, 1],   // suavizado general
  inOut: [0.65, 0, 0.35, 1],  // ida y vuelta
  in:    [0.55, 0, 1, 0.45],  // salidas
}

export const duration = {
  fast:   0.15,
  base:   0.25,
  slow:   0.4,
  reveal: 0.55,
}

/** Punto de disparo compartido: revela una sola vez, poco antes de entrar. */
export const viewport = { once: true, amount: 0.2, margin: '0px 0px -8% 0px' }

// ── Salvaguarda: animar es una mejora, no un requisito ───────────
//
// Los revelados arrancan en opacity 0 y dependen de que la animación
// llegue a ejecutarse. Si no se ejecuta, el contenido se queda
// invisible y la web parece rota. Es lo que pasaba en Chrome al abrir
// la pestaña en segundo plano: sin requestAnimationFrame no hay
// animación, y sin animación no había contenido.
//
// Se evalúa una vez al cargar el módulo. Cuando no se puede animar con
// garantías, `revealInitial` vale false, que en motion significa
// "pinta directamente el estado final". El contenido siempre se ve.

const canAnimate = (() => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false
  // Quien pide menos movimiento, recibe el contenido sin más.
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false
  // Pestaña en segundo plano: el navegador congela rAF.
  if (document.visibilityState === 'hidden') return false
  return true
})()

/** Valor para la prop `initial` de cualquier revelado por scroll. */
export const revealInitial = canAnimate ? 'hidden' : false

/** Para los adornos y efectos 3D: si no se puede animar, ni se montan. */
export const decorative = canAnimate

// ── Variantes ────────────────────────────────────────────────────

/** Aparición desde abajo. El desplazamiento es corto: se lee como fundido. */
export const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.reveal, ease: ease.out } },
}

/** Entrada lateral — para listas y filas de datos. */
export const fadeLeft = {
  hidden:  { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: duration.reveal, ease: ease.out } },
}

/** Escala contenida: nunca por debajo de 0.96, si no parece un salto. */
export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: duration.slow, ease: ease.out } },
}

/** Revelado con desenfoque — reservado al héroe, es caro de componer. */
export const blurUp = {
  hidden:  { opacity: 0, y: 22, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: ease.out } },
}

/**
 * Contenedor que escalona a sus hijos.
 * Ojo: las variantes se propagan a los descendientes, así que un hijo
 * con `animate` en forma de objeto (o un AnimatePresence) debe llevar
 * siempre su propia `key` para que entrada y salida funcionen.
 *
 * @param {number} staggerChildren segundos entre hijos
 * @param {number} delayChildren   retardo antes del primero
 */
export const stagger = (staggerChildren = 0.04, delayChildren = 0) => ({
  hidden:  {},
  visible: { transition: { staggerChildren, delayChildren } },
})
