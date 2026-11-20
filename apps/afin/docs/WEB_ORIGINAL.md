# Afín · Test de afinidad política

Web estática en **React + TypeScript + Vite**, preparada para Vercel. Un juego de broma y autoconocimiento que compara opiniones expresadas voluntariamente con propuestas documentadas, muestra porcentajes, coincidencias, diferencias, cobertura y enlaces originales.

## Iniciar

Requiere Node.js 22.12 o superior. Se recomienda Node 24 LTS.

```bash
npm ci
npm run dev
```

```bash
npm run check
npm test
npm run build
npm run preview
```

El resultado de producción está en `dist/`. No necesita backend, base de datos, claves de API ni servicios de inteligencia artificial. El código y las dependencias están fijados con `package-lock.json`.

## Desplegar en Vercel

1. Sube el contenido de esta carpeta a un repositorio e impórtalo en Vercel.
2. Framework: **Vite**. Build: `npm run build`. Output: `dist`. Node: 24.x.
3. Añade `SITE_URL` con el origen público final, por ejemplo `https://tu-dominio.es`, sin rutas. Así se generan sitemap, URL social absoluta y canonical. Si no se configura, se utiliza `VERCEL_PROJECT_PRODUCTION_URL` cuando está disponible. No se inventa un dominio.
4. Completa los datos del titular y el contacto antes de una publicación pública. Puedes definir `VITE_SITE_OPERATOR` y `VITE_SITE_CONTACT` para mostrarlos en las políticas. Revisa el texto de `src/Policies.tsx` y los fallbacks en `scripts/postbuild.mjs` según tu despliegue real. No se ha inventado una identidad legal.
5. Despliega. Comprueba `/test`, `/resultados`, `/programas`, `/metodologia`, las políticas y una dirección inexistente.

También puedes ejecutar `npx vercel` desde esta carpeta si tienes tu cuenta configurada. Esta entrega **no inicia un despliegue externo**: el usuario indicó que lo desplegará en Vercel.

`vercel.json` configura las rutas conocidas y devuelve **HTTP 404 real** para rutas desconocidas. No utiliza el comodín habitual que devuelve 200 para cualquier dirección. Incluye cabeceras de contenido, referencia, permisos, frames y CSP. Vercel puede añadir sus propias medidas de infraestructura. No hemos activado Analytics.

## Qué cubre y qué no

- Convocatoria fija: **Congreso, 29 de noviembre de 2026**. Revisión documental: **20 de noviembre de 2026**.
- Universo del catálogo: todos los epígrafes del **Congreso**, separados del Senado, de [BOE-A-2026-23103](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-23103). Se conservan aliases, provincias y candidaturas no proclamadas.
- No es el registro de todos los partidos españoles ni mezcla elecciones autonómicas, locales o europeas.
- Los programas completos, avances, manifiestos y documentos políticos se distinguen en cada ficha. Los documentos anteriores o de otra convocatoria pueden enlazarse como referencia señalada, pero **no aportan posturas al cálculo actual**.
- Se han buscado fuentes para las candidaturas proclamadas. **No se afirma haber leído todos los párrafos de todos los programas**: hay documentos inaccesibles, ausentes y revisiones parciales. Las notas de cada ficha son parte esencial de los datos.
- El catálogo corresponde al BOE de referencia. Puede haber cambios posteriores por rectificaciones o resoluciones judiciales. No existe actualización automática.
- La selección de 34 preguntas es editorial y no agota todas las agendas. Algunas formaciones tienen documento verificado pero pocas propuestas comparables; se muestran sin porcentaje cuando falta base suficiente.

## Método

Cinco posiciones: −2, −1, 0, +1, +2. Sin opinión es `null`. Falta de evidencia significa ausencia en `positions`, nunca 0. Pesos: 1/2/3.

```text
afinidad = 100 * Σ[peso * (1 - abs(respuesta - postura) / 4)] / Σ[pesos comparables]
```

Se exige al menos 8 preguntas comparables y un 40 % de cobertura ponderada. Una cobertura inferior al 70 % se destaca como limitada. Los umbrales son editoriales y no validación científica. Los porcentajes no suman 100 y pueden usar subconjuntos distintos; el sitio lo explica junto a los resultados. Un empate redondeado se identifica y no representa una preferencia entre las formaciones empatadas.

No se deduce una postura por ideología, coalición o silencio. No se infiere afiliación ni intención de voto. La fuente original prevalece. La codificación asistida puede tener errores y requiere mantenimiento editorial.

## Datos y mantenimiento

- `src/data/questions.ts`: preguntas, contexto y categorías.
- `src/data/parties.json`: fichas, URLs, estado, notas y evidencias codificadas.
- `src/data/catalog.json`: universo y aliases del BOE.
- `research/*.json`: entregas de revisión y esquema; `catalog-audit.json` conserva epígrafes del catálogo.
- `src/scoring.mjs`: fórmula auditable y motor sin dependencias.
- `tests/`: pruebas de distancias, pesos, ausencias, mínimos, empates y recorrido completo de la interfaz en un DOM de pruebas.

Para actualizar una postura, abre el documento original, comprueba la convocatoria, añade una paráfrasis breve, un localizador comprobado y `sourceUrl` cuando difiera del documento principal. El número de página es el físico del PDF salvo indicación expresa. No inventes oposición a partir de una ausencia. Si cambia la convocatoria, crea otro conjunto documental, no sobrescribas las fechas manteniendo los datos anteriores.

`node scripts/merge-research.mjs` reconstruye las fichas a partir de las seis entregas de investigación. Si editas directamente los datos finales, no ejecutes esta herramienta después sin trasladar tus cambios a la revisión correspondiente.

`npm run build` valida integridad, IDs, enlaces y evidencias. **Esta validación estructural no certifica que un enlace siga disponible ni que una interpretación sea correcta.**

## Privacidad

Las respuestas solo viven en memoria. No hay cookies, localStorage, sessionStorage, geolocalización, login, analítica ni transmisión de respuestas. El progreso se pierde al recargar. El enlace de compartir no incluye resultados. La descarga JSON es voluntaria, local y contiene las opiniones del usuario.

El proveedor de alojamiento sí puede recibir IP y datos técnicos de las peticiones. El operador debe revisar su configuración real antes de publicar. «Sin registro de respuestas» no equivale a ausencia de registros de infraestructura.

## Archivos públicos

Se incluyen `index.html`, `404.html` generado, favicon, imagen social, `robots.txt`, `llms.txt`, `llms-full.txt`, `fuentes.json`, `preguntas.json`, políticas accesibles desde el footer y dos fallbacks HTML sin JavaScript. `sitemap.xml` se genera cuando se conoce un origen real.

## Recursos y licencias

Fotografía: **AMPERIO**, [Congreso de los Diputados, Madrid](https://commons.wikimedia.org/wiki/File:Congreso_de_los_Diputados,_Madrid.jpg), **CC BY-SA 4.0**. Archivo descargado a resolución 960 px. Se presenta recortado y con escala de grises mediante CSS; la adaptación de la imagen conserva esa licencia. Créditos y licencia enlazados en la web. Iconos **Lucide**, licencia ISC. Tipografía del sistema, sin peticiones externas.

Las siglas y colores identifican formaciones y no implican patrocinio. Los programas pertenecen a sus autores y se enlazan, no se redistribuyen íntegros.
