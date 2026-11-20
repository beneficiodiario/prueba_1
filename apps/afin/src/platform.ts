import { Capacitor, SystemBars, SystemBarsStyle } from "@capacitor/core";
import { App as NativeApp } from "@capacitor/app";
import { Browser } from "@capacitor/browser";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";

export const isNative = Capacitor.isNativePlatform();
export const publicWebUrl = "https://beneficiodiario.com/politica";
export const publicPrivacyUrl = `${publicWebUrl}/privacidad`;
export const publisher = {
  name: "Beneficio Diario",
  email: "info@beneficiodiario.com",
};

export async function openExternal(url: string) {
  const parsed = new URL(url);
  if (parsed.protocol !== "https:")
    throw new Error("Solo se abren enlaces HTTPS.");
  if (isNative)
    await Browser.open({ url: parsed.href, toolbarColor: "#202d28" });
  else window.open(parsed.href, "_blank", "noopener,noreferrer");
}

export async function shareTest() {
  const text =
    "Afín: un juego de autoconocimiento para comparar ideas con propuestas documentadas. No es una recomendación de voto.";
  if (isNative || typeof navigator.share === "function") {
    await Share.share({
      title: "Afín · Test de afinidad política",
      text,
      url: publicWebUrl,
      dialogTitle: "Compartir Afín",
    });
  } else await navigator.clipboard.writeText(`${text} ${publicWebUrl}`);
}

export async function exportJson(data: unknown) {
  const json = JSON.stringify(data, null, 2);
  if (isNative) {
    // Android shares a private cache file through FileProvider. No storage permission.
    const path = `afin-exports/afin-${Date.now()}.json`;
    const saved = await Filesystem.writeFile({
      path,
      data: json,
      directory: Directory.Cache,
      encoding: Encoding.UTF8,
      recursive: true,
    });
    try {
      await Share.share({
        title: "Mis respuestas de Afín",
        files: [saved.uri],
        dialogTitle: "Guardar o compartir mis datos",
      });
    } finally {
      // Keep only the current handoff file; remove old exports on the next export.
      const entries = await Filesystem.readdir({
        path: "afin-exports",
        directory: Directory.Cache,
      });
      await Promise.all(
        entries.files
          .filter((file) => `${"afin-exports/"}${file.name}` !== path)
          .map((file) =>
            Filesystem.deleteFile({
              path: `afin-exports/${file.name}`,
              directory: Directory.Cache,
            }).catch(() => {}),
          ),
      );
    }
    return;
  }
  const url = URL.createObjectURL(
    new Blob([json], { type: "application/json" }),
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "afin-mi-resultado.json";
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function registerNativeBack(onBack: () => void) {
  if (!isNative) return () => {};
  const listener = await NativeApp.addListener("backButton", onBack);
  return () => {
    void listener.remove();
  };
}
export async function exitNativeApp() {
  if (isNative) await NativeApp.exitApp();
}
export async function configureNative() {
  if (!isNative) return;
  document.documentElement.classList.add("native-app");
  await SystemBars.setStyle({ style: SystemBarsStyle.Light });
}
