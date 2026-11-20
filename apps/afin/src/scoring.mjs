// Distance on a five-position scale. Missing evidence is never a neutral stance.
export function scoreParty(party, answers, questions) {
  const expressed = questions.filter(
    (q) => answers[q.id] && Number.isInteger(answers[q.id].value),
  );
  const totalWeight = expressed.reduce(
    (sum, q) => sum + answers[q.id].weight,
    0,
  );
  const details = expressed
    .filter(
      (q) =>
        party.positions[q.id] && Number.isInteger(party.positions[q.id].value),
    )
    .map((q) => {
      const answer = answers[q.id];
      const position = party.positions[q.id];
      return {
        questionId: q.id,
        category: q.category,
        title: q.title,
        answer: answer.value,
        weight: answer.weight,
        position: position.value,
        similarity: 1 - Math.abs(answer.value - position.value) / 4,
        evidence: position.evidence,
        locator: position.locator,
        sourceUrl: position.sourceUrl || party.programUrl,
      };
    });
  const comparedWeight = details.reduce((sum, d) => sum + d.weight, 0);
  const coverage = totalWeight ? comparedWeight / totalWeight : 0;
  const eligible =
    party.status === "reviewed" && details.length >= 8 && coverage >= 0.4;
  const rawScore = comparedWeight
    ? (100 * details.reduce((sum, d) => sum + d.weight * d.similarity, 0)) /
      comparedWeight
    : null;
  return {
    party,
    score: eligible ? Math.round(rawScore) : null,
    eligible,
    compared: details.length,
    answered: expressed.length,
    coverage: Math.round(100 * coverage),
    details,
    agreements: details
      .filter((d) => d.similarity >= 0.75)
      .sort((a, b) => b.weight - a.weight || b.similarity - a.similarity),
    differences: details
      .filter((d) => d.similarity <= 0.25)
      .sort((a, b) => b.weight - a.weight || a.similarity - b.similarity),
  };
}
export function rankParties(parties, answers, questions) {
  return parties
    .map((p) => scoreParty(p, answers, questions))
    .sort(
      (a, b) =>
        (b.score ?? -1) - (a.score ?? -1) ||
        b.coverage - a.coverage ||
        a.party.name.localeCompare(b.party.name, "es"),
    );
}
export function isComplete(answers, questions) {
  return questions.every((q) => Object.hasOwn(answers, q.id));
}
