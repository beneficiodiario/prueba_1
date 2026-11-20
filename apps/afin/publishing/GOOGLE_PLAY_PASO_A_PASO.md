# Del paquete compilado a Google Play

Estado de la entrega: app compilada y firmada; no subida ni publicada. No existe todavía una cuenta de desarrollador proporcionada para este proyecto. Hay cuatro capturas reales y un recorrido instrumentado correcto en un emulador Android 16. Las comprobaciones manuales en teléfono y las pruebas de Google Play siguen pendientes. La creación de la cuenta, su identidad, las declaraciones y los pagos deben completarse con los datos del titular.

## 1. Crear y verificar la cuenta

Abre https://play.google.com/console/signup con tu propia cuenta de Google. Elige persona u organización según la realidad del titular. Completa la identidad, contacto, verificaciones y el pago que indique Google. No introduzcas una razón social, dirección o identidad inventada. El nombre editorial preparado es Beneficio Diario; los datos legales de la cuenta deben corresponder a su titular.

Google puede exigir verificación de dispositivo y comprobaciones adicionales. No se han realizado registros ni pagos en esta entrega.

## 2. Publicar la política

Despliega la rama `codex/afin-android-privacy` del repositorio web preparado. Comprueba sin iniciar sesión:

• https://beneficiodiario.com/politica
• https://beneficiodiario.com/politica/privacidad

Ambas deben responder HTTP 200 con el contenido de Afín. La política debe mostrar el contacto del titular, coincidir con el comportamiento del binario y mantenerse accesible. Las páginas están preparadas, pero no se afirma que ya estén desplegadas. Después ejecuta `npm run release:check` desde este proyecto. Un fallo en esa comprobación impide considerar cerrado el envío.

## 3. Crear la aplicación

Nombre: Afín: afinidad política. Idioma: español de España. Aplicación gratuita de Entretenimiento. Sin anuncios ni compras integradas. El identificador de paquete del binario es `com.beneficiodiario.afin`; una vez publicada una app con él, no puede cambiarse para esa misma ficha.

Pega la ficha de `PLAY_STORE_ES.md` y sube el icono, el gráfico y las cuatro capturas reales incluidas en `screenshots/`. No marques que ya tiene una clasificación de edad: completa el cuestionario IARC con el contenido real. Audiencia prevista: adultos. Declara que no es una app gubernamental y conserva visibles los avisos de independencia y las fuentes.

## 4. Acceso, seguridad de datos y permisos

Acceso a la app: todas las funciones se pueden usar sin cuenta, login, suscripción ni credenciales de revisión.

La configuración de esta versión no envía respuestas ni resultados a un servidor del desarrollador. Se procesan localmente y solo salen mediante una exportación elegida por la persona. Según las instrucciones de Google, el procesamiento exclusivamente local no se declara como recogida; compartir por una acción específica del usuario puede quedar fuera de la declaración de compartición. Revisa `DATA_SAFETY.md` y responde al formulario que muestre la consola. Estas respuestas deben actualizarse si cambian SDK, red o funciones.

No hay identificador publicitario, acceso general al almacenamiento, ubicación, cámara, micrófono, contactos o notificaciones. La app usa Internet para su componente web local y apertura voluntaria de fuentes. El manifiesto fusionado incluye además un permiso interno de firma de AndroidX que no accede a datos personales.

## 5. Subir el AAB

Usa `afin-1.0.0-release.aab`. El APK sirve para instalar y comprobar directamente; no sustituye al AAB de publicación.

Activa Play App Signing durante la configuración. El AAB entregado está firmado con la clave de subida del kit privado. Puedes dejar que Google gestione una clave de firma de distribución distinta. Conserva la clave de subida, alias y contraseña fuera de Git. El certificado público se puede compartir; el archivo `.p12` y su contraseña no.

La ficha usa versionCode 1 y versionName 1.0.0. Toda actualización posterior debe incrementar versionCode en `android/app/build.gradle`, sincronizar la configuración de publicación, volver a compilar y conservar el mismo identificador. Nunca regeneres la clave por rutina.

Si instalaste el APK fuera de Play y Google utiliza otra clave de distribución, puede ser necesario desinstalar esa copia antes de instalar la versión de Play. Las respuestas de sesión se perderán.

## 6. Pruebas

Primero sube a pruebas internas. Ejecuta el guion `PRUEBAS_DISPOSITIVO.md`, consulta el informe previo al lanzamiento de Google y corrige los problemas detectados. La compilación y las pruebas simuladas de integración no sustituyen estas pruebas reales.

Las cuentas personales nuevas sujetas a la política de Google deben realizar una prueba cerrada con al menos 12 participantes inscritos de forma continua durante 14 días antes de solicitar acceso a producción. Google evalúa la solicitud y puede pedir más información; no es una publicación automática al cumplir el plazo. Consulta la condición exacta de tu cuenta en la consola.

## 7. Producción

Completa los apartados de contenido, países, contacto, clasificación, seguridad de datos y declaraciones. Solicita acceso a producción cuando proceda. Revisa los avisos de la consola y envía la versión a revisión. No se ha realizado ese envío en esta entrega.

Cuando la ficha esté publicada, sustituye el aviso «en preparación» de la portada por su enlace real y vuelve a desplegar. No enlaces una ficha inexistente.

## Referencias oficiales consultadas el 20 de noviembre de 2026

• Creación y configuración: https://support.google.com/googleplay/android-developer/answer/9859152
• API objetivo: https://support.google.com/googleplay/android-developer/answer/11926878
• Pruebas de cuentas nuevas: https://support.google.com/googleplay/android-developer/answer/14151465
• Play App Signing: https://support.google.com/googleplay/android-developer/answer/9842756
• Seguridad de datos: https://support.google.com/googleplay/android-developer/answer/10787469
• Recursos gráficos: https://support.google.com/googleplay/android-developer/answer/9866151
