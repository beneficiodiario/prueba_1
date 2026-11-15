// ════════════════════════════════════════════════════════════════
//  URLs retiradas → su tema más cercano (301 permanente).
//  Un artículo indexado que desaparece sin redirección deja un 404 y
//  pierde los enlaces que había ganado. Esta lista es la referencia:
//  vercel.json y public/.htaccess deben repetirla (lo comprueba el test).
// ════════════════════════════════════════════════════════════════
export const REDIRECTS = [
  // Noviembre 2026: Abstract y Markets dejan de estar entre los proyectos que seguimos.
  { from: '/blog/beneficiodiario-comunidad-abstract-espanol', to: '/airdrops' },
  { from: '/en/blog/beneficiodiario-comunidad-abstract-espanol', to: '/en' },
  { from: '/blog/markets-hyperliquid-app', to: '/perp-dex' },
  { from: '/en/blog/markets-hyperliquid-app', to: '/en' },
]
