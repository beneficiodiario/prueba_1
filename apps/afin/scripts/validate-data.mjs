import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
const read = async (p) =>
  JSON.parse(await readFile(new URL(p, import.meta.url), "utf8"));
const parties = await read("../src/data/parties.json");
const catalog = await read("../src/data/catalog.json");
const schema = await read("../research/schema.json");
const ids = new Set();
assert(catalog.parties.length > 0, "El catálogo no puede estar vacío");
assert(
  Object.keys(schema.questions).length === 34,
  "Debe haber 34 preguntas documentadas",
);
for (const p of parties) {
  assert(!ids.has(p.id), `ID duplicado: ${p.id}`);
  ids.add(p.id);
  assert(
    catalog.parties.some((c) => c.id === p.id),
    `Partido fuera de catálogo: ${p.id}`,
  );
  if (p.programUrl)
    assert(
      new URL(p.programUrl).protocol === "https:",
      `URL inválida: ${p.id}`,
    );
  assert(/^#[a-f\d]{6}$/i.test(p.color), `Color inválido: ${p.id}`);
  for (const [qid, pos] of Object.entries(p.positions)) {
    assert(schema.questions[qid], `Pregunta desconocida: ${p.id}/${qid}`);
    assert(
      Number.isInteger(pos.value) && pos.value >= -2 && pos.value <= 2,
      `Posición inválida: ${p.id}/${qid}`,
    );
    assert(
      pos.evidence?.trim() && pos.locator?.trim(),
      `Falta evidencia: ${p.id}/${qid}`,
    );
    assert(pos.sourceUrl || p.programUrl, `Falta fuente: ${p.id}/${qid}`);
  }
  if (p.status !== "reviewed")
    assert(
      Object.keys(p.positions).length === 0,
      `Fuente no revisada con posturas: ${p.id}`,
    );
}
assert(
  parties.length === catalog.parties.length,
  "El resultado debe conservar TODO el catálogo",
);
assert(
  catalog.parties.every((p) => ids.has(p.id)),
  "Faltan candidaturas en el resultado",
);
console.log(
  `Datos válidos: ${parties.length} grupos; ${parties.filter((p) => p.status === "reviewed").length} con evidencia revisada; ${parties.reduce((n, p) => n + Object.keys(p.positions).length, 0)} posturas.`,
);
