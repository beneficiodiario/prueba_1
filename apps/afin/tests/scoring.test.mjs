import test from "node:test";
import assert from "node:assert/strict";
import { scoreParty, rankParties, isComplete } from "../src/scoring.mjs";
const questions = Array.from({ length: 10 }, (_, i) => ({
  id: `q${i}`,
  category: "test",
  title: `Tema ${i}`,
}));
const makeParty = (value = 2, count = 10) => ({
  id: "p",
  name: "Partido",
  status: "reviewed",
  positions: Object.fromEntries(
    questions
      .slice(0, count)
      .map((q) => [
        q.id,
        { value, evidence: "Propuesta comprobada.", locator: "Página 1" },
      ]),
  ),
});
const makeAnswers = (value = 2) =>
  Object.fromEntries(questions.map((q) => [q.id, { value, weight: 1 }]));
test("coincidencia completa y oposición completa producen 100 y 0", () => {
  assert.equal(scoreParty(makeParty(2), makeAnswers(2), questions).score, 100);
  assert.equal(scoreParty(makeParty(-2), makeAnswers(2), questions).score, 0);
});
test("neutralidad explícita es una respuesta comparable", () => {
  const r = scoreParty(makeParty(0), makeAnswers(0), questions);
  assert.equal(r.score, 100);
  assert.equal(r.compared, 10);
  assert.equal(scoreParty(makeParty(2), makeAnswers(0), questions).score, 50);
});
test("sin opinión no cuenta como neutral ni genera un resultado", () => {
  const r = scoreParty(makeParty(), makeAnswers(null), questions);
  assert.equal(r.score, null);
  assert.equal(r.answered, 0);
  assert.equal(r.coverage, 0);
  assert.equal(r.compared, 0);
});
test("el silencio del programa se excluye sin modificarlo a cero", () => {
  const r = scoreParty(makeParty(2, 8), makeAnswers(2), questions);
  assert.equal(r.score, 100);
  assert.equal(r.coverage, 80);
  assert.equal(r.compared, 8);
});
test("menos de ocho temas retiene el porcentaje", () => {
  const r = scoreParty(makeParty(2, 7), makeAnswers(2), questions);
  assert.equal(r.score, null);
  assert.equal(r.eligible, false);
});
test("la importancia modifica la afinidad ponderada", () => {
  const p = makeParty(2);
  p.positions.q0.value = -2;
  const a = makeAnswers(2);
  a.q0.weight = 3;
  assert.equal(scoreParty(p, a, questions).score, 75);
  assert.equal(scoreParty(p, makeAnswers(2), questions).score, 90);
});
test("una cobertura ponderada por debajo del 40% retiene la nota", () => {
  const qs = Array.from({ length: 30 }, (_, i) => ({
    id: `q${i}`,
    category: "t",
    title: "x",
  }));
  const a = Object.fromEntries(
    qs.map((q, i) => [q.id, { value: 2, weight: i < 8 ? 1 : 3 }]),
  );
  const r = scoreParty(makeParty(2, 8), a, qs);
  assert.equal(r.compared, 8);
  assert.equal(r.eligible, false);
  assert.equal(r.score, null);
});
test("una fuente pendiente nunca produce un porcentaje aunque tenga valores", () => {
  assert.equal(
    scoreParty({ ...makeParty(), status: "pending" }, makeAnswers(), questions)
      .score,
    null,
  );
});
test("todas las preguntas deben estar contestadas o saltadas", () => {
  assert.equal(isComplete({}, questions), false);
  assert.equal(isComplete(makeAnswers(null), questions), true);
  assert.equal(isComplete(makeAnswers(0), questions), true);
});
test("los empates tienen orden determinista y los porcentajes no se normalizan", () => {
  const p = makeParty();
  const ranked = rankParties(
    [
      { ...p, id: "b", name: "Beta" },
      { ...p, id: "a", name: "Alfa" },
    ],
    makeAnswers(),
    questions,
  );
  assert.equal(ranked[0].party.name, "Alfa");
  assert.deepEqual(
    ranked.map((r) => r.score),
    [100, 100],
  );
});
