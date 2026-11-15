// ── Site metadata (SEO) ──
export const SITE = {
  name: 'Beneficio Diario',
  alternateName: 'BeneficioDiario',
  url: 'https://beneficiodiario.com',
  description: 'Portal gratuito en español sobre criptomonedas, airdrops, perp DEX, farming de puntos e ingresos pasivos. Guías, riesgos y enlaces a servicios de terceros, sin registro.',
  // Temas que cubre el portal: alimentan el JSON-LD y los recursos para LLMs.
  topics: {
    es: ['Airdrops cripto', 'Perp DEX', 'Farming de puntos', 'Estrategia delta neutral', 'Ingresos pasivos', 'DeFi', 'Criptomonedas'],
    en: ['Crypto airdrops', 'Perp DEX', 'Points farming', 'Delta neutral strategy', 'Passive income', 'DeFi', 'Cryptocurrencies'],
  },
  logo: '/logo-bd.png',
  // Imagen al compartir la portada (1672×941, cabe en summary_large_image).
  ogImage: '/delta-neutral-cover.webp',
  twitter: 'https://twitter.com/BeneficioDiario',
  youtube: 'https://www.youtube.com/@beneficiodiario_com',
  email: 'info@beneficiodiario.com',
}

// ── Metadatos por página ──
// Títulos y descripciones propios por idioma; los fragmentos dependen del buscador.
export const PAGES = {
  home: {
    es: {
      title: 'Beneficio Diario | Airdrops, perp DEX e ingresos con cripto',
      description: 'Guías gratuitas de airdrops, perp DEX, farming de puntos e ingresos pasivos: RISEx, TxFlow, Onchain.cc, VOID y GRVT, con sus riesgos y sin registro.',
      path: '/',
    },
    en: {
      title: 'Beneficio Diario | Crypto airdrops, perp DEXes and income',
      description: 'Free guides on crypto airdrops, perp DEXes, points farming and passive income: RISEx, TxFlow, Onchain.cc, VOID and GRVT, with their risks. No sign-up.',
      path: '/en',
    },
  },
}

