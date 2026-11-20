# Afín para Android

App de afinidad política construida con React + TypeScript + Vite y Capacitor 8. El cuestionario y los datos se incluyen en el paquete: no dependen de un servidor para calcular resultados.

**Entrega 1.0.0:** Android 7+ (API 24), API objetivo 36, paquete com.beneficiodiario.afin. APK release y AAB firmados. Todavía no está publicada en Google Play.

## Usar y compilar

Requisitos: Node 24 LTS (mínimo 22.12), JDK 21, Android SDK con platforms;android-36 y build-tools;36.0.0. Configura JAVA_HOME y ANDROID_HOME; Android Studio puede instalar esas dependencias, pero no es obligatorio para la compilación por CLI.

~~~sh
npm ci
npm run check
npm test
npm run android:apk
~~~

El último comando compila la web, sincroniza Capacitor y genera android/app/build/outputs/apk/debug/app-debug.apk. Para abrir el proyecto en Android Studio: npm run android:open.

## Versiones firmadas

Conserva el kit de firma privado entregado por separado. Contiene la clave de subida, su contraseña y un script para preparar sus rutas en tu equipo. No se incluye en el código ni en el paquete público.

En PowerShell, ejecuta el script Preparar-Firma.ps1 del kit desde una consola propia. Después, en la carpeta de este proyecto:

~~~powershell
npm run android:release-apk
npm run android:bundle
~~~

En otros sistemas configura un archivo Properties privado con storeFile, storePassword, keyAlias y keyPassword (ver signing.example.properties) y exporta AFIN_SIGNING_PROPERTIES con su ruta absoluta. storeFile debe ser absoluto. Nunca subas claves o contraseñas al repositorio.

Salidas: android/app/build/outputs/apk/release/app-release.apk y android/app/build/outputs/bundle/release/app-release.aab. El AAB es el archivo para Google Play. Mantén el mismo paquete y aumenta versionCode en cada actualización. Conserva la clave de subida; Play App Signing puede usar otra clave para distribuir la app.

## Qué incorpora Android

• Botón Atrás: pregunta anterior, vuelta al inicio y confirmación de salida si hay respuestas.
• Compartir mediante el selector de Android: solo un enlace genérico, sin opiniones.
• Guardar mis datos: JSON en caché privada, expuesto por FileProvider solo a la aplicación que elijas. Aviso previo de que contiene opiniones políticas.
• Fuentes en navegador mediante Custom Tabs y solo URL HTTPS.
• Icono adaptativo, icono monocromo, splash, barras del sistema e insets.
• Sin cuentas, anuncios, analítica, compras ni permisos sensibles. Copias de seguridad de la app desactivadas.

Las respuestas viven en memoria y pueden perderse si Android cierra el proceso. La última exportación puede permanecer en caché hasta su limpieza por Android, borrado manual o desinstalación. Repetir el test no borra copias que hayas exportado.

## Datos y límites

34 preguntas y siete temas. Catálogo de 57 denominaciones de la convocatoria de Congreso 29N 2026, con 32 formaciones que tienen evidencia codificada y 327 posturas. No equivale a haber leído íntegramente todos los programas. Los pendientes se identifican y no se rellenan por ideología. Revisión: 20 de noviembre de 2026; sin actualización automática.

Escala de acuerdo de −2 a +2, importancia 1–3. La ausencia de evidencia no es neutralidad. Se requiere un mínimo de ocho preguntas comparables y 40 % de cobertura ponderada para mostrar porcentaje. Los porcentajes no suman 100 y no son intención de voto. Consulta la metodología y cada pasaje original.

Afín es una app de broma y divulgación independiente. No representa a una autoridad ni a un partido. No diagnostica ideologías ni recomienda el voto.

## Sitio público y políticas

La configuración preparada usa https://beneficiodiario.com/politica y su política /politica/privacidad. El contacto es info@beneficiodiario.com, que figura en la web suministrada.

La política interna y la pública comparten src/data/android-privacy.json. Para regenerar las páginas en una copia del repositorio web:

~~~sh
node scripts/prepare-public-pages.mjs RUTA_AL_REPOSITORIO_WEB
~~~

Las páginas HTML se copian a public/ y se sirven con cleanUrls de Vercel. Preparar esos archivos no los publica. Antes de enviar a revisión, despliega y ejecuta npm run release:check; debe verificar la política de producción sin login.

## Publicación y verificación

Consulta publishing/GOOGLE_PLAY_PASO_A_PASO.md, PLAY_STORE_ES.md, DATA_SAFETY.md y PRUEBAS_DISPOSITIVO.md. Se incluyen icono y gráfico de ficha. Quedan pendientes cuenta y verificaciones de Google, despliegue público de la política, pruebas reales, capturas y el envío a revisión. Las cuentas personales nuevas pueden requerir una prueba cerrada de 12 personas durante 14 días según Google; consulta tu consola.

La entrega supera TypeScript, 17 pruebas de cálculo e interfaz (incluidos puentes nativos simulados), compilación release, Android Lint sin errores, bundletool validate y verificación de firmas. La revisión visual en emulador no se completó por caducidad del permiso de acceso. No se afirma una prueba real de instalación o de recorrido.

## Integración continua

.github/workflows/android.yml compila y adjunta un APK debug. Un lanzamiento manual firmado requiere los secretos AFIN_KEYSTORE_BASE64, AFIN_STORE_PASSWORD y AFIN_KEY_ALIAS. No ejecuta pagos, creación de cuentas ni publicación automática. El workflow está preparado; no se ha ejecutado en GitHub en esta sesión.

## Créditos

Fotografía local del Congreso: AMPERIO, Wikimedia Commons, CC BY-SA 4.0. La adaptación visual se ofrece con la misma licencia; ver la sección Créditos de la app y THIRD_PARTY_NOTICES.md. Las denominaciones y documentos pertenecen a sus titulares. No se redistribuyen copias completas de los programas. El origen web se conserva como referencia en docs/WEB_ORIGINAL.md.
