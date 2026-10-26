# SEO, descubrimiento e información del portal

Revisión del 26 de octubre de 2026. Dominio canónico: https://beneficiodiario.com.

Se ha revisado el código, una respuesta pública del dominio y la nueva compilación local. El dominio todavía mostraba la versión anterior durante la revisión. Esto no es una medición de posiciones ni una confirmación del despliegue en producción.

## Problemas encontrados y cambios

| Situación anterior | Cambio |
| --- | --- |
| Contenido reducido para visitantes sin JavaScript y plantillas diferentes de la interfaz | Las 27 páginas públicas generan HTML completo desde los mismos componentes React, incluidas las portadas ES y EN. |
| Sin 404 general; Apache devolvía inicio para URLs desconocidas | 404 personalizada con noindex y sin canonical hacia la portada. Vercel sirve 404.html al faltar una ruta; Apache tiene ErrorDocument equivalente. |
| Sitemap con fecha fija, anterior a algunas noticias | Inventario único, traducciones recíprocas y fechas de publicación/modificación cuando existen. Se omite lastmod de la portada en vez de inventarlo. |
| Fechas de Article no normalizadas y metadatos persistentes al navegar | Fechas ISO y sustitución por ruta de canonical, idiomas y JSON-LD. |
| Rentabilidad y disponibilidad descritas con demasiada certeza | Presentación de portal gratuito, sin registro; distinción de terceros, advertencias de vigencia, riesgo y afiliación. |
| Solo una política breve de privacidad y cookies | Seis páginas legales, presentación del portal, contacto y política editorial, accesibles desde todo el sitio. |
| Google Analytics y script publicitario en el HTML inicial | Retirados de esa carga. Vercel Analytics y publicidad requieren categorías de consentimiento independientes. |
| Sin retirada fácil del consentimiento | Rechazar, configurar y aceptar, con igual visibilidad; reapertura en el pie, caducidad a seis meses y recarga al retirar permisos. |
| Correo de newsletter enviado en una URL externa | Enlace externo opcional a Beehiiv sin recoger correos en el portal. |
| Recursos de IA con datos y campañas antiguos | llms.txt y llms-full.txt generados desde el inventario público; robots permite el rastreo. ai.txt es información, sin fingir que es un estándar. |
| Dependencias con avisos de seguridad | Actualizaciones compatibles y auditoría sin vulnerabilidades conocidas. |

## Páginas preparadas

Legales: `/aviso-legal`, `/privacidad`, `/cookies`, `/condiciones-de-uso`, `/aviso-de-riesgos` y `/transparencia`.

Información: `/sobre-beneficio-diario`, `/contacto` y `/politica-editorial`.

Guías: `/ingresos-pasivos`, `/criptomonedas`, `/airdrops` y `/glosario-cripto`.

Las nuevas páginas están en español; no se declaran traducciones inexistentes. Se conservan ambas portadas y seis noticias en ES y EN. No hay venta propia, checkout ni cuenta de usuario: no se inventan políticas de envíos o devoluciones para servicios ajenos.

## ChatGPT y buscadores

Se identifica de forma coherente «Beneficio Diario» y «BeneficioDiario». El marcado Organization representa al proyecto editorial informal; no declara sociedad, entidad financiera o nombre legal inventado.

