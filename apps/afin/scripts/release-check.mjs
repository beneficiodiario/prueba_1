import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const config = JSON.parse(
  await fs.readFile(path.join(root, "publishing/release-config.json"), "utf8"),
);
const errors = [];
for (const key of ["publisher", "supportEmail", "appId", "privacyUrl"])
  if (!config[key] || /example|pendiente|placeholder/i.test(config[key]))
    errors.push(`Completa ${key}`);
if (config.targetSdk < 36) errors.push("targetSdk debe ser al menos 36.");
const manifest = await fs.readFile(
  path.join(root, "android/app/src/main/AndroidManifest.xml"),
  "utf8",
);
if (!manifest.includes('android:allowBackup="false"'))
  errors.push("La copia automática debe estar desactivada.");
if (
  /READ_EXTERNAL_STORAGE|WRITE_EXTERNAL_STORAGE|CAMERA|ACCESS_FINE_LOCATION|AD_ID/.test(
    manifest,
  )
)
  errors.push("Permiso innecesario en manifiesto.");
try {
  const response = await fetch(config.privacyUrl, {
    signal: AbortSignal.timeout(12000),
  });
  const body = await response.text();
  if (
    !response.ok ||
    !body.includes("Afín") ||
    !body.includes(config.supportEmail)
  )
    errors.push(
      "La política pública de Afín aún no está publicada o no corresponde con esta app.",
    );
} catch {
  errors.push("No se ha podido verificar la política pública.");
}
if (errors.length) {
  console.error(
    "Pendientes para envío a Google Play:\n" +
      errors.map((e) => "- " + e).join("\n"),
  );
  process.exitCode = 1;
} else
  console.log(
    "Configuración y política pública verificadas. La aprobación de Google y las pruebas de cuenta son externas a esta comprobación.",
  );
