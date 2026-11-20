import type { Party, Answers, Question } from "./types";
export interface Detail {
  questionId: string;
  category: string;
  title: string;
  answer: number;
  weight: number;
  position: number;
  similarity: number;
  evidence: string;
  locator: string;
  sourceUrl?: string;
}
export interface ScoredParty {
  party: Party;
  score: number | null;
  eligible: boolean;
  compared: number;
  answered: number;
  coverage: number;
  details: Detail[];
  agreements: Detail[];
  differences: Detail[];
}
export function scoreParty(
  party: Party,
  answers: Answers,
  questions: Question[],
): ScoredParty;
export function rankParties(
  parties: Party[],
  answers: Answers,
  questions: Question[],
): ScoredParty[];
export function isComplete(answers: Answers, questions: Question[]): boolean;
