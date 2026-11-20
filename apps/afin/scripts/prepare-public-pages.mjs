import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const destination = process.argv[2];
if (!destination)
  throw Error("Indica la carpeta del repositorio web de Beneficio Diario.");
const output = path.resolve(destination, "public");
const policy = JSON.parse(
  await fs.readFile(path.join(root, "src/data/android-privacy.json"), "utf8"),
);
const parties = JSON.parse(
  await fs.readFile(path.join(root, "src/data/parties.json"), "utf8"),
);
const catalog = JSON.parse(
  await fs.readFile(path.join(root, "src/data/catalog.json"), "utf8"),
);
const esc = (v = "") =>
  String(v)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const css = `:root{color-scheme:light;font-family:system-ui,sans-serif;color:#202d28;background:#fcfdf9}*{box-sizing:border-box}body{margin:0}a{color:inherit;text-underline-offset:4px}header,main,footer{max-width:1100px;margin:auto;padding:28px 24px}header{display:flex;justify-content:space-between;gap:20px;align-items:center;border-bottom:1px solid #e2e6dc}nav{display:flex;gap:22px;flex-wrap:wrap}.brand{font-size:27px;font-weight:800;text-decoration:none}.hero{padding:60px 0 36px}.eyebrow{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}h1{font-size:clamp(38px,7vw,72px);line-height:1.06;max-width:850px;letter-spacing:-.04em;margin:22px 0}h2{font-size:26px;margin-top:40px;letter-spacing:-.02em}p,li{line-height:1.8}p{max-width:820px}.lead{font-size:21px;max-width:740px}.tag{display:inline-block;background:#dcf68c;padding:8px 15px;border-radius:30px;font-size:13px;font-weight:650}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin:35px 0}.card{border:1px solid #e2e6dc;border-radius:20px;padding:22px}.card:nth-child(2){background:#efecfd}.card:nth-child(3){background:#fcf0dc}.card b{display:block;font-size:28px;margin-bottom:8px}.notice{padding:20px 24px;background:#f0f4e8;border-radius:14px;max-width:850px}.policy{max-width:850px}.policy h1{font-size:clamp(36px,6vw,57px)}details{border:1px solid #e2e6dc;padding:18px 22px;border-radius:12px;margin:25px 0}summary{font-weight:700;cursor:pointer}table{width:100%;border-collapse:collapse;font-size:14px}td,th{text-align:left;padding:14px 8px;border-bottom:1px solid #e2e6dc;vertical-align:top}td a{overflow-wrap:anywhere}footer{border-top:1px solid #e2e6dc;margin-top:70px;font-size:13px}.skip{position:absolute;left:-9999px}.skip:focus{left:12px;top:12px;background:white;padding:14px}@media(max-width:640px){.cards{grid-template-columns:1fr}.hero{padding-top:28px}header{align-items:flex-start}nav{gap:12px;font-size:13px}.card b{font-size:23px}}`;
function html(title, route, content, policyPage = false) {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#dcf68c"><meta name="robots" content="index,follow"><meta name="description" content="${esc(policyPage ? "Política de privacidad de Afín para Android. Respuestas locales, exportación voluntaria, contacto y eliminación." : "Afín: un juego independiente de afinidad política, con preguntas, fuentes y porcentajes explicados.")}"/><link rel="canonical" href="https://beneficiodiario.com${route}"><title>${esc(title)} · Beneficio Diario</title><style>${css}</style></head><body><a class="skip" href="#contenido">Saltar al contenido</a><header><a class="brand" href="/politica">Afín<span aria-hidden="true" style="color:#839e3d">✦</span></a><nav aria-label="Principal"><a href="/politica">La app</a><a href="/politica#fuentes">Fuentes</a><a href="/politica/privacidad">Privacidad</a></nav></header><main id="contenido" class="${policyPage ? "policy" : ""}">${content}</main><footer><p>Afín · Proyecto lúdico independiente. Sin afiliación gubernamental o partidista.</p><nav><a href="mailto:${esc(policy.email)}">${esc(policy.email)}</a><a href="/politica/privacidad">Privacidad de Android</a><a href="/aviso-legal">Gestión del portal</a><a href="/privacidad">Privacidad del sitio web</a></nav><p>Revisión documental y política: 20 de noviembre de 2026. El alojamiento puede recibir datos técnicos al servir estas páginas.</p></footer></body></html>`;
}
const sourceRows = parties
  .map(
    (p) =>
      `<tr><th scope="row">${esc(p.name)}</th><td>${p.programUrl ? `<a href="${esc(p.programUrl)}" rel="noreferrer noopener">${esc(p.documentKind === "full" ? "Programa electoral" : "Documento / avance")}</a>` : "Sin documento verificado"}<br>${esc(p.status === "reviewed" ? "Con evidencia revisada" : "Pendiente / sin evidencia suficiente")}</td></tr>`,
  )
  .join("");
