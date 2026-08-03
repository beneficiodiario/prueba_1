import { Component } from 'react'

// ════════════════════════════════════════════════════════════════
//  Aísla una parte prescindible de la web.
//
//  El aviso de cookies y los espacios de patrocinadores son accesorios:
//  si fallan, la web tiene que seguir en pie. Antes no era así — un
//  bloqueador de anuncios impedía cargar el módulo del aviso de cookies
//  y, como colgaba del arranque, React no montaba nada y la página se
//  quedaba en blanco.
//
//  Captura errores de render y, combinado con lazy(), también los de
//  carga del módulo.
// ════════════════════════════════════════════════════════════════

export class SafeBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    // Sin ruido en producción: es una parte accesoria y ya está aislada.
    if (import.meta.env.DEV) {
      console.warn(`[${this.props.name || 'bloque accesorio'}] desactivado:`, error?.message)
    }
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null
    return this.props.children
  }
}
