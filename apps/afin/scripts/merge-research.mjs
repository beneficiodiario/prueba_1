import { readFile, writeFile } from "node:fs/promises";
const root = new URL("../", import.meta.url);
const read = async (p) => JSON.parse(await readFile(new URL(p, root), "utf8"));
const catalog = await read("research/catalog.json");
const files = [
  "national",
  "regional",
  "extra",
  "small-a",
  "small-b",
  "small-c",
];
const patches = new Map();
const aliases = {
  "frente-amplio": "fa",
  frenteamplio: "fa",
  "eh-bildu": "bildu",
  ehbildu: "bildu",
  "eaj-pnv": "pnv",
  eajpnv: "pnv",
  "coalicion-canaria": "cc",
  "upn-pp": "upn",
  "mundo-justo": "mj",
  mundojusto: "mj",
  "frente-obrero": "fo",
};
for (const f of files) {
  const data = await read(`research/${f}.json`);
  for (const p of Array.isArray(data) ? data : data.parties) {
    p.id = aliases[p.id] || p.id;
    if (patches.has(p.id)) throw Error(`Revisión duplicada: ${p.id}`);
    patches.set(p.id, p);
  }
}
const fallbackColors = [
  "#476350",
  "#8265a8",
  "#52758d",
  "#98604c",
  "#58716d",
  "#79652e",
  "#5a659b",
];
const parties = catalog.parties.map((entry, i) => {
  const patch = patches.get(entry.id);
  const p = {
    ...entry,
    color: fallbackColors[i % fallbackColors.length],
    ...patch,
  };
  p.positions = p.positions || {};
  p.color = p.color || fallbackColors[i % fallbackColors.length];
  p.election = "29N2026";
  p.reviewedAt = "2026-11-20";
  if (!entry.provinces.length) {
    p.status = "pending";
    p.positions = {};
    p.note =
      "Consta únicamente como no proclamada en el BOE de referencia. No participa en el cálculo.";
  }
  return p;
});
for (const id of patches.keys())
  if (!catalog.parties.some((p) => p.id === id))
    throw Error(`ID de revisión fuera de catálogo: ${id}`);
await writeFile(
  new URL("src/data/parties.json", root),
  JSON.stringify(parties, null, 2) + "\n",
);
await writeFile(
  new URL("src/data/catalog.json", root),
  JSON.stringify(catalog, null, 2) + "\n",
);
console.log(
  `Integradas ${patches.size} revisiones en ${parties.length} fichas del catálogo.`,
);
