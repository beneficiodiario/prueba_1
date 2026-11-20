import { readFile, writeFile, mkdir } from "node:fs/promises";
const base = new URL("../", import.meta.url);
const read = (p) => readFile(new URL(p, base), "utf8");
const write = (p, s) => writeFile(new URL(p, base), s);
const html = await read("dist/index.html");
await write(
  "dist/404.html",
  html
    .replace(
      /<title>.*?<\/title>/,
      "<title>404 · Página no encontrada · Afín</title>",
    )
    .replace('content="index, follow"', 'content="noindex, nofollow"'),
);
const parties = JSON.parse(await read("src/data/parties.json"));
const catalog = JSON.parse(await read("src/data/catalog.json"));
await write(
  "dist/fuentes.json",
  JSON.stringify(
    {
      election: "29N2026",
      reviewedAt: "2026-11-20",
      disclaimer:
        "Web lúdica. No es una recomendación de voto. Posturas editoriales, no validadas por los partidos.",
      catalog,
      parties,
    },
    null,
    2,
  ),
);
const schema = JSON.parse(await read("research/schema.json"));
await write("dist/preguntas.json", JSON.stringify(schema.questions, null, 2));
const llms = await read("public/llms.txt");
await write("dist/llm.txt", llms);
await write(
  "dist/llms-full.txt",
  llms +
    "\n## Catálogo y documentación\n\n" +
    parties
      .map(
        (p) =>
          `### ${p.name}\nEstado: ${p.status}. Tipo: ${p.documentKind || "no disponible"}.\nFuente: ${p.programUrl || "No verificada"}.\n${p.note || ""}\nPosturas verificadas en el cuestionario: ${Object.keys(p.positions).length}/34.\n`,
      )
      .join("\n"),
);
// Static fallbacks keep the policies readable even if JavaScript is disabled.
const fallback = (title, body) =>
  `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>${title} · Afín</title><style>body{font:18px/1.8 system-ui;max-width:760px;margin:60px auto;padding:0 24px;color:#202d34}a{color:inherit}</style></head><body><main><a href="/">Afín · Inicio</a><h1>${title}</h1>${body}<p>Revisión: 20 de noviembre de 2026.</p></main></body></html>`;
await write(
  "dist/privacidad.html",
  fallback(
    "Privacidad",
    '<p>Las respuestas se procesan solo en la memoria de la pestaña, sin registro, cookies, almacenamiento persistente ni analítica de esta aplicación. No se envían a un servidor ni a la URL. Recargar o cerrar la pestaña las elimina. La descarga voluntaria de datos crea un archivo local con tus opiniones políticas.</p><p>El alojamiento puede recibir IP y registros técnicos al servir páginas. El titular del despliegue debe completar su identidad, contacto y los detalles de infraestructura antes de una publicación pública. Las webs externas tienen sus propias políticas.</p><p><a href="/privacidad">Versión completa de la política</a></p>',
  ),
);
await write(
  "dist/aviso-legal.html",
  fallback(
    "Aviso legal",
    '<p>Afín es una web de broma y divulgación para comparar tus ideas con propuestas documentadas. No diagnostica ideología, no prueba afiliación y no recomienda un voto. Es independiente de los partidos citados.</p><p>El catálogo se limita al Congreso del 29N de 2026 según el BOE inicial. No todos los programas están disponibles ni todos los temas documentados. La interpretación editorial puede contener errores. Consulta las fuentes originales en fuentes.json.</p><p>El titular del despliegue debe completar identidad y contacto antes de su publicación pública.</p><p><a href="/aviso-legal">Versión completa del aviso</a></p>',
  ),
);
let origin =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "");
if (origin) {
  const parsed = new URL(origin);
  if (!["https:", "http:"].includes(parsed.protocol))
    throw Error("SITE_URL debe usar https://");
  origin = parsed.origin;
  const paths = [
    "/",
    "/programas",
    "/metodologia",
    "/privacidad",
    "/cookies",
    "/aviso-legal",
    "/accesibilidad",
    "/creditos",
  ];
  await write(
    "dist/sitemap.xml",
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
      paths
        .map(
          (p) =>
            `<url><loc>${origin}${p}</loc><lastmod>2026-11-20</lastmod></url>`,
        )
        .join("") +
      "</urlset>",
  );
  await write(
    "dist/robots.txt",
    (await read("public/robots.txt")) + `\nSitemap: ${origin}/sitemap.xml\n`,
  );
  await write(
    "dist/index.html",
    html
      .replace("</head>", `<link rel="canonical" href="${origin}/" /></head>`)
      .replace('content="/social.svg"', `content="${origin}/social.svg"`),
  );
}
console.log(
  "Estáticos generados: 404, fuentes, preguntas, políticas sin JS, llms y robots." +
    (origin
      ? " Sitemap generado."
      : " Define SITE_URL en Vercel para generar sitemap y URL social absoluta."),
);

const routeTitles = {
  test: "Tu test de afinidad",
  resultados: "Tus coincidencias",
  programas: "Programas y fuentes 29N 2026",
  metodologia: "Cómo calculamos la afinidad",
  privacidad: "Privacidad",
  cookies: "Cookies",
  "aviso-legal": "Aviso legal",
  accesibilidad: "Accesibilidad",
  creditos: "Créditos",
};
for (const [route, title] of Object.entries(routeTitles)) {
  await mkdir(new URL(`dist/${route}/`, base), { recursive: true });
  let page = html.replace(
    /<title>.*?<\/title>/,
    `<title>${title} · Afín</title>`,
  );
  if (route === "test" || route === "resultados")
    page = page.replace(
      'content="index, follow"',
      'content="noindex, nofollow"',
    );
  if (origin)
    page = page.replace(
      "</head>",
      `<link rel="canonical" href="${origin}/${route}" /></head>`,
    );
  await write(`dist/${route}/index.html`, page);
}
