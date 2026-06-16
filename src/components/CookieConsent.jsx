const T = {
  title:  { es: 'Tu privacidad', en: 'Your privacy' },
  text: {
    es: 'Usamos cookies propias y de terceros para analítica (Google Analytics) y para mostrar publicidad. Puedes aceptarlas todas o rechazarlas. Si rechazas, no se cargará ningún sistema de seguimiento ni anuncios.',
    en: 'We use first- and third-party cookies for analytics (Google Analytics) and to show ads. You can accept them all or reject them. If you reject, no tracking or ads will load.',
  },
  accept: { es: 'Aceptar', en: 'Accept' },
  reject: { es: 'Rechazar', en: 'Reject' },
}

export default function CookieConsent({ darkMode = false, lang = 'es', onAccept, onReject }) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-[9000] p-3 sm:p-4 flex justify-center pointer-events-none">
      <div className={`pointer-events-auto w-full max-w-3xl rounded-2xl border shadow-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 ${darkMode ? 'bg-[#0d1220] border-white/10' : 'bg-white border-gray-200'}`}>
        <div className="flex-1">
          <p className={`font-display font-bold text-sm mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{T.title[lang] || T.title.es}</p>
          <p className={`font-body text-[12px] leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {T.text[lang] || T.text.es}{' '}
            <a href="/privacidad" className="text-[#00b4d8] hover:underline">{(lang === 'en' ? 'More info' : 'Más información')}</a>
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={onReject}
            className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-display font-semibold text-sm border transition-all ${darkMode ? 'border-white/15 text-gray-300 hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {T.reject[lang] || T.reject.es}
          </button>
          <button onClick={onAccept}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-display font-bold text-sm text-white bg-gradient-to-br from-[#00b4d8] to-[#0077b6] hover:-translate-y-0.5 transition-all">
            {T.accept[lang] || T.accept.es}
          </button>
        </div>
      </div>
    </div>
  )
}
