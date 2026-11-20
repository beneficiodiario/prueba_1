# Seguridad de datos · versión 1.0.0

Propuesta basada en el código entregado, no un formulario ya presentado a Google. La declaración se aplica a todas las versiones y canales activos en Play: revísala al cambiar el producto.

| Apartado | Comportamiento de esta versión |
|---|---|
| Respuestas y afinidades | Memoria local de la sesión. Sin API, sincronización o historial persistente |
| Opiniones políticas | Contenido sensible; nunca se envía al desarrollador para calcular la afinidad |
| Exportación | Acción voluntaria; JSON en caché privada, compartido solo con el destino elegido mediante Android |
| Compartir el test | Solo texto genérico y URL pública; no incorpora respuestas, porcentajes ni identificadores |
| Anuncios / analítica / ID publicitario | No incluidos |
| Cuenta / autenticación | No existe cuenta de usuario |
| Notificaciones / ubicación / cámara / contactos | No incluidos |
| Fuentes externas | Navegador externo solicitado por la persona; sus sitios aplican sus políticas |
| Eliminación | Repetir elimina el test de memoria. Cerrar proceso, borrar caché o desinstalar elimina las copias locales correspondientes. Borrar por separado los destinos exportados |
| Soporte por correo | El titular recibe el mensaje que la persona decida enviar. No solicitar opiniones políticas en consultas |

En el formulario, el procesamiento exclusivamente local está fuera del alcance de «datos recogidos». La exportación por una acción concreta de la persona entra en la excepción descrita por Google para comparticiones iniciadas por el usuario. Esta es la base para preparar «sin recogida ni compartición declarable» en esta versión, no una promesa de que un proveedor externo o Android nunca trate datos técnicos.

No declarar cuentas eliminables en un servidor inexistente. No declarar cifrado de extremo a extremo ni certificaciones de seguridad que no se han implementado. Si el formulario pregunta por datos en tránsito, atiende a lo que realmente se transmite y a las opciones disponibles: las respuestas del cuestionario no se transmiten a servidores propios.

La política pública y la interna proceden de `src/data/android-privacy.json`. Los enlaces públicos se alojan en Beneficio Diario, cuyo proveedor de alojamiento puede recibir datos técnicos de las visitas; no se visita automáticamente ese dominio para calcular el resultado. Google Play y Android gestionan sus propios datos de descarga o diagnóstico según sus políticas.

Fuente: https://support.google.com/googleplay/android-developer/answer/10787469
