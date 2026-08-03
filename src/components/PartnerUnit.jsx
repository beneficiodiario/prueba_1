import { useEffect, useRef } from 'react'

// Bloque de anuncio de Google AdSense (formato responsive)
export default function PartnerUnit({ client, slot }) {
  const pushed = useRef(false)
  useEffect(() => {
    if (pushed.current) return
    pushed.current = true
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}) } catch (e) { /* noop */ }
  }, [])
  return (
    <ins className="adsbygoogle"
      style={{ display: 'block', width: '100%' }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true" />
  )
}
