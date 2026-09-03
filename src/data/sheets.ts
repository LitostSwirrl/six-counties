import { SHEET_ID, gvizUrl } from './config';
import { parseGviz } from './gviz';
import { DEMO_CANDIDATES } from './demo';
import type { Candidate, SignStatus } from './types';

const CHECK_START = 4;
const CHECK_END = 22;
const DEMO_DELAY_MS = 300;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function cell(row: string[], index: number): string {
  return (row[index] ?? '').trim();
}

export function parseStatus(raw: string): SignStatus {
  if (raw === '已簽署') return 'signed';
  if (raw === '部分簽署') return 'partial';
  return 'none';
}

export function parseCheck(raw: string): boolean {
  const value = raw.trim().toUpperCase();
  return value === '1' || value === 'TRUE' || value === '是';
}

export function formatSignedDate(raw: string): string {
  const match = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(raw.trim());
  if (!match) return raw.trim();
  return `${match[1]} 年 ${Number(match[2])} 月 ${Number(match[3])} 日`;
}

export function mapCandidateRow(row: string[]): Candidate {
  const checks: boolean[] = [];
  for (let i = CHECK_START; i < CHECK_END; i += 1) {
    checks.push(parseCheck(cell(row, i)));
  }
  return {
    city: cell(row, 0),
    name: cell(row, 1),
    party: cell(row, 2),
    status: parseStatus(cell(row, 3)),
    checks,
    signedDate: formatSignedDate(cell(row, 22)),
    photoUrl: cell(row, 23),
    isDemo: false,
  };
}

export function mapCandidateRows(rows: string[][]): Candidate[] {
  const body = rows.length > 0 && cell(rows[0], 0) === '縣市' ? rows.slice(1) : rows;
  return body.map(mapCandidateRow).filter((c) => c.name !== '');
}

async function fetchSheet(sheetName: string): Promise<string[][]> {
  const res = await fetch(gvizUrl(sheetName));
  if (!res.ok) throw new Error(`讀取「${sheetName}」失敗（HTTP ${res.status}）`);
  return parseGviz(await res.text());
}

export async function fetchCandidates(): Promise<Candidate[]> {
  if (SHEET_ID === '') {
    await delay(DEMO_DELAY_MS);
    return DEMO_CANDIDATES;
  }
  return mapCandidateRows(await fetchSheet('候選人簽署'));
}