Se permite OAI-SearchBot. El alojamiento debe admitir también las IP oficiales y no exigir autenticación o desafíos a los rastreadores. El permiso para entrenamiento de GPTBot no equivale a prioridad en búsqueda. [Rastreadores de OpenAI](https://developers.openai.com/api/docs/bots).

OpenAI indica que el posicionamiento en resultados no está garantizado. No existe una modificación que asegure TOP1 para la marca o para consultas generales como «criptomonedas». [Información oficial de ChatGPT Search](https://help.openai.com/en/articles/9237897-conducting-your-searches-on-search).

Los archivos llms son una ayuda de navegación; no garantizan que los motores los usen. Google no exige un marcado especial para sus funciones de IA. [Google: funciones de IA](https://developers.google.com/search/docs/appearance/ai-features).

En información financiera son especialmente importantes la exactitud, la autoría y las evidencias. Las guías cubren conceptos diferentes; no son variantes repetidas de palabras clave. [Google: contenido útil y fiable](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

## Tras desplegar

1. Confirmar en Vercel que este repositorio y `main` alimentan el proyecto y conectar `beneficiodiario.com`. Asociar también `www` si se quiere que funcione su redirección.
2. Activar Web Analytics en el panel. El paquete ya está integrado y solo envía tras consentir analítica. La recogida real requiere Vercel; no puede validarse con el servidor local.
3. Verificar propiedad en Google Search Console y Bing Webmaster Tools y enviar `https://beneficiodiario.com/sitemap.xml`. No se han inventado identificadores de verificación ni operado en cuentas no conectadas.
4. Comprobar en producción `/`, `/en`, una noticia, `/privacidad`, `/sitemap.xml`, `/robots.txt` y una ruta inexistente: 200 para las páginas válidas, 404 para la inexistente y contenido legible sin JavaScript.
5. Revisar el acceso de los rastreadores y las exclusiones de los dominios de previsualización. Las protecciones del proyecto no deben bloquear el dominio público ni originar duplicados indexables.
6. Medir indexación, consultas de marca y referencias. La analítica excluye a quienes rechazan el permiso y no representa todo el tráfico.
7. Verificar periódicamente las fuentes y condiciones por proyecto. Las cifras y noticias antiguas todavía necesitan revisión editorial: esta tarea no certifica promociones actuales ni todos los números históricos.
8. Publicar análisis y evidencias originales y conseguir menciones editoriales reales. No comprar enlaces ni inventar reseñas, credenciales o resultados.

## Limitación legal

Por decisión del titular se publican exclusivamente «Beneficio Diario», Barcelona, España, e `info@beneficiodiario.com`. No se inventan nombre legal, NIF ni domicilio completo.

Con esos datos únicamente no puede garantizarse que la identificación del titular y responsable del tratamiento esté completa. El acceso gratuito y sin login no determina una exención, especialmente con publicidad o afiliación. La aplicabilidad y los datos exigibles dependen de la actividad. Referencias: [artículo 10 de la LSSI](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758#a10) y [artículo 13 del RGPD](https://eur-lex.europa.eu/eli/reg/2016/679/oj/spa).

Los slots de AdSense permanecen vacíos. Antes de activarlos donde Google exige una CMP certificada debe configurarse y validar sus señales. La herramienta propia de preferencias no se presenta como CMP certificada. [Requisitos de AdSense](https://support.google.com/adsense/answer/13554116?hl=en).

Vercel Analytics no usa cookies de terceros según su documentación, pero eso no hace automáticamente anónimo o exento todo tratamiento. Esta integración aplica consentimiento, elimina consulta y fragmento y limita las rutas transmitidas al inventario público. [Privacidad de Vercel Web Analytics](https://vercel.com/docs/analytics/privacy-policy).

## Comprobación

`npm run check` compila y ejecuta seis pruebas de aceptación: contenido y metadatos de todas las URLs, sitemap y traducciones, 404, enlaces y anclas, consentimiento y minimización, y respuestas HTTP locales.

La comprobación en navegador incluye la 404, navegación a guías y reapertura de preferencias. Tras rechazar no se cargan scripts de analítica ni marcos publicitarios; aceptar solo analítica añade el script de Vercel sin anuncios; retirarlo recarga y elimina esas cargas.

La validación local no sustituye comprobar la respuesta una vez desplegada. Se utiliza el mecanismo documentado para sitios estáticos, sin redirigir rutas desconocidas a inicio. [404 personalizadas en Vercel](https://vercel.com/kb/guide/custom-404-page).
