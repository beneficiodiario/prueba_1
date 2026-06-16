// ════════════════════════════════════════════════════════════════
//  CONFIGURACIÓN DE ANALÍTICA Y MONETIZACIÓN — BeneficioDiario
//  Este es el ÚNICO archivo que necesitas editar.
//  Cambia solo los valores entre comillas; no toques los nombres.
// ════════════════════════════════════════════════════════════════

// ── 1) GOOGLE ANALYTICS 4 ───────────────────────────────────────
// Pega aquí tu "ID de medición". Tiene el formato G-XXXXXXXXXX.
// Cómo conseguirlo:
//   1. Entra en https://analytics.google.com y crea una cuenta.
//   2. Crea una propiedad para tu web y un "Flujo de datos" web.
//   3. Copia el ID de medición (Administrar → Flujos de datos).
// Mientras esté vacío ('') la analítica no se carga.
export const GA_MEASUREMENT_ID = 'G-DBEE0W706C' // ej: 'G-ABCD1234EF'

// ── 2) ANUNCIOS (Google AdSense) ────────────────────────────────
// Cuando AdSense te apruebe, crea "bloques de anuncios" y pega sus números
// de "slot" abajo. Mientras estén vacíos verás un hueco de ejemplo.
//   client = tu ID de editor (ca-pub-XXXX). slots = el número de cada bloque.
export const ADS_ENABLED = true // pon false para ocultar TODOS los anuncios

export const ADSENSE = {
  client: 'ca-pub-9078026717479448', // ID de editor de AdSense
  slots: {
    banner: '',    // slot del banner superior. ej: '1234567890'
    inArticle: '', // slot de dentro de los artículos. ej: '0987654321'
  },
}

// A-ADS (red cripto) — respaldo TEMPORAL mientras AdSense no esté activo.
// En cuanto rellenes los 'slots' de AdSense arriba, AdSense tiene prioridad
// y A-ADS deja de mostrarse. Déjalo vacío ('') si no quieres respaldo.
export const A_ADS = {
  banner: '2438815',
  inArticle: '',
}

// ── 3) NEWSLETTER (Beehiiv) ─────────────────────────────────────
// ID del formulario de Beehiiv (Grow → Subscribe Forms → Embed). Es el valor
// que aparece en data-beehiiv-form="..." dentro del código que te da Beehiiv.
// Mientras esté vacío verás un cajón de ejemplo.
export const BEEHIIV_FORM_ID = '5729e3fe-2866-4dc3-9cb7-10c7694b174d'

// ── 4) COMUNIDAD ESPAÑOLA DE ABSTRACT (sección "Novedades") ────
// Pega aquí los enlaces de la comunidad española de Abstract Chain.
// Cualquier campo vacío oculta su botón. Si están todos vacíos se muestra
// solo el aviso "enlaces próximamente".
export const ABSTRACT_COMMUNITY = {
  telegram: 'https://t.me/AbstractESP',
  x:        'https://x.com/AbstractChainES',
  youtube:  'https://www.youtube.com/@AbstractEspa%C3%B1ol',
}
