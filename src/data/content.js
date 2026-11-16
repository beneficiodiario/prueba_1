// ── Projects ──
export const projects = [
  {
    id: 'void',
    title: 'VOID Network',
    tag: 'EARLY STAGE',
    tagColor: '#6366f1',
    emoji: '🌌',
    desc: {
      es: 'VOID Network es un proyecto en fase muy temprana que recuerda a lo que fue PI Network en sus inicios, pero con una base técnica más sólida desde el principio. La idea es sencilla: participar ahora, cuando hay poca gente dentro, para acumular tokens* VOID antes de que el proyecto escale.\n\nEl coste es mínimo: dos clics al día (uno cada 12 horas) y una ruleta adicional disponible cada hora después de empezar a minar*. Sin dinero, sin complicaciones. Solo tiempo y constancia.',
      en: 'VOID Network is a very early-stage project that resembles what PI Network was in its beginnings, but with a stronger technical foundation from the start. The idea is simple: join now, while few people are inside, to accumulate VOID tokens* before the project scales.\n\nThe cost is minimal: two clicks a day (one every 12 hours) and an extra wheel spin available every hour after you start mining*. No money, no complications. Just time and consistency.',
    },
    features: {
      es: [
        'Solo 2 clics al día, sin inversión económica',
        'Fase BETA activa: 500 tokens* de bono por registro',
        'Mecánica de minado* cada 12 horas + ruleta de bonus',
        'Blockchain* propia en desarrollo con utilidades futuras',
        'Comunidad en crecimiento acelerado desde fase temprana',
        'Modelo similar al de PI Network en sus inicios',
      ],
      en: [
        'Only 2 clicks a day, no financial investment',
        'Active BETA phase: 500 bonus tokens* on signup',
        'Mining* mechanic every 12 hours + bonus wheel spin',
        'Own blockchain* in development with future utilities',
        'Rapidly growing community from early stage',
        'Similar model to PI Network in its early days',
      ],
    },
    stats: {
      es: { roi: 'Variable', risk: 'Bajo', time: 'Diario', min: '€0' },
      en: { roi: 'Variable', risk: 'Low', time: 'Daily', min: '€0' },
    },
    gradient: 'linear-gradient(135deg, #1e1b4b, #4f46e5)',
    image: '/void-cover.png',
    link: 'https://app.voidnetwork.app/auth?ref=6FFB3B1B',
    refCode: '6FFB3B1B',
    videoUrl: 'https://www.youtube.com/watch?v=sXkPZHqYbVo',
    featured: true,
    featuredRow: 2,
  },
  {
    id: 'grvt',
    title: 'GRVT',
    tag: 'TRADING DEX',
    tagColor: '#00b4d8',
    emoji: '⚡',
    desc: {
      es: 'GRVT (Gravity) es una plataforma de trading descentralizado que va más allá del concepto tradicional de exchange*. Están construyendo lo que llaman un brokerage on-chain*: un entorno donde tu capital no está parado, sino generando rendimiento mientras operas.\n\nEl airdrop* ya se ha cerrado y repartido: nuestra asignación fue de 452,76 GRVT, unos 106 $ al cambio del reparto. No se libera de golpe, va por tramos (vesting*): el primero llegó el 30 de julio de 2026 y el siguiente está previsto para el 30 de noviembre. La plataforma sigue operativa para hacer trading.',
      en: 'GRVT (Gravity) is a decentralized trading platform that goes beyond the traditional exchange* concept. They are building what they call a brokerage on-chain*: an environment where your capital is not idle, but generating yield while you trade.\n\nThe airdrop* is now closed and distributed: our allocation was 452.76 GRVT, around $106 at distribution rates. It is not released all at once but in tranches (vesting*): the first landed on 30 July 2026 and the next is scheduled for 30 November. The platform remains live for trading.',
    },
    features: {
      es: [
        'Balance "composable": tu capital genera yield* mientras tradeas*',
        'Depósitos con rendimiento de hasta 11% APY*',
        'Privacidad ZK* y autocustodia* de fondos',
        '+20% de puntos extra de airdrop* por referido',
        'Niveles VIP con mejores condiciones y rebates* de fees',
        'Equipo con background en Goldman Sachs, DBS Bank y Meta',
      ],
      en: [
        '"Composable" balance: your capital generates yield* while you trade*',
        'Deposits with up to 11% APY* yield',
        'ZK* privacy and self-custody* of funds',
        '+20% extra airdrop* points per referral',
        'VIP levels with better conditions and fee rebates*',
        'Team with background at Goldman Sachs, DBS Bank and Meta',
      ],
    },
    // El airdrop está cerrado, pero la plataforma sigue operativa: la
    // frecuencia se refiere al trading, no al reparto.
    stats: {
      es: { roi: '106 $', risk: 'Medio', time: 'Activo', min: 'Variable' },
      en: { roi: '$106', risk: 'Medium', time: 'Active', min: 'Variable' },
    },
    // Resultado real del airdrop, con las cifras del panel de GRVT.
    // Se muestra tal cual: es la prueba de que lo que publicamos lo usamos.
    airdrop: {
      status: 'closed',
      label:      { es: 'Airdrop cerrado', en: 'Airdrop closed' },
      totalUsd:   106,
      token:      'GRVT',
      allocation: 452.764752,
      claimed:    22.638237,
      nextUnlock: { amount: 45.276475, date: '2026-11-30' },
      lastClaim:  '2026-07-30',
      rows: {
        es: [
          { label: 'Asignación total', value: '452,764752 GRVT' },
          { label: 'Ya reclamado',     value: '22,638237 GRVT' },
          { label: 'Próximo tramo',    value: '45,276475 GRVT · 30 nov 2026' },
        ],
        en: [
          { label: 'Total allocation', value: '452.764752 GRVT' },
          { label: 'Already claimed',  value: '22.638237 GRVT' },
          { label: 'Next tranche',     value: '45.276475 GRVT · 30 Nov 2026' },
        ],
      },
      note: {
        es: 'Cifras reales de nuestra cuenta. El reparto es por tramos, no se cobra todo de golpe.',
        en: 'Real figures from our own account. Distribution is in tranches, not paid out all at once.',
      },
      // Capturas de prueba. Si el archivo no existe, el bloque no se muestra.
      proof: [
        { src: '/grvt-airdrop-allocation.png', alt: { es: 'Panel de GRVT con la asignación del airdrop', en: 'GRVT panel showing the airdrop allocation' } },
        { src: '/grvt-airdrop-claim.png',      alt: { es: 'Correo de GRVT confirmando el tramo reclamado', en: 'GRVT email confirming the claimed tranche' } },
      ],
    },
    gradient: 'linear-gradient(135deg, #0f3460, #00b4d8)',
    image: '/grvt-cover.png',
    link: 'https://grvt.io/?ref=QUE4FO5',
    refCode: 'QUE4FO5',
    videoUrl: 'https://youtu.be/Z6N7A9qE0qM?si=wk7JMO1srFiMJK12',
    featured: true,
    featuredRow: 2,
  },
  {
    id: 'polymarket',
    title: 'Polymarket',
    tag: 'PREDICTION MARKET',
    tagColor: '#06b6d4',
    emoji: '🎯',
    comingSoon: true,
    desc: {
      es: 'Polymarket es el mayor mercado de predicción descentralizado del mundo. Permite apostar sobre el resultado de eventos reales — elecciones, mercados, deportes, cripto — comprando y vendiendo posiciones en función de tu análisis.\n\nNo es trading tradicional: es anticiparte al mercado con información y criterio. Próximamente os traemos nuestra guía completa.',
      en: 'Polymarket is the world\'s largest decentralized prediction market. It allows you to bet on the outcome of real events — elections, markets, sports, crypto — by buying and selling positions based on your analysis.\n\nIt\'s not traditional trading: it\'s getting ahead of the market with information and judgment. Our full guide is coming soon.',
    },
    features: {
      es: [
        'Mercado de predicción descentralizado on-chain',
        'Opera sobre eventos reales: política, cripto, deportes',
        'Liquidez real y precios de mercado eficientes',
        'Sin intermediarios — contratos inteligentes en Polygon',
        'Guía completa de BeneficioDiario — Próximamente',
      ],
      en: [
        'Decentralized on-chain prediction market',
        'Trade on real events: politics, crypto, sports',
        'Real liquidity and efficient market prices',
        'No intermediaries — smart contracts on Polygon',
        'Full BeneficioDiario guide — Coming soon',
      ],
    },
    stats: {
      es: { roi: 'Variable', risk: 'Medio', time: 'Variable', min: '$1' },
      en: { roi: 'Variable', risk: 'Medium', time: 'Variable', min: '$1' },
    },
    gradient: 'linear-gradient(135deg, #0e7490, #06b6d4)',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=340&fit=crop',
    link: 'https://polymarket.com',
    refCode: null,
    featured: false,
  },
  {
    id: 'forex',
    title: 'Forex Trading',
    tag: 'DIVISAS',
    tagColor: '#0077b6',
    emoji: '📈',
    comingSoon: true,
    desc: {
      es: 'El mercado de divisas (Forex*) es el más grande y líquido del mundo, con más de 7 billones de dólares operados cada día. A través de análisis técnico* y señales verificadas, es posible obtener rentabilidades consistentes con una gestión de riesgo adecuada.',
      en: 'The foreign exchange market (Forex*) is the largest and most liquid in the world, with over 7 trillion dollars traded every day. Through technical analysis* and verified signals, it is possible to obtain consistent returns with proper risk management.',
    },
    features: {
      es: [
        'Señales verificadas en tiempo real vía Telegram',
        'Análisis técnico* y fundamental diario',
        'Salas de trading* en vivo con mentor',
        'Gestión de riesgo con Stop Loss* y Take Profit* automáticos',
        'Compatible con MetaTrader 4/5 y cTrader',
        'Formación desde cero hasta nivel avanzado',
      ],
      en: [
        'Verified real-time signals via Telegram',
        'Daily technical* and fundamental analysis',
        'Live trading* rooms with mentor',
        'Risk management with automatic Stop Loss* and Take Profit*',
        'Compatible with MetaTrader 4/5 and cTrader',
        'Training from beginner to advanced level',
      ],
    },
    stats: {
      es: { roi: '8-15%', risk: 'Medio', time: 'Diario', min: '€500' },
      en: { roi: '8-15%', risk: 'Medium', time: 'Daily', min: '€500' },
    },
    gradient: 'linear-gradient(135deg, #0077b6, #00b4d8)',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=340&fit=crop',
    link: '#',
    refCode: null,
    featured: false,
  },
  {
    id: 'defi',
    title: 'Crypto & DeFi',
    tag: 'BLOCKCHAIN',
    tagColor: '#6366f1',
    emoji: '⛓️',
    comingSoon: true,
    desc: {
      es: 'Las finanzas descentralizadas (DeFi*) permiten acceder a servicios financieros sin intermediarios tradicionales. Staking*, yield farming* y selección de tokens* con potencial son las tres palancas que utilizamos para generar rentabilidad dentro del ecosistema blockchain*.',
      en: 'Decentralized finance (DeFi*) allows access to financial services without traditional intermediaries. Staking*, yield farming* and selection of high-potential tokens* are the three levers we use to generate returns within the blockchain* ecosystem.',
    },
    features: {
      es: [
        'Staking* optimizado en SOL, ETH y otras redes',
        'Yield farming* en protocolos auditados y seguros',
        'Análisis on-chain* y métricas DeFi* avanzadas',
        'Alertas de oportunidades en tiempo real',
        'Portfolio tracking* multichain integrado',
        'Guías de seguridad y cold storage*',
      ],
      en: [
        'Optimized staking* on SOL, ETH and other networks',
        'Yield farming* in audited and secure protocols',
        'Advanced on-chain* analysis and DeFi* metrics',
        'Real-time opportunity alerts',
        'Integrated multichain portfolio tracking*',
        'Security guides and cold storage*',
      ],
    },
    stats: {
      es: { roi: '10-25%', risk: 'Alto', time: 'Semanal', min: '€200' },
      en: { roi: '10-25%', risk: 'High', time: 'Weekly', min: '€200' },
    },
    gradient: 'linear-gradient(135deg, #4f46e5, #8b5cf6)',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=340&fit=crop',
    link: '#',
    refCode: null,
    featured: false,
  },
  {
    id: 'risex', title: 'RISEx', tag: 'PERP DEX · RISE L2', tagColor: '#7c5cff', emoji: '📊', isNew: true,
    desc: {
      es: 'RISEx es un exchange descentralizado de contratos perpetuos construido sobre RISE, una red de capa 2. Su programa RISE Points Season 1: Ignite distribuye puntos semanalmente según la actividad elegible. Los puntos pueden ayudar a posicionarse ante futuras recompensas, pero el valor, reparto y fecha de un posible airdrop no están garantizados ni definidos públicamente. Conecta tu wallet, revisa las reglas y costes antes de operar. El apalancamiento puede provocar pérdidas rápidas: no operes solo para acumular puntos.',
      en: 'RISEx is a decentralized perpetuals exchange built on RISE, a Layer 2 network. Its RISE Points Season 1: Ignite program distributes points weekly based on eligible activity. Points may help qualify for future rewards, but the value, allocation and date of any potential airdrop are not guaranteed or publicly defined. Connect your wallet and review rules and fees before trading. Leverage can cause rapid losses, so do not trade solely to accumulate points.'
    },
    features: {
      es: ['Programa RISE Points Season 1: Ignite activo; consulta las reglas oficiales', 'Puntos semanales según actividad elegible', 'La actividad puede incluir volumen, comisiones e interés abierto', 'El referido puede ofrecer ventajas según las condiciones vigentes', 'Dificultad media: requiere entender órdenes, comisiones y perpetuos', 'Airdrop potencial, no garantizado; sin asignación individual confirmada'],
      en: ['RISE Points Season 1: Ignite is active; check official rules', 'Weekly points based on eligible activity', 'Activity may include volume, fees and open interest', 'Referral benefits depend on current terms', 'Medium difficulty: understand orders, fees and perpetuals', 'Potential airdrop, not guaranteed; no confirmed individual allocation']
    },
    stats: { es: { roi: 'Variable', risk: 'Variable', time: 'Sem/Día', min: '$50' }, en: { roi: 'Variable', risk: 'Variable', time: 'Wk/Day', min: '$50' } },
    gradient: 'linear-gradient(135deg, #312e81, #8b5cf6)', image: '/risex-cover.webp',
    link: 'https://www.rise.trade/invite/javiitolevelup', refCode: 'javiitolevelup', videoUrl: null, featured: true, featuredRow: 1,
  },
  {
    id: 'txflow', title: 'TxFlow', tag: 'PERP DEX · LAYER 1', tagColor: '#0ea5e9', emoji: '🌊', isNew: true,
    desc: {
      es: 'TxFlow es una infraestructura blockchain de capa 1 con mercados on-chain de spot, perpetuos y predicciones. Su exchange utiliza un libro de órdenes on-chain. El referido anuncia un 5% de descuento en comisiones para los primeros 25 millones de dólares de volumen, sujeto a condiciones. No hay un airdrop ni un token confirmado públicamente. Existen campañas puntuales de créditos de comisiones y fuentes externas mencionan posible contabilización retroactiva de actividad, pero no debe tratarse como una promesa oficial. Revisa campañas activas y evita asumir riesgo solo por especular con recompensas.',
      en: 'TxFlow is a Layer 1 blockchain with on-chain spot, perpetual and prediction markets and an on-chain order book. The referral advertises a 5% trading-fee discount on the first $25 million in volume, subject to terms. No airdrop or token has been publicly confirmed. Occasional fee-credit campaigns exist and external sources mention possible retroactive activity tracking, but this is not an official token promise. Check active campaigns and do not take risks solely to speculate on rewards.'
    },
    features: {
      es: ['Mercados on-chain de perpetuos, spot y predicciones sobre TxFlow L1', 'Referido: descuento anunciado del 5% en comisiones para los primeros $25M de volumen', 'Puede haber campañas temporales de créditos de comisiones', 'Airdrop y token no confirmados oficialmente', 'Dificultad media-alta: plataforma nueva y trading especializado', 'Tiempo inicial estimado: 10-20 minutos; luego depende de la actividad'],
      en: ['On-chain perpetual, spot and prediction markets on TxFlow L1', 'Referral advertises 5% fee discount on the first $25M in volume', 'Temporary fee-credit campaigns may be available', 'No officially confirmed airdrop or token', 'Medium-high difficulty: new platform and specialised trading', 'Estimated setup: 10-20 minutes; ongoing time depends on activity']
    },
    stats: { es: { roi: 'Variable', risk: 'Variable', time: 'Sem/Día', min: '$50' }, en: { roi: 'Variable', risk: 'Variable', time: 'Wk/Day', min: '$50' } },
    gradient: 'linear-gradient(135deg, #0f172a, #0ea5e9)', image: '/txflow-cover.webp',
    link: 'https://app.txflow.com/r/M12HAK2TB6', refCode: 'M12HAK2TB6', videoUrl: null, featured: true, featuredRow: 1,
  },
  {
    id: 'onchain', title: 'Onchain.cc', tag: 'PERP DEX · PREDICTIONS', tagColor: '#22c55e', emoji: '🏟️', isNew: true,
    desc: {
      es: 'Onchain.cc es una terminal de trading autocustodiada con perpetuos, spot, memecoins, mercados de predicción y swaps. Su programa Colosseum Season 2 está activo y anuncia un fondo de recompensas de 300.000 USD, sesiones semanales, misiones, cajas de botín y puntos de clasificación. Lo que reciba cada usuario depende de las reglas y resultados de la campaña; no es una cantidad garantizada ni implica necesariamente un airdrop de token. Las operaciones elegibles suman puntos y el rango desbloquea cashback de parte de las comisiones en USDC. Comprueba las comisiones antes de operar.',
      en: 'Onchain.cc is a self-custodial trading terminal with perpetuals, spot, memecoins, prediction markets and swaps. Its Colosseum Season 2 is live and advertises a $300,000 rewards pool, weekly sessions, quests, loot boxes and rank points. Individual rewards depend on campaign rules and results; they are not guaranteed and do not necessarily mean a token airdrop. Eligible trades earn points and rank unlocks cashback on part of fees in USDC. Check fees before trading.'
    },
    features: {
      es: ['Colosseum Season 2 activo: fondo anunciado de 300.000 USD en recompensas', 'Perpetuos, spot, predicciones, swaps y mercados de memecoins', 'Puntos, misiones, sesiones semanales y cajas de botín', 'Cashback anunciado del 25% al 50% de las comisiones según rango', 'Dificultad media: conectar wallet y revisar mercado y costes', 'Recompensas de campaña activas; airdrop de token no garantizado'],
      en: ['Colosseum Season 2 is live: advertised $300,000 rewards pool', 'Perpetuals, spot, predictions, swaps and memecoin markets', 'Points, quests, weekly sessions and loot boxes', 'Advertised 25%-50% fee cashback depending on rank', 'Medium difficulty: connect a wallet and check market costs', 'Campaign rewards are live; token airdrop is not guaranteed']
    },
    stats: { es: { roi: 'Variable', risk: 'Variable', time: 'Diaria', min: '$50' }, en: { roi: 'Variable', risk: 'Variable', time: 'Daily', min: '$50' } },
    gradient: 'linear-gradient(135deg, #064e3b, #22c55e)', image: '/onchain-cover.webp',
    link: 'https://app.onchain.cc/?referral=75308D2B', refCode: '75308D2B', videoUrl: null, featured: true, featuredRow: 1,
  },
]

