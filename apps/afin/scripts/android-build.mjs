import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mode = process.argv[2] || "debug";
if (!["debug", "release", "release-apk"].includes(mode))
  throw Error("Usa debug, release o release-apk.");
if (mode !== "debug" && !process.env.AFIN_SIGNING_PROPERTIES)
  throw Error(
    "Define AFIN_SIGNING_PROPERTIES con la ruta privada del archivo de firma. Nunca se incluye en el repositorio.",
  );
const npmCli =
  process.env.npm_execpath ||
  path.join(path.dirname(process.execPath), "node_modules/npm/bin/npm-cli.js");
if (!fs.existsSync(npmCli))
  throw Error(
    "Ejecuta este comando mediante npm run android:apk o npm run android:bundle.",
  );
function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    ...options,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}
run(process.execPath, [npmCli, "run", "build"]);
run(process.execPath, [
  "node_modules/@capacitor/cli/bin/capacitor",
  "sync",
  "android",
]);
const java = process.env.JAVA_HOME
  ? path.join(
      process.env.JAVA_HOME,
      "bin",
      process.platform === "win32" ? "java.exe" : "java",
    )
  : "java";
const task =
  mode === "release"
    ? "bundleRelease"
    : mode === "release-apk"
      ? "assembleRelease"
      : "assembleDebug";
run(
  java,
  [
    "-classpath",
    path.join(root, "android/gradle/wrapper/gradle-wrapper.jar"),
    "org.gradle.wrapper.GradleWrapperMain",
    task,
    "--no-daemon",
  ],
  { cwd: path.join(root, "android") },
);
