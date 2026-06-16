// Recuerda el modo noche entre páginas (home y artículos) vía localStorage.
export const getDark = () => {
  try { return localStorage.getItem('bd_dark') === '1' } catch (e) { return false }
}
export const setDark = (v) => {
  try { localStorage.setItem('bd_dark', v ? '1' : '0') } catch (e) { /* noop */ }
}
