// ════════════════════════════════════════════════════════════════
//  CONFIGURACIÓN DE ANALÍTICA Y MONETIZACIÓN — BeneficioDiario
//  Este es el ÚNICO archivo que necesitas editar.
//  Cambia solo los valores entre comillas; no toques los nombres.
// ════════════════════════════════════════════════════════════════

// ── 1) ANALÍTICA ───────────────────────────────────────────────
// Vercel Web Analytics se integra en ConsentProvider. Actívalo en el panel
// del proyecto Vercel; solo se carga al aceptar la categoría de analítica.

// ── 2) ANUNCIOS (Google AdSense) ────────────────────────────────
// Cuando AdSense te apruebe, crea "bloques de anuncios" y pega sus números
// de "slot" abajo. Mientras estén vacíos verás un hueco de ejemplo.
//   client = tu ID de editor (ca-pub-XXXX). slots = el número de cada bloque.
export const ADS_ENABLED = true // pon false para ocultar TODOS los anuncios

// Alto de la barra superior. Vive aquí y no en el componente porque el
// layout necesita el valor de inmediato, mientras que el componente se
// carga aparte para que no pueda bloquear el arranque de la web.
export const TOP_BAR_HEIGHT = 90

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
