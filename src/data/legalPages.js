export const LEGAL_UPDATED = '2026-10-26'
export const CONTACT = { name: 'Beneficio Diario', location: 'Barcelona, España', email: 'info@beneficiodiario.com' }

export const LEGAL_PAGES = [
  {
    path: '/aviso-legal', label: 'Aviso legal', title: 'Aviso legal de Beneficio Diario',
    description: 'Información sobre Beneficio Diario, portal gratuito gestionado por particulares: contacto, acceso libre, enlaces a terceros y propiedad intelectual.',
    sections: [
      { id: 'identificacion', h: 'El portal y su contacto', p: [
        'Beneficio Diario es el nombre de un portal informativo gestionado por particulares desde Barcelona, España. Su dominio es beneficiodiario.com y el correo de contacto es info@beneficiodiario.com. No se presenta como una sociedad mercantil ni como una entidad financiera.',
        'El acceso gratuito no elimina las obligaciones que puedan resultar aplicables a quien gestiona el portal por la publicidad, los referidos o el tratamiento de datos. El nombre del portal es una denominación editorial.',
      ] },
      { h: 'Objeto y acceso gratuito', p: [
        'Publicamos información educativa y enlaces sobre criptomonedas, airdrops, cashback, ingresos pasivos y plataformas de terceros. Consultar el portal es gratuito y no exige iniciar sesión, crear una cuenta ni facilitar datos de pago.',
        'No ofrecemos cuentas de inversión, custodia, cambio de criptoactivos, ejecución de órdenes ni asesoramiento individualizado. No recibimos depósitos ni solicitamos claves privadas, frases semilla o transferencias de dinero.',
      ] },
      { h: 'Servicios externos', p: [
        'Al seguir un enlace externo sales del portal. El registro, KYC, pagos, depósitos, comisiones y condiciones dependen de su proveedor. Una cuenta en una plataforma externa no es una cuenta de Beneficio Diario.',
        'Un enlace no acredita la solvencia, autorización, seguridad o disponibilidad del proveedor. Verifica la entidad responsable, su documentación y las restricciones de tu país antes de utilizarlo.',
      ] },
      { h: 'Publicidad y propiedad intelectual', p: [
        'El portal puede financiarse mediante publicidad, colaboraciones y afiliación o referidos. Identificamos los espacios publicitarios y explicamos los conflictos de interés en la política de transparencia.',
        'Los textos y elementos originales pertenecen a sus respectivos autores. Las marcas, logotipos e imágenes de terceros pertenecen a sus titulares. Puedes enlazar nuestras páginas y realizar citas dentro de los límites legales identificando la fuente. Para otros usos o para comunicar una infracción, contacta por correo.',
      ] },
      { h: 'Responsabilidad y derechos', p: [
        'Procuramos corregir los errores, pero los datos y servicios externos pueden cambiar. No garantizamos resultados económicos ni disponibilidad ininterrumpida. Estas condiciones no excluyen responsabilidades que no puedan limitarse legalmente ni derechos imperativos.',
        'Se atenderá a la normativa aplicable. Si tienes la condición de consumidor, se mantienen las normas y la competencia judicial que te correspondan; no imponemos renuncia a los tribunales legalmente competentes.',
      ] },
    ],
  },
  {
    path: '/privacidad', label: 'Privacidad', title: 'Política de privacidad',
    description: 'Datos técnicos, contacto, Vercel Web Analytics, publicidad y derechos de privacidad en Beneficio Diario. Sin cuentas de usuario ni registro obligatorio.',
    sections: [
      { h: 'Gestión y contacto', p: [
        'El portal Beneficio Diario se gestiona por particulares desde Barcelona, España. Para cuestiones sobre tus datos escribe a info@beneficiodiario.com. La información disponible sobre la gestión del sitio se recoge en el aviso legal.',
      ] },
      { h: 'Sin cuentas ni registro', p: [
        'Puedes consultar el contenido sin registrarte ni iniciar sesión. No hay perfiles de usuario, cuentas de inversión, conexiones de cartera ni formularios de pago propios. No pedimos contraseñas, documentos de identidad, claves privadas ni frases semilla.',
        'La ausencia de registro no significa ausencia de tratamiento de datos: el alojamiento, la seguridad, tus correos y los servicios opcionales pueden tratar información técnica o personal.',
      ] },
      { h: 'Datos, finalidades y bases jurídicas', p: [
        'Alojamiento y seguridad: el proveedor puede tratar IP, fechas, solicitudes y datos técnicos para entregar la web y prevenir abusos. La base es el interés legítimo en prestar y proteger el servicio, con las garantías y ponderación correspondientes.',
        'Contacto: tratamos tu correo y el mensaje para atender la consulta. La base es el interés legítimo en responder o las medidas precontractuales solicitadas, según el caso. No envíes datos sensibles o documentación innecesaria.',
        'Analítica: Vercel Web Analytics se carga solo si consientes la categoría de analítica. La base aplicada en este portal es tu consentimiento, aunque la herramienta no use cookies de terceros. No habilitamos Google Analytics.',
        'Publicidad: las integraciones opcionales se bloquean hasta que consientes esa categoría. El consentimiento puede retirarse en cualquier momento y rechazarlo no impide leer la web.',
      ] },
      { h: 'Vercel Web Analytics', p: [
        'Permite obtener estadísticas agregadas sobre páginas visitadas, fuentes de tráfico y características generales del dispositivo o región. Según su documentación, no usa cookies de terceros y utiliza un identificador derivado de la solicitud que se descarta tras 24 horas. Este plazo no equivale a la conservación de todas las estadísticas.',
        'Eliminamos consultas y fragmentos de las URL enviadas a la analítica. No enviamos nombres, correos o contenido de formularios como eventos. La recogida requiere que el servicio esté activado en Vercel y que hayas aceptado la analítica.',
      ], links: [{ label: 'Privacidad de Vercel Web Analytics', href: 'https://vercel.com/docs/analytics/privacy-policy' }, { label: 'Acuerdo de tratamiento de Vercel', href: 'https://vercel.com/legal/dpa' }] },
      { h: 'Proveedores y newsletter externa', p: [
        'Vercel Inc. puede prestar alojamiento y analítica. La configuración publicitaria puede utilizar Google AdSense o A-ADS con consentimiento y cuando haya espacios activos. Google Fonts sirve fuentes tipográficas y recibe la solicitud técnica de descarga, que incluye la IP.',
        'La newsletter es opcional y se tramita en una página externa de Beehiiv. Aquí no introduces un correo ni lo enviamos en parámetros de URL. Revisa el formulario externo, su información de privacidad, quién lo gestiona y cómo darte de baja antes de suscribirte.',
        'No vendemos bases de datos de usuarios ni disponemos de cuentas propias. Las comunicaciones a autoridades se realizan cuando exista una obligación o requerimiento legal aplicable.',
      ], links: [{ label: 'Privacidad de Google', href: 'https://policies.google.com/privacy' }, { label: 'Privacidad de A-ADS', href: 'https://a-ads.com/privacy' }, { label: 'Privacidad de Beehiiv', href: 'https://www.beehiiv.com/privacy' }, { label: 'Google Fonts y privacidad', href: 'https://developers.google.com/fonts/faq/privacy' }] },
      { h: 'Transferencias y conservación', p: [
        'Algunos proveedores pueden tratar datos fuera del Espacio Económico Europeo. Cuando proceda deben existir garantías válidas, como una decisión de adecuación aplicable o cláusulas contractuales tipo y medidas complementarias. Consulta los acuerdos de cada proveedor para conocer las entidades y mecanismos concretos.',
        'Los mensajes se conservan mientras sean necesarios para atender la consulta y, cuando proceda, durante los plazos legales de responsabilidad. Los registros y estadísticas siguen la configuración y los plazos del proveedor; no les atribuimos un plazo único.',
        'La elección de privacidad caduca a los seis meses y se solicita de nuevo. La preferencia de tema visual permanece localmente hasta que la cambies o borres el almacenamiento del navegador.',
      ] },
      { h: 'Tus derechos', p: [
        'Cuando corresponda puedes ejercer acceso, rectificación, supresión, oposición, limitación y portabilidad, y retirar tu consentimiento sin afectar a la licitud del tratamiento anterior. Escribe a info@beneficiodiario.com; solo pediremos información proporcionada para verificar la solicitud.',
        'Puedes reclamar ante la Agencia Española de Protección de Datos u otra autoridad competente. El enlace «Configurar privacidad» permite cambiar las categorías opcionales sin dejar de consultar el portal.',
      ], links: [{ label: 'Agencia Española de Protección de Datos', href: 'https://www.aepd.es/' }] },
      { h: 'Menores y cambios', p: [
        'El contenido financiero se dirige a personas adultas. Los terceros pueden exigir mayoría de edad y otros requisitos. No invitamos a menores a invertir ni solicitamos conscientemente sus datos. Actualizaremos esta política si cambian los tratamientos y pediremos un nuevo consentimiento cuando sea necesario.',
      ] },
    ],
  },
  {
    path: '/cookies', label: 'Cookies y privacidad', title: 'Política de cookies y tecnologías similares',
    description: 'Almacenamiento y servicios opcionales de Beneficio Diario: cómo aceptar, rechazar, configurar y retirar la analítica y la publicidad.',
    sections: [
      { h: 'Decide por separado', p: [
        'Puedes aceptar todo, rechazar las tecnologías opcionales o elegir por separado analítica y publicidad. Ambas categorías están desactivadas por defecto. El enlace «Configurar privacidad» del pie de página permite cambiar tu elección en cualquier momento.',
      ] },
      { h: 'Almacenamiento propio', p: [
        'bd_cookie_consent: almacenamiento local que guarda categorías, versión de política y fecha de decisión durante seis meses para respetar tu elección. No es un identificador publicitario.',
        'bd_dark: almacenamiento local que recuerda el tema visual. No se comparte con anunciantes y puedes borrarlo en el navegador. No hay cookies para mantener una sesión de usuario, porque no hay cuentas propias.',
      ] },
      { h: 'Analítica opcional de Vercel', p: [
        'Vercel Web Analytics no usa cookies de terceros según su documentación. Trata información de las solicitudes y un hash de visita de duración limitada para estadísticas. En este portal lo bloqueamos igualmente hasta que aceptes la analítica. No cargamos Google Analytics.',
        'Eliminamos consultas y fragmentos de las URL antes de enviar eventos. La duración del identificador de visita no equivale al plazo de conservación de los informes agregados.',
      ], links: [{ label: 'Tecnologías de Vercel Web Analytics', href: 'https://vercel.com/docs/analytics/privacy-policy' }] },
      { h: 'Publicidad de terceros', p: [
        'Google AdSense y A-ADS solo se cargan con permiso publicitario y espacios configurados. Sus scripts o marcos pueden procesar IP, datos técnicos y sus propios identificadores. El proveedor y la duración de cada tecnología dependen de la campaña servida: consulta sus políticas.',
        'Esta herramienta de preferencias no sustituye una CMP certificada cuando la red publicitaria la exige. Antes de activar espacios de AdSense en territorios donde Google exige una CMP certificada debe configurarse esa CMP.',
      ], links: [{ label: 'Cookies de Google', href: 'https://policies.google.com/technologies/cookies' }, { label: 'Política de A-ADS', href: 'https://a-ads.com/privacy' }] },
      { h: 'Recursos y páginas externas', p: [
        'Los referidos pueden incluir un código de atribución del proveedor. Una vez sales del portal, las tecnologías de ese sitio se rigen por su política. La newsletter de Beehiiv es externa y opcional.',
        'Google Fonts y las imágenes externas de los contenidos implican conexiones técnicas con sus respectivos servidores para descargar esos recursos.',
      ] },
      { h: 'Retirar permisos y borrar datos', p: [
        'Abre «Configurar privacidad», cambia las categorías y guarda. Al retirar un permiso concedido recargamos la página para detener recursos ya cargados y bloquear nuevas cargas o eventos. La retirada no elimina información que un tercero ya hubiera recibido.',
        'Puedes borrar cookies y almacenamiento local desde las opciones del navegador. Las cookies de dominios externos deben eliminarse desde el navegador o las herramientas del tercero. Si borras la elección, volveremos a solicitarla.',
      ] },
    ],
  },
  {
    path: '/condiciones-de-uso', label: 'Condiciones de uso', title: 'Condiciones de uso del portal',
    description: 'Consulta gratuita de Beneficio Diario, sin registro ni venta propia: uso de los contenidos, enlaces y relaciones con proveedores externos.',
    sections: [
      { h: 'Alcance del servicio', p: [
        'El portal ofrece contenido informativo gratuito sobre sitios de terceros. No necesitas una cuenta ni celebras un contrato de inversión con nosotros. No vendemos criptoactivos, productos financieros ni suscripciones de acceso.',
      ] },
      { h: 'Uso permitido', p: [
        'Respeta la ley y los derechos de sus autores. No alteres el servicio, distribuyas código malicioso o suplantes al equipo. Compartir enlaces o realizar citas dentro de los límites legales está permitido. El rastreo autorizado en robots.txt no cede derechos de autor ni garantiza la exactitud del contenido.',
      ] },
      { h: 'Plataformas de terceros', p: [
        'Comprueba costes, privacidad, entidad responsable, requisitos y riesgos antes de registrarte en un sitio enlazado. Sus exigencias de KYC, edad, residencia o capital pertenecen al proveedor externo.',
        'Las incidencias de operaciones, tarjetas, recompensas o retiradas se reclaman ante ese proveedor. Puedes avisarnos de errores, enlaces rotos o suplantaciones para revisarlos.',
      ] },
      { h: 'Información y disponibilidad', p: [
        'Los ejemplos y resultados históricos no predicen rendimientos futuros. Pueden no incluir comisiones, impuestos o variaciones de cambio salvo indicación expresa. Podemos actualizar o retirar contenido. No garantizamos la permanencia de promociones ni disponibilidad ininterrumpida.',
        'Estas condiciones no limitan derechos irrenunciables. Las leyes aplicables y los tribunales competentes se determinan conforme a la normativa, respetando las protecciones imperativas del consumidor.',
      ] },
      { h: 'Sin ventas ni devoluciones propias', p: [
        'No ofrecemos pagos ni contratación de productos en el portal. Por ello no existe un procedimiento propio de entrega, devolución o desistimiento para operaciones de terceros. Los derechos de una contratación externa se ejercen frente a su proveedor.',
        'Para dudas sobre el portal escribe a info@beneficiodiario.com. La versión vigente y su fecha de actualización aparecen en estas páginas.',
      ] },
    ],
  },
  {
    path: '/aviso-de-riesgos', label: 'Riesgos financieros', title: 'Aviso de riesgos financieros y de criptoactivos',
    description: 'Riesgos de criptoactivos, airdrops, cashback, trading y DeFi. Beneficio Diario es informativo y no garantiza ingresos ni rentabilidad.',
    sections: [
      { h: 'Sin asesoramiento individualizado', p: [
        'El contenido es educativo y general. No considera tu patrimonio, experiencia, objetivos o tolerancia al riesgo. No constituye asesoramiento financiero, jurídico o fiscal ni una oferta de inversión de Beneficio Diario.',
      ] },
      { h: 'Pérdida de capital y protección', p: [
        'Los criptoactivos pueden sufrir volatilidad extrema, falta de liquidez y pérdida total de valor. No todos los productos o proveedores tienen la misma regulación. No presupongas que existe garantía de depósitos o indemnización. Una autorización no garantiza rendimientos ni elimina el riesgo.',
      ] },
      { h: 'Staking, DeFi e ingresos pasivos', p: [
        'Un APY es una tasa estimada o histórica, sujeta a condiciones. Existen riesgos de contraparte, bloqueo, slashing, pérdida de paridad de stablecoins, fallos de contratos y puentes y pérdida impermanente en ciertos pools.',
        'La rentabilidad puede ser negativa tras gastos e impuestos. Obtener recompensas puede exigir tiempo y mantenimiento: no son ingresos automáticos garantizados.',
      ] },
      { h: 'Airdrops y testnets', p: [
        'Acumular puntos o realizar tareas no garantiza recibir tokens, cumplir los criterios o conseguir algo con valor de mercado. Un punto no equivale necesariamente a dinero. Existen costes de gas, exposición de datos, phishing y permisos peligrosos incluso sin depósito.',
        'No compartas frases semilla. Revisa cada dominio, firma y permiso. La elegibilidad y las fechas dependen del proveedor y pueden cambiar.',
      ] },
      { h: 'Cashback y trading', p: [
        'El cashback devuelve parte de un gasto y no es rentabilidad de inversión. Revisa límites, tarifas y condiciones. Los porcentajes promocionales pueden cambiar.',
        'El trading y los derivados requieren gestión activa: no son ingresos pasivos. El apalancamiento amplifica pérdidas y puede provocar liquidaciones o responsabilidades adicionales según el producto.',
      ] },
      { h: 'Verificación y fiscalidad', p: [
        'Verifica la entidad y la documentación oficial, y consulta avisos del regulador. Una etiqueta editorial de riesgo no es una certificación. Los resultados anteriores no representan lo que obtendrás.',
        'La fiscalidad depende de tu residencia y operaciones. Guarda registros y busca asesoramiento cualificado cuando sea necesario.',
      ], links: [{ label: 'CNMV: información para inversores', href: 'https://www.cnmv.es/portal/Inversor' }, { label: 'ESMA: información para inversores', href: 'https://www.esma.europa.eu/investor-corner' }] },
    ],
  },
  {
    path: '/transparencia', label: 'Afiliación y transparencia', title: 'Transparencia, publicidad y afiliación',
    description: 'Cómo puede financiarse Beneficio Diario mediante publicidad y referidos, identificación de enlaces comerciales y conflictos de interés.',
    sections: [
      { h: 'Acceso gratuito y financiación', p: [
        'Consultar el portal es gratis y no exige registro. Podemos recibir ingresos de publicidad, colaboraciones o referidos. Gestionarlo como particulares no significa que carezca de financiación o intereses económicos.',
      ] },
      { h: 'Enlaces y códigos de referido', p: [
        'Una plataforma puede atribuirnos tu registro u operación y concedernos una comisión, puntos o recompensas si utilizas nuestro enlace o código. Los incentivos dependen del proveedor y no garantizamos bonos para el visitante.',
        'No afirmamos que las condiciones, el precio o las comisiones sean siempre idénticos a los de un acceso sin referido. Compara la oferta oficial antes de participar.',
      ] },
      { h: 'Identificación y conflicto de interés', p: [
        'Los enlaces comerciales se identifican como referidos o afiliados cuando corresponde y utilizan el atributo sponsored. Los anuncios se etiquetan como «Publicidad». Una relación comercial puede influir en qué proyectos se cubren o destacan: considera ese conflicto al leer.',
        'Una mención, posición en portada o anuncio no acredita solvencia, autorización ni rentabilidad. Los servicios enlazados son independientes de Beneficio Diario.',
      ] },
      { h: 'Resultados y correcciones', p: [
        'Los resultados publicados tienen el alcance y fecha indicados y no son una auditoría ni el resultado de todas las personas. Las simulaciones deben diferenciarse de operaciones efectivamente realizadas.',
        'Priorizamos fuentes oficiales y explicamos riesgos y limitaciones. Comunica errores o publicidad insuficientemente identificada a info@beneficiodiario.com. La política editorial explica cómo revisamos los contenidos.',
      ] },
    ],
  },
].map(page => ({ ...page, kind: 'legal', updated: LEGAL_UPDATED }))

export const LEGAL_LINKS = LEGAL_PAGES.map(({ path, label }) => ({ path, label }))