const landing = `<section class="hero"><span class="eyebrow">Tus ideas. Tus matices.</span><h1>Tus ideas tienen<br>más de un color.</h1><p class="lead">Un juego de autoconocimiento para comparar tus respuestas con propuestas documentadas de las formaciones políticas de España.</p><span class="tag">App Android en preparación para Google Play</span></section><div class="notice"><strong>Una broma con fuentes.</strong> Afín no representa al Gobierno, a una autoridad electoral ni a ningún partido. No diagnostica una ideología ni recomienda un voto. Todavía no se anuncia disponibilidad en Google Play.</div><div class="cards"><div class="card"><b>34 preguntas</b>Siete temas y tres niveles de importancia. También puedes no opinar.</div><div class="card"><b>En tu dispositivo</b>Cálculo sin conexión. Sin registro, publicidad ni analítica dentro de la app.</div><div class="card"><b>Resultados explicados</b>Porcentajes, cobertura documental, acuerdos, diferencias y enlaces a las fuentes.</div></div><h2>La coincidencia no es tu identidad</h2><p>La afinidad es una comparación matemática entre lo que respondes y las posturas que se han podido documentar. Los porcentajes no suman 100 y no son probabilidades ni intención de voto. Una formación puede aparecer sin porcentaje por falta de evidencia.</p><p>Solo se muestra porcentaje cuando hay al menos ocho preguntas comparables y un 40 % de cobertura ponderada. El silencio de un programa no se interpreta como neutralidad. Dos resultados pueden basarse en temas diferentes.</p><h2 id="fuentes">Fuentes y alcance</h2><p>El catálogo incluye ${catalog.parties.length} denominaciones de la convocatoria del 29 de noviembre de 2026. ${parties.filter((p) => p.status === "reviewed").length} tienen evidencia codificada. No equivale a haber revisado íntegramente todos los programas ni a incluir todas las elecciones de España. La base no se actualiza automáticamente.</p><p><a href="${esc(catalog.sourceUrl)}" rel="noreferrer noopener">Catálogo del BOE consultado</a> · <a href="/politica/fuentes.json">Datos y referencias del cuestionario (JSON)</a></p><details><summary>Ver enlaces y estado de cada formación</summary><table><thead><tr><th>Formación</th><th>Documento y estado</th></tr></thead><tbody>${sourceRows}</tbody></table></details><h2>Privacidad sin letra pequeña</h2><p>Las respuestas permanecen en memoria. Guardar mis datos crea una copia JSON en la caché privada y abre el selector de Android: contiene opiniones políticas y tú eliges el destinatario. Compartir el test solo comparte un enlace genérico.</p><p><a href="/politica/privacidad">Leer la política completa de Afín para Android</a></p>`;
const privacy = `<span class="eyebrow">Afín · Android</span><h1>Política de privacidad de Afín</h1><p class="lead">Tus opiniones se quedan contigo.</p><p>Última revisión: <time datetime="${policy.updated}">20 de noviembre de 2026</time>. Aplicación: <strong>com.beneficiodiario.afin</strong>.</p>${policy.sections.map((s) => `<section><h2>${esc(s.h)}</h2>${s.p.map((p) => `<p>${esc(p)}</p>`).join("")}</section>`).join("")}<p><a href="mailto:${esc(policy.email)}">Contactar con soporte y privacidad</a> · <a href="https://www.aepd.es/" rel="noreferrer noopener">Agencia Española de Protección de Datos</a></p>`;
await fs.mkdir(path.join(output, "politica"), { recursive: true });
await fs.writeFile(
  path.join(output, "politica.html"),
  html("Afín · Tus ideas tienen más de un color", "/politica", landing),
);
await fs.writeFile(
  path.join(output, "politica/privacidad.html"),
  html(
    "Política de privacidad de Afín para Android",
    "/politica/privacidad",
    privacy,
    true,
  ),
);
await fs.writeFile(
  path.join(output, "politica/fuentes.json"),
  JSON.stringify(
    {
      app: "Afín",
      notice:
        "Juego independiente. No recomienda un voto. Los documentos pendientes no se rellenan con suposiciones.",
      catalog,
      parties,
    },
    null,
    2,
  ),
);
console.log(
  "Páginas públicas de Afín preparadas en " +
    output +
    ". Falta desplegar y comprobar las URL de producción.",
);