export const faqs = [
  {
    "q": {
      "es": "¿Qué es Beneficio Diario?",
      "en": "What is Beneficio Diario?"
    },
    "a": {
      "es": "Beneficio Diario es un portal gratuito gestionado por particulares con información sobre criptomonedas, ingresos pasivos, airdrops y cashback. Publicamos guías y enlaces a sitios de terceros. No somos una entidad financiera ni gestionamos fondos.",
      "en": "Beneficio Diario is a free portal run by individuals, with information about crypto, passive income, airdrops and cashback. We publish guides and links to third-party sites. We are not a financial institution and do not manage funds."
    }
  },
  {
    "q": {
      "es": "¿Necesito registrarme o iniciar sesión?",
      "en": "Do I need to register or log in?"
    },
    "a": {
      "es": "No. Todo el contenido de Beneficio Diario se puede consultar sin login ni registro. Los sitios de terceros pueden pedirte una cuenta, verificación de identidad u otros requisitos bajo sus propias condiciones.",
      "en": "No. You can read all Beneficio Diario content without an account or login. Third-party sites may require an account, identity checks or other conditions."
    }
  },
  {
    "q": {
      "es": "¿Qué proyectos seguís ahora mismo?",
      "en": "Which projects do you follow right now?"
    },
    "a": {
      "es": "En noviembre de 2026 seguimos tres perp DEX con programas de puntos activos (RISEx, TxFlow y Onchain.cc), VOID Network, un proyecto gratuito en fase temprana, y GRVT, que ya repartió su airdrop y sigue operativo como perp DEX. Ninguna recompensa está garantizada y las condiciones cambian: cada ficha explica su riesgo y enlaza a la web oficial.",
      "en": "As of November 2026 we follow three perp DEXes with active points programmes (RISEx, TxFlow and Onchain.cc), VOID Network, a free early-stage project, and GRVT, which has already distributed its airdrop and remains live as a perp DEX. No reward is guaranteed and terms change: each card explains its risk and links to the official site."
    }
  },
  {
    "q": {
      "es": "¿Qué es un perp DEX y cómo funcionan sus puntos?",
      "en": "What is a perp DEX and how do its points work?"
    },
    "a": {
      "es": "Un perp DEX es un exchange descentralizado de contratos perpetuos: permite operar long o short con apalancamiento y sin fecha de vencimiento. Muchos reparten puntos por volumen, comisiones o interés abierto que podrían convertirse en un airdrop, aunque no está garantizado. El apalancamiento puede liquidar tu posición; lo explicamos en la guía de perp DEX.",
      "en": "A perp DEX is a decentralized exchange for perpetual contracts: you can go long or short with leverage and no expiry date. Many hand out points for volume, fees or open interest that might turn into an airdrop, although this is not guaranteed. Leverage can liquidate your position; our perp DEX guide (in Spanish) explains it."
    }
  },
  {
    "q": {
      "es": "¿Qué es la estrategia delta neutral?",
      "en": "What is the delta neutral strategy?"
    },
    "a": {
      "es": "Es abrir dos posiciones opuestas del mismo tamaño en plataformas distintas, por ejemplo long en TxFlow y short en RISEx, para que el precio afecte poco al conjunto mientras se acumula actividad en ambas. No elimina el riesgo: cada lado puede liquidarse por separado, el funding puede ir en contra y las comisiones se duplican.",
      "en": "It means opening two opposite positions of the same size on different platforms, for example long on TxFlow and short on RISEx, so price moves barely affect the whole while activity builds up on both. It does not remove risk: each side can be liquidated separately, funding can go against you and fees double."
    }
  },
  {
    "q": {
      "es": "¿Cuánto dinero necesito para empezar?",
      "en": "How much money do I need to start?"
    },
    "a": {
      "es": "Depende del proyecto. VOID Network no pide depósito. En los perp DEX que seguimos, una referencia práctica es de unos 50 USDC para probar con posiciones pequeñas, más las comisiones de red. Empieza solo con dinero que puedas permitirte perder y sin apalancamiento alto.",
      "en": "It depends on the project. VOID Network requires no deposit. On the perp DEXes we follow, a practical reference is around 50 USDC to test with small positions, plus network fees. Only start with money you can afford to lose and without high leverage."
    }
  },
  {
    "q": {
      "es": "¿Qué son los ingresos pasivos?",
      "en": "What is passive income?"
    },
    "a": {
      "es": "Son ingresos que pueden requerir menos intervención continua después de un trabajo o inversión inicial. No significan dinero sin esfuerzo ni sin riesgo. Staking y DeFi tienen riesgos propios; trading, tareas de airdrops y cashback no deben confundirse con ingresos pasivos garantizados.",
      "en": "Income that may require less ongoing intervention after initial work or investment. It does not mean effortless or risk-free money. Staking and DeFi have their own risks; trading, airdrop tasks and cashback are not guaranteed passive income."
    }
  },
  {
    "q": {
      "es": "¿Un airdrop o una testnet garantizan ganar dinero?",
      "en": "Does an airdrop or testnet guarantee earnings?"
    },
    "a": {
      "es": "No. Acumular puntos o realizar tareas no garantiza que haya un reparto, que seas elegible ni que los tokens tengan valor. Puede haber costes de red, tiempo, exposición de datos y riesgos de cartera. Comprueba siempre la fecha y las reglas oficiales.",
      "en": "No. Points and tasks do not guarantee a distribution, eligibility or tokens with market value. There may be network fees, time costs, data exposure and wallet risks. Always check the date and official rules."
    }
  },
  {
    "q": {
      "es": "¿Es dinero fácil o hay rentabilidad garantizada?",
      "en": "Is this easy money or guaranteed profit?"
    },
    "a": {
      "es": "No garantizamos ingresos ni rentabilidad. Los criptoactivos pueden perder todo su valor. Los ejemplos, porcentajes promocionales y resultados pasados dependen de su fecha y condiciones y no aseguran un resultado futuro.",
      "en": "We do not guarantee income or returns. Cryptoassets can lose all their value. Examples, promotional rates and past results depend on their date and conditions and do not guarantee future outcomes."
    }
  },
  {
    "q": {
      "es": "¿Cómo se financia el portal?",
      "en": "How is the portal funded?"
    },
    "a": {
      "es": "Podemos recibir ingresos de publicidad, colaboraciones y enlaces de afiliación o referido. Estos incentivos pueden influir en la selección de proyectos. El acceso sigue siendo gratuito. Consulta la política de transparencia y las condiciones del proveedor.",
      "en": "We may earn revenue from advertising, partnerships and affiliate or referral links. These incentives may influence project selection. Access remains free. Read our transparency policy and the provider’s terms."
    }
  },
  {
    "q": {
      "es": "¿Qué datos recoge la analítica?",
      "en": "What does analytics collect?"
    },
    "a": {
      "es": "Con tu consentimiento, Vercel Web Analytics permite obtener estadísticas de navegación. No cargamos Google Analytics. Puedes rechazar o configurar por separado analítica y publicidad y cambiar la elección desde el pie de página.",
      "en": "With your consent, Vercel Web Analytics provides browsing statistics. We do not load Google Analytics. You can reject or configure analytics and advertising separately and change your choice in the footer."
    }
  },
  {
    "q": {
      "es": "¿Cómo contacto con Beneficio Diario?",
      "en": "How do I contact Beneficio Diario?"
    },
    "a": {
      "es": "Puedes escribir a info@beneficiodiario.com para consultas, correcciones y privacidad. El portal se gestiona desde Barcelona, España. Para problemas con depósitos, cuentas o recompensas de un tercero debes contactar con su soporte oficial.",
      "en": "Email info@beneficiodiario.com for questions, corrections and privacy requests. The portal is run from Barcelona, Spain. For third-party deposits, accounts or rewards, contact the provider’s official support."
    }
  }
]
