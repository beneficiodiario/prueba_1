export interface Position {
  value: number;
  evidence: string;
  locator: string;
  sourceUrl?: string;
}
export interface Party {
  id: string;
  name: string;
  shortName: string;
  color: string;
  territory: string;
  programUrl?: string;
  sourceTitle?: string;
  status: string;
  documentKind?: string;
  note?: string;
  positions: Record<string, Position>;
  aliases?: string[];
}
export interface CatalogEntry {
  id?: string;
  name: string;
  shortName?: string;
  provinces?: string[];
  aliases?: string[];
  partyId?: string;
  note?: string;
  sourceUrl?: string;
}
export interface Question {
  id: string;
  category: string;
  title: string;
  context: string;
}
export interface Answer {
  value: number | null;
  weight: number;
}
export type Answers = Record<string, Answer>;
