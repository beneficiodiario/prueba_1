import { lazy, Suspense } from 'react'
import { SafeBoundary } from './SafeBoundary'

// El hueco de patrocinador se carga aparte y aislado: si el navegador
// decide no descargarlo, el artículo se lee igual.
const PartnerSlot = lazy(() => import('./PartnerSlot'))

export function PartnerSlotSafe(props) {
  return (
    <SafeBoundary name="hueco de patrocinador">
      <Suspense fallback={null}>
        <PartnerSlot {...props} />
      </Suspense>
    </SafeBoundary>
  )
}
