import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { createServer } from "vite";
const dom = new JSDOM(
  '<html><head><meta name="robots"></head><body></body></html>',
  { url: "http://localhost/" },
);
for (const key of [
  "window",
  "document",
  "navigator",
  "HTMLElement",
  "HTMLDialogElement",
  "Node",
  "MutationObserver",
])
  Object.defineProperty(globalThis, key, {
    value: dom.window[key],
    configurable: true,
    writable: true,
  });
window.scrollTo = () => {};
HTMLDialogElement.prototype.showModal = function () {
  this.open = true;
};
HTMLDialogElement.prototype.close = function () {
  this.open = false;
};
const calls = [];
const listeners = new Set();
const fake = (globalThis.__afinNativeMock = {
  Capacitor: { isNativePlatform: () => true },
  SystemBarsStyle: { Light: "LIGHT" },
  SystemBars: { setStyle: async (options) => calls.push(["bars", options]) },
  App: {
    addListener: async (name, callback) => {
      listeners.add(callback);
      return { remove: async () => listeners.delete(callback) };
    },
    exitApp: async () => calls.push(["exit"]),
  },
  Browser: { open: async (options) => calls.push(["browser", options]) },
  Directory: { Cache: "CACHE" },
  Encoding: { UTF8: "utf8" },
  Filesystem: {
    writeFile: async (options) => {
      calls.push(["write", options]);
      return { uri: "file:///private/cache/afin-exports/current.json" };
    },
    readdir: async () => ({
      files: [
        { name: "old.json" },
        {
          name: calls
            .findLast((c) => c[0] === "write")[1]
            .path.split("/")
            .at(-1),
        },
      ],
    }),
    deleteFile: async (options) => calls.push(["delete", options]),
  },
  Share: { share: async (options) => calls.push(["share", options]) },
});
const modules = {
  "@capacitor/core": ["Capacitor", "SystemBars", "SystemBarsStyle"],
  "@capacitor/app": ["App"],
  "@capacitor/browser": ["Browser"],
  "@capacitor/filesystem": ["Filesystem", "Directory", "Encoding"],
  "@capacitor/share": ["Share"],
};
const server = await createServer({
  server: { middlewareMode: true, hmr: false },
  ssr: { noExternal: Object.keys(modules) },
  appType: "custom",
  plugins: [
    {
      name: "native-test-bridge",
      enforce: "pre",
      resolveId(id) {
        if (modules[id]) return "\0afin-test:" + id;
      },
      load(id) {
        if (!id.startsWith("\0afin-test:")) return;
        return modules[id.slice(11)]
          .map(
            (name) =>
              `export const ${name}=globalThis.__afinNativeMock.${name};`,
          )
          .join("\n");
      },
    },
  ],
});
const platform = await server.ssrLoadModule("/src/platform.ts");
const { default: App } = await server.ssrLoadModule("/src/App.tsx");
const React = await import("react");
const { render, screen, fireEvent, cleanup, act } =
  await import("@testing-library/react");
test.afterEach(() => {
  cleanup();
  calls.length = 0;
});
test.after(async () => {
  await server.close();
  dom.window.close();
  delete globalThis.__afinNativeMock;
});

test("Android abre únicamente fuentes HTTPS y comparte un enlace genérico sin respuestas", async () => {
  await assert.rejects(
    platform.openExternal("http://example.org/programa.pdf"),
  );
  assert.equal(calls.length, 0);
  await platform.openExternal("https://example.org/programa.pdf");
  assert.equal(calls[0][0], "browser");
  assert.equal(calls[0][1].url, "https://example.org/programa.pdf");
  await platform.shareTest();
  const share = calls.find((c) => c[0] === "share")[1];
  assert.equal(share.url, "https://beneficiodiario.com/politica");
  assert.equal(share.files, undefined);
  assert.ok(!JSON.stringify(share).includes("answers"));
});

test("Android exporta JSON con FileProvider desde caché y elimina solo las copias anteriores", async () => {
  const payload = {
    answers: { housing: { value: 2, weight: 3 } },
    notice: "Opiniones políticas",
  };
  await platform.exportJson(payload);
  const write = calls.find((c) => c[0] === "write")[1];
  assert.equal(write.directory, "CACHE");
  assert.deepEqual(JSON.parse(write.data), payload);
  assert.match(write.path, /^afin-exports\/afin-\d+\.json$/);
  assert.deepEqual(calls.find((c) => c[0] === "share")[1].files, [
    "file:///private/cache/afin-exports/current.json",
  ]);
  assert.deepEqual(
    calls.filter((c) => c[0] === "delete").map((c) => c[1].path),
    ["afin-exports/old.json"],
  );
  assert.equal(window.localStorage.length, 0);
});

test("Atrás nativo vuelve a la pregunta anterior conservando la respuesta y confirma salir", async () => {
  window.history.replaceState({}, "", "/test");
  render(React.createElement(App));
  await act(async () => {});
  const first = screen.getByRole("heading", { level: 1 }).textContent;
  fireEvent.click(screen.getByRole("radio", { name: "Totalmente de acuerdo" }));
  fireEvent.click(screen.getByRole("button", { name: "Siguiente pregunta" }));
  await act(async () => {});
  assert.notEqual(screen.getByRole("heading", { level: 1 }).textContent, first);
  await act(async () => {
    for (const handler of [...listeners]) handler();
  });
  assert.equal(screen.getByRole("heading", { level: 1 }).textContent, first);
  assert.equal(
    screen.getByRole("radio", { name: "Totalmente de acuerdo" }).checked,
    true,
  );
  await act(async () => {
    for (const handler of [...listeners]) handler();
  });
  assert.equal(window.location.pathname, "/");
  await act(async () => {
    for (const handler of [...listeners]) handler();
  });
  assert.ok(screen.getByRole("dialog").open);
  assert.ok(!calls.some((c) => c[0] === "exit"));
  await act(async () => {
    for (const handler of [...listeners]) handler();
  });
  assert.equal(screen.queryByRole("dialog"), null);
  cleanup();
  await act(async () => {});
  assert.equal(
    listeners.size,
    0,
    "No deben quedar escuchas de Atrás al desmontar",
  );
});

test("La política Android usa el contacto real y explica la caché de exportación", () => {
  window.history.replaceState({}, "", "/privacidad");
  render(React.createElement(App));
  assert.ok(
    screen.getByRole("heading", { name: "Tus opiniones se quedan contigo." }),
  );
  assert.ok(screen.getByText(/caché privada/));
  assert.equal(
    screen
      .getByRole("link", { name: "Contactar con soporte" })
      .getAttribute("href"),
    "mailto:info@beneficiodiario.com",
  );
});
