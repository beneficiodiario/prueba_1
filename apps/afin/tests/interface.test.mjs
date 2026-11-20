import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { createServer } from "vite";
const dom = new JSDOM(
  '<!doctype html><html><head><meta name="robots" content="index,follow"></head><body></body></html>',
  { url: "http://localhost/test" },
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
const React = await import("react");
const { render, screen, fireEvent, cleanup, act } =
  await import("@testing-library/react");
const server = await createServer({
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
});
const { default: App } = await server.ssrLoadModule("/src/App.tsx");
const { questions: questionBank } = await server.ssrLoadModule(
  "/src/data/questions.ts",
);
test.afterEach(() => cleanup());
test.after(async () => {
  cleanup();
  await server.close();
  dom.window.close();
});
test("recorrido completo: prioridad no responde, se conserva al volver y el test llega a resultados", async () => {
  render(React.createElement(App));
  const next = () => screen.getByRole("button", { name: "Siguiente pregunta" });
  assert.equal(next().disabled, true);
  fireEvent.click(screen.getByRole("button", { name: /Mucho/ }));
  assert.equal(
    next().disabled,
    true,
    "Cambiar importancia no debe responder por el visitante",
  );
  fireEvent.click(screen.getByRole("radio", { name: "Totalmente de acuerdo" }));
  fireEvent.click(next());
  assert.equal(
    screen.getByRole("heading", { level: 1 }).textContent,
    questionBank[1].title,
  );
  fireEvent.click(screen.getByRole("button", { name: "Anterior" }));
  assert.equal(
    screen.getByRole("radio", { name: "Totalmente de acuerdo" }).checked,
    true,
  );
  assert.equal(
    screen.getByRole("button", { name: /Mucho/ }).getAttribute("aria-pressed"),
    "true",
  );
  fireEvent.click(next());
  for (let i = 1; i < questionBank.length; i++) {
    fireEvent.click(
      screen.getByRole("radio", { name: "Totalmente de acuerdo" }),
    );
    fireEvent.click(
      screen.getByRole("button", {
        name:
          i === questionBank.length - 1
            ? "Ver mis coincidencias"
            : "Siguiente pregunta",
      }),
    );
  }
  assert.equal(window.location.pathname, "/resultados");
  assert.match(
    screen.getByRole("heading", { level: 1 }).textContent,
    /Hay cosas que os unen/,
  );
  assert.equal(window.localStorage.length, 0);
  assert.equal(window.sessionStorage.length, 0);
  assert.equal(document.cookie, "");
  assert.equal(window.location.search, "");
  fireEvent.click(screen.getByRole("button", { name: "Repetir test" }));
  assert.ok(screen.getByRole("dialog").open);
  fireEvent.click(screen.getByRole("button", { name: "Conservar respuestas" }));
  assert.equal(screen.queryByRole("dialog"), null);
  cleanup();
});
test("un resultado sin estado no inventa respuestas y una URL desconocida muestra 404", () => {
  window.history.replaceState({}, "", "/resultados");
  render(React.createElement(App));
  assert.match(
    screen.getByRole("heading", { level: 1 }).textContent,
    /faltan tus ideas/,
  );
  cleanup();
  window.history.replaceState({}, "", "/esta-pagina-no-existe");
  render(React.createElement(App));
  assert.match(
    screen.getByRole("heading", { level: 1 }).textContent,
    /no hay consenso/,
  );
  assert.equal(
    document.querySelector('meta[name="robots"]').content,
    "noindex, nofollow",
  );
  cleanup();
});
test("filtro de catálogo y páginas de políticas funcionan sin servicios externos", () => {
  window.history.replaceState({}, "", "/programas");
  render(React.createElement(App));
  const input = screen.getByRole("textbox", {
    name: "Buscar en los programas",
  });
  fireEvent.change(input, { target: { value: "un-nombre-inexistente-xyz" } });
  assert.ok(screen.getByText("No hay resultados."));
  cleanup();
  for (const path of [
    "/privacidad",
    "/cookies",
    "/aviso-legal",
    "/accesibilidad",
    "/creditos",
  ]) {
    window.history.replaceState({}, "", path);
    render(React.createElement(App));
    assert.ok(screen.getByRole("heading", { level: 1 }));
    cleanup();
  }
});