// ── Crypto Portfolio ──
export const cryptoPortfolio = [
  { symbol: 'BTC', name: 'Bitcoin', buyPrice2020: 9200, image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg' },
  { symbol: 'ETH', name: 'Ethereum', buyPrice2020: 130, image: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg' },
  { symbol: 'SOL', name: 'Solana', buyPrice2020: 0.50, image: 'https://cryptologos.cc/logos/solana-sol-logo.svg' },
  { symbol: 'BNB', name: 'BNB', buyPrice2020: 13, image: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg' },
  { symbol: 'XRP', name: 'XRP', buyPrice2020: 0.18, image: 'https://cryptologos.cc/logos/xrp-xrp-logo.svg' },
]

// ── Blog Posts ──
export const blogPosts = [
  {
    id: 6,
    slug: 'estrategia-delta-neutral-txflow-risex',
    title: { es: 'Estrategia delta neutral: cómo farmear puntos en TxFlow y RISEx sin exposición al mercado', en: 'Delta neutral strategy: how to farm points on TxFlow and RISEx without market exposure' },
    excerpt: { es: 'Dos perp DEX nuevos con programas de puntos activos. Combínalos con posiciones opuestas y acumula actividad en los dos sin depender de si el mercado sube o baja.', en: 'Two new perp DEXes with active points programs. Combine them with opposite positions and accumulate activity on both without depending on whether the market goes up or down.' },
    date: '12 Nov 2026',
    tag: { es: 'Estrategia', en: 'Strategy' },
    readTime: '7 min',
    image: '/delta-neutral-cover.webp',
    content: {
      es: `TxFlow y RISEx son dos de los perp DEX más comentados de estas últimas semanas, y los dos tienen un programa activo de puntos. Si estás pensando en participar en los dos a la vez, hay una forma de hacerlo con mucho menos ruido en la cuenta: la estrategia delta neutral.

¿Qué es ser "delta neutral"?

En trading, delta mide cuánto cambia el valor de tu posición cuando el precio del activo sube o baja. Una posición long* gana con la subida; una short* al revés. Si mantienes long y short del mismo tamaño a la vez, el efecto se compensa: lo que pierdes por un lado lo recuperas por el otro. Tu "delta" neto queda cerca de cero.

En términos prácticos: el mercado puede moverse arriba o abajo, pero tu cartera apenas se mueve. Lo único que trabaja es la actividad —volumen, interés abierto, comisiones—, es decir, lo que suele contar para los puntos.

¿Por qué TxFlow y RISEx encajan tan bien?

Son plataformas distintas, cada una con su propio programa:

· TxFlow es una Layer 1 con libro de órdenes on-chain*. Anuncia un descuento del 5% en comisiones durante los primeros 25 millones de dólares de volumen por referido, y suele tener campañas puntuales de créditos de comisiones.

· RISEx es un perp DEX sobre RISE, una Layer 2. Su programa RISE Points Season 1: Ignite reparte puntos cada semana en función del volumen, las comisiones y el interés abierto.

Como son dos protocolos diferentes, abrir una posición en uno y la contraria en el otro acumula actividad en ambos a la vez, sin que ninguna gane terreno frente a la otra.

Cómo se hace, paso a paso

1. Fondea la misma cantidad de USDC en cada plataforma. Mejor en redes con comisiones bajas (Base, Arbitrum o la propia L2 de RISE). Mantén algo de margen de seguridad fuera de la posición.

2. Elige un activo con buena liquidez en los dos sitios. BTC y ETH son los más seguros porque tienen libros de órdenes profundos.

3. Abre long* en una plataforma y short* en la otra, del mismo tamaño nominal. Delta neto cercano a cero.

4. Usa apalancamiento* bajo. 2x o 3x como mucho. Estás acumulando actividad, no buscando dirección.

5. Revisa el funding rate*. Equilibra la posición del lado con funding negativo o rota según toque.

6. Rota cuando toque. Cerca del snapshot* de una campaña, si una plataforma pide más volumen para subir de rango, cierra la posición y vuelve a abrirla en el otro sentido.

Qué riesgos tiene

· Liquidación*. Un movimiento violento del precio contra tu lado apalancado puede liquidarte antes de que el otro lado compense. Margen de seguridad obligatorio.
· Funding* desfavorable. Si pagas funding en los dos lados a la vez, estás sangrando saldo todo el rato.
· Riesgo técnico. Son plataformas nuevas. Pausas, bugs, retrasos en los retiros existen.
· Reglas de los puntos. Que el programa haga snapshot* "hoy" no significa que premie exactamente lo que hiciste ayer.

En resumen

La delta neutral no es magia: es una forma de aprovechar que dos protocolos premian actividad para posicionarse en los dos sin asumir que el mercado va a ir en una dirección concreta. Requiere disciplina con el apalancamiento, atención al funding y gestión del tamaño de la posición.

Si quieres probarlo, regístrate primero en los dos perp DEX con nuestros enlaces y familiarízate con cada interfaz con cantidades pequeñas antes de montar la posición completa:`,
      en: `TxFlow and RISEx are two of the most talked-about perp DEXes of the last few weeks, and both have an active points program. If you are thinking of taking part in both at the same time, there is a way to do it with much less noise in the account: the delta neutral strategy.

What does "delta neutral" mean?

In trading, delta measures how much your position value changes when the asset price moves up or down. A long* position gains with the move up; a short* the other way around. If you hold the same size long and short at the same time, the effect cancels out. Your net "delta" stays close to zero.

In practical terms: the market can move up or down, but your portfolio barely moves. What is working is the activity — volume, open interest, fees — exactly what usually counts for points.

Why do TxFlow and RISEx fit so well together?

· TxFlow is a Layer 1 with an on-chain* order book. It advertises a 5% fee discount for the first 25 million dollars of volume per referral.
· RISEx is a perp DEX on RISE, a Layer 2. Its RISE Points Season 1: Ignite program distributes points every week based on volume, fees and open interest.

Since they are two separate protocols, opening a position on one and the opposite on the other accumulates activity on both at the same time, with neither gaining ground over the other.

How to do it, step by step

1. Fund the same amount of USDC on each platform. Use low-fee networks (Base, Arbitrum or RISE own L2).
2. Pick an asset with good liquidity on both sites. BTC and ETH are the safest.
3. Open a long* on one platform and a short* on the other, same nominal size. Net delta near zero.
4. Use low leverage*. 2x or 3x at most.
5. Watch the funding rate*. Rebalance toward the side with negative funding or rotate when needed.
6. Rotate when it makes sense. Close to a campaign snapshot*, close the position and reopen it the other way around.

What are the risks?

· Liquidation*. A violent price move against your leveraged side can liquidate you before the other side compensates.
· Unfavorable funding*. If you pay funding on both sides at once, you bleed balance the whole time.
· Technical risk. These are new platforms. Pauses, bugs, withdrawal delays exist.
· Points rules. Just because a program snapshots* today does not mean it rewards exactly what you did yesterday.

In summary

Delta neutral is not magic: it is a way to take advantage of two protocols rewarding activity so you can position in both without betting that the market will move in a specific direction.

If you want to try it, sign up on both perp DEXes with our links first and get familiar with each interface using small amounts before building the full position:`,
    },
    refLink: 'https://www.rise.trade/invite/javiitolevelup',
    refCode: 'javiitolevelup',
    refLabel: { es: 'Empezar en RISEx', en: 'Start on RISEx' },
    extraRefLink: 'https://app.txflow.com/r/M12HAK2TB6',
    extraRefCode: 'M12HAK2TB6',
    extraRefLabel: { es: 'Empezar en TxFlow', en: 'Start on TxFlow' },
  },
  {
    id: 1,
    slug: 'kast-usd-cashback-dinero-real',
    title: { es: 'KAST lanza el USD Cashback: dinero real de vuelta en cada compra', en: 'KAST launches USD Cashback: real money back on every purchase' },
    excerpt: { es: 'KAST acaba de activar el cashback en dólares reales. Ya no son puntos ni tokens: es USD directo a tu saldo cada vez que usas la tarjeta.', en: 'KAST has just activated cashback in real dollars. No more points or tokens: it\'s USD directly to your balance every time you use the card.' },
    date: '5 May 2026',
    tag: { es: 'Histórico', en: 'Archive' },
    readTime: '4 min',
    image: '/kast-cashback.jpg',
    extraImage: '/kast-cashback.jpg',
    content: {
      es: `ACTUALIZACIÓN (noviembre 2026): KAST ya no forma parte de nuestros proyectos destacados actuales. Mantenemos este artículo como archivo histórico sobre su programa de cashback. La información sobre comisiones y planes puede haber cambiado — consulta la web oficial de KAST antes de usar el enlace.

KAST acaba de dar un paso importante: a partir de ahora, cada vez que uses tu tarjeta recibes dólares reales de vuelta de forma automática. Sin puntos que canjear manualmente, sin esperas innecesarias. Gastas y el cashback* llega directo.

Es un cambio relevante respecto al modelo anterior, y merece la pena entender bien cómo funciona para sacarle el máximo partido.

¿Cómo funciona el cashback según tu plan?

KAST tiene tres niveles, y el porcentaje de devolución varía en función del que tengas activo:

· Plan Standard (gratuito): 1,5% de cashback* en USD sobre los primeros $2.000 de gasto mensual (máximo $30 al mes). Sin puntos adicionales.

· Plan Premium ($1.000/año): 2% de cashback* en USD sobre los primeros $10.000 de gasto mensual (máximo $200 al mes) + 1% en KAST Points* sin límite.

· Plan Private ($10.000/año): 3% de cashback* en USD sobre los primeros $40.000 de gasto mensual (máximo $1.200 al mes) + 2% en KAST Points* sin límite.

Los límites de cashback se reinician el 1 de cada mes. Si superas el tope, puedes seguir usando la tarjeta con normalidad, simplemente dejarás de acumular cashback hasta el siguiente ciclo.

¿Cómo cobras el cashback?

El USD que vayas generando queda bloqueado durante 14 días. Pasado ese periodo, ve a la sección Rewards dentro de la app y pulsa "Redeem". En ese momento, el saldo pasa directamente a tu cuenta de gasto.

En resumen

El nuevo sistema es más directo y más fácil de entender. Sabes exactamente cuánto recibirás, cuándo y cómo canjearlo. Para el día a día, esto marca una diferencia real.

Si aún no tienes cuenta, regístrate con el código de referidos y empieza a acumular desde el primer gasto:`,
      en: `UPDATE (November 2026): KAST is no longer one of our current featured projects. We keep this article as a historical archive about its cashback program. Fees and plan details may have changed — check KAST's official site before using the link.

KAST has just taken an important step: from now on, every time you use your card you automatically receive real dollars back. No manual point redemption, no unnecessary waits. You spend and the cashback* arrives directly.

This is a relevant change from the previous model, and it's worth understanding how it works to get the most out of it.

How does cashback work according to your plan?

KAST has three tiers, and the return percentage varies depending on which one you have active:

· Standard Plan (free): 1.5% cashback* in USD on the first $2,000 of monthly spending (maximum $30/month). No additional points.

· Premium Plan ($1,000/year): 2% cashback* in USD on the first $10,000 of monthly spending (maximum $200/month) + 1% in KAST Points* unlimited.

· Private Plan ($10,000/year): 3% cashback* in USD on the first $40,000 of monthly spending (maximum $1,200/month) + 2% in KAST Points* unlimited.

Cashback limits reset on the 1st of each month. If you exceed the spending cap, you can keep using the card normally, you will simply stop accumulating cashback until the next cycle.

How do you collect the cashback?

The USD you generate is locked for 14 days. After that period, go to the Rewards section in the app and tap "Redeem". The balance then goes directly to your spending account.

In summary

The new system is more straightforward and easier to understand. You know exactly how much you will receive, when, and how to redeem it. For everyday use, this makes a real difference.

If you don't have an account yet, sign up with the referral code and start earning from your first purchase:`,
    },
    refLink: 'https://go.kast.xyz/VqVO/AUVXU5UF',
    refCode: 'AUVXU5UF',
    refLabel: { es: 'Acceder a KAST', en: 'Access KAST' },
  },
  {
    id: 2,
    slug: 'void-network-1000-usuarios',
    title: { es: 'VOID Network supera los 1.000 usuarios y ajusta su modelo de distribución', en: 'VOID Network surpasses 1,000 users and adjusts its distribution model' },
    excerpt: { es: 'El proyecto acaba de cruzar el primer hito importante: más de 1.000 usuarios en fase early access. La app de iOS estará lista en unas dos semanas.', en: 'The project has just crossed its first major milestone: over 1,000 users in early access phase. The iOS app will be ready in about two weeks.' },
    date: '6 May 2026',
    tag: { es: 'Actualización', en: 'Update' },
    readTime: '3 min',
    image: '/void-news.png',
    extraImage: '/void-news.png',
    content: {
      es: `VOID Network acaba de alcanzar un hito relevante: más de 1.000 usuarios activos en plena fase de acceso anticipado. Para un proyecto que todavía no ha salido al público de forma masiva, es una señal de tracción real en una etapa muy temprana.

¿Qué significa esto para los que ya están dentro?

Significa que sigues siendo de los primeros. Y en este tipo de proyectos, llegar antes que la masa es exactamente donde está la ventaja.

¿Qué viene ahora?

El equipo ha confirmado que en aproximadamente dos semanas estará lista la app para iPhone (iOS). Una vez disponible en ambas plataformas, arrancará la fase de expansión pública: creadores de contenido, marketing y llegada de nuevos usuarios de forma masiva.

Este momento, justo antes de ese empujón, es el que más valor tiene para posicionarse. Cuando llegue la ola, los que llevan más tiempo acumulando tokens* y construyendo su red estarán mucho mejor situados.

Con el crecimiento de la red, VOID ha ajustado su modelo de distribución de tokens* para mejorar el equilibrio del sistema y garantizar su sostenibilidad a largo plazo. Es un movimiento normal y esperable en proyectos que están creciendo.

Lo importante

La app sigue siendo completamente gratuita. Sin pagos, sin compras dentro de la plataforma, sin sorpresas. Solo tiempo y constancia.

Si aún no estás dentro y quieres aprovechar el early access* antes del lanzamiento público:`,
      en: `VOID Network has just reached a relevant milestone: over 1,000 active users in full early access phase. For a project that has not yet gone public on a massive scale, this is a signal of real traction at a very early stage.

What does this mean for those already inside?

It means you are still among the first. And in these types of projects, arriving before the masses is exactly where the advantage lies.

What's coming next?

The team has confirmed that in approximately two weeks the app for iPhone (iOS) will be ready. Once available on both platforms, the public expansion phase will begin: content creators, marketing and massive user growth.

This moment, just before that push, is the one with the most positioning value. When the wave arrives, those who have been accumulating tokens* and building their network the longest will be in a much better position.

With network growth, VOID has adjusted its token* distribution model to improve system balance and ensure long-term sustainability. This is a normal and expected move in growing projects.

The important part

The app remains completely free. No payments, no in-app purchases, no surprises. Just time and consistency.

If you're not inside yet and want to take advantage of the early access* before the public launch:`,
    },
    refLink: 'https://app.voidnetwork.app/auth?ref=6FFB3B1B',
    refCode: '6FFB3B1B',
    refLabel: { es: 'Unirse a VOID Network', en: 'Join VOID Network' },
  },
  {
    id: 3,
    slug: 'grvt-trading-descentralizado',
    title: { es: 'GRVT: trading descentralizado con el capital siempre trabajando', en: 'GRVT: decentralized trading with your capital always working' },
    excerpt: { es: 'Qué es GRVT, cómo funciona su Season 2 de puntos y por qué lo tenemos en el radar de cara al snapshot de Q2 2026.', en: 'What GRVT is, how its Season 2 points system works and why we have it on our radar ahead of the Q2 2026 snapshot.' },
    date: '20 Abr 2026',
    tag: { es: 'Trading', en: 'Trading' },
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=340&fit=crop',
    content: {
      es: `GRVT (Gravity) no es un exchange más. Es una plataforma que intenta resolver uno de los problemas más grandes del trading descentralizado: que tu capital esté parado mientras no operas.

La idea central es un balance "composable": el mismo dinero que usas para tradear genera rendimiento automáticamente. Sin mover fondos, sin elegir entre operar o ganar intereses. Las dos cosas a la vez.

¿Qué hace GRVT diferente?

Técnicamente, GRVT funciona sobre ZK Validium (tecnología de zkSync), lo que le permite combinar la velocidad de un exchange centralizado con la seguridad y autocustodia de uno descentralizado. Tus fondos no los controla GRVT, los controlas tú.

Los números que respaldan el proyecto son reales:

· TVL actual: ~$65-107M (llegó a superar los $100M en 2026)
· Interés abierto: ~$484M acumulado
· Volumen de trading: más de $393.000 millones en volumen acumulado
· Base de usuarios activos: superó los 10.000 traders en enero 2026

Financiación: $33,3M recaudados en total, incluyendo una Serie A de $19M liderada por ZKsync, Further Ventures y 500 Global.

La Season 2 y el airdrop

Esto es lo que más nos interesa ahora mismo. GRVT ha confirmado el TGE (lanzamiento del token $GRVT) para después del 30 de junio de 2026, cuando cierra la Season 2.

Los puntos se acumulan por:

· Trading en la plataforma (volumen de operaciones)
· Depósitos mantenidos en la cuenta (TVL)
· Referidos activos
· Proveer liquidez como market maker

La asignación para participantes de la Season 2 ha aumentado del 12% al 18% del supply total de 1.000 millones de tokens. En total, la comunidad recibirá el 28% del supply.

El detalle importante: el volumen en altcoins tiene un multiplicador de 2x respecto a BTC, ETH y SOL. Si tradeas en pares alternativos, acumulas el doble de puntos por el mismo volumen.

¿Cómo empezar?

El proceso es sencillo: registro, verificación KYC, depósito de fondos y empezar a operar. No hace falta ser un trader profesional: incluso mantener un balance depositado ya genera puntos por TVL cada semana.

Si ya operas perps en otro sitio, aquí básicamente haces lo mismo pero sumando puntos hacia un airdrop confirmado con fecha de cierre clara: 30 de junio de 2026.

Únete con el código de referidos y suma un 20% extra de puntos:`,
      en: `GRVT (Gravity) is not just another exchange. It's a platform that tries to solve one of the biggest problems in decentralized trading: your capital sitting idle when you're not actively trading.

The core idea is a "composable" balance: the same money you use to trade automatically generates yield. No need to move funds or choose between trading and earning interest. Both happen at the same time.

What makes GRVT different?

Technically, GRVT runs on ZK Validium (zkSync technology), which allows it to combine the speed of a centralized exchange with the security and self-custody of a decentralized one. Your funds are not controlled by GRVT — you control them.

The numbers backing the project are real:

· Current TVL: ~$65-107M (peaked above $100M in 2026)
· Open interest: ~$484M accumulated
· Trading volume: over $393 billion in cumulative volume
· Active user base: surpassed 10,000 traders in January 2026

Funding: $33.3M raised in total, including a $19M Series A led by ZKsync, Further Ventures and 500 Global.

Season 2 and the airdrop

This is what interests us most right now. GRVT has confirmed the TGE (launch of the $GRVT token) for after June 30, 2026, when Season 2 closes.

Points are accumulated through:

· Trading on the platform (trade volume)
· Deposits held in the account (TVL)
· Active referrals
· Providing liquidity as a market maker

The Season 2 allocation has increased from 12% to 18% of the total supply of 1 billion tokens. In total, the community will receive 28% of the supply.

The important detail: altcoin volume has a 2x multiplier compared to BTC, ETH and SOL. If you trade in alternative pairs, you accumulate double the points for the same volume.

How to get started?

The process is simple: register, complete KYC, deposit funds and start trading. You don't need to be a professional trader: even keeping a deposited balance already generates TVL points every week.

If you already trade perps elsewhere, here you basically do the same but accumulate points towards a confirmed airdrop with a clear closing date: June 30, 2026.

Join with the referral code and earn 20% extra points:`,
    },
    refLink: 'https://grvt.io/?ref=QUE4FO5',
    refCode: 'QUE4FO5',
    refLabel: { es: 'Explorar GRVT', en: 'Explore GRVT' },
  },
  {
    id: 4,
    slug: 'top-5-criptos-2020-balance',
    title: { es: 'Top 5 criptos compradas en 2020: balance a 6 años', en: 'Top 5 cryptos bought in 2020: 6-year review' },
    excerpt: { es: 'BTC, ETH, SOL, BNB y XRP. ¿Cuánto habrías ganado invirtiendo €1.000 en cada una en 2020? Los números reales, sin filtros.', en: 'BTC, ETH, SOL, BNB and XRP. How much would you have made investing €1,000 in each in 2020? The real numbers, unfiltered.' },
    date: '15 Abr 2026',
    tag: { es: 'Portfolio', en: 'Portfolio' },
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=600&h=340&fit=crop',
    content: {
      es: `En enero de 2020, invertir en criptomonedas seguía siendo algo que la mayoría de la gente veía como demasiado arriesgado o demasiado complicado. El mercado todavía cargaba con el estigma del crash de 2018. Y sin embargo, los que entraron ese año con una tesis clara hoy tienen carteras que no se parecen en nada a lo que pusieron.

Vamos con los números reales. ¿Qué habrías ganado invirtiendo €1.000 en cada una de las 5 mayores criptomonedas por capitalización en 2020?

Bitcoin (BTC)

Precio en enero 2020: ~$9.200
Precio actual (mayo 2026): ~$95.000

€1.000 invertidos = 0,1087 BTC
Valor actual: ~$10.326 = aprox. €9.500

ROI aproximado: +850%

Ethereum (ETH)

Precio en enero 2020: ~$130
Precio actual (mayo 2026): ~$1.800

€1.000 invertidos = 7,69 ETH
Valor actual: ~$13.842 = aprox. €12.700

ROI aproximado: +1.270%

Solana (SOL)

Precio en enero 2020: ~$0,50
Precio actual (mayo 2026): ~$145

€1.000 invertidos = 2.000 SOL
Valor actual: ~$290.000 = aprox. €266.000

ROI aproximado: +26.500%

Sí, lo has leído bien. SOL era prácticamente desconocida en 2020 y cotizaba a céntimos. Los que entraron entonces y aguantaron tienen una de las mayores ganancias de la historia reciente del mercado.

BNB (Binance Coin)

Precio en enero 2020: ~$13
Precio actual (mayo 2026): ~$595

€1.000 invertidos = 76,9 BNB
Valor actual: ~$45.760 = aprox. €42.000

ROI aproximado: +4.100%

XRP

Precio en enero 2020: ~$0,18
Precio actual (mayo 2026): ~$2,10

€1.000 invertidos = 5.555 XRP
Valor actual: ~$11.666 = aprox. €10.700

ROI aproximado: +970%

El resumen en una tabla

· BTC: +850% → €9.500
· ETH: +1.270% → €12.700
· SOL: +26.500% → €266.000
· BNB: +4.100% → €42.000
· XRP: +970% → €10.700

Si hubieras repartido €1.000 en cada una (€5.000 en total), hoy tendrías aproximadamente €341.000.

¿Qué aprendemos de esto?

Primero: el tiempo en el mercado bate al timing del mercado. La mayoría de estas ganancias vinieron de simplemente aguantar, no de comprar en el mínimo exacto.

Segundo: la diversificación entre los activos principales no sacrificó rentabilidad. Los cinco subieron de forma brutal.

Tercero: los activos que parecían más arriesgados (SOL, BNB) fueron los que más retorno dieron. El riesgo y la recompensa van de la mano.

Esto no es una promesa de que el mercado repita. Es un ejercicio de perspectiva: ¿estás posicionándote en los proyectos que dentro de 6 años alguien va a querer haber tenido?`,
      en: `In January 2020, investing in cryptocurrencies was still something most people saw as too risky or too complicated. The market still carried the stigma of the 2018 crash. And yet, those who entered that year with a clear thesis today have portfolios that look nothing like what they put in.

Let's look at the real numbers. What would you have earned investing €1,000 in each of the 5 largest cryptocurrencies by market cap in 2020?

Bitcoin (BTC)

Price in January 2020: ~$9,200
Current price (May 2026): ~$95,000

€1,000 invested = 0.1087 BTC
Current value: ~$10,326 = approx. €9,500

Approximate ROI: +850%

Ethereum (ETH)

Price in January 2020: ~$130
Current price (May 2026): ~$1,800

€1,000 invested = 7.69 ETH
Current value: ~$13,842 = approx. €12,700

Approximate ROI: +1,270%

Solana (SOL)

Price in January 2020: ~$0.50
Current price (May 2026): ~$145

€1,000 invested = 2,000 SOL
Current value: ~$290,000 = approx. €266,000

Approximate ROI: +26,500%

Yes, you read that right. SOL was practically unknown in 2020 and traded at cents. Those who entered then and held have one of the largest gains in recent market history.

BNB (Binance Coin)

Price in January 2020: ~$13
Current price (May 2026): ~$595

€1,000 invested = 76.9 BNB
Current value: ~$45,760 = approx. €42,000

Approximate ROI: +4,100%

XRP

Price in January 2020: ~$0.18
Current price (May 2026): ~$2.10

€1,000 invested = 5,555 XRP
Current value: ~$11,666 = approx. €10,700

Approximate ROI: +970%

Summary

· BTC: +850% → €9,500
· ETH: +1,270% → €12,700
· SOL: +26,500% → €266,000
· BNB: +4,100% → €42,000
· XRP: +970% → €10,700

If you had split €1,000 into each (€5,000 total), today you would have approximately €341,000.

What do we learn from this?

First: time in the market beats timing the market. Most of these gains came from simply holding, not from buying at the exact bottom.

Second: diversification across the main assets did not sacrifice returns. All five went up massively.

Third: the assets that seemed riskiest (SOL, BNB) were the ones that returned the most. Risk and reward go hand in hand.

This is not a promise that the market will repeat. It's an exercise in perspective: are you positioning yourself in the projects that in 6 years someone will wish they had held?`,
    },
  },
]

// ── Hero Stats ──
export const heroStats = [
  { value: 5, suffix: '', label: { es: 'Proyectos destacados', en: 'Featured projects' } },
  { value: 2850, prefix: '€', suffix: '', label: { es: 'Beneficio aprox. proyectos actuales', en: 'Approx. earnings current projects' } },
]

// ── Marquee ──
export const marqueeItems = [
  'VOID NETWORK', 'GRVT', 'TXFLOW', 'RISEX', 'ONCHAIN.CC', 'PERP DEX', 'DELTA NEUTRAL', 'AIRDROPS', 'FARMING DE PUNTOS', 'TRADING', 'BITCOIN', 'ETHEREUM', 'SOLANA',
  'DeFi', 'STAKING', 'LAYER 1', 'LAYER 2', 'RISE L2', 'BNB', 'XRP', 'FOREX', 'IA CRIPTO', 'RWA',
]

export const TWITTER_URL = 'https://twitter.com/BeneficioDiario'
export const YOUTUBE_URL = 'https://www.youtube.com/@beneficiodiario_com'
