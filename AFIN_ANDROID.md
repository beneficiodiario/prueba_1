# Afín: app Android y páginas públicas

El proyecto Android completo está en apps/afin, con su package-lock, wrapper de Gradle, pruebas y guía de publicación. Compila desde esa carpeta con npm ci y npm run android:apk. El workflow raíz .github/workflows/afin-android.yml utiliza esa carpeta y no cambia la compilación de Vercel del portal. La firma de release requiere AFIN_SIGNING_PROPERTIES o los secretos descritos en el README de la app.

Se añaden `/politica`, `/politica/privacidad` y `/politica/fuentes.json` mediante archivos estáticos dentro de `public/`. Vite los copia a `dist/`; Vercel los sirve con la configuración `cleanUrls` existente. No se añaden anuncios, analítica ni fuentes externas a estas dos páginas.

La política identifica la aplicación `com.beneficiodiario.afin`, la denominación editorial Beneficio Diario y el contacto que ya figura en el portal: `info@beneficiodiario.com`. Describe respuestas en memoria y exportación voluntaria de opiniones políticas a la caché privada. No se anuncia una disponibilidad ficticia en Google Play.

Validación:

```sh
npm ci
npm run build
node scripts/check-afin-pages.mjs
```

Después de desplegar, comprobar públicamente `https://beneficiodiario.com/politica/privacidad` (HTTP 200, sin login) y pegar esa URL en Play Console. La creación de esta rama no implica que las URL ya estén publicadas.

La suite general preexistente presenta un fallo ajeno a estas páginas: el test de JSON-LD exige un bloque para `/app`, aunque sus metadatos lo configuran explícitamente como `null`. El resto de sus comprobaciones, incluido HTTP local, pasa al ejecutar Node con acceso a localhost. No se modifica ese comportamiento de la app financiera en esta entrega.
